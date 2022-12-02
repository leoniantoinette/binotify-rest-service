# IF3110 Pengembangan Aplikasi Berbasis Web

> _This is a project done to fulfil one of IF3110's course assignment._

## Description Web Service

1. Mendapatkan data lagu-lagu penyanyi <br>
   Endpoint: /user/:user_id/songs
2. Mendapatkan data lagu tertentu <br>
   Endpoint: /user/:user_id/songs/:song_id
3. Update judul dan path audio <br>
   Endpoint: /user/:user_id/songs/:song_id
4. Update data song <br>
   Endpoint: /user/:user_id/songs/title/:song_id
5. Update audio path <br>
   Endpoint: /user/:user_id/songs/audio/:song_id
6. Membuat song baru <br>
   Endpoint: /user/:user_id/songs
7. Menghapus song <br>
   Endpoint: /user/:user_id/songs/:song_id
8. Mendapatkan list penyanyi <br>
   Endpoint: /api/list-penyanyi
9. Mendapatkan list lagu dari penyanyi <br>
   Endpoint: /api/list-lagu/user/:user_id/penyanyi/:penyanyi_id
10. Mendapatkan list subscription <br>
    Endpoint: /api/list-subscription
11. Approve subscription <br>
    Endpoint: /approve-subscription
12. Reject subscription <br>
    Endpoint: /reject-subscription
13. Melakukan login <br>
    Endpoint: /login
14. Register sebagai penyanyi <br>
    Endpoint: /registers

## Skema Basis Data

Terdapat 2 tabel basis data yang digunakan yaitu sebagai berikut:

1. Tabel song, yang terdiri atas atribut song_id, Judul, Audio_path, penyanyi_id
2. Tabel user, yang terdiri atas atribut user_id, email, password, username, name, isAdmin
   Berikut skema dari basis data yang digunakan :
   <img src="database/diagram.png"/>

## How To Install

1. Teks Editor yang kami sarankan adalah Visual Studio Code yang panduan download dan installnya dapat dilihat pada tautan berikut ini [vscode](https://www.belajarisme.com/tutorial/install-vscode/#:~:text=Sekarang%20mari%20kita%20install%20VSCode%20dengan%20cara%20berikut,Select%20Star%20Menu%20Folder%20klik%20Next.%20More%20items)
2. Panduan instalasi JavaScript dapat dilihat pada tautan berikut [JS](https://www.duniailkom.com/javascript-uncover-panduan-belajar-javascript-untuk-pemula/)
3. Panduan instalasi MySQL dapat dilihat pada tautan berikut [MySQL](https://www.duniailkom.com/tutorial-mysql-download-install-dan-setingan-awal-mysql/)

## How To Run

1. Clone repository ini
2. Buka terminal pada folder repository, lalu jalankan command `npm install`
3. Jalankan server dengan command `npm run dev`

## Authors

<table>
  <tr >
      <td><b>Backend Binotify Premium Fungsi Login Register</b></td>
      <td><b>Backend Binotify Premium Fungsi Check and Get Subscription</b></td>
        <td><b>Backend Binotify Premium Fungsi Approve and Reject Subscription</b></td>
        <td><b>Backend Binotify Premium Fungsi Get Song and User</b></td>
        <td><b>Backend Binotify Premium Endpoint Get List Penyanyi dan Song</b></td>
    </tr>
    <tr >
          <td>13520051, 13520140, 13520147</td> 
        <td>13520051, 13520140, 13520147</td> 
        <td>13520051, 13520140, 13520147</td> 
        <td>13520051, 13520140, 13520147</td> 
        <td>13520051, 13520140, 13520147</td> 
   </tr>
</table>
