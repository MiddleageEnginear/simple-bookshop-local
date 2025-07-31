# Basit Kitap Listesi Uygulaması (Simple Book List Application)

Bu proje, Node.js, Express.js ve SQLite kullanarak geliştirilmiş basit bir kitap listesi yönetimi uygulamasıdır. Kullanıcıların kitapları görüntülemesine, eklemesine, düzenlemesine ve silmesine olanak tanır. Bu proje, SAP BTP Staj Planı kapsamında yerel Node.js ve Express.js yetkinliklerini geliştirmek amacıyla oluşturulmuştur.

## Proje Özellikleri

* **Kitap Listeleme:** Mevcut tüm kitapları tablo şeklinde görüntüler.
* **Kitap Ekleme:** Yeni kitapları (Başlık, Yazar, Yıl) veritabanına ekler.
* **Kitap Düzenleme:** Mevcut bir kitabın bilgilerini günceller.
* **Kitap Silme:** Seçili bir kitabı veritabanından siler.
* **Veritabanı:** Geliştirme aşamasında dosya tabanlı SQLite veritabanı kullanır.
* **View Motoru:** Handlebars.js ile sunucu tarafında render edilen HTML sayfaları.

## Teknolojiler

* **Node.js**: Sunucu tarafı runtime ortamı.
* **Express.js**: Web uygulaması ve API geliştirmek için minimalist web framework.
* **SQLite3**: Basit ve hafif dosya tabanlı ilişkisel veritabanı.
* **Handlebars.js**: Sunucu tarafı şablonlama motoru.
* **Nodemon**: Geliştirme sırasında dosya değişikliklerini algılayıp sunucuyu otomatik yeniden başlatır.

## Kurulum

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1.  **Depoyu Klonlayın:**
    ```bash
    git clone [https://github.com/MiddleageEnginear/simple-bookshop-local.git](https://github.com/MiddleageEnginear/simple-bookshop-local.git)
    cd simple-bookshop-local
    ```

2.  **Bağımlılıkları Yükleyin:**
    Proje dizinine girdikten sonra, gerekli Node.js paketlerini yükleyin:
    ```bash
    npm install
    ```

## Çalıştırma

Projeyi geliştirmek modunda başlatmak için (nodemon ile otomatik yeniden başlatma):

```bash
npm run dev