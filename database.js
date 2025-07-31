// simple-bookshop-local/database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./books.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Veritabanı bağlantı hatası:', err.message);
    } else {
        console.log('books.db veritabanına başarıyla bağlandı.');
        db.run(`CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            year INTEGER
        )`, (err) => {
            if (err) {
                console.error('Tablo oluşturma hatası:', err.message);
            } else {
                console.log('Books tablosu oluşturuldu veya zaten mevcut.');
            }
        });
    }
});

module.exports = db;