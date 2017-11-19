function geocodeLatLng(latlng,	 callback){
//Модуль за роботу з адресою
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': latlng},	function(results, status){
        if (status === google.maps.GeocoderStatus.OK &&	results[1])	{
            var adress = results[1].formatted_address;
            callback(null,adress);
        }	else	{
            callback(new Error("Can't find adress"));
        }
    });
}

function initialize(){
//Тут починаємо працювати з картою
    var mapProp ={
        center:	new	google.maps.LatLng(50.464379,30.519131),
        zoom: 13
    };
    var html_element =	document.getElementById("googleMap");
    var map	=	new	google.maps.Map(html_element, mapProp);

    var old_marker = null;
//Карта створена і показана
    google.maps.event.addListener(map, 'click',function(me){
            var coordinates	= me.latLng;

            if(old_marker){
                old_marker.setMap(null);
                old_marker = null;
            }
            old_marker = new google.maps.Marker({
                position: coordinates,
//map - це змінна карти створена за допомогою new google.maps.Map(...)
                map: map,
                icon: "assets/images/home-icon.png"
            });
        geocodeLatLng(coordinates, function(err, address){
            if(err){
                $("#focusedInput3").val("Not found");
                $("#address").text("Not found");
            }else{
                $("#focusedInput3").val(address);
                $("#address").text(address);
            }
        })
//coordinates	- такий самий об’єкт як створений new google.maps.LatLng(...)
   });
}
//Коли сторінка завантажилась
google.maps.event.addDomListener(window,'load',	initialize);


