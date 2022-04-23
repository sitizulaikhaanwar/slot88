# Cara Menjalankan Node JS di Shared Hosting

Ada kalanya seseorang ingin menjalankan server node js di shared hosting yang sama sekali tidak ada fitur node js nya. Bisakah server tersebut dibuat untuk menjalankan node js?

## BISA!

Kita bisa menjalankan aplikasi node js di server hosting. Yang penting di hosting tersebut terdapat akses SSH. Silahkan cek apakah paket shared hostingmu tersedia fitur SSH atau nggak :)

Saya akan mencoba melakukan 5 hal berikut ini kepada server hosting saya:

1. Membuat sub domain (karena domain utama saya sudah terpakai)
2. Menginstall node js via NVM lewat ssh
3. Membuat project node js sederhana
4. Upload project node js ke folder sub domain
5. Menjalankan node js di sub domain tersebut sebagai server pengganti server hosting

Oke, mari kita mulai untuk menjalankan node di shared hosting.

1. Masuk ke halaman sub domain hosting/cpanel untuk membuat sub domain beserta folder baru untuk sub domain tersebut
2. Buka SSH hosting
3. Install NVM dengan memasukan perintah berikut di SSH

```
$ curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh -o install_nvm.sh
$ bash install_nvm.sh
$ export NVM_DIR="$HOME/.nvm"
$ [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
$ nvm install 13.5.0
```
4. Node js dan npm telah berhasil diinstall
5. Buat sebuah file node js sederhana lalu upload di subdomain yang telah dibuat tadi.
6. Buat file dengan nama .htaccess yang berisi:

```
Options +FollowSymLinks -Indexes
IndexIgnore *
DirectoryIndex
<IfModule mod_rewrite.c>
RewriteEngine on
# Simple URL redirect:
RewriteRule ^(.*)$ http://127.0.0.1:PORT/$1 [P]
</IfModule>
```

7. Ganti PORT sesuai dengan di port berapa kamu menjalankan node jsnya.
8. Install "forever" package di npm. Package ini memungkinkan kita untuk menjalankan perintah node terus menerus walaupun ssh sudah ditutup. Install dengan memasukan perintah berikut di SSH

```
npm install -g forever
```

10. Jalankan file node js dengan menjalankan perintah berikut di ssh

```
$ cd (file sub domain)
$ forever start index.js
```

Dan taraa... Situs telah berjalan.

Agar lebih jelas, silahkan menyimak video berikut ini :

[![run node di hosting](https://i.ibb.co/99Y0Jzn/yt.jpg)](https://youtu.be/SWBWHBwMyP0)
