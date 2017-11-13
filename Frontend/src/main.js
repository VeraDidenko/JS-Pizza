/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var page = require('/home/vera/Documents/University/NIT/homework_pizza/JS-Pizza-master/Backend/pages');
    //var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();

    $(".order-button").click(function(){
        createOrder(function (err){
            if(err){
                alert("Can't create order");
            }
            page.orderPage();
        })
    });


});