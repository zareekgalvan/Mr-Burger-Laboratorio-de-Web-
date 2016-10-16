
$( document ).on('ready', function() {
    $(".tab").click(function(){
        var identificador = $(this).attr("id");
        
        $(".selected").removeClass('selected');
        $(this).addClass('selected');
        
        $("#tabcontent > div").removeClass('active');
        $("#tabcontent > #content-"+identificador).addClass('active');
    });

    $("#brandName").html("Burgers and fries the way they were always meant to be");
    $("#footer").html("All Right Reserved. MR BURGER CO.");
});
