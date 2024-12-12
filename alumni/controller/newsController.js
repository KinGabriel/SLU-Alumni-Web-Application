import dbConnection from '../../database/connection.js';

export const getNews = async (req, res) => {
    try {
      const [rows] = await dbConnection.execute(
        'SELECT news_id, photo, title, description, datetime FROM news ORDER BY datetime DESC'
      );
  
      const news = rows.map((row) => {
        return {
          news_id: row.news_id,
          photo: row.photo ? Buffer.from(row.photo).toString('base64') : null,
          title: row.title ? row.title : '',
          description: row.description ? row.description : '', 
          datetime: row.datetime,
        };
      });
      res.json({ status: 'success', news });
    } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  };