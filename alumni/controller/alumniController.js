import dbConnection from '../../database/connection.js';
export const getAlumni = (req, res) => {
    //const userId = req.cookies.user_id;
    const userId = 44;
    if (!userId) {
        return res.status(400).send('Invalid Access');
    }

    const query = `
        SELECT 
            CONCAT(u.fname, ' ', u.lname) AS Name, 
            u.pfp,
            a.bio, 
            COUNT(DISTINCT f.follower_id) AS follower_count, 
            COUNT(DISTINCT f.followed_id) AS followed_count, 
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
            u.user_id, a.bio, u.fname, u.lname, u.pfp;
    `;

    dbConnection.query(query, [userId], (err, result) => {
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
};