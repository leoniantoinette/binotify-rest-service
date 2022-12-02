-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Des 2022 pada 05.08
-- Versi server: 10.6.5-MariaDB
-- Versi PHP: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spotify_rest`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `song`
--

CREATE TABLE `song` (
  `song_id` int(11) NOT NULL,
  `Judul` varchar(64) NOT NULL,
  `Audio_path` varchar(256) NOT NULL,
  `penyanyi_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `song`
--

INSERT INTO `song` (`song_id`, `Judul`, `Audio_path`, `penyanyi_id`) VALUES
(24, 'Grow.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 10),
(25, 'List.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 1),
(26, 'Night see.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 12),
(27, 'White million.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 12),
(28, 'Know public.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 8),
(29, 'Until project.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 6),
(30, 'Reflect mission.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 12),
(31, 'Expect.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 20),
(32, 'Word.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 2),
(33, 'Service.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 12),
(34, 'Professor spring.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 9),
(35, 'Network kitchen.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 8),
(36, 'Model.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 1),
(37, 'Sign approach.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 18),
(38, 'Network.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 2),
(39, 'Cut political.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 3),
(40, 'Actually.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 9),
(41, 'Make.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 9),
(42, 'Teacher.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 8),
(43, 'Within.', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 10),
(44, 'song', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 62),
(45, 'yu', 'assets/Song/BLACKPINK - Ice Cream1.mp3', 62);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `username` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `isAdmin` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `username`, `name`, `isAdmin`) VALUES
(1, 'robert40@example.net', '$*6!cPCzVz', 'holly17', 'Sheri Garner', 0),
(2, 'naguilar@example.org', 'R&^1&9)nnA', 'medinaryan', 'Amanda Lin', 0),
(3, 'kelly08@example.com', 'q+!83iTzE3', 'tiffany63', 'Ann Chang', 0),
(4, 'perkinskathleen@example.net', 'u#1ZIX3dkU', 'dennisvillanueva', 'Jeffrey Smith', 0),
(5, 'pburton@example.org', '5X7NCH0k+h', 'pdeleon', 'Kathy Robbins', 0),
(6, 'pollardkim@example.net', '%RcIdeyK@7', 'brian43', 'Kelly Adams', 0),
(7, 'vlivingston@example.net', 'W#9Kmd3LHu', 'kyliejordan', 'Jeremy Sanchez', 0),
(8, 'whitneyvaughn@example.com', 'WJV0KQls&z', 'nathan15', 'Alice Schmidt', 0),
(9, 'michaelkelly@example.org', ')40FhLP)Mb', 'maryblair', 'Christopher Hicks', 0),
(10, 'kenneth25@example.net', '9AGZxes^+g', 'vhernandez', 'Michelle Yang', 0),
(11, 'jamesjudy@example.com', '%M+B1oZlp+', 'qdiaz', 'Donna Anderson', 0),
(12, 'owilson@example.com', '+3VlwZPzgi', 'lhanson', 'Regina Chandler', 0),
(13, 'robert06@example.com', '7aTB4gtl%v', 'michael51', 'Zachary Brown', 0),
(14, 'hthomas@example.org', '#Rh2Qj%yb!', 'gallegosdonna', 'Mr. Bradley Lara', 0),
(15, 'nicolemartinez@example.org', '&T5I0(r_78', 'robertking', 'Joanne Floyd', 0),
(16, 'smithmark@example.org', '_R%!0Bdpr&', 'davidmartinez', 'Steven Fox', 0),
(17, 'adamtaylor@example.org', 'hwPpn(ZI(5', 'janet54', 'Sandra Garcia', 0),
(18, 'qmccarty@example.org', ')U96WK5l+M', 'cummingsbrandy', 'Jonathan Hunt', 0),
(19, 'imiller@example.net', '+dRW)Aps^2', 'jordan17', 'Alyssa Perez', 0),
(20, 'archerkerri@example.net', '#@o0IaHCTj', 'icallahan', 'Patricia Hutchinson', 0),
(62, 'yola@gmail.com', '$2b$10$LAWFRMmt8/Dr66th5CaEIeBhu.sg4Eepj7szDAtghOeVFiBN6Pvnm', 'yola', 'yola', 0),
(63, 'freakyfun@gmail.com', '$2b$10$raWsdANWpue3MB6ez1lfiOMBd7RVqunxJNOp1mooOBt.o5c.chx9e', 'freakyfun', 'freaky fun', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`song_id`),
  ADD KEY `penyanyi_id_idx` (`penyanyi_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `song`
--
ALTER TABLE `song`
  MODIFY `song_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `song`
--
ALTER TABLE `song`
  ADD CONSTRAINT `penyanyi_id` FOREIGN KEY (`penyanyi_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
