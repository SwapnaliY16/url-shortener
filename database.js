import sqlite3 from 'sqlite3';

const db = new sqlite3.Database("./url_shortner.db", (err) => {
    if(err) {
        console.log("Error connecting to database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

// Create the URLs table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS urls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            long_url TEXT NOT NULL,
            short_url TEXT UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

export default db;