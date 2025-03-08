import { nanoid } from "nanoid";
import db from './database.js';

// POST: Shorten a URL
export const shortenURL = (req, res) => {
    const { long_url } = req.body;
    if (!long_url) {
        return res.status(400).json({ error: "Missing 'long_url' in request."});
    }

    // Generate a 6-character unique ID
    const short_url = nanoid(6);

    db.run(
        'insert into urls (long_url, short_url) values (?,?)',
        [long_url, short_url],
        function (err) {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json( { error: 'Database error.' });
            }
            res.json({short_url: `http://localhost:3000/${short_url}`});
        }
    );
};

// GET: Redirect to the original URL
export const redirectURL = (req, res) => {
    const { short_url } = req.params;

    db.get('select long_url from urls where short_url = ?', [short_url],
    (err, row) => {
        if (err) {
            console.error('Database error:',err.message);
            return res.status(500).json({ error: 'Database error.' });
        }

        if (!row) {
            return res.status(404).json({ error: 'Short URL not found.' });
        }

        res.redirect(row.long_url);
    });
};