-- CreateTable
CREATE TABLE "produkty" (
    "id" SERIAL NOT NULL,
    "nazwa" TEXT NOT NULL,
    "cena" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "produkty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artykuly" (
    "id" SERIAL NOT NULL,
    "tytul" TEXT NOT NULL,
    "tresc" TEXT NOT NULL,

    CONSTRAINT "artykuly_pkey" PRIMARY KEY ("id")
);
