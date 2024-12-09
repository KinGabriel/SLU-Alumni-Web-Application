import dbConnection from '../../database/connection.js';
import fs from 'fs';
import path from 'path';

export const getOwnPost =(req, res) =>{
    const userId = req.userId;
    const query = `
    SELECT 
        p.post_id,
        p.description,
        p.banner,
        p.post_type,
        p.datetime,
        p.is_edited,
        COUNT(DISTINCT l.like_id) AS like_count,
        COUNT(DISTINCT c.comm_id) AS comment_count,
        u.user_id AS poster_id,
        u.pfp,
        CONCAT(u.fname, ' ', u.lname) AS name,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.post_id AND user_id = ?) > 0 AS is_liked  
    FROM posts p
    LEFT JOIN likes l ON p.post_id = l.post_id
    LEFT JOIN comments c ON p.post_id = c.post_id
    LEFT JOIN follows f ON f.followed_id = p.user_id 
    JOIN user u ON u.user_id = p.user_id
    WHERE  (
            ( f.followed_id IS NOT NULL) 
            OR (p.user_id = ?)
        ) AND p.user_id = ?
    GROUP BY 
        p.post_id
    ORDER BY p.post_id DESC
`;


    dbConnection.query(query, [userId, userId,userId], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Failed to fetch posts.' });
        }

        const posts = results.map(post => {
            if (post.banner) {
                post.banner = handleMedia(post.banner);
            }
            if (post.pfp) {
                post.pfp = `data:image/jpeg;base64,${post.pfp.toString('base64')}`;
            }
            post.is_liked = post.is_liked > 0; // Convert to boolean
            return post;
        });
        res.status(200).json({ posts });
    });
}
// Helper method for handling images and videos
const handleMedia = (bannerPath) => {
    if (Buffer.isBuffer(bannerPath)) {
        bannerPath = bannerPath.toString('utf-8').trim();
    }
    if (typeof bannerPath === 'string' && fs.existsSync(bannerPath)) {
        const ext = path.extname(bannerPath).toLowerCase();
        
        // Handle image files
        if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
            const imageBuffer = fs.readFileSync(bannerPath);
            return `data:image/${ext.slice(1)};base64,${imageBuffer.toString('base64')}`;
        }
        
        // Handle video files
        if (['.mp4', '.mkv', '.mov'].includes(ext)) {
            const videoBuffer = fs.readFileSync(bannerPath);
            return `data:video/${ext.slice(1)};base64,${videoBuffer.toString('base64')}`;
        }
    }
    return ''; // if empty
};
export const handleLikes = (req, res) => {
    const userId = req.userId;
    const postId = req.params.postId; 

    const checkLikeQuery = 'SELECT * FROM likes WHERE post_id = ? AND user_id = ?';
    
    dbConnection.query(checkLikeQuery, [postId, userId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error checking like status', error: err });
        }

        if (results.length > 0) {
            const deleteLikeQuery = 'DELETE FROM likes WHERE post_id = ? AND user_id = ?';
            
            dbConnection.query(deleteLikeQuery, [postId, userId], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ message: 'Error removing like', error: err });
                }
                res.status(200).json({ message: 'Like removed successfully'});;
            });
        } else {
            const insertLikeQuery = 'INSERT INTO likes (post_id, user_id) VALUES (?, ?)';
            
            dbConnection.query(insertLikeQuery, [postId, userId], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ message: 'Error adding like', error: err });
                }

                res.status(200).json({ message: 'Like added successfully'});
            });
        }
    });
};
export const editPost = async (req, res) => {
    try {
        const postId = req.params.postId; // Post ID from request parameters
        const { description } = req.body; // Updated description from the request body
        const setEdit = 1; // Mark the post as edited

        // Check if postId and description are provided
        if (!postId || !description) {
            return res.status(400).json({ message: 'Post ID and description are required' });
        }

        // Handle file uploads (images and videos)
        const uploadedImages = (req.files && req.files['images[]']) || [];
        const uploadedVideos = (req.files && req.files['videos[]']) || [];
        const bannerFiles = [...uploadedImages, ...uploadedVideos];
        const banner = bannerFiles.length > 0
            ? bannerFiles.map(file => file.path).join(',')
            : null; // Handle case where no new files are uploaded

        // Build the SQL query
        const query = `
            UPDATE posts
            SET description = ?, 
                banner = IFNULL(?, banner), -- Update banner only if new files are uploaded
                datetime = NOW(), 
                is_edited = ?
            WHERE post_id = ?
        `;

        // Execute the query
         await dbConnection.execute(query, [description, banner, setEdit, postId]);

      

        // Respond with success
        res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
        console.error('Error editing post:', error);
        res.status(500).json({ message: 'Failed to update the post' });
    }
};


export const deletePost = async (req,res) => {
    try {
    const postId = req.params.postId; 
    const query = `  DELETE FROM  posts  WHERE  post_id = ?`;
    await dbConnection.execute(query, [postId]);
} catch (error) {
    console.error('Error editing post:', error);  // Log any errors
    res.status(500).json({ message: 'Failed to update the post' });
}
}