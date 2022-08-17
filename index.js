const app = require('./src/app.js')
const errorMiddleware = require('./src/middlewares/error.middleware.js')
const authRoute = require('./src/routes/auth.route.js');
const universitiesRoute = require('./src/routes/university.route.js')


app.use("/api/auth", authRoute);
app.use("/api", universitiesRoute);
app.use(errorMiddleware)