-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2024 at 05:16 PM
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
-- Database: `slu_alumina`
--

-- --------------------------------------------------------

--
-- Table structure for table `alumni`
--

CREATE TABLE `alumni` (
  `user_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `gradyear` int(11) NOT NULL,
  `program` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumni`
--

INSERT INTO `alumni` (`user_id`, `school_id`, `gradyear`, `program`) VALUES
(29, 2078911, 2012, 'Bachelor of Science in Mechanical Engineering'),
(30, 2193612, 2023, 'Bachelor of Science in Computer Science'),
(31, 2201239, 2024, 'Bachelor of Science in Information Technology'),
(32, 2202131, 2024, 'Bachelor of Arts in Business Administration'),
(33, 2168931, 2020, 'Bachelor of Science in Information Technology');

-- --------------------------------------------------------

--
-- Table structure for table `applicants`
--

CREATE TABLE `applicants` (
  `app_id` int(11) NOT NULL,
  `lname` varchar(70) NOT NULL,
  `fname` varchar(70) NOT NULL,
  `email` varchar(70) NOT NULL,
  `pword` varchar(100) NOT NULL,
  `program` varchar(80) NOT NULL,
  `gradyear` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `school_id_pic` blob NOT NULL,
  `is_verified` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applicants`
--

INSERT INTO `applicants` (`app_id`, `lname`, `fname`, `email`, `pword`, `program`, `gradyear`, `school_id`, `school_id_pic`, `is_verified`) VALUES
(22, 'Aquino', 'Juan', 'ajuan@yahoo.com', '$2y$10$mLKhmGhO7AmJQNf/JOcPYeZZrVB9TzrvDRTLFm5g5HXMihOD8NLZ2', 'Bachelor of Arts in Psychology', 1974, 1701827, '', 0),
(23, 'Cablaida', 'Jeremy Reuben', 'reuben@gmail.com', '$2y$10$/HES9XkIyyruNorYO83tqeVm3YWq06CwB/Q8uqPXRYVGbYI/95X9C', 'Bachelor of Science in Information Technology', 2009, 2134672, '', 0),
(24, 'Cerezo', 'Albeth', 'beth@yahoo.com', '$2y$10$rmgUxWjdqX91MZqWmgRXmOKFj0uU7kCdhAXb5hCBfLexj8J84PLjm', 'Bachelor of Science in Information Technology', 2018, 2146721, '', 0),
(25, 'Davis', 'Anthony', 'ADominant@yahoo.com', '$2y$10$2zwViKKuYtesXOoQVJnPq.vYm0Ffq6WDDTdBsJdgfOdM5D0FmMTd.', 'Bachelor of Science in Computer Science', 2019, 2157812, '', 0),
(26, 'Matias', 'Gabriel', 'gab@yahoo.com', '$2y$10$gv809.mV/NfBVoUdEivBj.dTVfiCwMUdnaSrOqQnC4O9erXpofCEa', 'Bachelor of Science in Information Technology', 2022, 2187311, '', 0),
(27, 'Cruz', 'Amira', 'amcruz@gmail.com', '$2y$10$WiEl40TFd7.NFW0/3RMRieoYZ0Gbtk6.iC6Fwzs.oxW2AxUTpqiF6', 'Bachelor of Arts in Business Administration', 2022, 2173411, '', 0),
(28, 'Lee', 'Charlez', 'charz@gmail.com', '$2y$10$qwq6YcryLb00X9/whbXWd.4KwYzKDdp2ERwTpEW4pcowTYV3NYJN.', 'Bachelor of Science in Nursing', 2002, 1980912, '', 0),
(29, ' Lictag', ' Bryan Harry', 'bry@yahoo.com', '$2y$10$dYt1rIUK0fOjwttJ8L8ACePt8O5a9hYkH5eMpfw8CCK/ptPC6QWce', 'Bachelor of Science in Information Technology', 2019, 2156941, '', 0),
(30, 'Curry', 'Stephen', 'sc@gmail.com', '$2y$10$0dslvEuwFaE0nKkBc.6Yc.vX3DnW29V4goRnjiwcXhDNTE5wVc2Ka', 'Bachelor of Science in Electrical Engineering', 1993, 1891231, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `changelogs`
--

CREATE TABLE `changelogs` (
  `logid` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `logact` text NOT NULL,
  `target_id` int(11) NOT NULL,
  `target_type` enum('post','user') NOT NULL,
  `timedate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comm_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(11) NOT NULL,
  `event_title` varchar(80) NOT NULL,
  `event_type` varchar(80) NOT NULL,
  `event_time` datetime NOT NULL,
  `event_location` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `follower_id` int(11) NOT NULL,
  `followed_id` int(11) NOT NULL,
  `date_followed` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `opportunity`
--

CREATE TABLE `opportunity` (
  `opportunity_id` int(11) NOT NULL,
  `company_name` varchar(60) NOT NULL,
  `program_preference` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `poster_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `banner` blob DEFAULT NULL,
  `datetime` datetime NOT NULL,
  `is_deleted` tinyint(4) NOT NULL,
  `access_type` enum('public','private') NOT NULL,
  `post_type` enum('event','opportunities','normal') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(70) NOT NULL,
  `pword` varchar(100) NOT NULL,
  `fname` varchar(70) NOT NULL,
  `lname` varchar(70) NOT NULL,
  `contactno` varchar(45) DEFAULT NULL,
  `pfp` blob DEFAULT NULL,
  `user_type` enum('alumni','admin','manager') NOT NULL,
  `is_employed` tinyint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `pword`, `fname`, `lname`, `contactno`, `pfp`, `user_type`, `is_employed`) VALUES
(23, '2235008@slu.edu.ph', '$2y$10$h.qOAXckW2ZRXSlWxeuo1uS8Bu2gZKgAQUW9dr6pm.LSS8AmSSNUa', 'Joaquin Gabriel', 'Caparas', NULL, '', 'admin', 1),
(24, 'nic@gmail.com', '$2y$10$mjBl/NJKUNQrNpjHqEMCl.BvGwMHdSaSoMLaggeuOysWfIxbSRX1C', 'Nichole Jhoy', 'Escano', NULL, '', 'admin', 1),
(25, 'mcarino@gmail.com', '$2y$10$5QWR6v6iJkZnd7phAAi.cOrzQsRg9BLtshdESpgreR3w1WJT94hNC', 'Mark Lorenz', 'Carino', NULL, '', 'admin', 1),
(26, 'shiminette@gmail.com', '$2y$10$llywAG4FctnRPcZWhgveUuSEfaPzOl2nFKOSbFv4baMQr6qoXg1UC', 'Minette Victoria', 'Mandac', NULL, '', 'admin', 1),
(27, 'shaine@gmail.com', '$2y$10$tKHzkVXJESOdxNhrFdS.BOh9PTleVTmYhbiumSeY5/ylXsNWnSrYO', 'Ma. Loures Shaine ', 'Razo', NULL, '', 'admin', 1),
(28, 'miguel@gmail.com', '$2y$10$yr.ll27F8XWjA7D3ZR8PIOBIpXhBaUyp3M1PgjS5mwGgppvaS/0eK', 'Carlos Miguel', 'Vergara', NULL, '', 'admin', 1),
(29, 'KD@gmail.com', '$2y$10$3dCQ/2pE3WThcg8T.yT4oey5Z9u4DeOjyuePo/DWvC3y6X6JJrYL6', 'Kevin', 'Durant', NULL, '', 'alumni', 0),
(30, 'lbj@gmail.com', '$2y$10$NpSuW5zuXYfyRbPWYYf7K.NfScPVuXNmVxtJMhS/xhw1FgCeblG.O', 'Lebron ', 'James', NULL, '', 'alumni', 0),
(31, 'mjordan@yahoo.com', '$2y$10$mstXYnipW7/Rf711Kaqe9eoyn6p7.1YrobDxy0C6JyWJ.n3UOcCKi', 'Michael', 'Jordan', NULL, '', 'alumni', 0),
(32, 'patpat@gmail.com', '$2y$10$7NJePCmZCh85ZBHQzIQWyO.21iyCb881xhSrMnrGOIs18xg6vh6XC', 'Patrick Laurence', 'Versoza', NULL, '', 'alumni', 1),
(33, 'dolbus@yahoo.com', '$2y$10$3nUDPIk5rM0ehmMbA5lFT.UN9iEXujoSInc/EiBKZzeb3Vfs5CQOe', 'Jan Dolby ', 'Aquino', NULL, '', 'alumni', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumni`
--
ALTER TABLE `alumni`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `program_idx` (`program`);

--
-- Indexes for table `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`app_id`);

--
-- Indexes for table `changelogs`
--
ALTER TABLE `changelogs`
  ADD PRIMARY KEY (`logid`),
  ADD KEY `user_id_idx` (`user_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comm_id`),
  ADD KEY `post_id_fk_idx` (`post_id`),
  ADD KEY `user_id_fkey_idx` (`user_id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`follower_id`,`followed_id`),
  ADD KEY `followed_id_fk_idx` (`followed_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `post_id_fkey_idx` (`post_id`),
  ADD KEY `user_id_fkey2_idx` (`user_id`);

--
-- Indexes for table `opportunity`
--
ALTER TABLE `opportunity`
  ADD PRIMARY KEY (`opportunity_id`),
  ADD KEY `program_preference_fk_idx` (`program_preference`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `poster_id_idx` (`poster_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applicants`
--
ALTER TABLE `applicants`
  MODIFY `app_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alumni`
--
ALTER TABLE `alumni`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `changelogs`
--
ALTER TABLE `changelogs`
  ADD CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `post_id_fk` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_id_fk` FOREIGN KEY (`event_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `followed_id_fk` FOREIGN KEY (`followed_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follower_id_fk` FOREIGN KEY (`follower_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_id_fkey2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `opportunity`
--
ALTER TABLE `opportunity`
  ADD CONSTRAINT `program_preference_fk` FOREIGN KEY (`program_preference`) REFERENCES `alumni` (`program`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `poster_id` FOREIGN KEY (`poster_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
