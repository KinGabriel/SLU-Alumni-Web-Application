import dbConnection from '../../database/connection.js';

export const connections = (req, res) => {
    const userId = req.cookies.user_id;  
    const { search = '', filter, sort } = req.query;  

    console.log('Search:', search);
    console.log('Filter:', filter);
    console.log('Sort:', sort);

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
            console.log('Invalid sort order');
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
