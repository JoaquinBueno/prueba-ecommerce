require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    sentryDns: process.env.SENTRY_DNS,
    authAdminUsername: process.env.AUTH_ADMIN_USERNAME,
    authAdminPassword: process.env.AUTH_ADMIN_PASSWORD,
    authAdminEmail: process.env.AUTH_ADMIN_EMAIL,
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    accesTokenMP: process.env.TEST_ACCESS_TOKEN,
    backBlazeID: process.env.B2_ID,
    backBlazeKey: process.env.B2_KEY,
    backBlazeBucket: process.env.B2_BUCKET
}

module.exports = {config}