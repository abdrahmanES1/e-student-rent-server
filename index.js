const app = require('./src/app.js')
const errorMiddleware = require('./src/middlewares/error.middleware.js')
const authRoute = require('./src/routes/auth.route.js');
const universitiesRoute = require('./src/routes/university.route.js')
const reviewsRoute = require('./src/routes/review.route.js')

app.use("/api/auth", authRoute);
app.use("/api", universitiesRoute);
app.use("/api", reviewsRoute);

app.use(errorMiddleware)