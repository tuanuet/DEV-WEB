-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2016 at 11:31 AM
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
-- Table structure for table `detais`
--

CREATE TABLE `detais` (
  `id` int(11) NOT NULL,
  `GiangVienId` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `SinhVienId` int(11) DEFAULT NULL,
  `tenDeTai` varchar(225) COLLATE utf8_unicode_ci DEFAULT NULL,
  `thoiGianNop` datetime DEFAULT NULL,
  `thoiGianSua` datetime DEFAULT NULL,
  `nopHoSoChua` int(1) DEFAULT NULL,
  `duocBaoVeKhong` int(1) DEFAULT NULL,
  `nopQuyenChua` int(1) DEFAULT NULL,
  `duocGiangVienChapNhan` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `detais`
--

INSERT INTO `detais` (`id`, `GiangVienId`, `SinhVienId`, `tenDeTai`, `thoiGianNop`, `thoiGianSua`, `nopHoSoChua`, `duocBaoVeKhong`, `nopQuyenChua`, `duocGiangVienChapNhan`) VALUES
(27, 'fit001', 11020118, 'aaaaaaaaaaaaaaaa', NULL, NULL, 1, 1, 0, 1),
(28, 'fit003', 12020125, 'aaaaaaaaaab', NULL, NULL, 1, 1, 0, 1),
(29, 'fit003', 12020215, 'aaaaaaaaaaaaabb', NULL, NULL, 1, 1, 0, 1),
(31, 'fit002', 13020113, 'aaaaaaaaaaaabbbb', NULL, NULL, 1, 1, 0, 1),
(33, 'fit003', 13020159, 'abbbbbbbbbbbbbbbbbbbbbbbbbbbbb', NULL, NULL, 1, 1, 0, 1),
(34, 'fit005', 14020162, 'âbaba', NULL, NULL, 1, 1, 0, 1),
(37, 'fit003', 14020521, 'qfasfas', NULL, NULL, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `donvis`
--

CREATE TABLE `donvis` (
  `id` int(11) NOT NULL,
  `tenDonVi` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `KhoaId` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `donvis`
--

INSERT INTO `donvis` (`id`, `tenDonVi`, `KhoaId`) VALUES
(1, 'Bộ môn Công nghệ phần mềm', 'fit'),
(2, 'Bộ môn Các Hệ thống Thông tin', 'fit'),
(3, 'Bộ môn Khoa học Máy tính', 'fit'),
(4, 'Bộ môn Khoa học và Kỹ thuật tính toán', 'fit'),
(5, 'Bộ môn Mạng và Truyền thông Máy tính', 'fit'),
(6, 'Phòng Thí nghiệm An toàn thông tin', 'fit'),
(7, 'Phòng Thí nghiệm Công nghệ Tri thức', 'fit'),
(8, 'Phòng Thí nghiệm Hệ thống Nhúng', 'fit'),
(9, 'Phòng Thí nghiệm Tương tác Người – Máy', 'fit'),
(10, 'Bộ môn Điện tử và Kỹ thuật Máy tính', 'fet'),
(11, 'Bộ môn Hệ thống Viễn thông', 'fet'),
(12, 'Bộ môn Thông tin Vô tuyến', 'fet'),
(13, 'Bộ môn Vi cơ Điện tử và Vi hệ thống', 'fet'),
(14, 'Phòng thí nghiệm Tín hiệu và Hệ thống', 'fet'),
(15, 'Bộ môn Công nghệ quang tử', 'fepn'),
(16, 'Bộ môn Vật liệu và linh kiện từ tính nano', 'fepn'),
(17, 'Bộ môn Vật liệu và linh kiện bán dẫn nano', 'fepn'),
(18, 'Bộ môn Công nghệ nano sinh học', 'fepn'),
(19, 'Phòng Thí nghiệm Công nghệ quang tử', 'fepn'),
(20, 'Phòng Thí nghiệm Vật liệu và linh kiện lai nano', 'fepn'),
(21, 'Phòng Thí nghiệm của Bộ môn Vật liệu và linh kiện từ tính nano', 'fepn'),
(22, 'Bộ môn Thủy Khí Công nghiệp và Môi trường', 'fema'),
(23, 'Bộ môn Công nghệ Biển và Môi trường', 'fema'),
(24, 'Bộ môn Công nghệ Hàng không vũ trụ', 'fema'),
(25, 'Bộ môn Công nghệ Cơ điện tử', 'fema'),
(26, 'Phòng thí nghiệm Công nghệ Cơ điện tử và Thủy tin học', 'fema');

-- --------------------------------------------------------

--
-- Table structure for table `giangviens`
--

CREATE TABLE `giangviens` (
  `id` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `tenGiangVien` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `vnuMail` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `matKhau` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DonViId` int(11) DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `chuDeHuongNghienCuu` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `giangviens`
--

INSERT INTO `giangviens` (`id`, `tenGiangVien`, `vnuMail`, `matKhau`, `DonViId`, `avatar`, `chuDeHuongNghienCuu`) VALUES
('fit001', 'Bùi Ngọc Hải', 'haibn.uet@vnu.edu.vn', '12345', 1, NULL, NULL),
('fit002', 'Dư Phương Hạnh', 'hanhdp@vnu.edu.vn', '12345', 1, NULL, NULL),
('fit003', 'Dương Lê Minh', 'minhdl@vnu.edu.vn', '12345', 1, '/image/15095558_937776439687993_7315136909442433793_n.jpg', NULL),
('fit004', 'Hoàng Thị Ngọc Trang', 'tranghtn@vnu.edu.vn', '12345', 1, NULL, NULL),
('fit005', 'Hoàng Xuân Tùng', 'tunghx@vnu.edu.vn', '12345', 1, NULL, NULL),
('fit006', 'Hồ Đắc Phương', 'phuongd@vnu.edu.vn', '12345', 1, NULL, NULL),
('fit008', 'Lê Đình Thanh', 'thanhld@vnu.edu.vn', '12345', 1, NULL, NULL),
('fit009', 'Lê Thanh Hà', 'ltha@vnu.edu.vn', '12345', 1, NULL, NULL),
('fit010', 'Nguyễn Hoài Sơn', 'sonnh@vnu.edu.vn', '12345', 1, NULL, NULL),
('fit011', 'Nguyễn Hà Nam', 'namnh@vnu.edu.vn', '12345', 1, NULL, NULL),
('fit012', 'Hoàng Xuân Huấn', 'huanhx@vnu.edu.vn', '12345', 1, NULL, NULL),
('fit013', 'Nguyễn Hải Châu', 'chaunh@vnu.edu.vn', '12345', 1, NULL, NULL),
('fot007', 'Lê Phê Đô', 'dolp@vnu.edu.vn', '12345', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `khoahocs`
--

CREATE TABLE `khoahocs` (
  `kh` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `thoiGianBatDau` datetime DEFAULT NULL,
  `thoiGianKetThuc` datetime DEFAULT NULL,
  `moTa` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `khoahocs`
--

INSERT INTO `khoahocs` (`kh`, `thoiGianBatDau`, `thoiGianKetThuc`, `moTa`) VALUES
('QH-2011-I/CQ', NULL, NULL, NULL),
('QH-2012-I/CQ', NULL, NULL, NULL),
('QH-2013-I/CQ', NULL, NULL, NULL),
('QH-2014-I/CQ', NULL, NULL, NULL),
('QH-2015-I/CQ', NULL, NULL, NULL),
('QH-2016-I/CQ', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `khoas`
--

CREATE TABLE `khoas` (
  `id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `tenKhoa` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `vanPhongKhoa` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `taiKhoan` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `matKhau` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moTa` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `khoas`
--

INSERT INTO `khoas` (`id`, `tenKhoa`, `vanPhongKhoa`, `taiKhoan`, `matKhau`, `avatar`, `moTa`) VALUES
('fema', 'Cơ học kỹ thuật và tự động hóa', '144 Xuân Thủy, Cầu Giấy, Hà Nội', 'fema@vnu.edu.vn', 'fema', NULL, NULL),
('fepn', 'Vật lý kỹ thuật và Công nghệ nano', 'P203, nhà G6, 144 Xuân Thủy, Cầu Giấy, Hà Nội', 'fepn@vnu.edu.vn', 'fepn', NULL, NULL),
('fet', 'Điện tử viễn thông', 'Nhà G2, 144 Xuân Thuỷ, Cầu Giấy, Hà Nội – Việ', 'fet@vnu.edu.vn', 'fet', NULL, NULL),
('fit', 'Công nghệ thông tin', 'Phòng 301 – Nhà E3,144 – Xuân Thủy, Cầu Giấy,', 'fit@vnu.edu.vn', 'fit', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `linhvuclienquans`
--

CREATE TABLE `linhvuclienquans` (
  `id` int(11) NOT NULL,
  `GiangVienId` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LinhVucId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `linhvucs`
--

CREATE TABLE `linhvucs` (
  `id` int(11) NOT NULL,
  `tenLinhVuc` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `idParent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `linhvucs`
--

INSERT INTO `linhvucs` (`id`, `tenLinhVuc`, `idParent`) VALUES
(1, 'Software and its engineering', 0),
(2, 'Computer systems organization', 0),
(3, 'Networks', 0),
(4, 'Theory of computation', 0),
(5, 'Information systems', 0),
(6, 'Security and privacy', 0),
(7, 'Software organization and properties', 1),
(8, 'Software notations and tools', 1),
(9, 'Software creation and management', 1),
(10, 'Real-time systems', 2),
(11, 'Embedded and cyber-physical systems', 2),
(12, 'Network architectures', 3),
(13, 'Network protocols', 3),
(14, 'Network properties', 3),
(15, 'Network algorithms', 3),
(16, 'Models of computation', 4),
(17, 'Formal languages and automata theory', 4),
(18, 'Logic', 4),
(19, 'Data management systems', 5),
(20, 'Information storage systems', 5),
(21, 'Information systems applications', 5),
(22, 'Cryptography', 6),
(23, 'Formal methods and theory of security', 6),
(24, 'Security services', 6),
(25, 'Database and storage security', 6);

-- --------------------------------------------------------

--
-- Table structure for table `nganhhocs`
--

CREATE TABLE `nganhhocs` (
  `kh` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `tenNganhHoc` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moTa` text COLLATE utf8_unicode_ci,
  `KhoaId` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `nganhhocs`
--

INSERT INTO `nganhhocs` (`kh`, `tenNganhHoc`, `moTa`, `KhoaId`) VALUES
('cdt', 'Công nghệ kĩ thuật cơ điện tử', NULL, 'fet'),
('ckt', 'Cơ kĩ thuật', NULL, 'fema'),
('cntt', 'Công nghệ thông tin', NULL, 'fit'),
('dttt', 'Công nghệ kỹ thuật điện tử, truyền thông', NULL, 'fet'),
('httt', 'Hệ thống thông tin', NULL, 'fit'),
('khmt', 'Khoa học máy tính', NULL, 'fit'),
('ktnl', 'Kỹ thuật năng lượng', NULL, 'fema'),
('ttmmt', 'Truyền thông và mạng máy tính', NULL, 'fit'),
('vlkt', 'Vật kỹ thuật', NULL, 'fepn');

-- --------------------------------------------------------

--
-- Table structure for table `phanbiens`
--

CREATE TABLE `phanbiens` (
  `id` int(11) NOT NULL,
  `yKien` text COLLATE utf8_unicode_ci,
  `GiangVienId` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DeTaiId` int(11) DEFAULT NULL,
  `diem` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sinhviens`
--

CREATE TABLE `sinhviens` (
  `id` int(11) NOT NULL,
  `tenSinhVien` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `vnuMail` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `matKhau` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `duocDangKiKhoaLuanKhong` int(1) DEFAULT NULL,
  `KhoaHocKh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `NganhHocKh` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sinhviens`
--

INSERT INTO `sinhviens` (`id`, `tenSinhVien`, `vnuMail`, `matKhau`, `avatar`, `duocDangKiKhoaLuanKhong`, `KhoaHocKh`, `NganhHocKh`) VALUES
(11020118, 'Trần Trung Hiếu', '11020118@vnu.edu.vn', '12345', NULL, 0, 'QH-2011-I/CQ', 'httt'),
(12020125, 'Phạm Thanh Hải', '12020125@vnu.edu.vn', '12345', NULL, 0, 'QH-2012-I/CQ', 'httt'),
(12020215, 'Hoàng Tùng Lâm', '12020215@vnu.edu.vn', '12345', NULL, 0, 'QH-2012-I/CQ', 'httt'),
(13020099, 'Cao Hữu Đạt', '13020099@vnu.edu.vn', '12345', NULL, 0, 'QH-2013-I/CQ', 'httt'),
(13020113, 'Trần Văn Định', '13020113@vnu.edu.vn', '12345', NULL, 0, 'QH-2013-I/CQ', 'httt'),
(13020159, 'Nguyễn Trung Hiếu', '13020159@vnu.edu.vn', '12345', NULL, 0, 'QH-2013-I/CQ', 'httt'),
(13020169, 'Nguyễn Trung Hoàn', '13020169@vnu.edu.vn', '12345', NULL, 0, 'QH-2013-I/CQ', 'httt'),
(13020526, 'Nguyễn Bá Dũng', '13020526@vnu.edu.vn', '12345', NULL, 0, 'QH-2013-I/CQ', 'httt'),
(13020540, 'Nguyễn Thanh Hải', '13020540@vnu.edu.vn', '12345', NULL, 0, 'QH-2013-I/CQ', 'httt'),
(14020061, 'Vũ Hữu Duân', '14020061@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020069, 'Đinh Văn Dũng', '14020069@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020088, 'Dương Công Đại', '14020088@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020092, 'Phạm Văn Đại', '14020092@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020146, 'Nguyễn Văn Hải', '14020146@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020156, 'Nguyễn Thị Hằng', '14020156@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020161, 'Bùi Duy Hiển', '14020161@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020162, 'Vũ Đăng Hiển', '14020162@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020165, 'Dương Thanh Hiếu', '14020165@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020185, 'Ngô Văn Hoan', '14020185@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020188, 'Hoàng Văn Hoàn', '14020188@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020213, 'Trần Thị Thanh Huyền', '14020213@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020217, 'Nguyễn Văn Hùng', '14020217@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020219, 'Nguyễn Văn Hùng', '14020219@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020239, 'Lưu Văn Khánh', '14020239@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020246, 'Trần Trung Kiên', '14020246@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020248, 'Vũ Văn Kiệt', '14020248@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020249, 'Nguyễn Thị Lan', '14020249@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020441, 'Trịnh Văn Thi', '14020441@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020450, 'Đỗ Ngọc Hoài Thu', '14020450@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020451, 'Vũ Thị Thu', '14020451@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020452, 'Nguyễn Đức Thuần', '14020452@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020465, 'Vi Văn Thức', '14020465@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020470, 'Trần Viết Tiệp', '14020470@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020477, 'Trần Đức Toàn', '14020477@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020485, 'Nguyễn Văn Tranh', '14020485@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020488, 'Cao Sỹ Trung', '14020488@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020494, 'Trần Thành Trung', '14020494@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020502, 'Phạm Quang Đại', '14020502@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020503, 'Trần Văn Hoa', '14020503@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020513, 'Lý Văn Tuấn', '14020513@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020515, 'Ngô Phương Tuấn', '14020515@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020520, 'Trần Minh Tuấn', '14020520@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020521, 'Vũ Minh Tuấn', '14020521@vnu.edu.vn', '12345', '/image/img033.jpg', 0, 'QH-2014-I/CQ', 'cntt'),
(14020522, 'Vũ Minh a', '14020521@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020578, 'Lê Bảo Cường', '14020578@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt'),
(14020582, 'Châu Quốc Đạt', '14020582@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'httt'),
(14020585, 'Phan Hà Trang', '14020613@vnu.edu.vn', '12345', NULL, 0, 'QH-2014-I/CQ', 'cntt');

--
-- Indexes for dumped tables
--

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
  ADD PRIMARY KEY (`id`),
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
-- AUTO_INCREMENT for table `detais`
--
ALTER TABLE `detais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT for table `donvis`
--
ALTER TABLE `donvis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `linhvuclienquans`
--
ALTER TABLE `linhvuclienquans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `linhvucs`
--
ALTER TABLE `linhvucs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `phanbiens`
--
ALTER TABLE `phanbiens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `detais`
--
ALTER TABLE `detais`
  ADD CONSTRAINT `detais_ibfk_1` FOREIGN KEY (`GiangVienId`) REFERENCES `giangviens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detais_ibfk_2` FOREIGN KEY (`SinhVienId`) REFERENCES `sinhviens` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
-- Constraints for table `sinhviens`
--
ALTER TABLE `sinhviens`
  ADD CONSTRAINT `sinhviens_ibfk_1` FOREIGN KEY (`KhoaHocKh`) REFERENCES `khoahocs` (`kh`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `sinhviens_ibfk_2` FOREIGN KEY (`NganhHocKh`) REFERENCES `nganhhocs` (`kh`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
