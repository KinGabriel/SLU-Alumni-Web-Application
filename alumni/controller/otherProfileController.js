import dbConnection from '../../database/connection.js';
import fs from 'fs';
import path from 'path';

export const  getOtherUserInfo = (req,res) => {
    const userId = req.query.user_id; 
    console.log("Received user_id:", userId); 

  const query = `
    SELECT 
        CONCAT(u.fname, ' ', u.lname) AS Name, 
        u.pfp,
        a.bio, 
        COUNT(DISTINCT CASE WHEN f.follower_id = ? THEN f.followed_id END) AS followed_count, 
        COUNT(DISTINCT CASE WHEN f.followed_id = ? THEN f.follower_id END) AS follower_count, 
        COUNT(DISTINCT p.post_id) AS post_count
    FROM 
        user u
    JOIN 
        alumni a ON u.user_id = a.user_id
    LEFT JOIN 
        follows f ON u.user_id = f.follower_id OR u.user_id = f.followed_id
    LEFT JOIN 
        posts p ON u.user_id = p.user_id
    WHERE 
        u.user_id = ?
    GROUP BY 
        u.user_id
`;


    dbConnection.query(query, [userId,userId,userId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Invalid Access' });
        }

       
        const user = result[0];

        
        if (user.pfp) {
            req.session.pfp = 'data:image/jpeg;base64,' + Buffer.from(user.pfp).toString('base64');
        } else {
            req.session.pfp = '/assets/images/default-avatar-icon.jpg'; 
        }
      
        res.json({
            name: user.Name,
            bio: user.bio,
            follower_count: user.follower_count,
            followed_count: user.followed_count,
            post_count: user.post_count,
            pfp: req.session.pfp,
        });
     

    });
}

export const follow = (req, res) => {
    const targetUserId = req.query.user_id; 
    const user_id = req.userId; 
    console.log(user_id,targetUserId );

    const checkFollowQuery = `
        SELECT * FROM follows
        WHERE follower_id = ? AND followed_id = ?
    `;

    dbConnection.query(checkFollowQuery, [user_id, targetUserId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: 'You are already following this user' });
        }

        const followQuery = `
            INSERT INTO follows (follower_id, followed_id, date_followed)
            VALUES (?, ?, NOW())
        `;

        dbConnection.query(followQuery, [user_id, targetUserId], (err, result) => {
            if (err) {
                console.error('Database Error:', err);  // Log the error
                return res.status(500).json({ error: 'Error following user' });
            }
            res.status(200).json({ message: 'User followed successfully' });
        });
        
    });
};


export const unfollow = (req, res) => {
    const targetUserId = req.query.user_id; 
    const user_id = req.userId; 

    const unfollowQuery = `
        DELETE FROM follows
        WHERE follower_id = ? AND followed_id = ?
    `;

    dbConnection.query(unfollowQuery, [user_id, targetUserId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error unfollowing user' });
        }

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'You are not following this user' });
        }

        res.status(200).json({ message: 'User unfollowed successfully' });
    });
};


export const isFollowing = (req, res) => {
    const targetUserId = req.query.user_id; 
    const user_id = req.userId; 

    if (!targetUserId || !user_id) {
        return res.status(400).json({ message: 'User ID or logged-in user ID is missing' });
    }

    const checkFollowQuery = `
        SELECT COUNT(*) AS isFollowing
        FROM follows
        WHERE follower_id = ? AND followed_id = ?
    `;

    dbConnection.query(checkFollowQuery, [user_id, targetUserId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error checking follow status', error: err });
        }

        const isFollowing = result[0].isFollowing > 0;
        res.json({ isFollowing });
    });
};




export const getOhterPost =(req, res) =>{
    const targetUserId = req.query.user_id;
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


    dbConnection.query(query, [userId, targetUserId,targetUserId], (error, results) => {
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