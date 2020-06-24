const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const messages = require('./db/Messages');


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

app.get('/messages', (req, res)=>{
  messages.getAll()
  .then((messages)=>{
    res.json(messages);
  })
});

app.post('/messages', (req,res)=>{
  console.log(req.body);
  messages.insert(req.body)
  .then((message)=>{
    res.json(message);
  })
  .catch((error)=>{
    res.status(500).json(error);
  })
});

const port = process.env.PORT || 1234;
app.listen(port, ()=>{
  console.log(`Server is listening at port ${port}`)
})
