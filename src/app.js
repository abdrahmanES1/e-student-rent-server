const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('../config/database')
const fileUpload = require('express-fileupload');
const cluster = require('cluster');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error.middleware');
const numCPUs = require('node:os').cpus().length;
require('dotenv').config({ path: __dirname + '/../.env' }) 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const app = express();
const PORT = process.env.PORT || 4000;
app.use(helmet());
app.use(fileUpload());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(errorMiddleware);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
connectDB();
app.listen(PORT, async() => {
    console.log(`server running in  http://localhost:${PORT}/api/`);
})

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

module.exports =  app;