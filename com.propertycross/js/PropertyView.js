
var PropertyView = Backbone.View.extend({
    tagName: 'li',
    className: "propertyCross",
    initialize: function () {
        this.template = _.template($("#property_template").html());
        this.listenTo(this.model, "all", this.render);
        this.render();
    },

    render: function () {
        var view = this.template(this.model.toJSON());
        this.$el.html(view);
        return this;
    }
});
