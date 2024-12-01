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
