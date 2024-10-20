-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2024 at 07:28 PM
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
(1, 2235008, 2024, 'BSIT'),
(2, 2000, 2004, ''),
(3, 0, 0, ''),
(4, 203971, 0, '2008');

-- --------------------------------------------------------

--
-- Table structure for table `applicants`
--

CREATE TABLE `applicants` (
  `app_id` int(11) NOT NULL,
  `lname` varchar(70) NOT NULL,
  `fname` varchar(70) NOT NULL,
  `email` varchar(70) NOT NULL,
  `pword` varchar(45) NOT NULL,
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
(1, 'a', 'a', '2235008@slu.edu.ph', '$2y$10$n7HoJcFhriN9WivEI1FTke0aPtLOHFSdj/Ahr.', 'Bachelor of Science in Computer Science', 2011, 12, '', 0),
(2, 'Escano', 'Nichole Jhoy', 'nic@gmail.com', '$2y$10$vCkPwLiM8zlfDdC/2bFzSuoX6XWKNYfEBASxiS', 'Bachelor of Science in Information Technology', 2024, 2203455, '', 0),
(3, 'DeMesa', 'Rovic Louie', 'rvic@yahoo.com', '$2y$10$q8jDD6qkkZA5acnYEK81Qe3/uiSMwmueFlqIq2', 'Bachelor of Science in Information Technology', 2011, 201789, '', 0),
(4, 'Cerezo', 'Albeth', 'albeth@gmail.com', '$2y$10$xI9dYE4jkxzFCToOefjXbO5LnQTO3/RwNVL2wp', 'Bachelor of Arts in Business Administration', 2023, 2193123, '', 0),
(5, 'Mandac', 'Minette Victoria', 'shiminette@gmail.com', '$2y$10$jmks5Pq6ebjeHrEvkKx0j.Oz67MVpBzisNJZUp', 'Bachelor of Science in Computer Science', 2022, 218031, '', 0),
(6, 'Vergara', 'Carlos Miguel', 'carcar@yahoo.com', '$2y$10$rNl0yAzZGGxzlGP/HAd8Je25E73Gtoac6EfOxD', 'Bachelor of Science in Information Technology', 2004, 2003233, '', 0),
(7, 'Carino', 'Mark Lorenz', 'makmak@gmail.com', '$2y$10$/IC6c.v2USxZU.z9RhAcCewEHWLD7sqHHcNWrQ', 'Bachelor of Science in Information Technology', 2024, 231231, '', 0),
(8, 'Razo', 'Ma. Lourdes Shaine', 'shaine@gmail.com', '$2y$10$8Wg8oPOeq.ND/tOHXFNByOUQv5rkFDcuDFgjyR', 'Bachelor of Science in Nursing', 2007, 234212, '', 0),
(9, '', '', 'tay@yahoo.com', '$2y$10$yiDMBkci1rSaZcAXpT0gB.YuD4ceYabsfdxvBu', 'Bachelor of Arts in Psychology', 0, 0, '', 0),
(10, '', '', 'tay@yahoo.com', '$2y$10$47tzzwGJ/rPpTD2YrBiMsOy6M63nuqvbymJ7nl', 'Bachelor of Arts in Psychology', 0, 0, '', 0),
(11, '', '', 'tay@yahoo.com', '$2y$10$yLHU5UsoaXr7DA9VV1Gi4ulheUfIIRAqfAhBhJ', 'Bachelor of Arts in Psychology', 0, 0, '', 0),
(12, '', '', 'tay@yahoo.com', '$2y$10$8tsUc5jm./hahCSN4HvPIOo1j1pOuspFnCK6ky', 'Bachelor of Arts in Business Administration', 0, 0, '', 0);

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
(1, '2235008@slu.edu.ph', '$2y$10$o4PV2eLiVkbMgSTPqrTGueokIi60z57YDSM24bYkA4B7Swm8/gSuC', 'Joaquin Gabriel', 'Caparas', '09821289', '', 'admin', 0),
(2, 'tay@yahoo.com', '$2y$10$4QhPz12CSvIHgPAkKmj3z.IqOdsZVthB7VbbuZ', 'Taylor', 'Swift', NULL, '', 'alumni', 0),
(3, 'nic@gmail.com', '$2y$10$BhOyo1ATeOIICylHUgXDZOT.hjxSx5wCvr/mW4', 'Patrick Laurence', 'Versoza', NULL, '', 'alumni', 0),
(4, 'king@gmail.com', '$2y$10$o8nM6yDkMvnDFPHy6FAtqevQMyZa6OrHUUNOpP', 'Lebron', 'James', NULL, '', 'alumni', 0),
(5, 'joaquingabriel803@gmail.com', '$2y$10$vAuOxApbRLqR9JwlVRVMw.I0bRS1vcs5/DtaK7', 'Kin', 'Gabriel', NULL, '', 'admin', 0),
(6, 'joaquingabriel@gmail.com', '$2y$10$lp5AvmaO4AuQx7pUfgWKP.x3wXy6cEAS0mCLcl', 'Kin', 'Matias', NULL, '', 'admin', 0),
(7, '1@1', '$2y$10$aRrtGcmwfuc7pe/mALHb.uRuB2ve7khDyjdgFp', '1', '1', NULL, '', 'admin', 0),
(8, 'joaquin@gmail.com', '$2y$10$hjSZYKVAwmpn1Pd30VEMy.7.VOoLYfn7Gx1sPs', 'Gab', 'Caparas', NULL, '', 'admin', 0),
(9, 'mj@gmail.com', '$2y$10$o4PV2eLiVkbMgSTPqrTGueokIi60z57YDSM24bYkA4B7Swm8/gSuC', 'Michael', 'Jordan', NULL, '', 'admin', 0);

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
  MODIFY `app_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
