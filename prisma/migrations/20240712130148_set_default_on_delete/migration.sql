-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL DEFAULT 1,
    "moduleId" INTEGER,
    "sectionId" INTEGER,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT false,
    "views" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
    CONSTRAINT "article_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "module" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "article_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "section" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_article" ("active", "content", "createdAt", "id", "moduleId", "name", "sectionId", "slug", "updatedAt", "userId", "views") SELECT "active", "content", "createdAt", "id", "moduleId", "name", "sectionId", "slug", "updatedAt", "userId", "views" FROM "article";
DROP TABLE "article";
ALTER TABLE "new_article" RENAME TO "article";
CREATE UNIQUE INDEX "article_id_key" ON "article"("id");
CREATE UNIQUE INDEX "article_slug_key" ON "article"("slug");
CREATE TABLE "new_faq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL DEFAULT 1,
    "ask" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT false,
    "views" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "faq_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE
);
INSERT INTO "new_faq" ("active", "answer", "ask", "createdAt", "id", "slug", "updatedAt", "userId", "views") SELECT "active", "answer", "ask", "createdAt", "id", "slug", "updatedAt", "userId", "views" FROM "faq";
DROP TABLE "faq";
ALTER TABLE "new_faq" RENAME TO "faq";
CREATE UNIQUE INDEX "faq_id_key" ON "faq"("id");
CREATE UNIQUE INDEX "faq_slug_key" ON "faq"("slug");
CREATE TABLE "new_page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL DEFAULT 1,
    "icon" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT false,
    "views" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "page_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE
);
INSERT INTO "new_page" ("active", "content", "createdAt", "icon", "id", "name", "slug", "updatedAt", "userId", "views") SELECT "active", "content", "createdAt", "icon", "id", "name", "slug", "updatedAt", "userId", "views" FROM "page";
DROP TABLE "page";
ALTER TABLE "new_page" RENAME TO "page";
CREATE UNIQUE INDEX "page_id_key" ON "page"("id");
CREATE UNIQUE INDEX "page_slug_key" ON "page"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
