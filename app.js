import express from 'express';
import bodyParser from 'body-parser';
import { shortenURL, redirectURL } from './urlRoutes.js';

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(bodyParser.json());

// URL Shortening and Redirection Routes
app.post('/shorten', shortenURL);
app.get('/:short_url', redirectURL);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});