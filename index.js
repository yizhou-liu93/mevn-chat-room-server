const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
//log out message when receive request
app.use(morgan('tiny'));
app.use(cors());

// parse application/json
app.use(bodyParser.json());

app.get('/', (req,res)=>{
  res.json({
    message: `Chat Room Server`
});
});

const port = process.env.PORT || 1234;
app.listen(port, ()=>{
  console.log(`Server is listening at port ${port}`)
})
