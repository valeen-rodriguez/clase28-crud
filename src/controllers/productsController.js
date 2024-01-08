const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const getJson = () => {
	const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = getJson();
		return res.render('products', {
			products,
			toThousand
		});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const {id} = req.params;
		const products = getJson();
		const product = products.find(product => product.id == id);
		res.render("detail", { title: product.name, product, toThousand });
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const files = req.files;
		const id = Date.now();
		const images = [];
		files.forEach(element => {
			images.push(element.filename);
		});
		const { name, price, discount, description, category, image } = req.body;
		const products = getJson();
		const nuevoProduct = {
			id: +id,
			name:name.trim(),
			price:+price,
			discount: +discount,
			category,
			description:description.trim(),
			image: files.length > 0 ? images : ['default.jpg']
		}
		products.push(nuevoProduct);
		const json = JSON.stringify(products);
		fs.writeFileSync(productsFilePath,json,'utf-8');
		res.redirect(`/products/detail/${nuevoProduct.id}`);
	},

	// Update - Form to edit
	edit: (req, res) => {
		const {id} = req.params;
		const products = getJson();
		const product = products.find(product => product.id == id)
		res.render("product-edit-form",{product,toThousand})
	},
	
	// Update - Method to update
	update: (req, res) => {
		const {id} = req.params;
		const {name,price,discount,category,description,image} = req.body;
		const products = getJson();
		const nuevoArray = products.map(product => {
			if(product.id == id) {
				return {
					id: product.id,
					name:name.trim(),
					price:+price,
					discount: +discount,
					category,
					description:description.trim(),
					image: image ? image : product.image
				}
			}
			return product
		})
		const json = JSON.stringify(nuevoArray);
		fs.writeFileSync(productsFilePath,json,"utf-8");
		res.redirect(`/products/detail/${id}`)
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		const { id } = req.params;
		const products = getJson();
		const product = products.find(producto => producto.id == id);
		const nuevoArray = products.filter(producto => producto.id != id);
		const json = JSON.stringify(nuevoArray);
		
		console.log("imagen:", product.image);
		fs.unlink(path.join(__dirname, `../../public/images/products/${product.image}`), (err) => {
			if (err) throw err;
			console.log(`Borre el archivo ${product.image}`);
		});

		fs.writeFileSync(productsFilePath, json, "utf-8");
		return res.redirect('/products');
	},
};

module.exports = controller;