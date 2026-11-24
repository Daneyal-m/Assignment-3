require('dotenv').config();

const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended:false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get ('/', (req, res) => {
    res.send('Hello World');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});