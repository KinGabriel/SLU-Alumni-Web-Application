import dbConnection from '../../database/connection.js';
import fs from 'fs';

export const handleUserPost = (req, res) => {
    const userId = req.cookies.user_id;
    const { description, access_type, post_type, datetime } = req.body;

    const uploadedImages = req.files['images[]'] || [];
    const uploadedVideos = req.files['videos[]'] || [];
    const bannerFiles = [...uploadedImages, ...uploadedVideos];


    const banner = bannerFiles.map(file => file.path).join(',');

    console.log('Received data:', req.body);
    console.log('Uploaded files:', bannerFiles);

    const query = "INSERT INTO posts (description, banner, access_type, post_type, datetime, user_id) VALUES (?, ?, ?, ?, ?, ?)";
    dbConnection.query(query, [description, banner, access_type, post_type, datetime, userId], (err, result) => {
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
                if (Buffer.isBuffer(post.banner)) {
                    const bannerPath = post.banner.toString('utf-8').trim(); 
                    if (fs.existsSync(bannerPath)) {
                        post.banner = `data:image/jpeg;base64,${fs.readFileSync(bannerPath).toString('base64')}`;
                    } else {
                        post.banner = ''; 
                    }
                }
            }

            if (post.pfp) {
                if (Buffer.isBuffer(post.pfp)) {
                    post.pfp = `data:image/jpeg;base64,${post.pfp.toString('base64')}`;
                }
            }
            return post;
        });

        res.status(200).json({ posts });
    });
};

