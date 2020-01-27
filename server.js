const express = require("express");
const app = express();
const mongoose = require('mongoose');
const flash = require('express-flash');
mongoose.connect('mongodb://localhost/exam_db', {useNewUrlParser: true});

app.use(flash());
app.use(express.static(__dirname + '/public/dist/public'))
app.use(express.json());

const ProductSchema = new mongoose.Schema({
    id_num: { type: String },
    name:  { type: String, required: [true, "Products must have a name"], minlength: [3, "Product name must be at least 3 characters"]},
    quantity: { type: Number, required: [true, "Products must have a quantity"], min: [0, "Quantity must be greater than or equal to 0"]},
    price: { type: Number, required: [true, "Products must have a price"], min: [0, "Price must be greater than or equal to 0"]},
}, {timestamps: true });
const Product = mongoose.model('Product', ProductSchema);

app.get('/products', (req, res) => {
    Product.find({}).sort({createdAt: -1})
    .then(data => res.json(data))
    .catch(err => res.json(err));
})
app.post('/create_product', (req, res) => {
    console.log("**server response, new product**")
    const product = new Product();
    product.id_num = Math.floor((Math.random() * 9000) + 1000);
    product.name = req.body.name;
    product.quantity = req.body.quantity;
    product.price = req.body.price;
    product.save()
    .then((newproductData) => res.json({message: 'Success', product: newproductData}))
    .catch(err => {
        console.log("We have an error!", err);
        var errors = []
        for (var key in err.errors) {
            errors.push(err.errors[key].message)
        }
        res.json({errors: errors});
    })
})
app.get('/show_product/:id_num', (req, res) => {
    console.log("**server**", req.params.id_num)
    Product.findOne({id_num: req.params.id_num})
    .then(data => res.json(data))
    .catch(err => res.json(err));
})
app.put('/update_product/:id_num', (req, res) => {
    console.log("**server for put**", req.params.id_num)
    Product.findOne({id_num: req.params.id_num})
    .then(product => {
        product.name = req.body.name;
        product.quantity = req.body.quantity;
        product.price = req.body.price;
        return product.save();
    })
    .then(savedproduct => res.json({product: savedproduct}))
    .catch(err => {
        console.log("We have an error!", err);
        var errors = []
        for (var key in err.errors) {
            errors.push(err.errors[key].message)
        }
        res.json({errors: errors});
    })
})
app.delete('/remove_product/:id_num', (req, res) => {
    console.log("**server for delete**", req.params.id_num)
    Product.findOne({id_num: req.params.id_num})
    .then(product => {
        if (product.quantity > 0) {
            return Promise.reject(['Cannot delete product unless quantity is 0']);
        }
        return Product.deleteOne({id_num: req.params.id_num})
    })
    .then(() => res.json({message: "Success"}))
    .catch(err => {
        if (err.length > 0){
            res.json({errors: err});
        }
    });
})

app.listen(8000, () => console.log("listening on port 8000"));