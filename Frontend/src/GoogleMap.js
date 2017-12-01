function geocodeLatLng(latlng,callback){
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
    var myLatLg = {lat: 50.464379, lng: 30.519131};
    var pizza_marker = new google.maps.Marker({
        position: myLatLg,
//map - це змінна карти створена за допомогою new google.maps.Map(...)
        map: map,
        icon: "assets/images/map-icon.png"
    });

    var geocoder = new google.maps.Geocoder();

    document.getElementById('focusedInput3').addEventListener('keyup', function() {
        geocodeAddress(geocoder, map);
    });

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
                $(".address-user").removeClass("has-success").addClass("has-error");
                $(".hint-address").show();
            }else{
                var contentString = address;
                uppdateTime(myLatLg,coordinates);
                $("#focusedInput3").val(address);
                updateAddr(address);
                $(".address-user").removeClass("has-error").addClass("has-success");
                $(".hint-address").hide();
                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                old_marker.addListener('click', function() {
                    infowindow.open(map, old_marker);
                });

            }
        })
//coordinates	- такий самий об’єкт як створений new google.maps.LatLng(...)
   });
    function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('focusedInput3').value;
        updateAddr(address);
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
                $(".address-user").removeClass("has-error").addClass("has-success");
                $(".hint-address").hide();
                resultsMap.setCenter(results[0].geometry.location);
                if(old_marker){
                    old_marker.setMap(null);
                    old_marker = null;
                }
                old_marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                    icon: "assets/images/home-icon.png"
                });
                uppdateTime(myLatLg,address);
            } else {
                $(".address-user").removeClass("has-success").addClass("has-error");
                $(".hint-address").show();
            }
        });
    }
}
function calculateRoute(Alatlng, Blatlng, callback){
    var directionService =	new	google.maps.DirectionsService();
    directionService.route({
            origin:	Alatlng,
            destination: Blatlng,
            travelMode:	google.maps.TravelMode["DRIVING"]
        },
        function(response,	status)	{
            if	( status === google.maps.DirectionsStatus.OK ){
                var leg = response.routes[0].legs[0];
                callback(null,{
                    duration: leg.duration
                });
            }else{
                callback(new Error("Can not find direction"));
            }
        });
}
function uppdateTime(myLatLg,address){
    calculateRoute(myLatLg,address, function(err, data){
        if(!err){
            $(".time").text(data.duration.text);
        }else{
            $(".time").text("невідомий");
        }
    });
}
function updateAddr(address){
    var empty  = new RegExp(/^(\s*)$/);
    if(address.length === 0 || empty.test(address)){
        $("#address").text("невідома");
        $(".time").text("невідомий");
    }
    else{
        $("#address").text(address);
    }
}
//Коли сторінка завантажилась
google.maps.event.addDomListener(window,'load',	initialize);


