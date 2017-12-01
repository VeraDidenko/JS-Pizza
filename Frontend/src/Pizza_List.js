/**
 * Created by diana on 12.01.16.
 */

var pizza_info = [
    {
        id:1,
        icon:'assets/images/pizza_7.jpg',
        icon_trans:'assets/images/pizza_7_trans.png',
        title: "Імпреза",
        type: 'М’ясна піца',
        content: {
            meat: ['балик', 'салямі'],
            chicken: ['куриця'],
            cheese: ['сир моцарелла', 'сир рокфорд'],
            pineapple: ['ананаси'],
            additional: ['томатна паста', 'петрушка']
        },
        icon_weight:'assets/images/weight.svg',
        icon_size:'assets/images/size-icon.svg',
        small_size:{
            weight: 370,
            size: 30,
            price: 99,
            price_currency:'грн'
        },
        big_size:{
            weight: 660,
            size: 40,
            price: 169,
            price_currency:'грн'
        },
        is_new:true,
        is_popular:true,
        has_big:true,
        has_small:true,
        is_ocean: false,
        is_meat: true,
        is_pineapple: true,
        is_vegetarian: false,
        is_mushroom: false

    },
    {
        id:2,
        icon:'assets/images/pizza_2.jpg',
        icon_trans:'assets/images/pizza_2.png',
        title: "BBQ",
        type: 'М’ясна піца',
        content: {
            meat: ['мисливські ковбаски', 'ковбаски папероні', 'шинка'],
            cheese: ['сир домашній'],
            mushroom: ['шампінйони'],
            additional: ['петрушка', 'оливки']
        },
        icon_weight:'assets/images/weight.svg',
        icon_size:'assets/images/size-icon.svg',
        small_size:{
            weight: 460,
            size: 30,
            price: 139,
            price_currency:'грн'
        },
        big_size:{
            weight: 840,
            size: 40,
            price: 199,
            price_currency:'грн'
        },
        is_popular:true,
        has_big:true,
        has_small:true,
        is_ocean: false,
        is_meat: true,
        is_pineapple: false,
        is_vegetarian: false,
        is_mushroom: true

    },
    {
        id:3,
        icon:'assets/images/pizza_1.jpg',
        icon_trans:'assets/images/pizza_1.png',
        title: "Міксовий поло",
        type: 'М’ясна піца',
        content: {
            meat: ['вітчина', 'куриця копчена'],
            cheese: ['сир моцарелла'],
            pineapple: ['ананаси'],
            additional: ['кукурудза', 'петрушка', 'соус томатний']
        },
        icon_weight:'assets/images/weight.svg',
        icon_size:'assets/images/size-icon.svg',
        small_size:{
            weight: 430,
            size: 30,
            price: 115,
            price_currency:'грн'
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 179,
            price_currency:'грн'
        },
        has_big:true,
        has_small:true,
        is_ocean: false,
        is_meat: true,
        is_pineapple: true,
        is_vegetarian: false,
        is_mushroom: false
    },
    {
        id:4,
        icon:'assets/images/pizza_5.jpg',
        icon_trans:'assets/images/pizza_5.png',
        title: "Сициліано",
        type: 'М’ясна піца',
        content: {
            meat: ['вітчина', 'салямі'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            additional: ['перець болгарський',  'соус томатний']
        },
        icon_weight:'assets/images/weight.svg',
        icon_size:'assets/images/size-icon.svg',
        small_size:{
            weight: 450,
            size: 30,
            price: 111,
            price_currency:'грн'
        },
        big_size:{
            weight: 790,
            size: 40,
            price: 169,
            price_currency:'грн'
        },
        has_big:true,
        has_small:true,
        is_ocean: false,
        is_meat: true,
        is_pineapple: false,
        is_vegetarian: false,
        is_mushroom: true
    },
    {
        id:17,
        icon:'assets/images/pizza_3.jpg',
        icon_trans:'assets/images/pizza_3.png',
        title: "Маргарита",
        type: 'Вега піца',
        content: {
            cheese: ['сир моцарелла', 'сир домашній'],
            tomato: ['свіжі помідори'],
            additional: ['базилік', 'оливкова олія', 'соус томатний']
        },
        icon_weight:'assets/images/weight.svg',
        icon_size:'assets/images/size-icon.svg',
        small_size:{
            weight: 370,
            size: 30,
            price: 89,
            price_currency:'грн'
        },
        has_big:false,
        has_small:true,
        is_ocean: false,
        is_meat: false,
        is_pineapple: false,
        is_vegetarian: true,
        is_mushroom: false
    },
    {
        id:43,
        icon:'assets/images/pizza_6.jpg',
        icon_trans:'assets/images/pizza_6.png',
        title: "Мікс смаків",
        type: 'М’ясна піца',
        content: {
            meat: ['ковбаски'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            pineapple: ['ананаси'],
            additional: ['цибуля кримська', 'огірки квашені', 'соус гірчичний']
        },
        icon_weight:'assets/images/weight.svg',
        icon_size:'assets/images/size-icon.svg',
        small_size:{
            weight: 470,
            size: 30,
            price: 115,
            price_currency:'грн'
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 180,
            price_currency:'грн'
        },
        has_big:true,
        has_small:true,
        is_ocean: false,
        is_meat: true,
        is_pineapple: true,
        is_vegetarian: false,
        is_mushroom: true
    },
    {
        id:90,
        icon:'assets/images/pizza_8.jpg',
        icon_trans:'assets/images/pizza_8.png',
        title: "Дольче Маре",
        type: 'Морська піца',
        content: {
            ocean: ['криветки тигрові', 'мідії', 'ікра червона', 'філе червоної риби'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        icon_weight:'assets/images/weight.svg',
        icon_size:'assets/images/size-icon.svg',
        big_size:{
            weight: 845,
            size: 40,
            price: 399,
            price_currency:'грн'
        },
        has_big:true,
        has_small:false,
        is_ocean: true,
        is_meat: false,
        is_pineapple: false,
        is_vegetarian: false,
        is_mushroom: false
    },
    {
        id:6,
        icon:'assets/images/pizza_4.jpg',
        icon_trans:'assets/images/pizza_4.png',
        title: "Россо Густо",
        type: 'Морська піца',
        content: {
            ocean: ['ікра червона', 'лосось копчений'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія першого сорту', 'вершки']
        },
        icon_weight:'assets/images/weight.svg',
        icon_size:'assets/images/size-icon.svg',
        small_size:{
            weight: 400,
            size: 30,
            price: 189,
            price_currency:'грн'
        },
        big_size:{
            weight: 700,
            size: 40,
            price: 299,
            price_currency:'грн'
        },
        has_big:true,
        has_small:true,
        is_ocean: true,
        is_meat: false,
        is_pineapple: false,
        is_vegetarian: false,
        is_mushroom: false
    }
];


module.exports = pizza_info;
