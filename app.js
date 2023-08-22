const express = require('express');
const cors=require("cors");
// create express app
const app = express();

// Configuring the database
const dbConfig = require('./config/database_config');
const mongoose = require('mongoose');

// Require Users routes
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
require('./app/routes/user_routes')(app);
require('./app/routes/account_routes')(app);
require('./app/routes/product_routes')(app);

mongoose.Promise = global.Promise;

// Connecting to the database local
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Successfully connected to the database");    
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     process.exit();
// });


// Connecting to the database online

const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://brains-hive-practice:<password>@cluster0.xqeqe9u.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(dbConfig.url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// listen for requests local
app.listen(5000, () => {
    console.log("Server is listening");
});