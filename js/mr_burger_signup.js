$( document ).on('ready', function() {

    $("#signup").on("click", function() {
        var jsonData = {
            "action" : "REGISTER",
            "username" : $('#usernameSignup').val(),
            "email" : $('#emailSignup').val(),
            "password" : $("#passSignup").val()
        };
        $.ajax({
            url: "data/appLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonResp) {
                console.log(jsonResp);
                if(jsonResp.status == "SUCCESS")
                {
                    alert("Done registry of user");
                    console.log("Done");
                    $('#usernameSignup').val('');
                    $('#emailSignup').val('');
                    $("#passSignup").val('');
                }
                else if(jsonResp.status == "MISSING")
                {
                    alert("Missing data, please fill all the textboxes");
                }
                else if(jsonResp.status == "FAILED")
                {
                    alert("User already exists");
                }
            }
        });
        
                

    })
        
});
