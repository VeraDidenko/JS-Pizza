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


    $("#button-order").click(function(){
        API.createOrder(function (err){
            if(err){
                alert("Can't create order");
            }
        })
    });
    $(".button-next").click(function(){
        if (Valid()){
            PizzaCart.createOrder(function (err){
                if(err){
                    alert("Can't create order");
                }
                alert("Order successfully sent!");
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
       return isValidName($("#focusedInput1").val()) && isValidPhone($("#focusedInput2").val()) && isValidAddress($("#focusedInput3").val());
    }

    $("#focusedInput1").keyup(function () {
        var name = $("#focusedInput1").val();
        isValidName(name);
    });

    $("#focusedInput2").keyup(function () {
        var phone = $("#focusedInput2").val();
        isValidPhone(phone);
    });

    $("#focusedInput3").keyup(function () {
        var address = $("#focusedInput3").val();
        isValidAddress(address);
    });

    function isValidName(name){
        var name1 = new RegExp(/^([A-Za-z]*)$/);
        if(name.length >= 1 && name1.test(name)){
            $(".name-user").removeClass("has-error").addClass("has-success");
            $(".hint-name").hide();
            return true;
        }else{
            $(".name-user").removeClass("has-success").addClass("has-error");
            $(".hint-name").show();
            return false;
        }
    }

    function isValidPhone(phone){
        var phoneNum1 = new RegExp(/^[+]?(38)?([0-9]{10})$/);
        var phoneNum2 = new RegExp(/^0?([0-9]{9})$/);
        if((phone.length === 13 && phoneNum1.test(phone)) || ((phone.length === 10 && phoneNum2.test(phone)))){
            $(".phone-user").removeClass("has-error").addClass("has-success");
            $(".hint-phone").hide();
            return true;
        }else{
            $(".phone-user").removeClass("has-success").addClass("has-error");
            $(".hint-phone").show();
            return false;
        }
    }

    function isValidAddress(name){
     if(name.length >= 1){
        $(".address-user").removeClass("has-error").addClass("has-success");
        $(".hint-address").hide();
        return true;
     }else {
         $(".address-user").removeClass("has-success").addClass("has-error");
         $(".hint-address").show();
         return false;
     }
    }
    exports.returnName = returnName;
    exports.returnPhone = returnPhone;
    exports.returnAddress = returnAddress;

});

require("./GoogleMap");
