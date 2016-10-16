$( document ).on('ready', function() {

    $("#signup").on("click", function() {
        var jsonData = {
            "username" : $('#usernameSignup').val(),
            "email" : $('#emailSignup').val(),
            "password" : $("#passSignup").val()
        };
        $.ajax({
            url: "data/signupService.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded"
        })
        alert("Done registry of user");
        console.log("Done");
        $('#usernameSignup').val('');
        $('#emailSignup').val('');
        $("#passSignup").val('');
                

    })
        
});
