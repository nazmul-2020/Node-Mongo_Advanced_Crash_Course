const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
// const dbConnect = require("./utils/dbConnect");
const toolsRouters = require('./routes/v1/tools.route');
const errHandler = require("./middleware/errorHandler");
const { connectToServer } = require("./utils/dbConnect");
// const viewCount = require("./middleware/viewCount");
const colors = require("colors");


app.use(cors());
app.use(express.json());

// app.use(viewCount);

// Apply the rate limiting middleware to all requests
// app.use(limiter)


// dbConnect();

connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`.red.bold);
    });
  }else{
    console.log(err);
  }
});


app.use('/api/v1/tools', toolsRouters);

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.roc0q.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.all('*', (req, res) => {
  res.send('Route is Not Found');
})

app.use(errHandler);




process.on('unhandledRejection', (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});


