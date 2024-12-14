import dbConnection from '../../database/connection.js';

export const getJobs = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const itemsPerPage = 6; 
    const offset = (page - 1) * itemsPerPage;  

    const jobType = req.query.jobType || 'all';  
    const datePosted = req.query.datePosted || 'all'; 
    const searchQuery = req.query.search || '';  

    let query = 'SELECT opportunity_id, job_title, employment_type, company_name, address, image_data, created_at FROM opportunity';
    let filters = [];  
    let values = [];   

    // Add filters
    if (jobType !== 'all') {
        filters.push(`employment_type = ?`);
        values.push(jobType);
    }

    if (datePosted !== 'all') {
        let dateCondition;
        switch (datePosted) {
            case 'today':
                dateCondition = 'created_at >= NOW() - INTERVAL 1 DAY';
                break;
            case 'this-week':
                dateCondition = 'created_at >= NOW() - INTERVAL 1 WEEK';
                break;
            case 'this-month':
                dateCondition = 'created_at >= NOW() - INTERVAL 1 MONTH';
                break;
            default:
                dateCondition = null;
                break;
        }
        if (dateCondition) filters.push(dateCondition);
    }

    if (searchQuery) {
        filters.push(`(job_title LIKE ? OR company_name LIKE ?)`);
        values.push(`%${searchQuery}%`, `%${searchQuery}%`);
    }

    if (filters.length > 0) {
        query += ' WHERE ' + filters.join(' AND ');
    }

    // Query for job listings
    const jobQuery = `${query} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    values.push(itemsPerPage, offset);

    // Query to count total jobs matching the filters
    const countQuery = `${query.replace('SELECT opportunity_id, job_title, employment_type, company_name, address, image_data, created_at', 'SELECT COUNT(*) AS totalJobs')}`;

    try {
        //total number of matching jobs
        dbConnection.query(countQuery, values, (err, countResult) => {
            if (err) {
                return res.status(500).json({ status: 'error', message: err.message });
            }

            const totalJobs = countResult[0].totalJobs;
            const totalPages = Math.ceil(totalJobs / itemsPerPage);

            // get the job opportunities
            dbConnection.query(jobQuery, values, (err, jobResult) => {
                if (err) {
                    return res.status(500).json({ status: 'error', message: err.message });
                }

                const opportunity = jobResult.map(row => {
                    const imageData = row.image_data ? Buffer.from(row.image_data).toString('base64') : null;
                    return {
                        opportunity_id: row.opportunity_id,
                        job_title: row.job_title,
                        image_data: imageData ? 'data:image/jpeg;base64,' + imageData : '/assets/images/default-avatar-icon.jpg', 
                        employment_type: row.employment_type,
                        company_name: row.company_name,
                        address: row.address
                    };
                });

                res.json({ 
                    status: 'success', 
                    opportunity: opportunity.length ? opportunity : [], 
                    totalPages: totalPages, 
                    currentPage: page 
                });
            });
        });
    } catch (err) {
        return res.status(500).json({ status: 'error', message: err.message });
    }
}
export const getJobsDetails = (req, res) => {
    const { jobs_id } = req.params;

    if (!jobs_id) {
        return res.status(400).json({ error: 'Missing jobs_id parameter.' });
    }

    const query = 'SELECT * FROM opportunity WHERE opportunity_id = ?';
    
    dbConnection.query(query, [jobs_id], (err, rows) => {
        if (err) {
            console.error('Database query failed:', err);
            return res.status(500).json({ error: 'An error occurred while fetching job details.' });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Opportunity not found.' });
        }

        const jobDetails = rows[0];

        if (jobDetails.image_data) {
            const imageData = Buffer.from(jobDetails.image_data).toString('base64');
            jobDetails.image_data = `data:image/jpeg;base64,${imageData}`;
        }

        res.status(200).json({ data: jobDetails });
    });
};


