import dbConnection from '../../database/connection.js';
import fs from 'fs';
import path from 'path';

export const getOwnPost =(req, res) =>{
    const userId = req.cookies.user_id;
    const query = `
        SELECT 
        p.post_id,
        p.description,
        p.banner,
        p.is_deleted,
        p.access_type,
        p.post_type,
        p.datetime,
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
    WHERE 
        p.is_deleted = 0
        AND (
            p.access_type = 'public' 
            OR (p.access_type = 'following' AND f.followed_id IS NOT NULL) 
            OR (p.access_type = 'private' AND p.user_id = ?)
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

// helper method for images and videos
const handleMedia = (bannerPath) => {
    if (Buffer.isBuffer(bannerPath)) {
        bannerPath = bannerPath.toString('utf-8').trim();
        if (fs.existsSync(bannerPath)) {
            const ext = path.extname(bannerPath).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
                return `data:image/${ext.slice(1)};base64,${fs.readFileSync(bannerPath).toString('base64')}`;
            }
            if (['.mp4', '.mkv', '.mov'].includes(ext)) {
                return `data:video/${ext.slice(1)};base64,${fs.readFileSync(bannerPath).toString('base64')}`;
            }
        }
    }
    return '';
};

export const handleLikes = (req, res) => {
    const userId = req.cookies.user_id;
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
        const postId = req.params.postId;  // Extract postId from URL
        const { description, datetime } = req.body;  // Extract data from request body

        // Collect uploaded images and videos
        const uploadedImages = req.files['images[]'] || [];
        const uploadedVideos = req.files['videos[]'] || [];

        // Combine images and videos into a single array (bannerFiles)
        const bannerFiles = [...uploadedImages, ...uploadedVideos];

        // Join the file paths into a comma-separated string
        const banner = bannerFiles.map(file => file.path).join(',');

        console.log('Received data:', req.body);  // Log the received data
        console.log('Uploaded files:', bannerFiles);  // Log the uploaded files

        // SQL query to update the post
        const query = `
            UPDATE posts
            SET description = ?, banner = ?, datetime = ?
            WHERE \`post_id\` = ?
        `;

        // Execute the query with the updated data
        await dbConnection.execute(query, [description, banner, datetime, postId]);

        // Respond with success message
        res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
        console.error('Error editing post:', error);  // Log any errors
        res.status(500).json({ message: 'Failed to update the post' });
    }
};
