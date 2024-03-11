import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    //host: 'localhost',
    port: 13027,
    user: 'vlog_user',
    database: 'vlog_db',
    password: 'vlog_password',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool
