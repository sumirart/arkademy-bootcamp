var express = require("express");
var app = express();
var router = express.Router();
const path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const hbs = require('hbs');

//konfigurasi koneksi
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'arkademy'
});

//connect ke database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

//set views file
app.set('views', path.join(__dirname, 'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public sebagai static folder untuk static file
app.use('/assets', express.static(__dirname + '/public'));

//route untuk homepage
app.get('/', (req, res) => {
    let sql = "SELECT products.id, products.name, product_categories.name FROM `products` INNER JOIN `product_categories` ON products.category_id = product_categories.id";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('product_view', {
            results: results
        });
    });
});

router.use(function (req, res, next) {
    console.log("/" + req.method);
    next();
});
router.get("/", function (req, res) {
    res.sendFile(path + "index.html");
});

app.use("/", router);

app.listen(3000, function () {
    console.log("Live at Port 3000");
});