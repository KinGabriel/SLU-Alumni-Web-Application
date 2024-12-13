import dbConnection from '../../database/connection.js';

export const getEvents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 6; 
        const filter = req.query.filter || 'all'; 
        const offset = (page - 1) * limit;
        let whereClause = '';
        let queryParams = [];

        if (filter === 'upcoming') {
            whereClause = 'WHERE start_date > NOW()'; 
        } else if (filter === 'ended') {
            whereClause = 'WHERE start_date < NOW()'; 
        }
        const [totalResult] = await dbConnection.promise().query(
            `SELECT COUNT(*) AS totalCount FROM event ${whereClause}`,
            queryParams
        );
        const totalCount = totalResult[0].totalCount;
        const [events] = await dbConnection.promise().query(
            `SELECT event_id, event_title, event_description, start_date,start_time, image_data
             FROM event ${whereClause}
             ORDER BY start_time DESC
             LIMIT ? OFFSET ?`,
            [...queryParams, limit, offset]
        );

        const processedEvents = events.map(event => {
            if (event.image_data) {
                event.image_data = `data:image/jpeg;base64,${event.image_data.toString('base64')}`;
            }
            return event;
        });
        
        res.json({
            status: 'success',
            events: processedEvents,
            totalCount
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while fetching events.'
        });
    }
};
