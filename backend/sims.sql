-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2026 at 09:25 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sims`
--

-- --------------------------------------------------------

--
-- Table structure for table `spare_part`
--

CREATE TABLE `spare_part` (
  `id` int(11) NOT NULL,
  `Name` varchar(300) DEFAULT NULL,
  `Category` varchar(50) DEFAULT NULL,
  `Quantity` int(50) NOT NULL,
  `UnitPrice` int(100) NOT NULL,
  `TotalPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spare_part`
--

INSERT INTO `spare_part` (`id`, `Name`, `Category`, `Quantity`, `UnitPrice`, `TotalPrice`) VALUES
(1, 'sdfjjwncnc', 'Electrical', 0, 123, 1476),
(2, 'wheeel', 'Oil Filter', 0, 123, 1476),
(3, 'huuuh', 'Brake', 8, 87, 6786),
(4, 'hhhhhh', 'Tyre', 8, 2500, 50000),
(5, 'Car Battery', 'Car', 0, 150000, 1800000),
(6, 'Clutch Plates', 'Motorcycle', 80, 50000, 4000000),
(7, 'Car Battery', 'Car', 30, 150000, 4500000),
(8, 'Brake Pads', 'Car', 75, 60000, 4500000),
(9, 'Car Battery', 'Car', 45, 150000, 6750000),
(10, '', '', 3, 0, 0),
(11, 'Spark Plug', 'Car', 1, 5000, 5000),
(12, '', '', 1552, 0, 0),
(13, '', '', 36, 0, 0),
(14, 'Brake Pads', 'Car', 4000, 60000, 240000000),
(15, '', '', 12, 0, 0),
(16, '', '', 20, 0, 0),
(17, 'Spark Plug', 'Motorcycle', 12, 3000, 36000),
(18, 'Headlight Bulb', 'Car', 13, 10000, 130000),
(19, 'Spark Plug', 'Motorcycle', 23, 3000, 69000);

-- --------------------------------------------------------

--
-- Table structure for table `stock_in`
--

CREATE TABLE `stock_in` (
  `id` int(11) NOT NULL,
  `StockInQuantity` int(100) NOT NULL,
  `StockInUnitPrice` int(11) NOT NULL,
  `StockInTotalPrice` int(11) NOT NULL,
  `StockInDate` varchar(200) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_in`
--

INSERT INTO `stock_in` (`id`, `StockInQuantity`, `StockInUnitPrice`, `StockInTotalPrice`, `StockInDate`) VALUES
(2, 23, 123, 2829, '2026-05-29 10:38:41'),
(3, 20, 87, 1740, '2026-05-29 10:54:15'),
(10, 23, 0, 0, '2026-05-29 17:35:35'),
(12, 500, 0, 0, '2026-05-29 16:46:33'),
(13, 12, 0, 0, '2026-05-29 17:17:03');

-- --------------------------------------------------------

--
-- Table structure for table `stock_out`
--

