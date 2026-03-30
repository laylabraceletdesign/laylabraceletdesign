CREATE TABLE `bulkInquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`inquiryNumber` varchar(50) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`company` varchar(255),
	`quantity` int NOT NULL,
	`eventType` varchar(100),
	`eventDate` varchar(50),
	`customizationDetails` text,
	`message` text,
	`status` enum('new','contacted','quoted','ordered','completed','rejected') DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bulkInquiries_id` PRIMARY KEY(`id`),
	CONSTRAINT `bulkInquiries_inquiryNumber_unique` UNIQUE(`inquiryNumber`)
);
--> statement-breakpoint
CREATE TABLE `cartItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`productId` int NOT NULL,
	`quantity` int NOT NULL DEFAULT 1,
	`customText` varchar(12),
	`selectedColor` varchar(50),
	`selectedSize` varchar(50),
	`price` decimal(10,2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cartItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contactSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`status` enum('new','read','replied','resolved') DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contactSubmissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `customRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`requestNumber` varchar(50) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`description` text NOT NULL,
	`logoUrl` varchar(500),
	`colorPreferences` text,
	`budget` varchar(50),
	`timeline` varchar(100),
	`quantity` int,
	`status` enum('new','reviewing','quoted','in_progress','completed','rejected') DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `customRequests_id` PRIMARY KEY(`id`),
	CONSTRAINT `customRequests_requestNumber_unique` UNIQUE(`requestNumber`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`orderNumber` varchar(50) NOT NULL,
	`status` enum('pending','confirmed','processing','shipped','delivered','cancelled') DEFAULT 'pending',
	`totalAmount` decimal(10,2) NOT NULL,
	`shippingAddress` text,
	`customerEmail` varchar(320) NOT NULL,
	`customerName` varchar(255) NOT NULL,
	`customerPhone` varchar(20),
	`items` json,
	`trackingNumber` varchar(100),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_orderNumber_unique` UNIQUE(`orderNumber`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` varchar(50) NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`originalPrice` decimal(10,2),
	`image` varchar(500),
	`colors` json DEFAULT ('[]'),
	`sizes` json DEFAULT ('[]'),
	`minOrder` int DEFAULT 1,
	`maxOrder` int DEFAULT 5000,
	`isActive` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
