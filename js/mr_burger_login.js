$( document ).on('ready', function() {

    $("#login").on("click", function() {
        var jsonData = {
            "action" : "LOGIN",
            "email" : $('#loginEmail').val(),
            "password" : $("#loginPass").val()
        };
        $.ajax({
            url: "data/appLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonResponse) {
                //alert("Welcome back " + jsonResponse.username);
                latestUsername = jsonResponse.username;
                latestEmail = jsonResponse.email;
                latestId = jsonResponse.id;
                if ($.cookie('activeuser'))
                {
                    $(".loggedas").html("Currently logged as: " + $.cookie('activeusername'));
                }
                var commentToAdd = $("#theComment").val();
                var jsonData2 = {

                    "action" : "POSTCOMM",
                    "id" : latestId,
                    "body" : commentToAdd
                };

                if (commentToAdd != "")
                {
                    $.ajax({
                    url: "data/appLayer.php",
                    type: "POST",
                    data: jsonData2,
                    dataType: "json",
                    contentType: "application/x-www-form-urlencoded",
                    success: function() {
                        console.log("Comment posted")
                    },
                    error: function(errorMsg2) {
                        console.log(errorMsg2);
                    }

                });
                var comment = $("#theComment").val();

                if(comment) { 

                    var number = parseInt($("#numberOfComments").text());
                    $("#numberOfComments").text(number+1);
                    var toadd = $("#logOfComments");
                    var strtoadd = "<div class='commentBox cajacomentario'>";
                    strtoadd += "User: " + latestUsername + "<br>";
                    strtoadd += "Email: " + latestEmail + "<br>";
                    strtoadd += comment;
                    toadd.prepend(strtoadd);
                }

                $("#theComment").val("");
                }
            },
            error: function(errorMsg) {
                alert(errorMsg.responseText);
            }
        })
                

    })

    $("#loginTabBtn").on("click", function() {
        var jsonData3 = {
            "action" : "LOGIN",
            "email" : $('#loginEmailTab5').val(),
            "password" : $("#loginPassTab5").val()
        };
        $.ajax({
            url: "data/appLayer.php",
            type: "POST",
            data: jsonData3,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonResponse) {
                alert("Welcome back " + jsonResponse.username);
                console.log(jsonResponse);
                latestUsername = jsonResponse.username;
                latestEmail = jsonResponse.email;
                latestId = jsonResponse.id;
                if ($.cookie('activeuser'))
                {
                    $(".loggedas").html("Currently logged as: " + $.cookie('activeusername'));
                }
                
            },
            error: function(errorMsg) {
                alert(errorMsg.responseText);
            }
        })
                

    })
        
});
