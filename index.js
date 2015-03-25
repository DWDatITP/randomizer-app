var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var _ = require('lodash');

var app = express();
app.set('port', (process.env.PORT || 5000));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response){
  response.render('index');
});

app.post('/randomize', function(request, response){
  var itemString = request.body.randomItems;
  var items = [];

  itemString.split('\n').forEach( function(stringPart) {
    stringPart = _.trim(stringPart);
    if (stringPart !== '') {
      items.push(stringPart);
    }
  });

  itemString = items.join('\n');

  var length = items.length;
  var randomNumber = parseInt(Math.random() * length);
  console.log('items',items);
  console.log('randomNumber',randomNumber);
  var pickedItem = items[randomNumber];
  console.log('pickedItem',pickedItem);

  response.render('index', {itemString: itemString, pickedItem: pickedItem});
});

app.get('/randomize', function(request, response){
  response.redirect('/');
});

app.listen(app.get('port'), function(){
  console.log('listening on: ', app.get('port'));
});
