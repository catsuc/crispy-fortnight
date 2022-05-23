-- CreateTable
CREATE TABLE "emails" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "target_email" TEXT NOT NULL,
    "target_date" TIMESTAMP(3) NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emails_pkey" PRIMARY KEY ("id")
);
