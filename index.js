const express = require('express');
const { links } = require('express/lib/response');
const app = express();
const fs = require('fs')
const port = 3000;
app.use(express.urlencoded({ extended: true }));

var linkarray = JSON.parse(fs.readFileSync('data.json', 'utf8'));

function makeslug(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

app.get('/', (req, res) => {
  res.send(fs.readFileSync('index.html', 'utf8'))
});
app.get('/:slug', (req, res) => {
  res.redirect(linkarray[req.params.slug])
});
app.post('/', (req, res) => {
  var url = req.body.url;
  var slug = makeslug(5);
  if(linkarray[slug])
    res.send("Retry");
  linkarray[slug]=url;
  res.send('Shortend in '+req.protocol + '://' + req.get('Host') + req.originalUrl+slug)
  fs.writeFileSync('data.json', JSON.stringify(linkarray))
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});
