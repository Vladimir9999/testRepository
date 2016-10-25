var lUrl = 'http://api.nestoria.com.br/api?encoding=json&pretty=1&action=search_listings&country=br&listing_type=buy&place_name=';
'use strict';

function getModels(location){
    $.get(lUrl + location, function (data) {
        if (data.response.application_response_code > 200) {
            $("#title").text("Location not found!");
            return;
        }
        let prop_col = new Properties(data["response"].listings);
        for (let i = 1; i < prop_col.length; i++) {
            let view = new PropertyView({
                $el: "#searchProperty",
                model: prop_col.get('c' + i)
            });
            $("#propertyList").append(view.el);
        }
    })
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

