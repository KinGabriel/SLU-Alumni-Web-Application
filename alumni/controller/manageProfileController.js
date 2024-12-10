import dbConnection from '../../database/connection.js';

export const getProfileInfo = async (req,res) => {
    const userId = req.userId; 
    const query =`
        SELECT 
        u.fname,
        u.mname,
        u.lname,
        u.email,
        u.pfp,
        u.user_type,
        u.company,
        a.school_id,
        a.bio,
        a.school,
        a.program,
        a.gradyear
    FROM
        user u
            NATURAL JOIN
        alumni a
    WHERE
        u.user_id = ?
    `;

    dbConnection.query(query, [userId], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Failed to fetch posts.' });
        }

        const userInfo = results.map(user => {
            if (user.pfp) {
                user.pfp = `data:image/jpeg;base64,${user.pfp.toString('base64')}`;
            }
            user.is_liked = user.is_liked > 0; // Convert to boolean
            return user;
        });
        console.log(userInfo)
        res.status(200).json({ userInfo });
    });
}