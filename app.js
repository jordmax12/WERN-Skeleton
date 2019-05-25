const express = require('express');
const app = express();
const port = 8080;

const { wrapper } = require('./views/wrapper');

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(express.static(__dirname + '/views/assets'));

app.get('/', (req, res) => {
    res.send(wrapper);
})

app.listen(port, () => console.log(`listening on port ${port}`));
