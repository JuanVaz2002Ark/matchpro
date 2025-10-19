import mysql from 'mysql2/promise'

// Create the connection pool
const matchprodb = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    waitForConnections: process.env.DB_WAITFORCONNECTIONS === 'true',
    connectionLimit: process.env.DB_CONNECTIONLIMIT ? Number(process.env.DB_CONNECTIONLIMIT) : 10,
    queueLimit: process.env.DB_QUEUELIMIT ? Number(process.env.DB_QUEUELIMIT) : 0,
});

export default matchprodb;

