import dbConnection from '../../database/connection.js'; 
export const getNews = (req, res) => {
    const page = parseInt(req.query.page) || 1;  
    const limit = 6;  
    const offset = (page - 1) * limit;  
    const query = `SELECT news_id, photo, title, description, datetime FROM news ORDER BY datetime DESC LIMIT ? OFFSET ?`;
    
    dbConnection.query(query, [limit, offset], (err, results) => {
        if (err) {
            console.error('Error fetching news:', err);
            return res.status(500).json({ status: 'error', message: 'An error occurred while fetching news.' });
        }
    
        const Photo = results.map(news => {
            const photo = news.photo
                ? 'data:image/jpeg;base64,' + Buffer.from(news.photo).toString('base64') 
                : '/assets/images/default-image.jpg'; 
            return { ...news, photo };
        });
    
        const countQuery = 'SELECT COUNT(*) AS total FROM news';
        dbConnection.query(countQuery, (err, countResults) => {
            if (err) {
                console.error('Error fetching news count:', err);
                return res.status(500).json({ status: 'error', message: 'An error occurred while fetching news count.' });
            }
    
            const totalItems = countResults[0].total;
            const totalPages = Math.ceil(totalItems / limit);
    
            res.status(200).json({
                status: 'success',
                news: Photo,
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalItems: totalItems,
                },
            });
        });
    });
};
export const getNewsDetails = (req, res) => {
  const { news_id } = req.params;

  const query = `SELECT news_id, photo, title, description, datetime FROM news WHERE news_id = ?`;

  dbConnection.query(query, [news_id], (err, results) => {
      if (err) {
          console.error('Error fetching news details:', err);
          return res.status(500).json({ status: 'error', message: 'An error occurred while fetching news details.' });
      }

      if (results.length === 0) {
          return res.status(404).json({ status: 'error', message: 'News not found.' });
      }

      const news = results[0];
      news.photo = news.photo ? 'data:image/jpeg;base64,' + Buffer.from(news.photo).toString('base64') : '/assets/images/default-image.jpg'; // Default image if no photo

      res.status(200).json({
          status: 'success',
          news,
      });
  });
};
