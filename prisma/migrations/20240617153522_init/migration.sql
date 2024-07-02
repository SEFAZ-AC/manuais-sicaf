-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "active" BOOLEAN DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "module" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "moduleId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "section_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "module" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "moduleId" INTEGER,
    "sectionId" INTEGER,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT false,
    "views" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "article_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "module" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "article_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "section" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "icon" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT false,
    "views" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "page_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "faq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "ask" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT false,
    "views" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "faq_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "articleId" INTEGER,
    "faqId" INTEGER,
    "isPositive" BOOLEAN NOT NULL,
    "feedback" TEXT,
    "email" TEXT,
    "new" BOOLEAN DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "feedback_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "feedback_faqId_fkey" FOREIGN KEY ("faqId") REFERENCES "faq" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "module_id_key" ON "module"("id");

-- CreateIndex
CREATE UNIQUE INDEX "module_slug_key" ON "module"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "section_id_key" ON "section"("id");

-- CreateIndex
CREATE UNIQUE INDEX "article_id_key" ON "article"("id");

-- CreateIndex
CREATE UNIQUE INDEX "article_slug_key" ON "article"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "page_id_key" ON "page"("id");

-- CreateIndex
CREATE UNIQUE INDEX "page_slug_key" ON "page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "faq_id_key" ON "faq"("id");

-- CreateIndex
CREATE UNIQUE INDEX "faq_slug_key" ON "faq"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "feedback_id_key" ON "feedback"("id");
