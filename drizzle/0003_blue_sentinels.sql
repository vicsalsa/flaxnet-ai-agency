CREATE TABLE `article_ratings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`articleId` varchar(64) NOT NULL,
	`userEmail` varchar(320) NOT NULL,
	`rating` int NOT NULL,
	`review` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `article_ratings_id` PRIMARY KEY(`id`)
);
