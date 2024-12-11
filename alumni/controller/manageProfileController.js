import dbConnection from '../../database/connection.js';

export const getProfileInfo = async (req, res) => {
    const userId = req.userId;

    const query = `
        SELECT 
            u.fname,
            u.mname,
            u.lname,
            u.email,
            u.pfp,
            u.access_type,
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

    try {
        dbConnection.query(query, [userId], (error, results) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({ error: 'Failed to fetch profile information.' });
            }
            const userInfo = results.map(user => {
                if (user.pfp) {
                    user.pfp = `data:image/jpeg;base64,${user.pfp.toString('base64')}`;
                }
                return user;
            });

            res.status(200).json({ userInfo });
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
};

export const updateProfile = async (req, res) => {

}