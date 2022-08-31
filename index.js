const app = require('./src/app.js')
const errorMiddleware = require('./src/middlewares/error.middleware.js')
const authRoute = require('./src/routes/auth.route.js');
const universitiesRoute = require('./src/routes/university.route.js')
const reviewsRoute = require('./src/routes/review.route.js')
const UsersRoute = require('./src/routes/user.route.js')
const localsRoute = require('./src/routes/local.route.js')
const uploadsRoute = require('./src/routes/upload.route.js')
const mailerRoute = require('./src/routes/mailer.route.js')

app.use("/api/auth", authRoute);
app.use("/api/universities", universitiesRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/users", UsersRoute);
app.use("/api/locals", localsRoute);
app.use("/api/uploads", uploadsRoute);
app.use("/api/email", mailerRoute);

app.use(errorMiddleware)

process.on('unhandledRejection', (err, promise) => {
    console.log(err);
    process.exit(1);
});