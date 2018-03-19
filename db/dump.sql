-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 19, 2018 at 07:52 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bfb`
--

-- --------------------------------------------------------

--
-- Table structure for table `layer`
--

CREATE TABLE `layer` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `is_default` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `layer`
--

INSERT INTO `layer` (`id`, `name`, `is_default`) VALUES
(1, 'Ecology', 0),
(2, 'Historical', 0),
(3, 'Project', 1);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `name` varchar(50) NOT NULL,
  `marker_image` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `latitude`, `longitude`, `name`, `marker_image`) VALUES
(1, '49.88800000', '-119.49600000', 'Kelowna', 'kelowna.jpg'),
(2, '49.16660000', '-123.13360000', 'Richmond', 'richmond.png');

-- --------------------------------------------------------

--
-- Table structure for table `marker`
--

CREATE TABLE `marker` (
  `id` int(11) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `marker_image` varchar(250) DEFAULT NULL,
  `content_image` varchar(250) DEFAULT NULL,
  `content_video` varchar(250) DEFAULT NULL,
  `content_text` varchar(2000) DEFAULT NULL,
  `date_added` date DEFAULT NULL,
  `layer` int(11) NOT NULL,
  `site` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `marker`
--

INSERT INTO `marker` (`id`, `latitude`, `longitude`, `name`, `marker_image`, `content_image`, `content_video`, `content_text`, `date_added`, `layer`, `site`) VALUES
(1, '49.88642300', '-119.43837700', 'Murmurations', 'murmurations.png', 'murmurations.jpg', NULL, 'Murmurations was a live performance art piece scripted by Sarah Megan Hunter, a 4th year BA student at UBC-Okanagan, majoring in Creative Writing. Megan recruited local singers and BFA students in Interdisciplinary Performance to create a work that explored indigenous bees and research into Psychomagic, Mexican healing folklore. The live performance encouraged audience members to participate through a procession and by joining the final moments of the performance by coming together and humming. ', '2017-08-23', 3, 1),
(2, '49.88751200', '-119.43944300', 'A Swarm in June', 'swarm.png', 'swarm.jpg', NULL, '\"A Swarm in June\" by Armstrong\'s artist Rhonda Neufeld was a hands-on afternoon creating mechanical and decorative paper bees out of recyclable material. A real life honey bee observation hive was also brought onto the site by master beekeeper John Gates. UBC\'s performance professor Denise Kenney created a series of bee dances for children and their families to perform. Many community groups were also present on site such as Science Opportunity for Kids, the Master Gardeners of the Central Okanagan and MeadowVista Farms.\n', '2015-06-01', 3, 1),
(3, '49.88743600', '-119.43819300', 'Small World', 'small_world.png', 'small_world.jpg', '', '\"Small World\" was created by Samuel Roy-Bois, a sculpture professor at UBC-Okanagan. Samuel guided participants to use hand-powered tools, dowels and large coloured wooden which when assembled grew into a large complex three-dimensional structure. This ephemeral structure was meant to represent the fragile ecosystem shared by both humans and pollinators and our deep inter-dependence. This project travelled to our Richmond pasture in June 2016.\r\n', '2015-07-01', 3, 1),
(4, '49.88694500', '-119.43991500', 'Mason Bee Homes', 'mason_bee.png', 'mason_bee.jpg', NULL, '\"Mason Bee Homes\" by eco artist Lori Mairs was a multi-dimensional community art project that focused on the life cycle of mason bees. The community was invited to build homes (large and small)  out of recycled material. Children made bee finger puppets out of gloves, pipe cleaners, and maple keys.  The project also included an 8-foot mason bee life cycle sculpture created by Mairs.', '2015-09-26', 3, 1),
(5, '49.19035700', '-123.08805300', 'Blackberry Harvest', 'blackberry.png', 'blackberry.jpg', NULL, 'Harvest blackberries at the Industrial Park!', '2016-06-29', 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `site`
--

CREATE TABLE `site` (
  `id` int(11) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  `video` varchar(250) DEFAULT NULL,
  `marker_image` varchar(250) DEFAULT NULL,
  `background_image` varchar(250) DEFAULT NULL,
  `location` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `site`
--

INSERT INTO `site` (`id`, `latitude`, `longitude`, `name`, `description`, `image`, `video`, `marker_image`, `background_image`, `location`) VALUES
(1, '49.88699500', '-119.43956700', 'Brent\'s Grist Mill', 'From June through September of 2015, Bee Central, a series of four community art events took place at Brent\'s Grist Mill Heritage Park. These art events were meant to give the community of Kelowna a better understanding of the endangered pollinators in the area and was a chance to introduce this underused park to the community. With the help of the City of Kelowna Community Public Art Grant, four artists presented projects at the park. \n\n\nArtists:  Rhonda Neufeld, Samuel Roy-Bois, Sarah Megan Hunter, Lori Mairs.   Producer: Nancy Holmes.  Sponsor: The Eco Art Incubator, City of Kelowna.  Students: Sarah Megan Hunter, Victoria Moore, Jenifer LaFrance.  Community Partners:  Science Opportunity for Kids,  Master Gardeners of the Central Okanagan, MeadowVista Farms, John Gates. ', NULL, 'https://player.vimeo.com/video/148918158?byline=0&portrait=0', 'grist-mill_marker.png', 'grist-mill_background.jpg', 1),
(2, '49.19027500', '-123.08685900', 'Bridgeport Industrial Park', 'Description of this site.', NULL, NULL, 'bridgeport_marker.png', 'bridgeport_background.png', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `layer`
--
ALTER TABLE `layer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `marker`
--
ALTER TABLE `marker`
  ADD PRIMARY KEY (`id`),
  ADD KEY `layer` (`layer`),
  ADD KEY `site` (`site`);

--
-- Indexes for table `site`
--
ALTER TABLE `site`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location` (`location`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `layer`
--
ALTER TABLE `layer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `marker`
--
ALTER TABLE `marker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `site`
--
ALTER TABLE `site`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `marker`
--
ALTER TABLE `marker`
  ADD CONSTRAINT `marker_ibfk_1` FOREIGN KEY (`layer`) REFERENCES `layer` (`id`),
  ADD CONSTRAINT `marker_ibfk_2` FOREIGN KEY (`site`) REFERENCES `site` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
