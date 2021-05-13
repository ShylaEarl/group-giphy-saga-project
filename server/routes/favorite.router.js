const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const sqlCommand = `SELECT * FROM favorites`
  pool
  .query( sqlCommand )
  .then((results) => {
    res.send( results.row );
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log(`Error on getting favorites: ${error}`);
    res.sendStatus(500);
  })
});

// add a new favorite
router.post('/', (req, res) => {

  const newFav = req.body;
  const sqlQuery = `INSERT INTO "favorites("url", "favorite) VALUES ($1, $2)`

  pool
  .query( sqlQuery, [newFav.url, newFav.favorite] )
  .then((result) => {
    console.log('Success in POSTing...', result);
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('Error in POST', error);
    res.sendStatus(500);
  })
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
