CREATE DATABASE  IF NOT EXISTS `dev-web` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `dev-web`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: dev-web
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.16-MariaDB

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
-- Table structure for table `bomons`
--

DROP TABLE IF EXISTS `bomons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bomons` (
  `tenBoMon` varchar(45) NOT NULL,
  `moTa` text,
  `KhoaId` varchar(15) NOT NULL,
  PRIMARY KEY (`tenBoMon`),
  KEY `KhoaId` (`KhoaId`),
  CONSTRAINT `bomons_ibfk_1` FOREIGN KEY (`KhoaId`) REFERENCES `khoas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bomons`
--

LOCK TABLES `bomons` WRITE;
/*!40000 ALTER TABLE `bomons` DISABLE KEYS */;
/*!40000 ALTER TABLE `bomons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detais`
--

DROP TABLE IF EXISTS `detais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenDeTai` varchar(225) DEFAULT NULL,
  `thoiGianNop` time DEFAULT NULL,
  `thoiGianSua` time DEFAULT NULL,
  `nopHoSoChua` int(1) DEFAULT NULL,
  `duocBaoVeKhong` int(1) DEFAULT NULL,
  `nopQuyenChua` int(1) DEFAULT NULL,
  `GiangVienId` varchar(11) NOT NULL,
  `SinhVienId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `GiangVienId` (`GiangVienId`),
  KEY `SinhVienId` (`SinhVienId`),
  CONSTRAINT `detais_ibfk_1` FOREIGN KEY (`GiangVienId`) REFERENCES `giangviens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detais_ibfk_2` FOREIGN KEY (`SinhVienId`) REFERENCES `sinhviens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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
  `tenDonVi` varchar(255) DEFAULT NULL,
  `KhoaId` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `KhoaId` (`KhoaId`),
  CONSTRAINT `donvis_ibfk_1` FOREIGN KEY (`KhoaId`) REFERENCES `khoas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donvis`
--

LOCK TABLES `donvis` WRITE;
/*!40000 ALTER TABLE `donvis` DISABLE KEYS */;
/*!40000 ALTER TABLE `donvis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giangviens`
--

DROP TABLE IF EXISTS `giangviens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giangviens` (
  `id` varchar(11) NOT NULL,
  `tenGiangVien` varchar(100) NOT NULL,
  `vnuMail` varchar(45) DEFAULT NULL,
  `matKhau` varchar(45) DEFAULT NULL,
  `DonViId` int(11) DEFAULT NULL,
  `chuDeHuongNghienCuu` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `DonViId` (`DonViId`),
  CONSTRAINT `giangviens_ibfk_1` FOREIGN KEY (`DonViId`) REFERENCES `donvis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giangviens`
--

LOCK TABLES `giangviens` WRITE;
/*!40000 ALTER TABLE `giangviens` DISABLE KEYS */;
/*!40000 ALTER TABLE `giangviens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khoahocs`
--

DROP TABLE IF EXISTS `khoahocs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `khoahocs` (
  `kh` varchar(255) NOT NULL,
  `thoiGianBatDau` datetime DEFAULT NULL,
  `thoiGianKetThuc` datetime DEFAULT NULL,
  `moTa` text,
  PRIMARY KEY (`kh`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khoahocs`
--

LOCK TABLES `khoahocs` WRITE;
/*!40000 ALTER TABLE `khoahocs` DISABLE KEYS */;
/*!40000 ALTER TABLE `khoahocs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khoas`
--

DROP TABLE IF EXISTS `khoas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `khoas` (
  `id` varchar(15) NOT NULL,
  `tenKhoa` varchar(100) DEFAULT NULL,
  `vanPhongKhoa` varchar(45) DEFAULT NULL,
  `taiKhoan` varchar(30) DEFAULT NULL,
  `matKhau` varchar(30) DEFAULT NULL,
  `moTa` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khoas`
--

LOCK TABLES `khoas` WRITE;
/*!40000 ALTER TABLE `khoas` DISABLE KEYS */;
/*!40000 ALTER TABLE `khoas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linhvuclienquans`
--

DROP TABLE IF EXISTS `linhvuclienquans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `linhvuclienquans` (
  `GiangVienId` varchar(11) NOT NULL,
  `LinhVucId` int(11) NOT NULL,
  PRIMARY KEY (`GiangVienId`,`LinhVucId`),
  KEY `LinhVucId` (`LinhVucId`),
  CONSTRAINT `linhvuclienquans_ibfk_1` FOREIGN KEY (`GiangVienId`) REFERENCES `giangviens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `linhvuclienquans_ibfk_2` FOREIGN KEY (`LinhVucId`) REFERENCES `linhvucs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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
  `tenLinhVuc` varchar(45) DEFAULT NULL,
  `idTrai` int(11) NOT NULL,
  `idPhai` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linhvucs`
--

LOCK TABLES `linhvucs` WRITE;
/*!40000 ALTER TABLE `linhvucs` DISABLE KEYS */;
/*!40000 ALTER TABLE `linhvucs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nganhhocs`
--

DROP TABLE IF EXISTS `nganhhocs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nganhhocs` (
  `kh` varchar(15) NOT NULL,
  `tenNganhHoc` varchar(100) DEFAULT NULL,
  `moTa` text,
  `KhoaId` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`kh`),
  KEY `KhoaId` (`KhoaId`),
  CONSTRAINT `nganhhocs_ibfk_1` FOREIGN KEY (`KhoaId`) REFERENCES `khoas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nganhhocs`
--

LOCK TABLES `nganhhocs` WRITE;
/*!40000 ALTER TABLE `nganhhocs` DISABLE KEYS */;
/*!40000 ALTER TABLE `nganhhocs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phanbiens`
--

DROP TABLE IF EXISTS `phanbiens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phanbiens` (
  `yKien` text,
  `diem` int(3) DEFAULT NULL,
  `DeTaiId` int(11) NOT NULL,
  `GiangVienId` varchar(11) NOT NULL,
  PRIMARY KEY (`DeTaiId`,`GiangVienId`),
  KEY `GiangVienId` (`GiangVienId`),
  CONSTRAINT `phanbiens_ibfk_1` FOREIGN KEY (`DeTaiId`) REFERENCES `detais` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `phanbiens_ibfk_2` FOREIGN KEY (`GiangVienId`) REFERENCES `giangviens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phanbiens`
--

LOCK TABLES `phanbiens` WRITE;
/*!40000 ALTER TABLE `phanbiens` DISABLE KEYS */;
/*!40000 ALTER TABLE `phanbiens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phongthinghiems`
--

DROP TABLE IF EXISTS `phongthinghiems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phongthinghiems` (
  `tenPhongThiNghiem` varchar(255) NOT NULL,
  `KhoaId` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`tenPhongThiNghiem`),
  KEY `KhoaId` (`KhoaId`),
  CONSTRAINT `phongthinghiems_ibfk_1` FOREIGN KEY (`KhoaId`) REFERENCES `khoas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phongthinghiems`
--

LOCK TABLES `phongthinghiems` WRITE;
/*!40000 ALTER TABLE `phongthinghiems` DISABLE KEYS */;
/*!40000 ALTER TABLE `phongthinghiems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sinhviens`
--

DROP TABLE IF EXISTS `sinhviens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sinhviens` (
  `id` int(11) NOT NULL,
  `tenSinhVien` varchar(45) NOT NULL,
  `vnuMail` varchar(45) NOT NULL,
  `matKhau` varchar(45) NOT NULL,
  `duocDangKiKhoaLuanKhong` int(1) DEFAULT NULL,
  `KhoaHocKh` varchar(255) DEFAULT NULL,
  `NganhHocKh` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `KhoaHocKh` (`KhoaHocKh`),
  KEY `NganhHocKh` (`NganhHocKh`),
  CONSTRAINT `sinhviens_ibfk_1` FOREIGN KEY (`KhoaHocKh`) REFERENCES `khoahocs` (`kh`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sinhviens_ibfk_2` FOREIGN KEY (`NganhHocKh`) REFERENCES `nganhhocs` (`kh`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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

-- Dump completed on 2016-11-22  2:42:04
