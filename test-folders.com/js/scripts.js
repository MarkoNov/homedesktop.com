window.onload = function() {

    $(document).bind("contextmenu",function(e){
        e.preventDefault();

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
        $(document).off("click");
        });
      }

      $("#items > li").click(function(){
        switch(this.id){
            case "copy":
                  //document.getElementById("myText").focus();
                console.log("In development");
               // document.execCommand("copy");
                console.log("You have selected "+$(this).text());
                break;
            case "paste":
                console.log("In development");

                console.log("You have selected "+$(this).text());
                break;
            case "delete":
                console.log("In development");

                console.log("You have selected "+$(this).text());
                break;
            case "new":
                var newfname = prompt("Please enter a folder name", "New_Folder");

                if(newfname!=null && /^[a-z0-9_,]+$/i.test(newfname)){
                $('body').append('<div class="folder" id="'+newfname+'" title="'+newfname+'"><div class="img-cntnr"><img class="fimage" src="https://muw.instructure.com/courses/3388/files/128349/preview?verifier=KZ3WzNSTit0feCcW21pemx75UxOt9q52atBqtDtP" /></div><div class="name-cntnr"><p class="fname">'+newfname+'</p></div></div>').on("dblclick", ".folder", function(){$("#" + this.id + "-window").css("display", "block");});
                $('body').append('<div class="window-frame" id="newf-window"><div class="manage-window" title="'+newfname+'-window"><div class="buttons"><div class="close-button">   </div><div class="window-button">  </div><div class="minimize-button"></div></div></div><div class="window"></div></div>').on("DOMNodeInserted", Window_manip());
                }
                        
/*reset js and css files   if (newfname != null) {

                            var h, a, f;
                            a = document.getElementsByTagName('link');
                            for (h = 0; h < a.length; h++) {
                              f = a[h];
                              if (f.rel.toLowerCase().match(/stylesheet/) && f.href) {
                                var g = f.href.replace(/(&|\?)rnd=\d+/, '');
                                f.href = g + (g.match(/\?/) ? '&' : '?');
                                f.href += 'rnd=' + (new Date().valueOf());
                              }
                            }


                          var b;
                          b = document.getElementsByTagName('script')[2];

                            if (b.src.toLowerCase().match(/scripts.js/) && b.src) {
                              var c = b.src.replace(/(&|\?)rnd=\d+/, '');
                              b.src = c + (c.match(/\?/) ? '&' : '?');
                              b.src += 'rnd=' + (new Date().valueOf());
                            }                       
                        } */
                                            
                break;
        }
      
      });
var maxZ=100; //max z-index
//yes, most of the functionality is inside of this big ass function. Why, you ask? because dynamic elements; That's why.
function Window_manip(){

    for(let i = 0; i < $('.folder .fname').length; i++){
        $(".folder")[i].id = $(".folder .fname")[i].innerText;
        $(".folder .fname")[i].innerHTML = ($(".folder")[i].id).toString();
        $(".window-frame")[i].id = $(".folder")[i].id + "-window";
    }


    $( ".window-frame" ).resizable({ handles: 'n, e, s, w, ne, se, sw, nw' });
    $( ".window-frame" ).draggable({ containment: [-(window.innerWidth-100), 1, window.innerWidth-10, window.innerHeight-10], scroll: false });

    $( ".window-frame" ).draggable('disable');
    $( ".manage-window" ).mousedown(function () {$( ".window-frame" ).draggable('enable');});
    $( ".manage-window" ).mouseup(function () {$( ".window-frame" ).draggable('disable');});

    $(".close-button").click(function(){
        $(this).parents().eq(2).css("display", "none");
        $(this).css("z-index", "10");
      });

      $('.window-button').click(function () {
        $(this).parents().eq(2).toggleClass("full-size-window");
        $(this).parents().eq(2).removeAttr( 'style' );
        $(this).parents().eq(2).css("display", "block");
          //if(hasclass{resizable and dragable ('disable')})
    });

    $(".minimize-button").click(function(){
        console.log("to be added");
      });

      
     $( ".folder" ).draggable({       
        //obstacle: ".folder", //it no work
        containment: "window",
        preventCollision: true, //You thought it was a working piece of code, but it was me, DIO!
        grid: [($(".folder").css("width")).toString().replace("px", ""), ($(".folder").css("height")).toString().replace("px", "")],
        scroll: false
      });

      $( ".subfolder" ).draggable("disable");
/* selection be messed up... like bruh...
      var notSelected = true;

    $(".folder").click(function () {
        if (notSelected) {
            $(this).addClass("selected");
            $(this).find(".name-cntnr").css("height", "auto");
            notSelected = false;
        }
    });

    $(document).click(function () {
        if (notSelected) {
            $(".folder").removeClass("selected");
            $(".name-cntnr").css("height", "2.5vh");

        } else notSelected = true;
    }); */

    $(".folder").removeClass("selected");
            $(".name-cntnr").css("height", "2.5vh");

    $(".folder").dblclick(function () { 
         maxZ++;       
        $("#" + this.id + "-window").css({"display":"block", "z-index":maxZ});        
    });

    $(".window-frame").mousedown(function() {maxZ++; $(this).css("z-index", maxZ)})
};

Window_manip();

};