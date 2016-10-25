var lUrl = 'http://api.nestoria.com.br/api?encoding=json&pretty=1&action=search_listings&country=br&listing_type=buy&place_name=';
'use strict';
var Router = Backbone.Router.extend({
    routes: {
        "#": "home",
        "property/:query": "property",
        "search": "search",
        "faves": "faves"
    },
    initialize: function () {
        Backbone.history.start({pushState: false});
    },
    home: function(){
        console.log("1");
        $('.hero-unit').hide();
        $("#title").text("Use the page below to search for houses to buy.");
    },
    property: function () {
        $('.hero-unit').hide();
        $('#listProperty').show();
    },
    search: function () {
        $('.hero-unit').hide();
        $('#searchProperty').show();
        let location = $('#input').val();
        if (!location) return;
        $.get(lUrl + location, function (data) {
            var prop_col = new Properties(data["response"].listings);
            for (let i = 1; i < prop_col.length; i++) {
                let view = new PropertyView({
                    $el: "#searchProperty",
                    model: prop_col.get('c' + i)
                });
                $("#propertyList").append(view.el);
            }
        })
    },
    faves: function () {
        $('.hero-unit').hide();
        $('#favesProperty').show();
    }
});