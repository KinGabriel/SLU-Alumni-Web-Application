import dbConnection from '../../database/connection.js';

export const connections = (req, res) => {
    const userId = req.userId;
    const { search = '', filter, sort } = req.query;  
    let query = `
        SELECT u.user_id, CONCAT(u.fname, ' ', u.lname) AS name, u.pfp
        FROM user u
    `;
    let queryParams = [];

    // filter 
    if (filter === 'mutual') {
        query += `
            INNER JOIN follows f1 ON u.user_id = f1.followed_id
            INNER JOIN follows f2 ON u.user_id = f2.follower_id
            WHERE f1.follower_id = ? AND f2.followed_id = ?
        `;
        queryParams = [userId, userId];  
    } else if (filter === 'followers') {
        query += `
            INNER JOIN follows f ON u.user_id = f.follower_id
            WHERE f.followed_id = ?
        `;
        queryParams = [userId];  
    } else if (filter === 'following') {
        query += `
            INNER JOIN follows f ON u.user_id = f.followed_id
            WHERE f.follower_id = ?
        `;
        queryParams = [userId]; 
    } else {
        query += `
            INNER JOIN follows f1 ON u.user_id = f1.followed_id
            INNER JOIN follows f2 ON u.user_id = f2.follower_id
            WHERE f1.follower_id = ? AND f2.followed_id = ?
        `;
        queryParams = [userId, userId];  
    }

    // Apply search 
    if (search) {
        query += ` AND (u.fname LIKE ? OR u.lname LIKE ?)`;
        queryParams.push(`%${search}%`, `%${search}%`);
    }

    // Sorting 
    if (sort) {
        const [sortField, sortOrder] = sort.split('-');
        const validSortOrders = ['asc', 'desc'];

        //  sort order 
        if (validSortOrders.includes(sortOrder)) {
            query += ` ORDER BY name ${sortOrder.toUpperCase()}`;
        } else {
            query += ` ORDER BY name ASC`; 
        }
    } 

    // Execute the query
    dbConnection.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error fetching connections:', err);
            return res.status(500).json({ error: 'Database error occurred while fetching connections.' });
        }

        if (results.length > 0) {
            return res.status(200).json({
                message: 'Connections found.',
                data: results,
            });
        } else {
            return res.status(200).json({
                message: 'No connections found.',
                data: [],
            });
        }
    });
};

export const removeFollowing = (req, res) => {
    const userId = req.cookies.user_id;
      const followedId = req.params.user_id;  

    if (!followedId) {
        return res.status(400).json({ error: "followedId is required." });
    }

    const query = `
        DELETE FROM follows 
        WHERE follower_id = ? AND followed_id = ?
    `;
    
    dbConnection.query(query, [userId, followedId], (err, result) => {
        if (err) {
            console.error("Error removing following:", err);
            return res.status(500).json({ error: "Database error occurred while removing following." });
        }

        return res.status(200).json({ message: "Successfully removed following." });
    });
};


export const removeFollower = (req, res) => {
    const userId = req.cookies.user_id;  
    const followerId = req.params.user_id;  
    if (!followerId) {
        return res.status(400).json({ error: "followerId is required." });
    }

    const query = `
        DELETE FROM follows 
        WHERE follower_id = ? AND followed_id = ?
    `;
    
    dbConnection.query(query, [followerId, userId], (err, result) => {
        if (err) {
            console.error("Error removing follower:", err);
            return res.status(500).json({ error: "Database error occurred while removing follower." });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Follower not found." });
        }

        return res.status(200).json({ message: "Successfully removed follower." });
    });
};
