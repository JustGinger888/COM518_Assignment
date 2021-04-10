const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function increment(page = 1, id) {
  const offset = helper.getOffset(page, config.listPerPage);
  await db.query(
    `UPDATE pointsofinterest
    SET recommendations = recommendations + 1 
    WHERE ID='${id}'`,
    [offset, config.listPerPage]
  );
  const rows = await db.query(
    `SELECT id, name, recommendations
    FROM pointsofinterest 
    WHERE ID='${id}'`,
    [offset, config.listPerPage]
  );

  const data = helper.emptyOrRows(rows);

  return {
    data,

  }
}

module.exports = {
  increment
}