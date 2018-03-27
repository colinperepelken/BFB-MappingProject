-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 27, 2018 at 07:16 AM
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
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `id` bigint(20) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  `video` varchar(250) DEFAULT NULL,
  `date_added` date DEFAULT NULL,
  `marker` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `description`, `image`, `video`, `date_added`, `marker`) VALUES
(1, 'Harvest blackberries at the industrial park!', 'blackberry.jpg', NULL, '2016-06-29', 4),
(2, '\"Mason Bee Homes\" by eco artist Lori Mairs was a multi-dimensional community art project that focused on the life cycle of mason bees. The community was invited to build homes (large and small)  out of recycled material. Children made bee finger puppets out of gloves, pipe cleaners, and maple keys.  The project also included an 8-foot mason bee life cycle sculpture created by Mairs.', 'mason_bee.jpg', NULL, '2015-09-26', 6),
(3, 'From June through September of 2015, Bee Central, a series of four community art events took place at Brent\\\'s Grist Mill Heritage Park. These art events were meant to give the community of Kelowna a better understanding of the endangered pollinators in the area and was a chance to introduce this underused park to the community. With the help of the City of Kelowna Community Public Art Grant, four artists presented projects at the park. \\n\\n\\nArtists:  Rhonda Neufeld, Samuel Roy-Bois, Sarah Megan Hunter, Lori Mairs.   Producer: Nancy Holmes.  Sponsor: The Eco Art Incubator, City of Kelowna.  Students: Sarah Megan Hunter, Victoria Moore, Jenifer LaFrance.  Community Partners:  Science Opportunity for Kids,  Master Gardeners of the Central Okanagan, MeadowVista Farms, John Gates. ', NULL, 'https://player.vimeo.com/video/148918158?byline=0&portrait=0', NULL, 5),
(4, '\"Small World\" was created by Samuel Roy-Bois, a sculpture professor at UBC-Okanagan. Samuel guided participants to use hand-powered tools, dowels and large coloured wooden which when assembled grew into a large complex three-dimensional structure. This ephemeral structure was meant to represent the fragile ecosystem shared by both humans and pollinators and our deep inter-dependence. This project travelled to our Richmond pasture in June 2016.', 'small_world.jpg', NULL, '2015-07-01', 7),
(5, 'Murmurations was a live performance art piece scripted by Sarah Megan Hunter, a 4th year BA student at UBC-Okanagan, majoring in Creative Writing. Megan recruited local singers and BFA students in Interdisciplinary Performance to create a work that explored indigenous bees and research into Psychomagic, Mexican healing folklore. The live performance encouraged audience members to participate through a procession and by joining the final moments of the performance by coming together and humming.', 'murmurations.jpg', NULL, '2017-08-23', 8),
(6, 'Mason bee is a name now commonly used for species of bees in the genus Osmia, of the family Megachilidae. Mason bees are named for their habit of using mud or other \"masonry\" products in constructing their nests, which are made in naturally occurring gaps such as between cracks in stones or other small dark cavities; when available some species preferentially use hollow stems or holes in wood made by wood-boring insects.', 'mason_bee_eco.jpg', NULL, '2018-03-26', 9),
(7, 'The Bridgeport Industrial Park in Richmond, BC serves as the pilot pasture for the project. The park is set within the Richmond Bath Slough catchment area. and is made possible through partnerships with Emily Carr University of Art + Design, the City of Richmond (Parks Department, Sustainability Unit, and Public Art Program), BC Hydro, West Coast Seeds, Vancity and TD Friends of the Environment. As the pilot pasture, this important initiative allows the research team to develop a blueprint for future projects while transforming Bridgeport Industrial Park into a dramatically enhanced site. The project utilizes public art methodologies to produce an aesthetically pleasing wildflower pasture, engage the surrounding community, and create sustainable habitat for the benefit of wild pollinators.', 'bridgeport_pasture.jpg', NULL, '2018-03-26', 3);

