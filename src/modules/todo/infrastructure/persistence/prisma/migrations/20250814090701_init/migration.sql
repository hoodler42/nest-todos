-- CreateTable
CREATE TABLE "migrations"
(
    "id"        SERIAL  NOT NULL,
    "timestamp" BIGINT  NOT NULL,
    "name"      VARCHAR NOT NULL,

    CONSTRAINT "migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todo"
(
    "id"         TEXT         NOT NULL,
    "title"      TEXT         NOT NULL,
    "is_done"    BOOLEAN      NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
