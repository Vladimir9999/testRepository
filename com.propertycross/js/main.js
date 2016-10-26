/**
 * Created by User on 23.10.2016.
 */
var app = app || {};

/*------- Костыли ---------------*/
function addFaves() {
    var arr_url = location.href.split("/");
    location.href = "#/faves/" + arr_url[arr_url.length - 1];
    console.log();
}


function route_search() {
    location.href = "#/search/"+ $('#input').val();
}

$(function () {
    app.router = new Router();
});