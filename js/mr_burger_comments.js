$( document ).ready(function() {
    
    //Load comments
    $.ajax ({
        type: "POST",
        url : "data/commentsService.php",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success : function(jsonResp) {
            var newHTMLContent = "";
            console.log(jsonResp);
            for (var element in jsonResp) {
                newHTMLContent += "<div class='commentBox cajacomentario'>";
                newHTMLContent += "User: " + jsonResp[element].username + "<br>";
                newHTMLContent += "Email: " + jsonResp[element].email + "<br>";
                newHTMLContent += jsonResp[element].body;
                newHTMLContent += "</div>";
                var number = parseInt($("#numberOfComments").text());
                $("#numberOfComments").text(number+1);
            }

            $("#logOfComments").append(newHTMLContent);
        },
        error: function(errorMsg) {
            console.log(errorMsg);
        }
    })
}); 
