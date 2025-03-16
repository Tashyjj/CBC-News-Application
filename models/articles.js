const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

let db;

async function init() {
  try {
    db = await sqlite.open({
      filename: 'database.db',
      driver: sqlite3.Database
    });
  } catch(err) {
      console.error(err);
  }
}

init();

// Return all of the articles

async function getAllArticles() {
  try {
    const results = await db.all("SELECT * FROM Articles");
    return results;
  } catch (err) {
    console.error("Error fetching articles:", err);
    throw err;
  }
}

// async function getAllArticles()
// {
//   let results = await db.all("SELECT * FROM Articles");
//   return results;
// }

// Create a new article given a title, content and username

async function createArticle(article,username) {
  try {
    await db.run(
      "INSERT INTO Articles (title, author, content) VALUES (?, ?, ?)",
      [article.title, username, article.content]
    );
  } catch (err) {
    console.error("Error creating article:", err);
    throw err;
  }
}

// {
//   await db.run("INSERT INTO Articles VALUES (?,?,?)",
//          [article.title, username, article.content]);
// }

module.exports = {getAllArticles
                 ,createArticle};
