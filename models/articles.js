const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database('./database.db');

// Return all of the articles
function getAllArticles() {
  return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Articles';
      db.all(query, [], (err, rows) => {
          if (err) {
              return reject(err);
          }
          resolve(rows);
      });
  });
}

//delete article using ID
function deleteArticle(articleId) {
  return new Promise((resolve, reject) => {
      const query = 'DELETE FROM Articles WHERE id = ?';
      db.run(query, [articleId], function(err) {
          if (err) {
              return reject(err);
          }
          resolve();
      });
  });
}

//deleting article using author
function deleteArticlesByAuthor(author) {
  return new Promise((resolve, reject) => {
      const query = 'DELETE FROM Articles WHERE author = ?';
      db.run(query, [author], function(err) {
          if (err) {
              return reject(err);
          }
          resolve();
      });
  });
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
                  ,deleteArticle
                  ,deleteArticlesByAuthor
                 ,createArticle};
