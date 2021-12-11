const express = require('express')
const { json } = require('express/lib/response')
const res = require('express/lib/response')
const tasks = require('./routes/task')
const app = express()
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/error-handle')
require('dotenv').config()

const connectDb = require('./db/connect')

// middleware

app.use(express.json())
app.use(express.static('./public'))
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)
// app

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listenning on port ${port}....`))
  } catch (error) {
    console.log(error)
  }
}

start()
