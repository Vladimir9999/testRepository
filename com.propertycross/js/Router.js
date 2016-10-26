'use strict';

var lUrl = 'http://api.nestoria.com.br/api?encoding=json&pretty=1&action=search_listings&country=br&listing_type=buy&place_name=';
var prop_col = new Properties();

var faves_col = new Properties();


function getModels(location) {
    $.ajax({
        url: lUrl + location,
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        success: function (data) {
            console.log(data);
            if (data.response.application_response_code > 200) {
                $("#title").text("Location not found!");
                return;
            }
            prop_col.reset(data["response"].listings);
            prop_col.forEach((val, valueAgain, prop_col) => {
                let view = new PropertyView({
                    $el: "#propertyList",
                    model: val
                });
                $("#propertyList").append(view.el);
            });
        }
    });
    /*$.get(lUrl + location, function (data) {
     if (data.response.application_response_code > 200) {
     $("#title").text("Location not found!");
     return;
     }
     prop_col.reset(data["response"].listings);
     prop_col.forEach((val, valueAgain, prop_col) => {
     let view = new PropertyView({
     $el: "#propertyList",
     model: val
     });
     $("#propertyList").append(view.el);
     });
     });*/
    $("#title").text("Results found for \"" + location + "\"");
}

var Router = Backbone.Router.extend({
    routes: {
        "": "home",
        "property/:query": "property",
        "search": "search",
        "search/:query": "search",
        "faves": "faves",
        "faves/:query": "faves"
    },
    initialize: function () {
        Backbone.history.start({pushState: false});
    },
    home: function () {
        $('.hero-unit').hide();
        $("#title").text("Use the page to search for houses to buy.");
    },
    property: function (query) {
        $('.hero-unit').hide();
        $('#model_Property').show();
        $("#title").text(prop_col.get(query).attributes.title);
        $("#model_Property").html(" ");
        let view = new ModelView({
            $el: "#model_Property",
            model: prop_col.get(query)
        });
        $("#model_Property").append(view.el);
    },
    search: function (query) {

        $('.hero-unit').hide();
        $('#searchProperty').show();
        $('#propertyList').html(" ");
        if (query) {
            getModels(query);
        } else {
            let location = $('#input').val();
            if (!location) {
                $("#title").text("Location not found!");
                return;
            }
            getModels(location);
        }
    },
    faves: function (query) {
        if (query)
            faves_col.add(prop_col.get(query));

        $("#title").text("Favourite property");
        $('.hero-unit').hide();
        $('#favesProperty').show();
        if (faves_col.length == 0) $("#title").text("Favourite property is empty");
        else {
            $("#faves_list").html(" ");
            faves_col.forEach((val, valueAgain, prop_col) => {
                let view = new PropertyView({
                    $el: "#faves_list",
                    model: val
                });
                $("#faves_list").append(view.el);
            });
        }

    }
});

