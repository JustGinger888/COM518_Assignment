const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function create(poi){
  const result = await db.query(
    `INSERT INTO pointsofinterest 
    (name, type, country, region, lon, lat, description, recommendations) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?)`, 
    [poi.name,poi.type,poi.country,poi.region,poi.lon,poi.lat,poi.description, 1]
  );

  let message = 'Error in creating programming language';

  if (result.affectedRows) {
    message = 'Programming language created successfully';
  }

  return {message};
}

module.exports = {
  create
}