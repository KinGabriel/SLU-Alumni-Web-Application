import dbConnection from '../../database/connection.js';

export const getJobs = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const itemsPerPage = 6;  
    const offset = (page - 1) * itemsPerPage; 
  
    const filter = req.query.filter || 'all';  
  
    let query = 'SELECT job_title, employment_type, company_name, address, image_data FROM opportunity';
    if (filter !== 'all') {
      query += ` WHERE employment_type = '${filter}'`;
    }
    query += ` ORDER BY created_at DESC LIMIT ${itemsPerPage} OFFSET ${offset}`;
  
    dbConnection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: err.message });
      }
  
      const opportunity = result.map(row => {
        const imageData = row.image_data ? Buffer.from(row.image_data).toString('base64') : null;
        return {
          job_title: row.job_title,
          image_data: imageData ? 'data:image/jpeg;base64,' + Buffer.from(imageData).toString('base64') : '/assets/images/default-avatar-icon.jpg',
          employment_type: row.employment_type,
          company_name: row.company_name,
          address: row.address
        };
      });
  
      res.json({ status: 'success', opportunity: opportunity.length ? opportunity : [] });
    });
};
