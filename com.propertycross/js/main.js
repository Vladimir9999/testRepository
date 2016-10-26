/**
 * Created by User on 23.10.2016.
 */
var app = app || {};
function addFaves() {
    var arr_url = location.href.split("/");
    location.href = "#/faves/" + arr_url[arr_url.length - 1];
    console.log();
}

$(function () {
    app.router = new Router();
});