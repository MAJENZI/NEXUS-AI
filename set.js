




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU0reCs4TEtxbStHZmd2Uk9ZNlZKd1NoUzh4eUJSSmNJaTlJcUhuVFVHbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidHR3Y0Z3Y0NvRUxORlNmdGNxMlROeE55emtvUmxUcVVlWjBYWVIxeWkwOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrTVlaSS8yejg5eE9CNnFVMnhSZHNxNkxHb1JHczRoc1ZqWENIeGZrSFVFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVTkVGbHRpWmFLaTkvL1lZUHFzMTRyam5lajRNTVBydWNRa2dFdkJOeVZRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFCU3JpSytmUkxqcDRYVDczWVRxL3hVNTVQZU44MVVJYmFucFJkVStvMXM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjQwc1k0cWMxd3RTSmcyaGhBOWlJN2laRjArZitjWDZqWnRGblNwSnorUUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0tBaExocUtiWTJLbXphdHZwUmpUZUpIOU44cVhuRXJFRkhSSnJ0dVRFMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ3JrNzI0aVJhSVN5cmYraEVLSTZkMFRlRGRJUzBWcTZIcWNNMjNYQXJubz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFLRWp0SGowN1NHZDJid1RLaTVLL1J5R3hqOHV0bnM5TmVPWUMxZ2Ftckx3Rm5nblkzbU5XMmNwakluNFdFbWFBYW5jR2V6MExZVzlQRXQvSkZRcWdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ4LCJhZHZTZWNyZXRLZXkiOiJXZ1FnSFo3UTV1VWhZWWlaSHA0a0ZMK0xYdGtFR2VVYUQ4YTA1ckkraThBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTcxMjI1NDI2N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxQkZBMEMxMDA4QzEyQkM5NTRFMkFEODY4ODgzNjlCNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxNDc1NDAxfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJGNllETkNUQyIsIm1lIjp7ImlkIjoiMjU1NzEyMjU0MjY3OjUyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik1XTC4gTUFKRU5aSSIsImxpZCI6IjIzNTU3NTAxMzU2MDQ3NDo1MkBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0ltQmlPVUdFS0xKbGNNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjNMVjBkUE84OEpDazdCNmVCelZaMFN3RVY2NjB3VmNiNVlnOCtWYzJFU1E9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjdySDVkeTMrd29XT3ZLUUNKK2d1V3F0YjZETXVCOE5oNmZNYkNjWEM0eDJNZU90YXlSdWpyVlpzeXVJem1SakNYaDVUZjh6SXFha0NESG0wWmdpVEFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJQcmdQVTkvRWE4cGlJMzRxMklwSXE3U2Z6UXVEanpnYi9pSDREQkVwMkxFQTUzVTJRY2xyazYxd1lleGNmU1RvWUFsVVFNYUN3QTRyU0dSUXFEVWRnUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTcxMjI1NDI2Nzo1MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkeTFkSFR6dlBDUXBPd2VuZ2MxV2RFc0JGZXV0TUZYRytXSVBQbFhOaEVrIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTE0NzUzNzYsImxhc3RQcm9wSGFzaCI6Im5tM0JiIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFDL3cifQ==',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "MAJENZI🇹🇿",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "25512254266",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'MAJENZI_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "no",
                  AUTO_BIO : process.env.AUTO_BIO || "no",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
