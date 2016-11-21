-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2016 at 06:41 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dev-web`
--

-- --------------------------------------------------------

--
-- Table structure for table `bomons`
--

CREATE TABLE `bomons` (
  `tenBoMon` varchar(45) COLLATE utf8_vietnamese_ci NOT NULL,
  `moTa` text COLLATE utf8_vietnamese_ci,
  `KhoaId` varchar(45) COLLATE utf8_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chudelienquans`
--

CREATE TABLE `chudelienquans` (
  `moTa` text COLLATE utf8_vietnamese_ci,
  `ChuDeId` int(11) DEFAULT NULL,
  `GiangVienId` varchar(11) COLLATE utf8_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chudes`
--

CREATE TABLE `chudes` (
  `id` int(11) NOT NULL,
  `tenChuDe` varchar(255) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `LinhVucId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detais`
--

CREATE TABLE `detais` (
  `id` int(11) NOT NULL,
  `GiangVienId` varchar(11) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `SinhVienId` int(11) DEFAULT NULL,
  `tenDeTai` varchar(225) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `thoiGianNop` time DEFAULT NULL,
  `thoiGianSua` time DEFAULT NULL,
  `nopHoSoChua` int(1) DEFAULT NULL,
  `duocBaoVeKhong` int(1) DEFAULT NULL,
  `nopQuyenChua` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donvis`
--

CREATE TABLE `donvis` (
  `id` int(11) NOT NULL,
  `tenDonVi` varchar(255) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `KhoaId` varchar(45) COLLATE utf8_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `donvis`
--

INSERT INTO `donvis` (`id`, `tenDonVi`, `KhoaId`) VALUES
(1, 'Phòng Thí nghiệm Hệ thống Nhúng', 'fit'),
(2, 'Bộ môn Khoa học Máy tính', 'fit'),
(3, 'Bộ môn Các Hệ thống Thông tin', 'fit'),
(4, 'Bộ môn Truyền thông và Mạng máy tính', 'fit'),
(5, 'Bộ môn Khoa học và Kỹ thuật tính toán', 'fit'),
(6, 'Bộ môn Công nghệ Phần mềm', 'fit'),
(7, 'Bộ môn Các Hệ thống Thông tin', 'fit'),
(8, 'Phòng thí nghiệm Tương tác Người – Máy', 'fit'),
(9, 'Phòng Thí nghiệm An toàn thông tin', 'fit'),
(10, 'Phòng Thí nghiệm Hệ thống Nhúng', 'fit');

-- --------------------------------------------------------

--
-- Table structure for table `giangviens`
--

CREATE TABLE `giangviens` (
  `id` varchar(11) COLLATE utf8_vietnamese_ci NOT NULL,
  `tenGiangVien` varchar(100) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `vnuMail` varchar(45) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `matKhau` varchar(45) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `DonViId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `giangviens`
--

INSERT INTO `giangviens` (`id`, `tenGiangVien`, `vnuMail`, `matKhau`, `DonViId`) VALUES
('fit001', 'Bùi Ngọc Hải', 'haibn.uet@vnu.edu.vn', '12345', 1),
('fit002', 'Dư Phương Hạnh', 'hanhdp@vnu.edu.vn', '12345', 3),
('fit003', 'Dương Lê Minh', 'minhdl@vnu.edu.vn', '12345', 4),
('fit004', 'Hoàng Thị Ngọc Trang', 'tranghtn@vnu.edu.vn', '12345', 2),
('fit005', 'Hoàng Xuân Tùng', 'tunghx@vnu.edu.vn', '12345', 4),
('fit006', 'Hồ Đắc Phương', 'phuongd@vnu.edu.vn', '12345', 4),
('fit008', 'Lê Đình Thanh', 'thanhld@vnu.edu.vn', '12345', 9),
('fit009', 'Lê Thanh Hà', 'ltha@vnu.edu.vn', '12345', 8),
('fit010', 'Nguyễn Hoài Sơn', 'sonnh@vnu.edu.vn', '12345', 4),
('fit011', 'Nguyễn Hà Nam', 'namnh@vnu.edu.vn', '12345', 7),
('fit012', 'Hoàng Xuân Huấn', 'huanhx@vnu.edu.vn', '12345', 2),
('fit013', 'Nguyễn Hải Châu', 'chaunh@vnu.edu.vn', '12345', 7),
('fot007', 'Lê Phê Đô', 'dolp@vnu.edu.vn', '12345', 5);

-- --------------------------------------------------------

--
-- Table structure for table `khoahocs`
--

CREATE TABLE `khoahocs` (
  `kh` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL,
  `thoiGianBatDau` time DEFAULT NULL,
  `thoiGianKetThuc` time DEFAULT NULL,
  `moTa` text COLLATE utf8_vietnamese_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `khoas`
--

CREATE TABLE `khoas` (
  `id` varchar(15) COLLATE utf8_vietnamese_ci NOT NULL,
  `tenKhoa` varchar(100) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `vanPhongKhoa` varchar(15) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `taiKhoan` varchar(30) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `matKhau` varchar(30) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `moTa` text COLLATE utf8_vietnamese_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `khoas`
--

INSERT INTO `khoas` (`id`, `tenKhoa`, `vanPhongKhoa`, `taiKhoan`, `matKhau`, `moTa`) VALUES
('fet', 'Điện tử - viễn thông', '201-E3', 'fet2016', '12345', 'Điện tử - viễn thông'),
('fit', 'Công Nghệ Thông Tin', '304-E3', 'fit2016', '12345', 'Công Nghệ Thông Tin');

-- --------------------------------------------------------

--
-- Table structure for table `linhvuclienquans`
--

CREATE TABLE `linhvuclienquans` (
  `GiangVienId` varchar(11) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `LinhVucId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `linhvucs`
--

CREATE TABLE `linhvucs` (
  `id` int(11) NOT NULL,
  `tenLinhVuc` varchar(45) COLLATE utf8_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nganhhocs`
--

CREATE TABLE `nganhhocs` (
  `kh` varchar(15) COLLATE utf8_vietnamese_ci NOT NULL,
  `tenNganhHoc` varchar(100) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `moTa` text COLLATE utf8_vietnamese_ci,
  `KhoaId` varchar(45) COLLATE utf8_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `phanbiens`
--

CREATE TABLE `phanbiens` (
  `id` int(11) NOT NULL,
  `yKien` text COLLATE utf8_vietnamese_ci,
  `GiangVienId` varchar(11) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `DeTaiId` int(11) DEFAULT NULL,
  `diem` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `phongthinghiems`
--

CREATE TABLE `phongthinghiems` (
  `tenPhongThiNghiem` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL,
  `KhoaId` varchar(45) COLLATE utf8_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sinhviens`
--

CREATE TABLE `sinhviens` (
  `id` int(11) NOT NULL,
  `tenSinhVien` varchar(45) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `vnuMail` varchar(45) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `matKhau` varchar(45) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `duocDangKiKhoaLuanKhong` int(1) DEFAULT NULL,
  `KhoaHocKh` varchar(255) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `NganhHocKh` varchar(15) COLLATE utf8_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bomons`
--
ALTER TABLE `bomons`
  ADD PRIMARY KEY (`tenBoMon`),
  ADD KEY `KhoaId` (`KhoaId`);

--
-- Indexes for table `chudelienquans`
--
ALTER TABLE `chudelienquans`
  ADD KEY `ChuDeId` (`ChuDeId`),
  ADD KEY `GiangVienId` (`GiangVienId`);

--
-- Indexes for table `chudes`
--
ALTER TABLE `chudes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `LinhVucId` (`LinhVucId`);

--
-- Indexes for table `detais`
--
ALTER TABLE `detais`
  ADD PRIMARY KEY (`id`),
  ADD KEY `GiangVienId` (`GiangVienId`),
  ADD KEY `SinhVienId` (`SinhVienId`);

--
-- Indexes for table `donvis`
--
ALTER TABLE `donvis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `KhoaId` (`KhoaId`);

--
-- Indexes for table `giangviens`
--
ALTER TABLE `giangviens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `DonViId` (`DonViId`);

--
-- Indexes for table `khoahocs`
--
ALTER TABLE `khoahocs`
  ADD PRIMARY KEY (`kh`);

--
-- Indexes for table `khoas`
--
ALTER TABLE `khoas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `linhvuclienquans`
--
ALTER TABLE `linhvuclienquans`
  ADD KEY `GiangVienId` (`GiangVienId`),
  ADD KEY `LinhVucId` (`LinhVucId`);

--
-- Indexes for table `linhvucs`
--
ALTER TABLE `linhvucs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nganhhocs`
--
ALTER TABLE `nganhhocs`
  ADD PRIMARY KEY (`kh`),
  ADD KEY `KhoaId` (`KhoaId`);

--
-- Indexes for table `phanbiens`
--
ALTER TABLE `phanbiens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `GiangVienId` (`GiangVienId`),
  ADD KEY `DeTaiId` (`DeTaiId`);

--
-- Indexes for table `phongthinghiems`
--
ALTER TABLE `phongthinghiems`
  ADD PRIMARY KEY (`tenPhongThiNghiem`),
  ADD KEY `KhoaId` (`KhoaId`);

--
-- Indexes for table `sinhviens`
--
ALTER TABLE `sinhviens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `KhoaHocKh` (`KhoaHocKh`),
  ADD KEY `NganhHocKh` (`NganhHocKh`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chudes`
--
ALTER TABLE `chudes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `detais`
--
ALTER TABLE `detais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `donvis`
--
ALTER TABLE `donvis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `linhvucs`
--
ALTER TABLE `linhvucs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `phanbiens`
--
ALTER TABLE `phanbiens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `bomons`
--
ALTER TABLE `bomons`
  ADD CONSTRAINT `bomons_ibfk_1` FOREIGN KEY (`KhoaId`) REFERENCES `khoas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chudelienquans`
--
ALTER TABLE `chudelienquans`
  ADD CONSTRAINT `chudelienquans_ibfk_1` FOREIGN KEY (`ChuDeId`) REFERENCES `chudes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chudelienquans_ibfk_2` FOREIGN KEY (`GiangVienId`) REFERENCES `giangviens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chudes`
--
ALTER TABLE `chudes`
  ADD CONSTRAINT `chudes_ibfk_1` FOREIGN KEY (`LinhVucId`) REFERENCES `linhvucs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detais`
--
ALTER TABLE `detais`
  ADD CONSTRAINT `detais_ibfk_1` FOREIGN KEY (`GiangVienId`) REFERENCES `giangviens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detais_ibfk_2` FOREIGN KEY (`SinhVienId`) REFERENCES `sinhviens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `donvis`
--
ALTER TABLE `donvis`
  ADD CONSTRAINT `donvis_ibfk_1` FOREIGN KEY (`KhoaId`) REFERENCES `khoas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `giangviens`
--
ALTER TABLE `giangviens`
  ADD CONSTRAINT `giangviens_ibfk_1` FOREIGN KEY (`DonViId`) REFERENCES `donvis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `linhvuclienquans`
--
ALTER TABLE `linhvuclienquans`
  ADD CONSTRAINT `linhvuclienquans_ibfk_1` FOREIGN KEY (`GiangVienId`) REFERENCES `giangviens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `linhvuclienquans_ibfk_2` FOREIGN KEY (`LinhVucId`) REFERENCES `linhvucs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nganhhocs`
--
ALTER TABLE `nganhhocs`
  ADD CONSTRAINT `nganhhocs_ibfk_1` FOREIGN KEY (`KhoaId`) REFERENCES `khoas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `phanbiens`
--
ALTER TABLE `phanbiens`
  ADD CONSTRAINT `phanbiens_ibfk_1` FOREIGN KEY (`GiangVienId`) REFERENCES `giangviens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `phanbiens_ibfk_2` FOREIGN KEY (`DeTaiId`) REFERENCES `detais` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `phongthinghiems`
--
ALTER TABLE `phongthinghiems`
  ADD CONSTRAINT `phongthinghiems_ibfk_1` FOREIGN KEY (`KhoaId`) REFERENCES `khoas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sinhviens`
--
ALTER TABLE `sinhviens`
  ADD CONSTRAINT `sinhviens_ibfk_1` FOREIGN KEY (`KhoaHocKh`) REFERENCES `khoahocs` (`kh`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sinhviens_ibfk_2` FOREIGN KEY (`NganhHocKh`) REFERENCES `nganhhocs` (`kh`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
