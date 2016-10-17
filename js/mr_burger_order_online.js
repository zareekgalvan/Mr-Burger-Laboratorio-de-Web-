$( document ).on('ready', function() {

    $.ajax({
            url: "data/mr_burger_menu.json",
            type: "GET",
            dataType: "json",
            success: function(jsonData) {
                // Burger Type
                var newHTMLBurgerType = "";
                for(var i = 0; i<jsonData.menu.burgerType.length; i++)
                {
                    newHTMLBurgerType += '<option value="' + jsonData.menu.burgerType[i].value; 
                    newHTMLBurgerType += '">' + jsonData.menu.burgerType[i].type + '</option>';
                }
                $("#typeBurger").append(newHTMLBurgerType);

                // Bread Type
                var newHTMLBread = "";
                for(var i = 0; i<jsonData.menu.breadType.length; i++)
                {
                    newHTMLBread += '<option value="' + jsonData.menu.breadType[i].value; 
                    newHTMLBread += '">' + jsonData.menu.breadType[i].type + '</option>';
                }
                $("#typeBread").append(newHTMLBread);

                // Size
                var newHTMLSize = "";
                for(var key in jsonData.menu.burgerSize)
                {
                    newHTMLSize += '<option value="' + key;
                    newHTMLSize += '">' + jsonData.menu.burgerSize[key] + '</option>';
                }
                $("#sizeBurger").append(newHTMLSize);

                // Toppings
                var newHTMLToppings = "";
                for(var i = 0; i<jsonData.menu.toppings.length; i++)
                {
                    newHTMLToppings += '<li><input class="topping" type="checkbox" name="topping" value="' + jsonData.menu.toppings[i].value; 
                    newHTMLToppings += '">' + jsonData.menu.toppings[i].topping + '</li>';
                }
                $("#toppings").append(newHTMLToppings);

                // Sauces
                var newHTMLSauces = "";
                for(var i = 0; i<jsonData.menu.sauces.length; i++)
                {
                    newHTMLSauces += '<li><input class="sauce" type="checkbox" name="sauce" value="' + jsonData.menu.sauces[i].value; 
                    newHTMLSauces += '">' + jsonData.menu.sauces[i].sauce + '</li>';
                }
                $("#sauces").append(newHTMLSauces);
            },
            error: function(errorMsg) {
                console.log(errorMsg);
            }
        })

    $("#submitOrder").on("click", function(){
        var preparingAlertHTML = '';

        preparingAlertHTML += "Type of burger : " + $("#typeBurger").attr('selected', 'selected').val() + "\n";
        preparingAlertHTML += "Type of bread : " + $("#typeBread").attr('selected', 'selected').val() + "\n";
        preparingAlertHTML += "Size : " + $("#sizeBurger").attr('selected', 'selected').val() + "\n";
        preparingAlertHTML += "Mayo : " + $("input[name=mayo]").attr('selected', 'selected').val() + "\n";
        preparingAlertHTML += "Ketchup : " + $("input[name=ketchup]").attr('selected', 'selected').val() + "\n";
        preparingAlertHTML += "Mustard : " + $("input[name=mustard]").attr('selected', 'selected').val() + "\n";
        preparingAlertHTML += "Toppings : ";
        $(".topping:checked").each(function(){
            preparingAlertHTML += $(this).val() + " ";
        })
        preparingAlertHTML += "\nSauces : ";
        $(".sauce:checked").each(function(){
            preparingAlertHTML += $(this).val() + " ";
        })

        preparingAlertHTML += "\nFries : " + $("input[name=fries]").attr('selected', 'selected').val() + "\n";
        preparingAlertHTML += "Quantity : " + $(".quantity").val();

        alert(preparingAlertHTML);
    });

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("comment");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function() {
        if ($.cookie('activeuser'))
        {
            var commentToAdd = $("#theComment").val();
            var jsonData3 = {
                "id" : $.cookie('activeuser'),
                "body" : commentToAdd
            };

            if (commentToAdd != "")
            {
                console.log("entreeeeee")
                $.ajax({
                    url: "data/postComment.php",
                    type: "POST",
                    data: jsonData3,
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
                    strtoadd += "User: " + $.cookie('activeusername') + "<br>";
                    strtoadd += "Email: " + $.cookie('activeemail') + "<br>";
                    strtoadd += comment;
                    toadd.prepend(strtoadd);
                }

                $("#theComment").val("");
            }
        }
        else {
            modal.style.display = "block";
        }
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
