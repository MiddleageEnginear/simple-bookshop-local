// simple-bookshop-local/app.js
const express = require('express');
const exphbs = require('express-handlebars');
const db = require('./database'); // Veritabanı bağlantısı
const app = express();
const PORT = process.env.PORT || 3000;

// Handlebars view motorunu yapılandır
app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main', // Tüm görünümlerin kullanacağı varsayılan layout
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', '.hbs');
app.set('views', './views'); // View dosyalarının olduğu dizin

// Middleware'ler
app.use(express.urlencoded({ extended: true })); // Form verilerini işlemek için
app.use(express.json()); // JSON verilerini işlemek için
app.use(express.static('public')); // Statik dosyalar (CSS, JS) için

// --- Rotalar (Routes) ---

// Ana Sayfa - Kitapları Listeleme
app.get('/', (req, res) => {
    db.all('SELECT * FROM books', [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.render('error', { message: 'Kitaplar yüklenirken bir hata oluştu.' });
            return;
        }
        res.render('home', { books: rows, title: 'Basit Kitap Listesi' });
    });
});

// Kitap Ekleme Sayfasını Göster
app.get('/add-book', (req, res) => {
    res.render('add-book', { title: 'Kitap Ekle' });
});

// Yeni Kitap Ekleme İşlemi
app.post('/add-book', (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author) {
        // Hata mesajı gösterilebilir veya form yeniden render edilebilir
        return res.render('add-book', {
            title: 'Kitap Ekle',
            error: 'Başlık ve Yazar alanları boş bırakılamaz.'
        });
    }
    db.run(`INSERT INTO books (title, author, year) VALUES (?, ?, ?)`, [title, author, year], function(err) {
        if (err) {
            console.error(err.message);
            return res.render('add-book', { title: 'Kitap Ekle', error: 'Kitap eklenirken bir hata oluştu.' });
        }
        console.log(`Yeni kitap eklendi, ID: ${this.lastID}`);
        res.redirect('/'); // Ana sayfaya yönlendir
    });
});

// Kitap Düzenleme Sayfasını Göster
app.get('/edit-book/:id', (req, res) => {
    const id = req.params.id;
    db.get(`SELECT * FROM books WHERE id = ?`, [id], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.render('error', { message: 'Kitap bulunamadı veya bir hata oluştu.' });
        }
        if (!row) {
            return res.render('error', { message: 'Düzenlenecek kitap bulunamadı.' });
        }
        res.render('edit-book', { book: row, title: 'Kitabı Düzenle' });
    });
});

// Kitap Düzenleme İşlemi
app.post('/edit-book/:id', (req, res) => {
    const id = req.params.id;
    const { title, author, year } = req.body;
    if (!title || !author) {
        return res.render('edit-book', {
            book: { id, title, author, year }, // Eski veriyi tekrar gönder
            title: 'Kitabı Düzenle',
            error: 'Başlık ve Yazar alanları boş bırakılamaz.'
        });
    }
    db.run(`UPDATE books SET title = ?, author = ?, year = ? WHERE id = ?`, [title, author, year, id], function(err) {
        if (err) {
            console.error(err.message);
            return res.render('edit-book', {
                book: { id, title, author, year },
                title: 'Kitabı Düzenle',
                error: 'Kitap güncellenirken bir hata oluştu.'
            });
        }
        console.log(`Kitap güncellendi, ID: ${id}`);
        res.redirect('/');
    });
});

// Kitap Silme İşlemi
app.post('/delete-book/:id', (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM books WHERE id = ?`, [id], function(err) {
        if (err) {
            console.error(err.message);
            return res.render('error', { message: 'Kitap silinirken bir hata oluştu.' });
        }
        console.log(`Kitap silindi, ID: ${id}`);
        res.redirect('/');
    });
});

// Sunucuyu Başlat
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});