const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name 
    FROM pointsofinterest 
    LIMIT ?,?`, 
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