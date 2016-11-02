$( document ).ready(function() {
    
    //Load comments
    var jsonDataComms = {
            "action" : "COMMENTS"
        };
    $.ajax ({
        type: "POST",
        url : "data/appLayer.php",
        data: jsonDataComms,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success : function(jsonResp) {
            var newHTMLContent = "";
            for (var element in jsonResp) {
                newHTMLContent += "<div class='commentBox cajacomentario'>";
                newHTMLContent += "User: " + jsonResp[element].username + "<br>";
                newHTMLContent += "Email: " + jsonResp[element].email + "<br>";
                newHTMLContent += jsonResp[element].body;
                newHTMLContent += "</div>";
                var number = parseInt($("#numberOfComments").text());
                $("#numberOfComments").text(number+1);
            }

            $("#logOfComments").prepend(newHTMLContent);
        },
        error: function(errorMsg) {
            console.log(errorMsg);
        }
    })
}); 
