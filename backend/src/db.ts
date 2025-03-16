import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config: sql.config = {
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    server: process.env.DB_SERVER as string,
    database: process.env.DB_NAME as string,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

// Create a single connection pool and reuse it
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log('✅ Connected to MSSQL Database');
        return pool;
    })
    .catch((err) => {
        console.error('❌ Database connection failed:', err);
        return null; // Prevent returning 'void'
    });

export { sql, poolPromise };
