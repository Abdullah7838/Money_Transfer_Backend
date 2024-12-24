const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors()); 
const PORT = 3001;
const db = require('./db.js');
app.use(express.json());

const userRoute = require('./Routes/userRoute');
app.use('/',userRoute);

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });
  
app.listen(PORT, () => {
    console.log('Successfully running on port 3001');
});
