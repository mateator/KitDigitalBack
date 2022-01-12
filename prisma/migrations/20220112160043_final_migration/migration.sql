-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `delegacionId` INTEGER NOT NULL,
    `rol` ENUM('ADMIN', 'USER') NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Solicitud` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asignado` BOOLEAN NOT NULL DEFAULT false,
    `delegacionId` INTEGER NOT NULL,
    `comercial` VARCHAR(191) NULL,
    `contactado` BOOLEAN NOT NULL DEFAULT false,
    `presupuestado` BOOLEAN NOT NULL DEFAULT false,
    `tramitado` BOOLEAN NOT NULL DEFAULT false,
    `cliente` VARCHAR(191) NOT NULL,
    `contacto` VARCHAR(191) NOT NULL,
    `telefono` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `observaciones` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Delegacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ubicacion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SolicitudInteres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `solicitudId` INTEGER NOT NULL,
    `interesId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_delegacionId_fkey` FOREIGN KEY (`delegacionId`) REFERENCES `Delegacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitud` ADD CONSTRAINT `Solicitud_delegacionId_fkey` FOREIGN KEY (`delegacionId`) REFERENCES `Delegacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SolicitudInteres` ADD CONSTRAINT `SolicitudInteres_solicitudId_fkey` FOREIGN KEY (`solicitudId`) REFERENCES `Solicitud`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SolicitudInteres` ADD CONSTRAINT `SolicitudInteres_interesId_fkey` FOREIGN KEY (`interesId`) REFERENCES `Interes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
