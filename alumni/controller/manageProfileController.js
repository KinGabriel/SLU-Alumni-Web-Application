import dbConnection from '../../database/connection.js';
import bcrypt from 'bcryptjs';

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
export const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const query = 'SELECT * FROM user WHERE user_id = ?';
        dbConnection.query(query, [req.userId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            
            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            const user = results[0]; 

            // Check if current password matches the one in the database
            bcrypt.compare(currentPassword, user.pword, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ error: 'Error comparing password' });
                }

                if (!isMatch) {
                    return res.status(400).json({ error: 'Current password is incorrect' });
                }

                // Hash the new password before saving it
                const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

                // Update password in the database
                const updateQuery = 'UPDATE user SET pword = ? WHERE user_id = ?';
                dbConnection.query(updateQuery, [hashedNewPassword, req.userId], (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to update password' });
                    }

                    return res.status(200).json({ message: 'Password updated successfully' });
                });
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};