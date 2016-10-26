var ModelView = Backbone.View.extend({
    tagName: 'div',
    className: "model_property",
    initialize: function () {
        this.template = _.template($("#model_template").html());
        this.listenTo(this.model, "all", this.render);
        this.render();
    },

    render: function () {
        var view = this.template(this.model.toJSON());
        this.$el.html(view);
        return this;
    },

});
