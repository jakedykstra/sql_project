var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  items();
});

function items() {

  connection.query("SELECT * FROM products", function (err, results) {
        if (err) {
          throw err;
        } else {

          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            // push into the array a string like this: "2: Car"
            choiceArray.push(results[i].item_id + ".  " + results[i].product_name + "  " + results[i].price);
          }

        }

        userPrompt(choiceArray, results);
      }




      // function which prompts the user for what action they should take
      function userPrompt(choiceArray, results) {

        // once you have the items, prompt the user for which they'd like to bid on
        inquirer.prompt([{
              name: "choice",
              type: "list",
              choices: choiceArray,
              message: "What is the ID of the product you would like to buy?"
            },
            {
              name: "units",
              type: "input",
              message: "How many units would you like to buy?"
            }
          ])
          .then(function (answer) {

              var prodId = answer.choice;
              var prodUnits = answer.unit;

              connection.query("SELECT * FROM products WHERE item_id = ?", [{
                  prodId
                }], function (err, results) {
                  if (err) {
                    throw err;
                  } else {
                    var productAmount = results.stock_quantity;
                    if (productAmount < prodUnits) {
                      console.log("insufficient quantity");
                      connection.end();
                      return
                    } else {
                      var remainingQuant = productAmount - prodUnits;
                      var price = results.price * prodUnits;
                      purchase(remainingQuant, price);
                    }

                    function purchase(remainingQuant, price, prodUnits) {


                      connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: remainingQuant
                          },
                          {
                            item_id: prodUnits
                          }
                        ],
                        function (error) {
                          if (error) throw err;
                    } else {
                      console.log("Purchase made!");
                      console.log("Total comes to $" + price);
                    }