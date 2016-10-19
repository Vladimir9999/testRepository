var id_user; //???

function visibleForm(){
    $("#addUs").css("visibility", "visible");
}

function hiddenForm(){
    $("#addUs").css("visibility", "hidden");
}
function addUser(){
    var xhr = new XMLHttpRequest();
    var obj = {
        FIO: $("#firstname").val() + " " + $("#middlename").val() + " " + $("#latsname").val()
    }
    var jData = JSON.stringify(obj);
    if ($(".btn-success").text() != 'Изменить'){
        xhr.open("PUT", "http://localhost:3000/user", false);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
            } else {
                console.log(xhr.responseText);
            }
        }
        xhr.send(jData);
    } else if(id_user){
        xhr.open("POST", "http://localhost:3000/user/" + id_user, false);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
            } else {
                console.log(xhr.responseText);
            }
        }
        xhr.send(jData);
    }

    hiddenForm();
}

function deleteUser(id){
    var user_id = $("#"+ id).text();
    $.ajax({
        type: 'DELETE',
        url: "http://localhost:3000/user/"+user_id,
    });
}

function updateUser(id){
    visibleForm();
    id_user = $("#"+ id).text();
    $.get("http://localhost:3000/user/"+id_user, function(data) {
        var fio = data.FIO.split(" ");
        $("#firstname").val(fio[0]);
        $("#middlename").val(fio[1]);
        $("#latsname").val(fio[2]);
    }, "json");
    $(".btn-success").text("Изменить");
    $("h4").text("Внесите изменения")
}