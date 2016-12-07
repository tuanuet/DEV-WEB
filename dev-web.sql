CREATE DATABASE  IF NOT EXISTS `dev-web` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `dev-web`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: dev-web
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.19-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detais`
--

DROP TABLE IF EXISTS `detais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `GiangVienId` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `SinhVienId` int(11) DEFAULT NULL,
  `tenDeTai` varchar(225) COLLATE utf8_unicode_ci DEFAULT NULL,
  `thoiGianNop` datetime DEFAULT NULL,
  `thoiGianSua` datetime DEFAULT NULL,
  `nopHoSoChua` int(1) DEFAULT NULL,
  `duocBaoVeKhong` int(1) DEFAULT NULL,
  `nopQuyenChua` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `GiangVienId` (`GiangVienId`),
  KEY `SinhVienId` (`SinhVienId`),
  CONSTRAINT `detais_ibfk_1` FOREIGN KEY (`GiangVienId`) REFERENCES `giangviens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detais_ibfk_2` FOREIGN KEY (`SinhVienId`) REFERENCES `sinhviens` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detais`
--

LOCK TABLES `detais` WRITE;
/*!40000 ALTER TABLE `detais` DISABLE KEYS */;
/*!40000 ALTER TABLE `detais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donvis`
--

DROP TABLE IF EXISTS `donvis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `donvis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenDonVi` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `KhoaId` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `KhoaId` (`KhoaId`),
  CONSTRAINT `donvis_ibfk_1` FOREIGN KEY (`KhoaId`) REFERENCES `khoas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donvis`
--

