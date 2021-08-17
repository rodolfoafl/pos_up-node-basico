const config = {
  db: {
    host: "localhost",
    user: "root",
    password: "",
    database: "animal_clinic",
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
    debug: false,
  },
};

module.exports = config;
