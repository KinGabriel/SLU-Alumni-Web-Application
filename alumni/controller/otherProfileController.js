import dbConnection from '../../database/connection.js';

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
