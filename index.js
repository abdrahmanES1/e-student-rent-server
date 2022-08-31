const app = require('./src/app.js')
const errorMiddleware = require('./src/middlewares/error.middleware.js')
const authRoute = require('./src/routes/auth.route.js');
const universitiesRoute = require('./src/routes/university.route.js')
const reviewsRoute = require('./src/routes/review.route.js')
const UsersRoute = require('./src/routes/user.route.js')
const localsRoute = require('./src/routes/local.route.js')
const uploadsRoute = require('./src/routes/upload.route.js')

app.use("/api/auth", authRoute);
app.use("/api", universitiesRoute);
app.use("/api", reviewsRoute);
app.use("/api", UsersRoute);
app.use("/api", localsRoute);
app.use("/api", uploadsRoute);

app.use(errorMiddleware)

process.on('unhandledRejection', (err, promise) => {
    console.log(err);
    process.exit(1);
});