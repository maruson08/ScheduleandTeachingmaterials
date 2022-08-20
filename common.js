$(document).ready(function(){
    setDefaultMsg()
});


function setDefaultMsg(){
    $.getJSON("./wait_msg.json", function(data){
        $("#contents").html(data.msg);
    }).fail(function(){
        console.log("An error has occurred.");
    });  
}