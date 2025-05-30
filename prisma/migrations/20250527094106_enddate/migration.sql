-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "endDate" DROP NOT NULL;

-- DropEnum
DROP TYPE "PLAN_DURATION";
