const env = process.env;

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || 'freedb.tech',
    user: env.DB_USER || 'freedbtech_JustGinger',
    password: env.DB_PASSWORD || 'A.v77xa9Us.iBr!',
    database: env.DB_NAME || 'freedbtech_PointsOfIntrest',
  },
  listPerPage: env.LIST_PER_PAGE || 10000,
};


module.exports = config;