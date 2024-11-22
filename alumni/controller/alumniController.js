import dbConnection from '../../database/connection.js';

export const getAlumni = (req, res) => {
    const userId = req.cookies.user_id;  
    if (!userId) {
        return res.status(400).send('User ID is missing in cookies!');
    }

    const query = 'SELECT * FROM alumni WHERE user_id = ?';
    dbConnection.query(query, [userId], (err, result) => {
        if (err) {
            console.error("Database error:", err);  
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Alumni not found' });
        }

        res.render('AlumniFeed', { AlumniFeed: result[0] });  
    });
};
