/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');
//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

var pizzaFilter = {
    All:0,
    Meat:1,
    Pineapple:2,
    Mushroom:3,
    Ocean:4,
    Vegetarian:5
};
$('ul.nav.nav-pills li a').click(function() {
    $(this).parent().addClass('active').siblings().removeClass('active');
    var attr = $(this).parent().attr('id');
    if(attr === 'filter1'){
        $("#all-pizzas").text("Усі піци");
        filterPizza(pizzaFilter.All);
    }
    else if(attr === 'filter2'){
        $("#all-pizzas").text("М’ясні піци");
        filterPizza(pizzaFilter.Meat);
    }
    else if(attr === 'filter3'){
        $("#all-pizzas").text("Піци з ананнасами");
        filterPizza(pizzaFilter.Pineapple);
    }
    else if(attr === 'filter4'){
        $("#all-pizzas").text("Піци з грибами");
        filterPizza(pizzaFilter.Mushroom);
    }
    else if(attr === 'filter5'){
        $("#all-pizzas").text("Піци з морепродуктами");
        filterPizza(pizzaFilter.Ocean);
    }
    else if(attr === 'filter6'){
        $("#all-pizzas").text("Вегетаріанські піци");
        filterPizza(pizzaFilter.Vegetarian);
    }
});
function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});
        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);

        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}
function isfilterPizzaContents(pizza, filter){
    var filters = 0;
    if(pizza.is_pineapple){
        filters = pizzaFilter.Pineapple;
        if(filters === filter){
            return true;
        }
    }
    if(pizza.is_ocean){
        filters = pizzaFilter.Ocean;
        if(filters === filter){
            return true;
        }
    }
    if(pizza.is_mushroom){
        filters = pizzaFilter.Mushroom;
        if(filters === filter){
            return true;
        }
    }
    if(pizza.is_meat){
        filters = pizzaFilter.Meat;
        if(filters === filter){
            return true;
        }
    }
    if(pizza.is_vegetarian){
        filters = pizzaFilter.Vegetarian;
        if(filters === filter){
            return true;
        }
    }
    return pizzaFilter.All === filter;
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піца відповідає фільтру
        if(isfilterPizzaContents(pizza, filter)){
            pizza_shown.push(pizza);
        }
    });
    var numberOfPizzas = pizza_shown.length;
    $("#num").text(numberOfPizzas);
    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;