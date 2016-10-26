
'use strict';

var lUrl = 'http://api.nestoria.com.br/api?encoding=json&pretty=1&action=search_listings&country=br&listing_type=buy&place_name=';
var prop_col = new Properties();


function getModels(location){
    $.get(lUrl + location, function (data) {
        if (data.response.application_response_code > 200) {
            $("#title").text("Location not found!");
            return;
        }
        prop_col.reset(data["response"].listings);
        prop_col.forEach((val, valueAgain, prop_col) => {
            let view = new PropertyView({
                $el: "#searchProperty",
                model: val
            });
            $("#propertyList").append(view.el);
        });
    });
    $("#title").text("Property in " + location);
}

var Router = Backbone.Router.extend({
    routes: {
        "": "home",
        "property/:query": "property",
        "search": "search",
        "search/:query": "search",
        "faves": "faves"
    },
    initialize: function () {
        Backbone.history.start({pushState: false});
    },
    home: function(){
        $('.hero-unit').hide();
        $("#title").text("Use the page to search for houses to buy.");
    },
    property: function () {
        $('.hero-unit').hide();
        $('#listProperty').show();
    },
    search: function (query) {

        $('.hero-unit').hide();
        $('#searchProperty').show();
        $('#propertyList').html(" ");
        if (query){
            getModels(query);
        }else {
            let location = $('#input').val();
            if (!location) {
                $("#title").text("Location not found!");
                return;
            }
            getModels(location);
        }
    },
    faves: function () {
        $("#title").text("Favourite property");
        $('.hero-unit').hide();
        //$('#favesProperty').show();
    }
});

