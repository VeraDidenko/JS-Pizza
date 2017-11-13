/**
 * Created by chaika on 02.02.16.
 */
    var Templates = require('../Templates');
    var Storage = require('./Storage');
    var API = require('../API');
//Перелік розмірів піци
    var PizzaSize = {
        Big: "big_size",
        Small: "small_size"
    };

//Змінна в якій зберігаються перелік піц в кошику
    var Cart = [];

//HTML едемент куди будуть додаватися піци
    var $cart = $("#cart");
    function addToCart(pizza, size) {
        if(Cart.length > 0 && contains(pizza, size)){

        }else{
            Cart.push({
                pizza: pizza,
                size: size,
                quantity: 1
            });

        }
        //Оновити вміст кошика на сторінці
        updateCart();
    }
    function contains(pizza, size){
        var yes = false;
        Cart.forEach(function(pizza_cart){
            if(pizza === pizza_cart.pizza) {
                if (size === pizza_cart.size) {
                    pizza_cart.quantity += 1;
                    yes = true;
                }
            }
        });
        return yes;
    }
    function removeFromCart(cart_item) {
        //Видалити піцу з кошика
        const index = Cart.indexOf(cart_item);
        Cart.splice(index, 1);
        //Після видалення оновити відображення
        updateCart();
    }

    function initialiseCart() {
        //Фукнція віпрацьвуватиме при завантаженні сторінки
        //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
        var saved_cart = Storage.read("cart");
        if (saved_cart) {
            Cart = saved_cart;
        }
        updateCart();
    }

    function getPizzaInCart() {
        //Повертає піци які зберігаються в кошику
        return Cart;
    }
    function clearCart(){
        Cart=[]
    }
    function updateCart() {
        //Функція викликається при зміні вмісту кошика
        //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
        Storage.write("cart", Cart);
        var total = 0;
        var numberOfPizzas = 0;
        //Очищаємо старі піци в кошику
        $cart.html("");
        $("#forClear").click(function(){
            $("#total-price-b-panel").text(0);
            clearCart();
            updateCart();
        });
        //Онволення однієї піци
        function showOnePizzaInCart(cart_item) {
            var html_code = Templates.PizzaCart_OneItem(cart_item);
            var pizza = cart_item.pizza;
            var size = cart_item.size;
            var $node = $(html_code);
            $node.find(".plus-button").click(function () {
                //Збільшуємо кількість замовлених піц
                cart_item.quantity += 1;
                //Оновлюємо відображення
                updateCart();
            });
            $node.find(".minus-button").click(function () {
                if (cart_item.quantity === 1) {
                    removeFromCart(cart_item);
                    updateCart();
                }
                else {
                    //Зменшуємо кількість замовлених піц
                    cart_item.quantity -= 1;
                    //Оновлюємо відображення
                    updateCart();
                }

            });
            $node.find(".remove-button").click(function () {
                removeFromCart(cart_item);
                //Оновлюємо відображення
                updateCart();

            });
            $cart.append($node);
            if(cart_item.quantity >= 1){
                total = total + (pizza[size].price * cart_item.quantity);
                numberOfPizzas = numberOfPizzas + cart_item.quantity;
            }
            $("#total-price-b-panel").text(total);
            $("#amount-of-orders").text(numberOfPizzas);
        }
            if(Cart.length === 0){
                $("#emptyFridge").show();
                $("#amount-of-orders").text(0);
                $("#toHide").hide();
                $("#button-order").attr("disabled","disabled");
            }else{
                $("#emptyFridge").hide();
                $("#toHide").show();
                $("#button-order").removeAttr('disabled');
                Cart.forEach(showOnePizzaInCart);
            }
    }
    function createOrder(callback){
        API.createOrder({
            name: $("#focusedInput1").val(),
            phone: $("#focusedInput2").val(),
            address: $("#focusedInput3").val(),
            order: Cart
        },function(err, res){
            if(err) {
                return callback(err);
            }
            callback(null, res);
            $("#hide-buttons").hide();
            $("#order-page").show();

        });
    }
    exports.removeFromCart = removeFromCart;
    exports.addToCart = addToCart;

    exports.getPizzaInCart = getPizzaInCart;
    exports.initialiseCart = initialiseCart;

    exports.updateCart = updateCart;

    exports.PizzaSize = PizzaSize;
    exports.createOrder = createOrder;