/* 
Other Profile Controller: Manages user-related interactions such as fetching user details, following, unfollowing, and checking follow status in the SLU Alumni Web Application.
- getOtherUserInfo: Retrieves detailed information about another user, including their name, bio, follower and followed counts, and post count.
    - Handles profile picture formatting and default fallback if no profile picture is available.
    - Returns data as a JSON response for use in the frontend.
- follow: Allows a user to follow another user, ensuring that duplicate follow actions are prevented.
    - Verifies if the user is already following the target user before performing the follow action.
    - Uses database queries to update the `follows` table and responds with a success or failure message.
- unfollow: Allows a user to unfollow another user, checking if the user is actually following the target before attempting to delete the follow relationship.
    - Deletes the entry in the `follows` table and provides feedback on whether the unfollow action was successful.
- isFollowing: Checks if a user is already following another user by querying the `follows` table.
    - Returns a boolean value indicating the follow status.
Group Member Responsible: Caparas, Joaquin Gabriel
*/


import dbConnection from '../../database/connection.js';
import fs from 'fs';
import path from 'path';

export const getOtherUserInfo = (req, res) => {
    const userId = req.query.user_id; // Target user ID
    const requesterId = req.session.user_id; // Current logged-in user ID (from session)

    console.log("Received user_id:", userId);

    // SQL query to check privacy settings and fetch details
    const query = `
        SELECT 
            u.user_id,
            CONCAT(u.fname, ' ', u.lname) AS Name, 
            u.pfp,
            a.bio,
            (SELECT COUNT(*) FROM follows WHERE follower_id = u.user_id) AS followed_count,
            (SELECT COUNT(*) FROM follows WHERE followed_id = u.user_id) AS follower_count,
            (SELECT COUNT(*) FROM posts WHERE user_id = u.user_id) AS post_count,
            EXISTS (
                SELECT 1
                FROM follows
                WHERE follower_id = ? AND followed_id = u.user_id
            ) AS is_follower,
            u.access_type
        FROM 
            user u
        LEFT JOIN 
            alumni a ON u.user_id = a.user_id
        WHERE 
            u.user_id = ?
    `;

    dbConnection.query(query, [requesterId, userId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = result[0];

        if (user.is_private && !user.is_follower && userId !== requesterId) {
            return res.status(403).json({ message: 'This account is private.' });
        }

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
};


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

export const getOtherPost = (req, res) => {
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
            u.access_type,
            EXISTS (
                SELECT 1
                FROM follows
                WHERE follower_id = ? AND followed_id = u.user_id
            ) AS is_follower,
            (SELECT COUNT(*) FROM likes WHERE post_id = p.post_id AND user_id = ?) > 0 AS is_liked
        FROM posts p
        LEFT JOIN likes l ON p.post_id = l.post_id
        LEFT JOIN comments c ON p.post_id = c.post_id
        JOIN user u ON u.user_id = p.user_id
        WHERE (
            (u.access_type = 'public') OR
            (u.access_type = 'private' AND (
                u.user_id = ? OR EXISTS (
                    SELECT 1
                    FROM follows
                    WHERE follower_id = ? AND followed_id = u.user_id
                )
            ))
        ) AND p.user_id = ?
        GROUP BY 
            p.post_id
        ORDER BY p.post_id DESC
    `;

    dbConnection.query(query, [userId, userId, userId, userId, targetUserId], (error, results) => {
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