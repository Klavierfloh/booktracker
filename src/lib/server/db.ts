import Database from 'better-sqlite3';
const db = new Database('mydb.sqlite');

// Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS Author (
    AuthorId INTEGER PRIMARY KEY,
    LastName TEXT,
    FirstName TEXT
  );

  CREATE TABLE IF NOT EXISTS Book (
    BookId INTEGER PRIMARY KEY,
    PartOfSeries INTEGER,
    PageCount INTEGER,
    TimesRead INTEGER,
    Cover TEXT,
    Name TEXT,
    CurrentPage INTEGER,
    Author_AuthorId INTEGER NOT NULL,
    FOREIGN KEY (Author_AuthorId) REFERENCES Author (AuthorId)
      ON DELETE NO ACTION ON UPDATE NO ACTION
  );
`);

// Safe seed
db.prepare(`
  INSERT OR IGNORE INTO Author (AuthorId, LastName, FirstName)
  VALUES (1, 'Orwell', 'George')
`).run();

db.prepare(`
  INSERT OR IGNORE INTO Book (BookId, PartOfSeries, PageCount, TimesRead, Cover, Name, CurrentPage, Author_AuthorId)
  VALUES (1, 0, 328, 2, 'cover.jpg', '1984', 10, 1);
`).run();

db.prepare(`
  INSERT OR IGNORE INTO Book (BookId, PartOfSeries, PageCount, TimesRead, Cover, Name, CurrentPage, Author_AuthorId)
  VALUES (2, 3, 4634, 0, 'nextCover.jpg', 'testbuch', 10, 1);`).run();

export default db;
