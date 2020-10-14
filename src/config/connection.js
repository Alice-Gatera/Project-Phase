import Sequelize from 'sequelize';

// production database credentials
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT} = process.env;

var db
// local database credentials
const { LOCAL_DB_NAME, LOCAL_DB_USERNAME, LOCAL_DB_PASSWORD, LOCAL_DB_HOST, LOCAL_DB_PORT} = process.env;
if((process.env.NODE_ENV).trim() === "development"){
  /**during set up i set postgres to work on port 5000
   * So, you put it on 5432 if you used default port locally 
  */
  db = new Sequelize(LOCAL_DB_NAME, LOCAL_DB_USERNAME, LOCAL_DB_PASSWORD, {
    host: LOCAL_DB_HOST,
    port: LOCAL_DB_PORT,
    dialect: 'postgres',
    /** In localhost this causes SSL connection error */
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false
    //   }
    // },
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    }
  });
}else{
  // Production setup
  db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    }
  });
}



export default db;
