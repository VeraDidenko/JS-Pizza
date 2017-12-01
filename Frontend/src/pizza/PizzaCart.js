/**
 * Created by chaika on 02.02.16.
 */
    var Templates = require('../Templates');
    var Storage = require('./Storage');
    var API = require('../API');
    var Input = require('../main');
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
            if(pizza.id === pizza_cart.pizza.id) {
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
    function showTotalPrice(){
        var price = 0;
        Cart.forEach(function(pizza){
            price += pizza.price;
        });
        $("#total-price-b-panel").text(price);
    }
    function updateCart() {
        //Функція викликається при зміні вмісту кошика
        //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
        Storage.write("cart", Cart);
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
            if(document.location.href === "http://localhost:5050/order.html"){
                html_code = Templates.PizzaCart_OnePizzaOrdered(cart_item);
            }else if(document.location.href === "http://localhost:5050/"){
                html_code = Templates.PizzaCart_OneItem(cart_item);
            }
            var $node = $(html_code);
            cart_item.price = cart_item.pizza[cart_item.size].price * cart_item.quantity;
            $node.find(".plus-button").click(function () {
                //Збільшуємо кількість замовлених піц
                cart_item.quantity += 1;
                cart_item.price = cart_item.pizza[cart_item.size].price * cart_item.quantity;
                //Оновлюємо відображення
                showTotalPrice();
                updateCart();
            });
            $node.find(".minus-button").click(function () {
                if (cart_item.quantity === 1) {
                    removeFromCart(cart_item);

                }
                else {
                    //Зменшуємо кількість замовлених піц
                    cart_item.quantity -= 1;
                }
                showTotalPrice();
                updateCart();
                cart_item.price = cart_item.pizza[cart_item.size].price * cart_item.quantity;

            });
            $node.find(".remove-button").click(function () {
                removeFromCart(cart_item);
                showTotalPrice();
                //Оновлюємо відображення
                updateCart();

            });
            $cart.append($node);
            showTotalPrice();
            numberOfPizzas += cart_item.quantity;
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
        var name = Input.returnName();
        var phone = Input.returnPhone();
        var address = Input.returnAddress();
        var total = $("#total-price-b-panel").text();
        API.createOrder({
            name: name,
            phone: phone,
            address: address,
            order: Cart,
            total_price: total
        },function(err, res){
            if(err) {
                return callback(err);
            }
            callback(null, res);
        });
    }
    exports.removeFromCart = removeFromCart;
    exports.addToCart = addToCart;

    exports.getPizzaInCart = getPizzaInCart;
    exports.initialiseCart = initialiseCart;

    exports.updateCart = updateCart;

    exports.PizzaSize = PizzaSize;
    exports.createOrder = createOrder;