//require inquirer
var inquirer = require("inquirer");
//require mysql
var mysql = require("mysql");



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
  displayItems() + "\r\n";
  start();
});

// retrieves items from database and displays the id#, Product, and Price in a table
function displayItems(){	
	console.log("\n\n\n")
	console.log("                                     " + "     Welcome to Bamazon...\n" );
	console.log("                            " + "       Take a look at our inventory below\n\n\n");
	console.log("          ID #             " + " |  " + "                 Product      " + "        | " + "             Price         ")
	console.log("________________________________________________________________________________________________________")
	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;
		for (var i = 0; i < res.length; i++){
			console.log("           " + res[i].id + "                                  " + res[i].product_name + "                         " + "$" + res[i].price);
		}
			console.log("\n\n");

	})
}		

function start(){
	connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    var choiceArray = [];
    for (var i = 0; i < res.length; i++){
    	choiceArray.push(res[i].id);
    }

    
    inquirer
    	.prompt([
			{
				name: "item",
				type: "input",
				message: "Please choose your product by ID # \n",
			},
			{
				name: "amount",
				type: "input",
				message: "Please enter the amount you would like to order \n"
			}
    	])
    	.then(function(answer){
    		var answerItem = answer.item;
    		var amount = answer.amount;
    		var queryStr = 'SELECT * FROM products WHERE ?';
    		connection.query(queryStr, {id: answerItem}, function(err, data) {
				if (err) throw err;
				var specificData = data[0];
				var price = specificData.price;
	    		var inventory = specificData.stock_quantity;
	    		var item_id = specificData.id;
				if (amount > inventory){
					console.log("I am sorry your order exceeds our inventory");
				} else {
					calculateCost(amount, price);
	    			calculateInventory(amount, inventory, item_id);
					connection.end()
				}
			});
    	});

    });
};

// calculates the cost of the order based upon quantity of item order
function calculateCost(x, y){
	var calculatedCost = x * y;
	return console.log("The total cost of your order is: " + "$" + calculatedCost.toFixed(2));
}

// accesses database and updates inventory based upon customer order
function calculateInventory(a, b, id){
	var calculatedInventory = b - a;
	connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: calculatedInventory
              },
              {
                id: id
              }
            ],
            function(error) {
              if (error) throw err;
            }
          );
}


