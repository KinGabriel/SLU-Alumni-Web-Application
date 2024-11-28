import dbConnection from '../../database/connection.js';
export const getAlumni = (req, res) => {
    const userId = req.cookies.user_id
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

export const handleLogout = (req,res) =>{
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('An error occurred while logging out.');
        }
        res.clearCookie('user_id');
        res.redirect('http://localhost/SLU-Alumni-Web-Application/LogInAndRegister/view/Login.php');
    });
}

export const handleUserPost = (req, res) => {
    const userId = req.cookies.user_id;
    const { description, banner, access_type, post_type,datetime} = req.body;
    console.log('Received data:', req.body);
    const query = "INSERT INTO posts (description, banner, access_type, post_type,datetime,user_id) VALUES (?, ?, ?, ?,?, ?)";
    dbConnection.query(query, [description, banner, access_type, post_type,datetime, userId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error creating post', error: err });
        }
        return res.status(200).json({ message: 'Post created successfully' });
    });
};

export const getPost = (req, res) => {
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
        CONCAT(u.fname, ' ', u.lname) AS name
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
        )
    GROUP BY 
        p.post_id,
        p.description,
        p.banner,
        p.is_deleted,
        p.access_type,
        p.post_type,
        u.user_id,
        u.fname,
        u.lname
    ORDER BY p.post_id DESC;
    `;

    dbConnection.query(query, [userId, userId], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Failed to fetch posts.' });
        }

        const posts = results.map(post => {
            if (post.banner) {
                post.banner = `data:image/jpeg;base64,${post.banner.toString('base64')}`;
            }
            if (post.pfp){
                post.pfp = `data:image/jpeg;base64,${post.pfp.toString('base64')}`;
            }
            return post;
        });


        res.status(200).json({ posts });
    });
};
