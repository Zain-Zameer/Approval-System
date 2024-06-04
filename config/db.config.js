module.exports = {
    HOST: "localhost",
    PORT: "1433",
    USER: "personal",
    PASSWORD: "setting",
    DB: "approvalSystem",
    dialect: "mssql",
    dialectOptions: {
      options: {
        instanceName: "SQLEXPRESS",
        encrypt:false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  