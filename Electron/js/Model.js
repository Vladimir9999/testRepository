var Property_model = Backbone.Model.extend({
    default: {
        bathroom_number: 0,
        bedroom_number: 0,
        img_url: "/img/ico.jpg",
        price: 0,
        property_type: " ",
        title: "unknown"
    }
});
var Properties = Backbone.Collection.extend({
    model: Property_model
});


