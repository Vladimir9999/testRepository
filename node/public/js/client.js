/**
 * Created by User on 13.10.2016.
 */
"use strict"
 const lUrl = "http://localhost:3000";

$(document).ready(function(){
	$.get(lUrl + '/user',function(data){    
        for(let i = 0; i < data.length; i++)
            getPublicationName(data[i].publication, dataParser(data[i]));
	})

});
function dataParser(data){
 let result = "";
     let fio = data.FIO.split(' ');
     result += "<tr><th>" + fio[0] + "</th><th>" + fio[1] + "</th><th>" + fio[2] + "</th>"; 
 return result;
}


function getPublicationName(publicationID, string){
    $.get(lUrl + '/publiccation/' + publicationID, function(data){
        if (!data.name) 
            $(".UserList").html($(".UserList").html()+ string + "<th>" + "Публикаций пока нет </th></tr>");
        else
            $(".UserList").html($(".UserList").html()+ string + "<th>" + data.name + "</th></tr>");
    })
}



