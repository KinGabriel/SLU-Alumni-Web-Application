import dbConnection from '../../database/connection.js'; 
export const getNews = (req, res) => {
  const query = `SELECT news_id, photo, title, description, datetime FROM news ORDER BY datetime DESC`;

  dbConnection.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching news:', err);
          return res.status(500).json({ status: 'error', message: 'An error occurred while fetching news.' });
      }

      const Photo = results.map(news => {
          const photo = news.photo
              ? 'data:image/jpeg;base64,' + Buffer.from(news.photo).toString('base64') : '/assets/images/default-image.jpg'; 
          return { ...news, photo };
      });

      res.status(200).json({
          status: 'success',
          news: Photo,
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

      // Convert photo field to Base64 (if it's not already in Base64 format)
      news.photo = news.photo ? 'data:image/jpeg;base64,' + Buffer.from(news.photo).toString('base64') : '/assets/images/default-image.jpg'; // Default image if no photo

      res.status(200).json({
          status: 'success',
          news,
      });
  });
};
