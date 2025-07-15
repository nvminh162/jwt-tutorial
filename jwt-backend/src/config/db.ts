//get the client
import mysql from "mysql2/promise";

//create the connection to database
const getConnection = async () => {
  return await mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "root",
    database: "jwt-tutorial",
  });
};

export default getConnection;
