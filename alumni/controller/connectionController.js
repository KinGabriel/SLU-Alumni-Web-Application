/* 
Connections Controller: Manages user connections, including fetching and removing followers and following relationships in the SLU Alumni Web Application.
- connections: Retrieves and filters user connections based on the specified criteria (mutual connections, followers, following, or general connections).
    - Filters results using the `filter` query parameter (e.g., mutual, followers, following).
    - Allows search functionality by first name or last name via the `search` query parameter.
    - Supports sorting of results by name in ascending or descending order via the `sort` query parameter.
    - Executes a dynamic SQL query based on the specified filters and search criteria.
- removeFollowing: Removes a user from the following list (unfollows a user).
    - Ensures that the `followedId` parameter is provided and performs the deletion in the database.
    - Handles errors such as missing `followedId` and database failures.
- removeFollower: Removes a user from the follower list (unfollows the user).
    - Ensures that the `followerId` parameter is provided and performs the deletion in the database.
    - Handles errors such as missing `followerId` and database failures, along with checking if the follower exists before deletion.
Dependencies:
    - dbConnection: Manages MySQL database interactions to fetch, insert, and delete user connection data.
    - req.cookies: Used to retrieve the `user_id` from the request cookie for session management.
    - req.query: Handles dynamic query parameters for filtering, searching, and sorting.
    - req.params: Used for extracting user IDs from URL parameters.
  
Helper Functions:
    - None specified. Database operations are performed directly within the controller methods.
Error Handling:
    - Comprehensive error handling for database queries, missing query parameters, and invalid requests.
    - Returns appropriate HTTP status codes (200 for success, 400/500 for client/server errors).
    - Clear error messages are provided for missing or invalid parameters and query failures.
Group Member Responsible: Caparas, Joaquin Gabriel
*/



import dbConnection from '../../database/connection.js';
export const connections = (req, res) => {
    const userId = req.userId;
    const { search = '', filter, sort } = req.query;  
    let query = `
        SELECT DISTINCT u.user_id, CONCAT(u.fname, ' ', u.lname) AS name, u.pfp
        FROM user u
    `;
    let queryParams = [];
   
    // filter 
if (filter === 'followers') {
        query += `
              INNER JOIN 
            follows f1 
            ON u.user_id = f1.follower_id 
        INNER JOIN 
            follows f2 
            ON f1.follower_id = f2.followed_id 
        WHERE 
            f1.followed_id = ? 
            AND f1.is_requested = 0
       AND not u.user_id = ?
        `;
        queryParams = [userId,userId]; 
      
    } else if (filter === 'following') {
        query += `
        INNER JOIN follows f ON u.user_id = f.followed_id WHERE f.follower_id = ? AND f.is_requested = 0  AND not u.user_id = ?
        `;
        queryParams = [userId,userId];  
    } else if (filter === 'request') {
        query += `
            INNER JOIN 
            follows f1 
            ON u.user_id = f1.follower_id 
        INNER JOIN 
            follows f2 
            ON f1.follower_id = f2.followed_id 
        WHERE 
            f1.followed_id = ? 
            AND f1.is_requested = 1
            AND f2.is_requested = 0 AND not u.user_id = ?
    `;
    queryParams = [userId, userId];  
    } else {
        query += `
        INNER JOIN follows f1 ON u.user_id = f1.followed_id
        INNER JOIN follows f2 ON u.user_id = f2.follower_id
        WHERE f1.follower_id = ? AND f2.followed_id = ? AND f1.is_requested = 0 AND f2.is_requested = 0
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
    const userId = req.userId;
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
    const userId = req.userId;  
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
export const acceptFollower = (req, res) => {
    const userId = req.userId;  
    const followerId = req.params.user_id;  

    console.log("Accepting follower:", { userId, followerId });

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized. User ID is missing." });
    }

    if (!followerId) {
        return res.status(400).json({ error: "Follower ID is required." });
    }

    const query = `
        UPDATE follows 
        SET is_requested = 0
        WHERE follower_id = ? AND followed_id = ?
    `;
    
    dbConnection.query(query, [followerId, userId], (err, result) => {
        if (err) {
            console.error("Database error while accepting follower:", err);
            return res.status(500).json({ error: "A database error occurred while accepting a follower." });
        }

        // Check if any rows were updated
        if (result.affectedRows === 0) {
            console.warn("No follower found for the given IDs.");
            return res.status(404).json({ error: "Follower not found or already accepted." });
        }

        console.log("Follower successfully accepted:", { userId, followerId });
        return res.status(200).json({ message: "Follower successfully accepted." });
    });
};