-- --------------------------------------------------------

--
-- Table structure for table `content_contributors`
--

CREATE TABLE `content_contributors` (
  `content` bigint(20) NOT NULL,
  `contributor` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `contributor`
--

CREATE TABLE `contributor` (
  `id` bigint(20) NOT NULL,
  `name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `layer`
--

CREATE TABLE `layer` (
  `id` bigint(20) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `layer`
--

INSERT INTO `layer` (`id`, `name`) VALUES
(1, 'Ecological'),
(2, 'Historical'),
(3, 'Workshops'),
(4, 'Community Events'),
(5, 'Volunteer Activities'),
(6, 'Community Experiences');

-- --------------------------------------------------------

--
-- Table structure for table `marker`
--

CREATE TABLE `marker` (
  `id` bigint(20) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  `type` bigint(20) NOT NULL,
  `layer` bigint(20) DEFAULT NULL,
  `parent` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `marker`
--

INSERT INTO `marker` (`id`, `latitude`, `longitude`, `name`, `image`, `type`, `layer`, `parent`) VALUES
(1, '49.88800000', '-119.49600000', 'Kelowna', 'kelowna.png', 1, NULL, NULL),
(2, '49.16660000', '-123.13360000', 'Richmond', 'richmond.png', 1, NULL, NULL),
(3, '49.19027500', '-123.08685900', 'Bridgeport Industrial Park', 'bridgeport.png', 2, NULL, 2),
(4, '49.19035700', '-123.08805300', 'Blackberry Harvest', 'blackberry.png', 3, 4, 3),
(5, '49.88699500', '-119.43956700', 'Brent\'s Grist Mill', 'grist-mill.png', 2, NULL, 1),
(6, '49.88705500', '-119.44052700', 'Mason Bee Homes', 'workshops.png', 3, 3, 5),
(7, '49.88743600', '-119.43819300', 'Small World', 'workshops.png', 3, 3, 5),
(8, '49.88642300', '-119.43837700', 'Murmurations', 'community_events.png', 3, 4, 5),
(9, '49.88747400', '-119.43896700', 'Mason Bee', 'mason_bee.png', 3, 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `id` bigint(20) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`id`, `name`) VALUES
(1, 'City'),
(2, 'Site'),
(3, 'Feature');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`id`),
  ADD KEY `marker` (`marker`);

--
-- Indexes for table `content_contributors`
--
ALTER TABLE `content_contributors`
  ADD PRIMARY KEY (`content`,`contributor`);

--
-- Indexes for table `contributor`
--
ALTER TABLE `contributor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `layer`
--
ALTER TABLE `layer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `marker`
--
ALTER TABLE `marker`
  ADD PRIMARY KEY (`id`),
  ADD KEY `layer` (`layer`),
  ADD KEY `parent` (`parent`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `contributor`
--
ALTER TABLE `contributor`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `layer`
--
ALTER TABLE `layer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `marker`
--
ALTER TABLE `marker`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `content`
--
ALTER TABLE `content`
  ADD CONSTRAINT `content_ibfk_1` FOREIGN KEY (`marker`) REFERENCES `marker` (`id`);

--
-- Constraints for table `content_contributors`
--
ALTER TABLE `content_contributors`
  ADD CONSTRAINT `content_contributors_ibfk_1` FOREIGN KEY (`content`) REFERENCES `content` (`id`);

--
-- Constraints for table `marker`
--
ALTER TABLE `marker`
  ADD CONSTRAINT `marker_ibfk_1` FOREIGN KEY (`layer`) REFERENCES `layer` (`id`),
  ADD CONSTRAINT `marker_ibfk_2` FOREIGN KEY (`parent`) REFERENCES `marker` (`id`),
  ADD CONSTRAINT `marker_ibfk_3` FOREIGN KEY (`type`) REFERENCES `type` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
