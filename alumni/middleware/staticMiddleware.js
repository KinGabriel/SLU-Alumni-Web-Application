/* 
Static Middleware: Serves static files for the SLU Alumni Web Application
- Configures the Express app to deliver static assets like images, CSS, JavaScript, and HTML files
- Maps specific routes to corresponding directories for organized asset management
- Serves static files from:
        - `/assets`: Contains application-specific assets (e.g., images, stylesheets)
        - `/view`: Hosts the application views (HTML files or templates)
        - `/node_modules`: Provides access to third-party library files during development
        - Default static files directory: Serves additional view files if not explicitly routed
- Uses the Node.js 'path' and 'url' modules for directory path resolution
- Ensures proper file serving for various application components
 Dependencies:
    - express (https://expressjs.com/)
    - path (built-in Node.js module)
    - url (built-in Node.js module)
Group Member Responsible: Caparas, Joaquin Gabriel
*/

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticMiddleware = (app) => {
    app.use('/assets', express.static(path.join(__dirname, '../assets')));
    app.use('/view', express.static(path.join(__dirname, '../view')));
    app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));
    app.use(express.static(path.join(__dirname, '../view')));
};

export default staticMiddleware;