LOCK TABLES `donvis` WRITE;
/*!40000 ALTER TABLE `donvis` DISABLE KEYS */;
INSERT INTO `donvis` VALUES (1,'Bộ môn Công nghệ phần mềm','fit'),(2,'Bộ môn Các Hệ thống Thông tin','fit'),(3,'Bộ môn Khoa học Máy tính','fit'),(4,'Bộ môn Khoa học và Kỹ thuật tính toán','fit'),(5,'Bộ môn Mạng và Truyền thông Máy tính','fit'),(6,'Phòng Thí nghiệm An toàn thông tin','fit'),(7,'Phòng Thí nghiệm Công nghệ Tri thức','fit'),(8,'Phòng Thí nghiệm Hệ thống Nhúng','fit'),(9,'Phòng Thí nghiệm Tương tác Người – Máy','fit'),(10,'Bộ môn Điện tử và Kỹ thuật Máy tính','fet'),(11,'Bộ môn Hệ thống Viễn thông','fet'),(12,'Bộ môn Thông tin Vô tuyến','fet'),(13,'Bộ môn Vi cơ Điện tử và Vi hệ thống','fet'),(14,'Phòng thí nghiệm Tín hiệu và Hệ thống','fet'),(15,'Bộ môn Công nghệ quang tử','fepn'),(16,'Bộ môn Vật liệu và linh kiện từ tính nano','fepn'),(17,'Bộ môn Vật liệu và linh kiện bán dẫn nano','fepn'),(18,'Bộ môn Công nghệ nano sinh học','fepn'),(19,'Phòng Thí nghiệm Công nghệ quang tử','fepn'),(20,'Phòng Thí nghiệm Vật liệu và linh kiện lai nano','fepn'),(21,'Phòng Thí nghiệm của Bộ môn Vật liệu và linh kiện từ tính nano','fepn'),(22,'Bộ môn Thủy Khí Công nghiệp và Môi trường','fema'),(23,'Bộ môn Công nghệ Biển và Môi trường','fema'),(24,'Bộ môn Công nghệ Hàng không vũ trụ','fema'),(25,'Bộ môn Công nghệ Cơ điện tử','fema'),(26,'Phòng thí nghiệm Công nghệ Cơ điện tử và Thủy tin học','fema');
/*!40000 ALTER TABLE `donvis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giangviens`
--

DROP TABLE IF EXISTS `giangviens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giangviens` (
  `id` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `tenGiangVien` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `vnuMail` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `matKhau` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DonViId` int(11) DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `chuDeHuongNghienCuu` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `DonViId` (`DonViId`),
  CONSTRAINT `giangviens_ibfk_1` FOREIGN KEY (`DonViId`) REFERENCES `donvis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giangviens`
--

LOCK TABLES `giangviens` WRITE;
/*!40000 ALTER TABLE `giangviens` DISABLE KEYS */;
INSERT INTO `giangviens` VALUES ('fit001','Bùi Ngọc Hải','haibn.uet@vnu.edu.vn','12345',1,NULL,NULL),('fit002','Dư Phương Hạnh','hanhdp@vnu.edu.vn','12345',1,NULL,NULL),('fit003','Dương Lê Minh','minhdl@vnu.edu.vn','12345',1,NULL,NULL),('fit004','Hoàng Thị Ngọc Trang','tranghtn@vnu.edu.vn','12345',1,NULL,NULL),('fit005','Hoàng Xuân Tùng','tunghx@vnu.edu.vn','12345',1,NULL,NULL),('fit006','Hồ Đắc Phương','phuongd@vnu.edu.vn','12345',1,NULL,NULL),('fit008','Lê Đình Thanh','thanhld@vnu.edu.vn','12345',1,NULL,NULL),('fit009','Lê Thanh Hà','ltha@vnu.edu.vn','12345',1,NULL,NULL),('fit010','Nguyễn Hoài Sơn','sonnh@vnu.edu.vn','12345',1,NULL,NULL),('fit011','Nguyễn Hà Nam','namnh@vnu.edu.vn','12345',1,NULL,NULL),('fit012','Hoàng Xuân Huấn','huanhx@vnu.edu.vn','12345',1,NULL,NULL),('fit013','Nguyễn Hải Châu','chaunh@vnu.edu.vn','12345',1,NULL,NULL),('fot007','Lê Phê Đô','dolp@vnu.edu.vn','12345',1,NULL,NULL);
/*!40000 ALTER TABLE `giangviens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khoahocs`
--

DROP TABLE IF EXISTS `khoahocs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `khoahocs` (
  `kh` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `thoiGianBatDau` datetime DEFAULT NULL,
  `thoiGianKetThuc` datetime DEFAULT NULL,
  `moTa` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`kh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khoahocs`
--

LOCK TABLES `khoahocs` WRITE;
/*!40000 ALTER TABLE `khoahocs` DISABLE KEYS */;
INSERT INTO `khoahocs` VALUES ('QH-2012-I/CQ',NULL,NULL,NULL),('QH-2013-I/CQ',NULL,NULL,NULL),('QH-2014-I/CQ',NULL,NULL,NULL),('QH-2015-I/CQ',NULL,NULL,NULL),('QH-2016-I/CQ',NULL,NULL,NULL);
/*!40000 ALTER TABLE `khoahocs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khoas`
--

DROP TABLE IF EXISTS `khoas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `khoas` (
  `id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `tenKhoa` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `vanPhongKhoa` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `taiKhoan` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `matKhau` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moTa` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khoas`
--

LOCK TABLES `khoas` WRITE;
/*!40000 ALTER TABLE `khoas` DISABLE KEYS */;
INSERT INTO `khoas` VALUES ('fema','Cơ học kỹ thuật và tự động hóa','144 Xuân Thủy, Cầu Giấy, Hà Nội','fema@vnu.edu.vn','fema',NULL,NULL),('fepn','Vật lý kỹ thuật và Công nghệ nano','P203, nhà G6, 144 Xuân Thủy, Cầu Giấy, Hà Nội','fepn@vnu.edu.vn','fepn',NULL,NULL),('fet','Điện tử viễn thông','Nhà G2, 144 Xuân Thuỷ, Cầu Giấy, Hà Nội – Việ','fet@vnu.edu.vn','fet',NULL,NULL),('fit','Công nghệ thông tin','Phòng 301 – Nhà E3,144 – Xuân Thủy, Cầu Giấy,','fit@vnu.edu.vn','fit',NULL,NULL);
/*!40000 ALTER TABLE `khoas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linhvuclienquans`
--

DROP TABLE IF EXISTS `linhvuclienquans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `linhvuclienquans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `GiangVienId` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LinhVucId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `GiangVienId` (`GiangVienId`),
  KEY `LinhVucId` (`LinhVucId`),
  CONSTRAINT `linhvuclienquans_ibfk_1` FOREIGN KEY (`GiangVienId`) REFERENCES `giangviens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `linhvuclienquans_ibfk_2` FOREIGN KEY (`LinhVucId`) REFERENCES `linhvucs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linhvuclienquans`
--

LOCK TABLES `linhvuclienquans` WRITE;
/*!40000 ALTER TABLE `linhvuclienquans` DISABLE KEYS */;
/*!40000 ALTER TABLE `linhvuclienquans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linhvucs`
--

DROP TABLE IF EXISTS `linhvucs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `linhvucs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenLinhVuc` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `idParent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linhvucs`
--

LOCK TABLES `linhvucs` WRITE;
/*!40000 ALTER TABLE `linhvucs` DISABLE KEYS */;
INSERT INTO `linhvucs` VALUES (1,'Software and its engineering',0),(2,'Computer systems organization',0),(3,'Networks',0),(4,'Theory of computation',0),(5,'Information systems',0),(6,'Security and privacy',0),(7,'Software organization and properties',1),(8,'Software notations and tools',1),(9,'Software creation and management',1),(10,'Real-time systems',2),(11,'Embedded and cyber-physical systems',2),(12,'Network architectures',3),(13,'Network protocols',3),(14,'Network properties',3),(15,'Network algorithms',3),(16,'Models of computation',4),(17,'Formal languages and automata theory',4),(18,'Logic',4),(19,'Data management systems',5),(20,'Information storage systems',5),(21,'Information systems applications',5),(22,'Cryptography',6),(23,'Formal methods and theory of security',6),(24,'Security services',6),(25,'Database and storage security',6);
/*!40000 ALTER TABLE `linhvucs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nganhhocs`
--

DROP TABLE IF EXISTS `nganhhocs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nganhhocs` (
  `kh` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `tenNganhHoc` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moTa` text COLLATE utf8_unicode_ci,
  `KhoaId` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`kh`),
  KEY `KhoaId` (`KhoaId`),
  CONSTRAINT `nganhhocs_ibfk_1` FOREIGN KEY (`KhoaId`) REFERENCES `khoas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nganhhocs`
--

LOCK TABLES `nganhhocs` WRITE;
/*!40000 ALTER TABLE `nganhhocs` DISABLE KEYS */;
INSERT INTO `nganhhocs` VALUES ('cdt','Công nghệ kĩ thuật cơ điện tử',NULL,'fet'),('ckt','Cơ kĩ thuật',NULL,'fema'),('cntt','Công nghệ thông tin',NULL,'fit'),('dttt','Công nghệ kỹ thuật điện tử, truyền thông',NULL,'fet'),('httt','Hệ thống thông tin',NULL,'fit'),('khmt','Khoa học máy tính',NULL,'fit'),('ktnl','Kỹ thuật năng lượng',NULL,'fema'),('ttmmt','Truyền thông và mạng máy tính',NULL,'fit'),('vlkt','Vật kỹ thuật',NULL,'fepn');
/*!40000 ALTER TABLE `nganhhocs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phanbiens`
--

DROP TABLE IF EXISTS `phanbiens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phanbiens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `yKien` text COLLATE utf8_unicode_ci,
  `GiangVienId` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DeTaiId` int(11) DEFAULT NULL,
  `diem` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `GiangVienId` (`GiangVienId`),
  KEY `DeTaiId` (`DeTaiId`),
  CONSTRAINT `phanbiens_ibfk_1` FOREIGN KEY (`GiangVienId`) REFERENCES `giangviens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `phanbiens_ibfk_2` FOREIGN KEY (`DeTaiId`) REFERENCES `detais` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phanbiens`
--

LOCK TABLES `phanbiens` WRITE;
/*!40000 ALTER TABLE `phanbiens` DISABLE KEYS */;
/*!40000 ALTER TABLE `phanbiens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sinhviens`
--

DROP TABLE IF EXISTS `sinhviens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sinhviens` (
  `id` int(11) NOT NULL,
  `tenSinhVien` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `vnuMail` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `matKhau` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `duocDangKiKhoaLuanKhong` int(1) DEFAULT NULL,
  `KhoaHocKh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `NganhHocKh` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `KhoaHocKh` (`KhoaHocKh`),
  KEY `NganhHocKh` (`NganhHocKh`),
  CONSTRAINT `sinhviens_ibfk_1` FOREIGN KEY (`KhoaHocKh`) REFERENCES `khoahocs` (`kh`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sinhviens_ibfk_2` FOREIGN KEY (`NganhHocKh`) REFERENCES `nganhhocs` (`kh`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sinhviens`
--

LOCK TABLES `sinhviens` WRITE;
/*!40000 ALTER TABLE `sinhviens` DISABLE KEYS */;
/*!40000 ALTER TABLE `sinhviens` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-07 11:27:00
