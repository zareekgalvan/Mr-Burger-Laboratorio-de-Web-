
$( document ).on('ready', function() {
    $(".tab").click(function(){
        var identificador = $(this).attr("id");
        
        $(".selected").removeClass('selected');
        $(this).addClass('selected');
        
        $("#tabcontent > div").removeClass('active');
        $("#tabcontent > #content-"+identificador).addClass('active');
    });

    $("#brandName").html("Burgers the way they are meant to be");
    $("#footer").html("All Right Reserved. MR BURGER CO.");
    if ($.cookie('activeuser'))
    {
    	$(".loggedas").html("Currently logged as: " + $.cookie('activeusername'));
    }
});
