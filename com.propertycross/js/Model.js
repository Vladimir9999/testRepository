var Property_model = Backbone.Model.extend({
    default: {
        bathroom_number: 0,
        bedroom_number: 0,
        img_url: "/img/pic.png",
        price: 0,
        price_formatted: "0$",
        property_type: " "

    }
});
var Properties = Backbone.Collection.extend({
    model: Property_model
});


