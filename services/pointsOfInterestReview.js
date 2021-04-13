const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function create(poi){
  const result = await db.query(
    `INSERT INTO poi_reviews 
    (poi_id, review) 
    VALUES 
    (?,?)`, 
    [poi.name, poi.review]
  );

  let message = 'Error in creating POI';

  if (result.affectedRows) {
    message = 'POI created successfully';
  }

  return {message};
}

module.exports = {
  create
}