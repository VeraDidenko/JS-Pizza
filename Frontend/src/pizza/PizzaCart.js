/**
 * Created by chaika on 02.02.16.
 */
    var Templates = require('../Templates');
    var Storage = require('./Storage');
    var right_panel = $(".right-panel-template").html();
    var $panel = $(right_panel);
    var top_panel = $(".top-template").html();
    var $top = $(top_panel);
    var $total_amount = $panel.find(".price");
    var total = 0;
    $total_amount.text(total);

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
        //Додавання однієї піци в кошик покупок

        //Приклад реалізації, можна робити будь-яким іншим способом
        if (Cart.indexOf(pizza) < 0){
            Cart.push({
                pizza: pizza,
                size: size,
                quantity: 1
            });

        }
        else{
           pizza.quantity += 1;
        }
        //Оновити вміст кошика на сторінці
        updateCart();
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
            //return Cart.splice(0,Cart.length);
    }
    $("#forClear").click(function(){
        clearCart();
        updateCart();
    });
    function updateCart() {
        //Функція викликається при зміні вмісту кошика
        //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
        Storage.write("cart", Cart);
        //Очищаємо старі піци в кошику
        $cart.html("");

        //Онволення однієї піци
        function showOnePizzaInCart(cart_item) {
            var html_code = Templates.PizzaCart_OneItem(cart_item);

            var pizza = cart_item.pizza;
            var size = cart_item.size;
            total = pizza[size].price * cart_item.quantity;
            $total_amount.text(total);

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
                }
                else {
                    //Збільшуємо кількість замовлених піц
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
            $panel.append($total_amount);
        }

        Cart.forEach(showOnePizzaInCart);
    }

    exports.removeFromCart = removeFromCart;
    exports.addToCart = addToCart;

    exports.getPizzaInCart = getPizzaInCart;
    exports.initialiseCart = initialiseCart;

    exports.PizzaSize = PizzaSize;