CREATE TABLE `stock_out` (
  `id` int(11) NOT NULL,
  `stockoutquantity` int(11) DEFAULT NULL,
  `stockoutunitprice` decimal(10,2) DEFAULT NULL,
  `stockouttotalprice` decimal(10,2) DEFAULT NULL,
  `StockOutDate` varchar(100) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_out`
--

INSERT INTO `stock_out` (`id`, `stockoutquantity`, `stockoutunitprice`, `stockouttotalprice`, `StockOutDate`) VALUES
(3, 10, 87.00, 870.00, '2026-06-01 08:22:13'),
(10, 134, 1204746.00, 99999999.99, '2026-05-29 17:36:53');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `UserName` varchar(50) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `Password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `UserName`, `Email`, `Password`) VALUES
(1, 'ciella', 'ciella@gmail.com', '$2b$10$YsWGjE7wktsA04MHhKW.NOfZIxHNXb7mjxXpVhYsWhndrJqD3YjNq'),
(2, 'mugabekazi', 'zunny@gmail.com', '$2b$10$5ha8d0iaEJgWS2iYIqJ1m.EULe3LR727K5fPx7VLsry1225tm0UXS'),
(3, 'zunny', 'ciella@gmail.com', '$2b$10$xL8VzH2r4aQyW68MlZUyYOo7CgieFvGvMWuzAtRZk8kxhROiMXBOu'),
(4, 'ciella', 'hopehawa@gmail.com', '$2b$10$RbJFz4p6bV23afCfu/.Kbew6hta.lBtaZp89s8JGFK3ZA6TRMXGjG'),
(6, 'umwali', 'ciellae@gmail.com', '$2b$10$AvRfUsiqTM8qnf2iTVVJ7ORnS0K6XqpYnysjEMa5R7V2Z1.nviiDW'),
(7, 'mugishaa', 'mugabekazie@gmail.comugabekazi', '$2b$10$/vEfO4.PDhyiUP3h32QVjuBv8tCUuDGraXOqC/6VR4UjogrzkbFFW'),
(8, 'kaberuka', 'kaberuka@gmail.com', '$2b$10$RrAuODR08/RBB/eL47wMW.3ygoTzUDVN3WV10SJiZ9Pn1RGmcc95K'),
(10, 'hawa', 'kamana@gmail.com', '$2b$10$YIPMunbwJ4SxYveXqjsSBeFDGAtIXb2P7lPU3Ii9hpfOT.Gx0tqbu'),
(11, 'karabo', 'karabo@gmail.com', '$2b$10$x7aCgzUDlfRoEeRa4o9aLu0vJgVnT3wxH/rrhPgJ8K/c8TvTNfTLu'),
(12, '', '', '$2b$10$QWq3zTw90HAy0GAxTqGX6eU7H6CFGKCugttN57JADkCCnaeE6VND.'),
(13, 'hopeee', 'zuny@gmail.com', '$2b$10$e6b.AEKhn8DVCgMYhklMweWcEJENx928Ne1LwLwKmEdb8AWP4yyCK'),
(14, 'kamasa', 'ciella@gmail.com', '$2b$10$x8LK7MT7URt7kzL52AgaAu0gDL88YbPGxcgTiQOPqCcQoSl7eCw16'),
(15, 'peace', 'peace@gmail.com', '$2b$10$TK3RSu5Zwriw1QVRlVDlau3DZ/8szvjVcuTLu9FNmePadz8UYnQcS'),
(16, 'lolo', 'mugisha@gmail.com', '$2b$10$H373GRJCuVnlG9IEO1Br5uYHxA/fIzl8wyNZfvjU3iRMhFM7K9uQ2'),
(17, 'ciella', 'ciellaconn@gmail.com', '$2b$10$dWWK9mFmX1Y1EVKgAl2RMeGKlG7jS7b4TJFe.gIzJz.ikJorgottm'),
(18, 'ciella', 'ciellaconn@gmail.com', '$2b$10$fHYHQgfqUgXFMCo/mAtSw.RVakOYHYbEUNpt1/ictkGz8yp8mdpd.'),
(19, 'ciella', 'ciella@gmail.com', '$2b$10$gbihF18VfVOkZHI2Et5kjuMKlIsMxAHJwkdlFobNijkt1asmjQQSu'),
(20, 'mugabekazii ciella', 'mugabekaziciella@gmail.com', '$2b$10$JGMGhjUeTk2UIMrxld.N2uJ5BpRtdCoBdngb0cNXW2qQWNK020Iya'),
(21, 'ciella', 'ciella@gmail.com', '$2b$10$SMLxOojAdfpOKn1GQcuZc.VkuSABgJN0uD6ISs8p7lt05NrMiCEw2'),
(22, 'ciella', 'ciella@gmail.com', '$2b$10$vs4/pIwq2B/kjyACVD3FXe7CEv4wkapwBT0nbNpV9./o9nDQMRTFm'),
(23, 'ciella', 'ciella@gmail.com', '$2b$10$GOTLzuc7..ze6FlVxzMcFudBK2N8b6RhnpXZHqlKUhqN5SondDSQW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `spare_part`
--
ALTER TABLE `spare_part`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock_in`
--
ALTER TABLE `stock_in`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock_out`
--
ALTER TABLE `stock_out`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `spare_part`
--
ALTER TABLE `spare_part`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `stock_in`
--
ALTER TABLE `stock_in`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `stock_out`
--
ALTER TABLE `stock_out`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `stock_in`
--
ALTER TABLE `stock_in`
  ADD CONSTRAINT `stock_in_ibfk_1` FOREIGN KEY (`Id`) REFERENCES `spare_part` (`Id`);

--
-- Constraints for table `stock_out`
--
ALTER TABLE `stock_out`
  ADD CONSTRAINT `stock_out_ibfk_1` FOREIGN KEY (`Id`) REFERENCES `spare_part` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
