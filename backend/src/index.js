import app from "./app.js";
import connectToMongoDb from "./db.js";

// Define the port to listen on
const port = process.env.PORT || 3005;

// Connect to MongoDB database
connectToMongoDb()

// Start the server
app.listen(port);

console.log('Server on port: ' + port);