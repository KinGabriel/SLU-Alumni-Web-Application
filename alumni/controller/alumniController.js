/* 
Alumni Controller: Handles the retrieval of alumni information, user search functionality, and logout process for the SLU Alumni Web Application.
- getAlumni: Fetches the profile information of the logged-in user, including their name, profile picture (pfp), bio, follower count, followed count, and post count.
    - Uses SQL JOIN queries to gather data from multiple tables (user, alumni, follows, posts) and returns the data in a formatted response.
    - If the user has a profile picture, it is encoded in base64 for inline display. If not, a default image is used.
- searchUsers: Allows searching for users by name (first and last name).
    - Performs a LIKE query to match user names based on the search term provided by the user.
    - Returns a list of matching users, or an appropriate error message if no users are found.
    - Handles errors using try-catch to ensure server-side errors are logged and appropriately returned.
- handleLogout: Handles the user logout process.
    - Destroys the current session and clears the user’s cookie.
    - Redirects the user to the login page after a successful logout.
    - Logs an error message if there is an issue destroying the session.
Dependencies:
    - dbConnection: Handles MySQL database queries and interactions.
    - req.session: Utilized for session management to store and retrieve user-related data.
Error Handling:
    - Logs database and session errors with detailed messages for easier debugging.
    - Ensures the appropriate HTTP status codes (200, 400, 404, 500) are returned along with meaningful error messages when needed.
Group Member Responsible: Caparas, Joaquin Gabriel
*/

import dbConnection from '../../database/connection.js';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();
export const getAlumni = (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(400).send('Invalid Access');
    }

    const query = `
        SELECT 
            u.user_id,
            CONCAT(u.fname, ' ', u.lname) AS Name, 
            u.pfp,
            a.bio, 
            u.company,
            u.access_type,
            COUNT(DISTINCT CASE WHEN f.follower_id = ? AND f.is_requested = 0 THEN f.followed_id END) AS followed_count, 
            COUNT(DISTINCT CASE WHEN f.followed_id = ? AND f.is_requested = 0 THEN f.follower_id END) AS follower_count, 
            COUNT(DISTINCT p.post_id) AS post_count,
            EXISTS (
                SELECT * 
                FROM follows 
                WHERE follower_id = ? AND followed_id = u.user_id AND is_requested = 1
            ) AS is_requested
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

    dbConnection.query(query, [userId, userId, userId, userId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Invalid Access' });
        }

        const user = result[0];

        const responseData = {
            name: user.Name,
            bio: user.bio,
            post_count: user.post_count,
            pfp: user.pfp ? 'data:image/jpeg;base64,' + Buffer.from(user.pfp).toString('base64') : '/assets/images/default-avatar-icon.jpg',
            access_type: user.access_type,
            company: user.company
        };
        if (user.is_requested === 0) {
            responseData.follower_count = user.follower_count;
            responseData.followed_count = user.followed_count;
        } 
        res.json(responseData);
    });
};

export const searchUsers = async (req, res) => {
    const searchTerm = req.query.query || "";  
    const userId = req.userId;
    const userType = 'alumni'
    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });  
    }

    try {
        const query = `SELECT user_id, CONCAT(fname, ' ', lname) AS name 
                       FROM user 
                       WHERE CONCAT(fname, ' ', lname) LIKE ? AND NOT user_id = ?  AND  user_type = ? `;


        const [users] = await dbConnection.promise().query(query, [`%${searchTerm}%`,userId,userType]);

        // If no users were found
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        // Return the users as JSON
        res.json({ users });
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ error: 'Internal server error' });  // Handle any server errors
    }
};


export const handleLogout = (req,res) =>{
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('An error occurred while logging out.');
        }
        res.clearCookie('user_id');
        res.redirect(`http://${process.env.HOST || 'localhost'}/SLU-Alumni-Web-Application/LogInAndRegister/view/Login.php`);
    });
}

