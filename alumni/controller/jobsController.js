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
            case 'last24Hours':
                dateCondition = 'created_at >= NOW() - INTERVAL 1 DAY';
                break;
            case 'lastWeek':
                dateCondition = 'created_at >= NOW() - INTERVAL 1 WEEK';
                break;
            case 'lastMonth':
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
};
