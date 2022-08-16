const app = require('./src/app.js')
const authMiddleware = require('./src/middlewares/auth.js')
const errorMiddleware = require('./src/middlewares/error.middleware.js')
const route = require('./src/routes/auth.route.js')


app.use("/api/auth", route);
app.use(errorMiddleware)