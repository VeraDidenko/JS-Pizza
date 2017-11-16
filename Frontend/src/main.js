/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var API = require('./API');
    //var page = require('.../Backend/pages');
    //var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();
    hideShow();


    $("#button-order").click(function(){
        API.createOrder(function (err){
            if(err){
                alert("Can't create order");
            }
        })
    });
    $(".button-next").click(function(){
        if (Valid()){
            PizzaCart.createOrder(function (err,res){
                if(err){
                    alert("Can't create order");
                }
                alert("Order successfully sent!"+res);
            })
        }else{
            alert("Please fill in the form");

        }

    });

    function returnName(){
        return $("#focusedInput1").val();
    }
    function returnPhone(){
        return $("#focusedInput2").val();
    }
    function returnAddress(){
        return $("#focusedInput3").val();
    }

    function Valid(){
       return $(".name-user").hasClass("has-success") && $(".phone-user").hasClass("has-success") && $(".address-user").hasClass("has-success");
    }

    function hideShow(){
        if(document.location.href === "http://localhost:5050/order.html"){
            var amount = $("#2").val();
            if(amount === 1){
                $(".badge-name-of-pizza").text("піца");
            }else if(amount % 10 === 2 || amount % 10 === 3 || amount % 10 === 4 ){
                $(".badge-name-of-pizza").text("піци");
            }else{
                $(".badge-name-of-pizza").text("піц");
            }
            $(".badge-amount-of-ordered-pizzas").text(amount);
            $("#hide-buttons").hide();
            $("#order-page").show();
        }else{
            $("#hide-buttons").show();
            $("#order-page").hide();
        }
    }

    $("#focusedInput1").keyup(function () {
        var name = $("#focusedInput1").val();
        if(isValidName(name)){
            $(".name-user").removeClass("has-error").addClass("has-success");
            $(".hint-name").hide();
        }else{
            $(".name-user").removeClass("has-success").addClass("has-error");
            $(".hint-name").show();
        }
    });

    $("#focusedInput2").keyup(function () {
        var phone = $("#focusedInput2").val();
        if(isValidPhone(phone)){
            $(".phone-user").removeClass("has-error").addClass("has-success");
            $(".hint-phone").hide();
        }else{
            $(".phone-user").removeClass("has-success").addClass("has-error");
            $(".hint-phone").show();
        }
    });

    $("#focusedInput3").keyup(function () {
        var address = $("#focusedInput3").val();
        if(isValidAddress(address)){
            $(".address-user").removeClass("has-error").addClass("has-success");
            $(".hint-address").hide();
        }else{
            $(".address-user").removeClass("has-success").addClass("has-error");
            $(".hint-address").show();
        }
    });

    function isValidName(name){
        return (name.length >= 1);
    }

    function isValidPhone(phone){
        var phoneNum1 = new RegExp(/^[+]?(38)?([0-9]{10})$/);
        var phoneNum2 = new RegExp(/^0?([0-9]{9})$/);
        if(phone.length === 13 && phoneNum1.test(phone)){
            return true;
        }
        return (phone.length === 10 && phoneNum2.test(phone));
    }

    function isValidAddress(name){
        return (name.length >= 1);
    }
    exports.returnName = returnName;
    exports.returnPhone = returnPhone;
    exports.returnAddress = returnAddress;

});
