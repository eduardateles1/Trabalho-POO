-- CreateTable
CREATE TABLE "mensagem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "publicado" BOOLEAN NOT NULL,
    "qtdLikes" INTEGER NOT NULL
);
