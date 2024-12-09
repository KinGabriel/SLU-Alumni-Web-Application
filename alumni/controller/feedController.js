import dbConnection from '../../database/connection.js';
import fs from 'fs';
import path from 'path';


export const handleUserPost = (req, res) => {
    const userId = req.userId
    const { description, post_type } = req.body;

    const uploadedImages = req.files['images[]'] || [];
    const uploadedVideos = req.files['videos[]'] || [];
    const bannerFiles = [...uploadedImages, ...uploadedVideos];


    const banner = bannerFiles.map(file => file.path).join(',');

    console.log('Received data:', req.body);
    console.log('Uploaded files:', bannerFiles);

    const query = "INSERT INTO posts (description, banner,  post_type, datetime, user_id) VALUES (?,  ?, ?, NOW(), ?)";
    dbConnection.query(query, [description, banner,  post_type, userId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error creating post', error: err });
        }
        return res.status(200).json({ message: 'Post created successfully' });
    });
};
export const getPost = (req, res) => {
    const userId = req.userId;
    const query = `
    SELECT 
            p.post_id,
            p.banner,
            p.post_type,
            p.datetime,
            p.description,
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
        p.user_id = ?  
        OR f.follower_id = ?  
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
};
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
export const handleComments = (req, res) => {
    const userId = req.userId;
    const { post_id, comment_message } = req.body; 

    if (!post_id || !comment_message) {
        return res.status(400).json({ error: 'Post ID and comment text are required' });
    }
    const sanitizedCommentText = comment_message.trim();
    if (sanitizedCommentText.length === 0) {
        return res.status(400).json({ error: 'Comment cannot be empty' });
    }

    const query = `
        INSERT INTO comments (post_id, user_id, comment_message, date)
        VALUES (?, ?, ?, NOW());
    `;

    dbConnection.execute(query, [post_id, userId, sanitizedCommentText], (err, results) => {
        if (err) {
            console.error('Error inserting comment:', err);
            return res.status(500).json({ error: 'Database error occurred' });
        }

        res.status(200).json({ success: true, message: 'Comment submitted successfully' });
    
    });
};



export const getComments = (req, res) => {
    const postId = req.params.postId;

    const query = `
       SELECT 
        CONCAT(u.fname, ' ', u.lname) AS name,
        u.pfp, 
        c.comment_message,
        c.date
    FROM
        comments c
        JOIN posts p ON c.post_id = p.post_id
        JOIN user u ON c.user_id = u.user_id
    WHERE
        p.post_id = ?`;

    dbConnection.execute(query, [postId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database error occurred' });
        }
        const comments = results.map(comment => {
            if (comment.pfp) {
                comment.pfp = `data:image/jpeg;base64,${comment.pfp.toString('base64')}`;
            }
            return comment;
        });

        // Return the comments as a JSON response
        res.json(comments);
    });
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

