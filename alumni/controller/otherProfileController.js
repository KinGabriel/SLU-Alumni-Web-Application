import dbConnection from '../../database/connection.js';

export const getOtherUserInfo = (req, res) => {
    const userId = req.query.user_id; 
    const requesterId = req.user_id;

    console.log("Received user_id:", userId);

    const query = `
        SELECT 
            u.user_id,
            CONCAT(u.fname, ' ', u.lname) AS Name, 
            u.pfp,
            a.bio,
            (SELECT COUNT(*) FROM follows WHERE follower_id = u.user_id AND is_requested = 0) AS followed_count,  -- Exclude requested followers
            (SELECT COUNT(*) FROM follows WHERE followed_id = u.user_id AND is_requested = 0) AS follower_count,  -- Exclude requested followers
            (SELECT COUNT(*) FROM posts WHERE user_id = u.user_id) AS post_count,
            EXISTS (
                SELECT *
                FROM follows
                WHERE follower_id = ? AND followed_id = u.user_id
            ) AS is_follower,
            EXISTS (
                SELECT *
                FROM follows
                WHERE follower_id = ? AND followed_id = u.user_id AND is_requested = 1
            ) AS is_requested, 
            u.access_type
        FROM 
            user u
        LEFT JOIN 
            alumni a ON u.user_id = a.user_id
        WHERE 
            u.user_id = ?
    `;

    dbConnection.query(query, [requesterId, requesterId, userId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = result[0];

        const responseData = {
            name: user.Name,
            bio: user.bio,
            post_count: user.post_count,
            pfp: user.pfp ? 'data:image/jpeg;base64,' + Buffer.from(user.pfp).toString('base64') : '/assets/images/default-avatar-icon.jpg',
            access_type: user.access_type
        };
        if (user.is_requested === 0) {
            responseData.follower_count = user.follower_count;
            responseData.followed_count = user.followed_count;
        } else {
            responseData.follower_count = "Request Pending";
            responseData.followed_count = "Request Pending";
        }

        res.json(responseData);
    });
};


export const follow = (req, res) => {
    const targetUserId = req.query.user_id; 
    const user_id = req.userId; 

    const checkFollowQuery = `
        SELECT access_type FROM user
        WHERE user_id = ?
    `;

    dbConnection.query(checkFollowQuery, [targetUserId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPrivate = result[0].access_type === 'private';
        const checkExistingFollowQuery = `
            SELECT * FROM follows
            WHERE follower_id = ? AND followed_id = ?
        `;

        dbConnection.query(checkExistingFollowQuery, [user_id, targetUserId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (result.length > 0) {
                return res.status(400).json({ message: 'Follow request already exists or you are already following this user' });
            }

            const followQuery = `
                INSERT INTO follows (follower_id, followed_id, date_followed, is_requested)
                VALUES (?, ?, NOW(), ?)
            `;

            const isRequested = isPrivate ? 1 : 0; 

            dbConnection.query(followQuery, [user_id, targetUserId, isRequested], (err, result) => {
                if (err) {
                    console.error('Database Error:', err);
                    return res.status(500).json({ error: 'Error following user' });
                }

                const message = isRequested? 'Follow request sent successfully': 'User followed successfully';
                res.status(200).json({ message });
            });
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
        SELECT 
            COUNT(*) AS isFollowing,
            is_requested,
            u.access_type
        FROM follows f
        JOIN user u ON u.user_id = f.followed_id
        WHERE f.follower_id = ? AND f.followed_id = ? 
        GROUP BY f.followed_id
    `;

    dbConnection.query(checkFollowQuery, [user_id, targetUserId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error checking follow status', error: err });
        }

        if (result.length === 0) {
            const checkPrivacyQuery = `
                SELECT access_type 
                FROM user 
                WHERE user_id = ?
            `;
            dbConnection.query(checkPrivacyQuery, [targetUserId], (err, privacyResult) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ message: 'Error checking privacy status', error: err });
                }

                if (privacyResult.length === 0) {
                    return res.status(404).json({ message: 'Target user not found' });
                }

                const isPrivate = privacyResult[0].access_type === 'private';
                res.json({ isFollowing: false, isRequested: false, isPrivate });
            });
        } else {
            const isFollowing = result[0].isFollowing > 0 && result[0].is_requested === 0;
            const isRequested = result[0].is_requested === 1;
            const isPrivate = result[0].access_type === 'private';

            res.json({ isFollowing, isRequested, isPrivate });
        }
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
            (SELECT COUNT(*) FROM likes WHERE post_id = p.post_id AND user_id = ?) > 0 AS is_liked,
            f.is_requested
        FROM posts p
        LEFT JOIN likes l ON p.post_id = l.post_id
        LEFT JOIN comments c ON p.post_id = c.post_id
        JOIN user u ON u.user_id = p.user_id
        LEFT JOIN follows f ON f.follower_id = ? AND f.followed_id = u.user_id
        WHERE (
            (u.access_type = 'public') OR
            (u.access_type = 'private' AND (
                u.user_id = ? OR 
                (f.is_requested = 0 AND EXISTS (
                    SELECT 1
                    FROM follows
                    WHERE follower_id = ? AND followed_id = u.user_id
                ))
            ))
        ) AND p.user_id = ?
        GROUP BY 
            p.post_id
        ORDER BY p.post_id DESC
    `;

    dbConnection.query(query, [userId, userId, userId, userId, userId, targetUserId], (error, results) => {
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
            post.is_liked = post.is_liked > 0; 
            return post;
        });

        res.status(200).json({ posts });
    });
};

const handleMedia = (media) => {
    if (media.includes('image')) {
        return `data:image/jpeg;base64,${media.toString('base64')}`;
    } else if (media.includes('video')) {
        return `data:video/mp4;base64,${media.toString('base64')}`;
    } else {
        return '/assets/images/default-banner.jpg';
    }
};
