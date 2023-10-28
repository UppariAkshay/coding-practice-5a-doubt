const express = require("express");
const app = express();
app.use(express.json());

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");

let database = null;
const databasePath = path.join(__dirname, "moviesData.db");

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000);
  } catch (error) {
    console.log(`database error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.get("/movies/", async (request, response) => {
  const sqlQuery = `
    SELECT movie_name
    FROM movie`;

  const listOfMovieNames = await database.all(sqlQuery);
  response.send(listOfMovieNames);
});
