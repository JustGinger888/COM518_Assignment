const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1, region){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, type, description, recommendations, lon, lat
    FROM pointsofinterest 
    WHERE region='${region}'`, 
    [offset, config.listPerPage]
  );
  
  const data = helper.emptyOrRows(rows);

  return {
    data,
    
  }
}

module.exports = {
  getMultiple
}