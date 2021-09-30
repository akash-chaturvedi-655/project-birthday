// server.js
// init project
var express = require('express');
var app = express();

// enable CORS 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", async function(req,res)
{
  //var name = req.params.name;
  try
  {
  const name = await req.query.name;
  //if (typeof name !== 'string' )
  if(! (/^[a-z]+$/i.test(name)))
  {
    res.json({error : "Error. Please enter name including only alphabets and then try again!"});
    return;
  }
  
  if(Object.keys(req.query).length === 0)
  {
    res.json({error : "Error. Please enter query parameters (name) and then try again"});
  }
  else
  {
  console.log(name);
  res.json({body: "Happy Birthday, "+name+"!"});
  }
  }
  catch(error)
  {
    console.log(error);
    res.json({Error : error })
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
