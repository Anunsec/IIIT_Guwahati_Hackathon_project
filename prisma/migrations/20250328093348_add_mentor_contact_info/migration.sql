/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `mentors` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "mentors" ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "mentors_email_key" ON "mentors"("email");
