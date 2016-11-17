CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
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
-- Table structure for table `bomon`
--

DROP TABLE IF EXISTS `bomon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bomon` (
  `tenBoMon` varchar(45) NOT NULL,
  `moTa` text,
  `khoa_khKhoa` varchar(15) NOT NULL,
  PRIMARY KEY (`tenBoMon`),
  KEY `fk_boMon_khoa_idx` (`khoa_khKhoa`),
  CONSTRAINT `fk_boMon_khoa` FOREIGN KEY (`khoa_khKhoa`) REFERENCES `khoa` (`khKhoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bomon`
--

LOCK TABLES `bomon` WRITE;
/*!40000 ALTER TABLE `bomon` DISABLE KEYS */;
/*!40000 ALTER TABLE `bomon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chude`
--

DROP TABLE IF EXISTS `chude`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chude` (
  `tenChuDe` varchar(45) NOT NULL,
  `linhVuc_ID` int(11) NOT NULL,
  PRIMARY KEY (`tenChuDe`),
  KEY `fk_chuDe_linhVuc1_idx` (`linhVuc_ID`),
  CONSTRAINT `fk_chuDe_linhVuc1` FOREIGN KEY (`linhVuc_ID`) REFERENCES `linhvuc` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chude`
--

LOCK TABLES `chude` WRITE;
/*!40000 ALTER TABLE `chude` DISABLE KEYS */;
/*!40000 ALTER TABLE `chude` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detai`
--

DROP TABLE IF EXISTS `detai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detai` (
  `ID` int(11) NOT NULL,
  `tenDeTai` varchar(255) NOT NULL,
  `nguoiHoc_MSSV` int(11) NOT NULL,
  `giangVien_ID` int(11) NOT NULL,
  `thoiGianNop` datetime NOT NULL,
  `thoiGianSua` datetime DEFAULT NULL,
  `nopHoSoChua` tinyint(1) DEFAULT NULL,
  `duocBaoVeKhong` tinyint(1) DEFAULT NULL,
  `nopQuyenChua` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_deTai_nguoiHoc1_idx` (`nguoiHoc_MSSV`),
  KEY `fk_deTai_giangVien1_idx` (`giangVien_ID`),
  CONSTRAINT `fk_deTai_giangVien1` FOREIGN KEY (`giangVien_ID`) REFERENCES `giangvien` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_deTai_nguoiHoc1` FOREIGN KEY (`nguoiHoc_MSSV`) REFERENCES `nguoihoc` (`MSSV`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detai`
--

LOCK TABLES `detai` WRITE;
/*!40000 ALTER TABLE `detai` DISABLE KEYS */;
/*!40000 ALTER TABLE `detai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giangvien`
--

DROP TABLE IF EXISTS `giangvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giangvien` (
  `ID` int(11) NOT NULL,
  `tenGiangVien` varchar(45) NOT NULL,
  `vnuMail` varchar(45) DEFAULT NULL,
  `matKhau` varchar(45) DEFAULT NULL,
  `soDienThoai` varchar(45) DEFAULT NULL,
  `khoa_khKhoa` varchar(15) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_giangVien_khoa1_idx` (`khoa_khKhoa`),
  CONSTRAINT `fk_giangVien_khoa1` FOREIGN KEY (`khoa_khKhoa`) REFERENCES `khoa` (`khKhoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giangvien`
--

LOCK TABLES `giangvien` WRITE;
/*!40000 ALTER TABLE `giangvien` DISABLE KEYS */;
/*!40000 ALTER TABLE `giangvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khoa`
--

DROP TABLE IF EXISTS `khoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `khoa` (
  `khKhoa` varchar(15) NOT NULL,
  `tenKhoa` varchar(45) NOT NULL,
  `vanPhongKhoa` varchar(45) NOT NULL,
  `taiKhoan` varchar(45) NOT NULL,
  `matKhau` varchar(45) NOT NULL,
  `moTa` text,
  PRIMARY KEY (`khKhoa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khoa`
--

LOCK TABLES `khoa` WRITE;
/*!40000 ALTER TABLE `khoa` DISABLE KEYS */;
/*!40000 ALTER TABLE `khoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khoahoc`
--

DROP TABLE IF EXISTS `khoahoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `khoahoc` (
  `khKhoaHoc` varchar(15) NOT NULL,
  `moTa` text NOT NULL,
  PRIMARY KEY (`khKhoaHoc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khoahoc`
--

LOCK TABLES `khoahoc` WRITE;
/*!40000 ALTER TABLE `khoahoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `khoahoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linhvuc`
--

DROP TABLE IF EXISTS `linhvuc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `linhvuc` (
  `ID` int(11) NOT NULL,
  `tenLinhVuc` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linhvuc`
--

LOCK TABLES `linhvuc` WRITE;
/*!40000 ALTER TABLE `linhvuc` DISABLE KEYS */;
/*!40000 ALTER TABLE `linhvuc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linhvuclienquan`
--

DROP TABLE IF EXISTS `linhvuclienquan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `linhvuclienquan` (
  `giangVien_ID` int(11) NOT NULL,
  `linhVuc_ID` int(11) NOT NULL,
  PRIMARY KEY (`giangVien_ID`),
  KEY `fk_linhVucLienQuan_linhVuc1_idx` (`linhVuc_ID`),
  CONSTRAINT `fk_linhVucLienQuan_giangVien1` FOREIGN KEY (`giangVien_ID`) REFERENCES `giangvien` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_linhVucLienQuan_linhVuc1` FOREIGN KEY (`linhVuc_ID`) REFERENCES `linhvuc` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linhvuclienquan`
--

LOCK TABLES `linhvuclienquan` WRITE;
/*!40000 ALTER TABLE `linhvuclienquan` DISABLE KEYS */;
/*!40000 ALTER TABLE `linhvuclienquan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nghanhhoc`
--

DROP TABLE IF EXISTS `nghanhhoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nghanhhoc` (
  `khNganh` varchar(15) NOT NULL,
  `tenNganhHoc` varchar(45) NOT NULL,
  `moTa` text,
  `khoa_khKhoa` varchar(15) NOT NULL,
  PRIMARY KEY (`khNganh`),
  KEY `fk_nghanhHoc_khoa1_idx` (`khoa_khKhoa`),
  CONSTRAINT `fk_nghanhHoc_khoa1` FOREIGN KEY (`khoa_khKhoa`) REFERENCES `khoa` (`khKhoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nghanhhoc`
--

LOCK TABLES `nghanhhoc` WRITE;
/*!40000 ALTER TABLE `nghanhhoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `nghanhhoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nghiencuu`
--

DROP TABLE IF EXISTS `nghiencuu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nghiencuu` (
  `giangVien_ID` int(11) NOT NULL,
  `chuDe_tenChuDe` varchar(45) NOT NULL,
  `moTa` text,
  PRIMARY KEY (`giangVien_ID`,`chuDe_tenChuDe`),
  KEY `fk_giangVien_has_chuDe_chuDe1_idx` (`chuDe_tenChuDe`),
  KEY `fk_giangVien_has_chuDe_giangVien1_idx` (`giangVien_ID`),
  CONSTRAINT `fk_giangVien_has_chuDe_chuDe1` FOREIGN KEY (`chuDe_tenChuDe`) REFERENCES `chude` (`tenChuDe`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_giangVien_has_chuDe_giangVien1` FOREIGN KEY (`giangVien_ID`) REFERENCES `giangvien` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nghiencuu`
--

LOCK TABLES `nghiencuu` WRITE;
/*!40000 ALTER TABLE `nghiencuu` DISABLE KEYS */;
/*!40000 ALTER TABLE `nghiencuu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoihoc`
--

DROP TABLE IF EXISTS `nguoihoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nguoihoc` (
  `MSSV` int(11) NOT NULL,
  `tenNguoiHoc` varchar(45) NOT NULL,
  `nghanhHoc_khNganh` varchar(15) NOT NULL,
  `khoaHoc_khKhoaHoc` varchar(15) NOT NULL,
  `vnuMail` varchar(45) DEFAULT NULL,
  `matKhau` varchar(45) DEFAULT NULL,
  `duocDangKiKhoaLuanKhong` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`MSSV`),
  KEY `fk_nguoiHoc_nghanhHoc1_idx` (`nghanhHoc_khNganh`),
  KEY `fk_nguoiHoc_khoaHoc1_idx` (`khoaHoc_khKhoaHoc`),
  CONSTRAINT `fk_nguoiHoc_khoaHoc1` FOREIGN KEY (`khoaHoc_khKhoaHoc`) REFERENCES `khoahoc` (`khKhoaHoc`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_nguoiHoc_nghanhHoc1` FOREIGN KEY (`nghanhHoc_khNganh`) REFERENCES `nghanhhoc` (`khNganh`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoihoc`
--

LOCK TABLES `nguoihoc` WRITE;
/*!40000 ALTER TABLE `nguoihoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `nguoihoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phanbien`
--

DROP TABLE IF EXISTS `phanbien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phanbien` (
  `giangVien_ID` int(11) NOT NULL,
  `deTai_ID` int(11) NOT NULL,
  `yKien` text NOT NULL,
  `diem` int(11) NOT NULL,
  PRIMARY KEY (`giangVien_ID`),
  KEY `fk_phanbien_deTai1_idx` (`deTai_ID`),
  CONSTRAINT `fk_phanbien_deTai1` FOREIGN KEY (`deTai_ID`) REFERENCES `detai` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_phanbien_giangVien1` FOREIGN KEY (`giangVien_ID`) REFERENCES `giangvien` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phanbien`
--

LOCK TABLES `phanbien` WRITE;
/*!40000 ALTER TABLE `phanbien` DISABLE KEYS */;
/*!40000 ALTER TABLE `phanbien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phongthinghiem`
--

DROP TABLE IF EXISTS `phongthinghiem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phongthinghiem` (
  `tenPhongThiNghiem` varchar(45) NOT NULL,
  `khoa_khKhoa` varchar(15) NOT NULL,
  PRIMARY KEY (`tenPhongThiNghiem`),
  KEY `fk_phongThiNghiem_khoa1_idx` (`khoa_khKhoa`),
  CONSTRAINT `fk_phongThiNghiem_khoa1` FOREIGN KEY (`khoa_khKhoa`) REFERENCES `khoa` (`khKhoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phongthinghiem`
--

LOCK TABLES `phongthinghiem` WRITE;
/*!40000 ALTER TABLE `phongthinghiem` DISABLE KEYS */;
/*!40000 ALTER TABLE `phongthinghiem` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-17 18:12:29
