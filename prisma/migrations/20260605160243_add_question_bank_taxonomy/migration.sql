/*
  Warnings:

  - A unique constraint covering the columns `[importKey]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('JEE_MAIN', 'CAT');

-- CreateEnum
CREATE TYPE "Subject" AS ENUM ('PHYSICS', 'CHEMISTRY', 'MATHEMATICS', 'VARC', 'DILR', 'QA');

-- CreateEnum
CREATE TYPE "QuestionSetType" AS ENUM ('RC_PASSAGE', 'DILR_SET', 'STANDALONE');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "correctAnswer" TEXT,
ADD COLUMN     "exam" "ExamType",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "importKey" TEXT,
ADD COLUMN     "optionA" TEXT,
ADD COLUMN     "optionB" TEXT,
ADD COLUMN     "optionC" TEXT,
ADD COLUMN     "optionD" TEXT,
ADD COLUMN     "paperName" TEXT,
ADD COLUMN     "questionNumber" INTEGER,
ADD COLUMN     "questionSetId" TEXT,
ADD COLUMN     "session" TEXT,
ADD COLUMN     "shift" TEXT,
ADD COLUMN     "slot" TEXT,
ADD COLUMN     "solutionImageUrl" TEXT,
ADD COLUMN     "sourceName" TEXT,
ADD COLUMN     "sourceUrl" TEXT,
ADD COLUMN     "sourceYear" INTEGER,
ADD COLUMN     "subject" "Subject",
ADD COLUMN     "year" INTEGER;

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "exam" "ExamType",
ADD COLUMN     "session" TEXT,
ADD COLUMN     "shift" TEXT,
ADD COLUMN     "slot" TEXT,
ADD COLUMN     "totalMarks" DOUBLE PRECISION,
ADD COLUMN     "year" INTEGER;

-- CreateTable
CREATE TABLE "QuestionSet" (
    "id" TEXT NOT NULL,
    "importKey" TEXT,
    "exam" "ExamType" NOT NULL,
    "year" INTEGER,
    "slot" TEXT,
    "section" "Subject",
    "title" TEXT NOT NULL,
    "setType" "QuestionSetType" NOT NULL DEFAULT 'STANDALONE',
    "content" TEXT NOT NULL,
    "sourceName" TEXT,
    "sourceUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionSet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionSet_importKey_key" ON "QuestionSet"("importKey");

-- CreateIndex
CREATE INDEX "QuestionSet_exam_section_idx" ON "QuestionSet"("exam", "section");

-- CreateIndex
CREATE UNIQUE INDEX "Question_importKey_key" ON "Question"("importKey");

-- CreateIndex
CREATE INDEX "Question_exam_subject_topic_idx" ON "Question"("exam", "subject", "topic");

-- CreateIndex
CREATE INDEX "Question_subject_idx" ON "Question"("subject");

-- CreateIndex
CREATE INDEX "Question_questionSetId_idx" ON "Question"("questionSetId");

-- CreateIndex
CREATE INDEX "Test_exam_year_idx" ON "Test"("exam", "year");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_questionSetId_fkey" FOREIGN KEY ("questionSetId") REFERENCES "QuestionSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
