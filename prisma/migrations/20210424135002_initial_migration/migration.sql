-- CreateTable
CREATE TABLE "facility" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "facility_name" VARCHAR(256) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "zip_code" VARCHAR(10) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inmate_conact" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "inmate_id" VARCHAR(255) NOT NULL,
    "facility_name" VARCHAR(255) NOT NULL,
    "facility_state" VARCHAR(100) NOT NULL,
    "facility_city" VARCHAR(100) NOT NULL,
    "facility_zip_code" VARCHAR(10) NOT NULL,
    "creator_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inmate_contact_image" (
    "inmate_contact_id" INTEGER NOT NULL,
    "image" BYTEA NOT NULL,
    "mimetype" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("inmate_contact_id")
);

-- CreateTable
CREATE TABLE "inmate_mailing_address" (
    "inmate_contact_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "mailing_address" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("inmate_contact_id","order")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "name" VARCHAR(256) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_image" (
    "user_id" INTEGER NOT NULL,
    "image" BYTEA NOT NULL,
    "mimetype" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

-- AddForeignKey
ALTER TABLE "inmate_conact" ADD FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inmate_contact_image" ADD FOREIGN KEY ("inmate_contact_id") REFERENCES "inmate_conact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inmate_mailing_address" ADD FOREIGN KEY ("inmate_contact_id") REFERENCES "inmate_conact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_image" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
