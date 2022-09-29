const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('../config/database')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const rateLimiterUsingThirdParty = require('./middlewares/rateLimiter');
require('dotenv').config({ path: __dirname + '/../.env' })

const PORT = process.env.PORT || 4000;

function createServer() {
    const app = express();
    app.use(helmet());
    app.use(fileUpload());

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
    if (process.env.NODE_ENV === 'production') {
        app.use(rateLimiterUsingThirdParty);
    }


    app.use(express.json());
    app.use(cors({ origin: process.env.CLIENT_URL }))


    const conn = async () => {
    }
    if (process.env.NODE_ENV !== 'test') {
        connectDB(async () => {
            await app.listen(PORT, async () => {
                console.log(`server running in  http://localhost:${PORT}/api/`);
            })
        });
    }
     

    return app
}







// if (cluster.isPrimary) {
//     console.log(`Primary ${process.pid} is running`);
//     connectDB();

//     // Fork workers.
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`worker ${worker.process.pid} died`);
//     });

//     cluster.on('online', function (worker) {
//         console.log('Worker ' + worker.process.pid + ' is online');
//     });

// } else{

//     app.listen(PORT, () => {
//         console.log(`server running in port ${PORT}`);
//     })

// }

module.exports = createServer;