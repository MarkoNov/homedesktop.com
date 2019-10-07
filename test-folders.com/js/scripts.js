window.onload = function() {
//unimportant from here to...
    $(document).bind("contextmenu",function(e){
        e.preventDefault();

        $("#cntnr").remove();
        var large = '<div id="cntnr"><ul id="items"><li>Copy</li>            <li>Paste</li>            <li>Delete</li>            </ul>          <hr />          <ul id="items">            <li>Lock selection</li>          </ul>          <hr />          <ul id="items">            <li>Send to Back</li>            <li>Bring to Front</li>            </ul>        </div>';
        $('body').append(large);

        $("#cntnr").fadeIn(200,startFocusOut());

        if(e.pageX > window.innerWidth - document.getElementById("cntnr").offsetWidth){
            $("#cntnr").css("left",e.pageX - document.getElementById("cntnr").offsetWidth);
        }
        else{
            $("#cntnr").css("left",e.pageX);
        }
        if(e.pageY > window.innerHeight - document.getElementById("cntnr").offsetHeight){
            $("#cntnr").css("top",e.pageY - document.getElementById("cntnr").offsetHeight);
        }
        else{
            $("#cntnr").css("top",e.pageY);
        }
    });
    
    function startFocusOut(){
        $(document).on("click",function(){
        $("#cntnr").hide();      
        $("#cntnr").remove();  
        $(document).off("click");
        });
      }

      $("#items > li").click(function(){
        $("#menu").text("You have selected "+$(this).text());
        });

     $( function() {
        $( ".folder" ).draggable();
         });        
//here
//literally no clue what's going on



      var notSelected = true;

$(".folder").click(function () {
    if (notSelected) {
        $(this).toggleClass("selected");
        notSelected = false;
        console.log(notSelected + ", folder");
    }
});

$(document).click(function () {
    if (notSelected) {
        $(".folder").removeClass("selected");
        console.log(notSelected);
        
    } else notSelected = true;
});

};

 

 

