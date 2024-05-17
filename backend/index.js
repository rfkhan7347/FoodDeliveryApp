const express = require('express')
const mongoDB = require('./db')
const app = express()
const port = 3000
mongoDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use(express.json())
app.use('/api',require("./routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderedData"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})