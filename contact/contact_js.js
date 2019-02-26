var quotes = [

'Let\'s Talk about Podcasts',
'Let\'s Talk about Books',
'Let\'s Talk about Food',
'Let\'s Talk about Coffee',
'Let\'s Talk about Marketing',
'Let\'s Talk about Branding',
'Let\'s Talk about Advertising',
'Let\'s Talk about Social Media',
'Let\'s Talk about Photography',
'Let\'s Talk about Architecture',
'Let\'s Talk about Websites',
'Let\'s Talk about Music',

]

setInterval(function newQuote()  {

var randomNumber = Math.floor(Math.random()* (quotes.length));
document.getElementById('quoteDisplay').innerHTML = quotes[randomNumber];


}, 3000);
