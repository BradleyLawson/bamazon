var inquirer = require('inquirer');
var mysql = require('mysql');

// connect to mysql
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function viewProducts(){
	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;
		console.log(" ID # " + " |  " + " Product " + " | " + "  Price " + "|" + "  Current Inventory");
		console.log("___________________________________________________")
		for (var i = 0; i < res.length; i++){
			console.log("  " + res[i].id + " | " + res[i].product_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity);
		}
			console.log("\n");
			start();
	})
};

function viewLowInventory(){
	connection.query("SELECT * FROM products", function(err, res){
		for (var j = 0; j < res.length; j++){
		var productNames = res[j].product_name;
		var stockQuantity = res[j].stock_quantity;
		var timeToOrder = 100;
		checkLevels(stockQuantity, timeToOrder, productNames, stockQuantity);
		}
		start();
	})
};	
	
function checkLevels(currentLevel, limiter, prods, values){
		if (currentLevel < limiter){
			console.log("It is time to order " + prods + "." + " Inventories are at: " + values);
		} 
}

function addToInventory(){
  connection.query("SELECT * FROM products", function(err, results) {

	inquirer
  		.prompt([
    		{
      			type: 'input',
      			name: 'productToAddTo',
      			message: 'What Product do you want to add to?'
    		},
    		{
      			type: 'input',
      			name: 'amountAdded',
      			message: 'How many do you want to add?'
    		}
  		])

  		.then(answers => {
  			var amountAdded = parseInt(answers.amountAdded);
  			var productName = answers.productToAddTo;

  			var itemToUpdate;
  			var amountInStock;

  			for (var q = 0; q < results.length; q++){
  				if (productName === results[q].product_name){
  					itemToUpdate = productName
  					amountInStock = parseInt(results[q].stock_quantity)
  				}
  			}

  			var newStockQuantity = amountInStock + amountAdded
  			console.log(amountInStock)
			console.log(newStockQuantity);
			
  			connection.query(
  				"UPDATE products SET ? WHERE ?",
    			[
     				{
        			stock_quantity: newStockQuantity
      				},
      				{
        			product_name: itemToUpdate
      				}
    			],
    		function(err) {
    			if (err) throw err;
    			console.log(newStockQuantity + " of " + itemToUpdate + " was added to inventory!")
    			start();
    		}
    		);

		});
	});
};

function addNewProduct(){
	inquirer
  		.prompt([
    	{
      		type: 'input',
      		name: 'addedProduct',
      		message: 'Please enter the product you want to add.'
    	},
    	{
      		type: 'input',
      		name: 'addedDepartment',
      		message: 'What department does this product belong to?'
    	},
    	{
      		type: 'input',
      		name: 'addedPrice',
      		message: 'What is the price to the customer?'
    	},
    	{
      		type: 'input',
      		name: 'addedQuantity',
      		message: 'How many will be placed into inventory.'
    	}
  	])
  	.then(answers => {
  		console.log("Inserting a new product...\n");
  		console.log(answers.addedProduct)
  		var query = connection.query(
    	"INSERT INTO products SET ?",
    		{
      			product_name: answers.addedProduct,
      			department_name: answers.addedDepartment,
      			price: answers.addedPrice,
      			stock_quantity: answers.addedQuantity
    		},
    	function(err, res) {
      		console.log(res.affectedRows + " product inserted!\n");
      		start();
    	});
});
};

function start(){
	inquirer
  .prompt([
    {
      type: 'rawlist',
      name: 'options',
      message: 'What do you want to do?',
      choices: [
        'View Products for Sale',
        'View Low Inventory',
        'Add to Inventory',
        'Add New Product'
      ]
    }
  ])
  .then(answers => {
  	 // main logic - options for manager
  switch (answers.options){
  	case "View Products for Sale":
  		viewProducts();
  		break;
  	case "View Low Inventory":
  		viewLowInventory();
  		break;
  	case "Add to Inventory":
  		addToInventory();
  		break;
  	case "Add New Product":
  		addNewProduct();
  		break;
  }
    //console.log(JSON.stringify(answers, null, '  '));
  });
  };

function addMore(x, y){
	var newStockQuantity = x + y
	return newStockQuantity;
}

var addedUpInventory = addMore();

console.log(addedUpInventory);



