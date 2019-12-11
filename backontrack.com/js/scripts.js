  window.onload = function() {

  var maxZ=1000; //add seperate max z-index for folders and windows
  //may use "stack" for draggables
  function uniqueName(test_name){
    if(document.getElementById(test_name+"-folder") != null || document.getElementById(test_name+"-window") != null || document.getElementById(test_name+"-file") != null){
      return false;
    }
    else {
      return true;
    }
  }

  function fixOffScreenFolder(){
    while((mouseX + 0.055*window.innerWidth) > window.innerWidth){mouseX--;}
    while((mouseY + 0.115*window.innerHeight) > window.innerHeight){mouseY--;}
  }

    $(document).bind("contextmenu",function(e){
        e.preventDefault();
        mouseX = e.clientX, mouseY = e.clientY; //used when creating folders
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

      $("#items > li").click(function(event){
        
        switch(this.id){
            case "copy":
                console.log("In development");
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
                var newfname = prompt("Please enter a name");

                for(var i=1; !(newfname != "" && /^[a-z0-9_]+$/i.test(newfname) && uniqueName(newfname)); i++){

                  if(newfname===null){
                    break;
                  }
                  else{
                  newfname = prompt("This name is already in use or invalid. Please enter a new name");
                  }
                }
                if(newfname != null){//add path to ID
                  fixOffScreenFolder();
                  $('#body').append('<div class="folder" id="'+newfname+'-folder" title="'+newfname+'" style="left: '+mouseX+'px; top: '+mouseY+'px"><div class="img-cntnr"><img class="fimage" src="https://muw.instructure.com/courses/3388/files/128349/preview?verifier=KZ3WzNSTit0feCcW21pemx75UxOt9q52atBqtDtP" /></div><div class="name-cntnr"><p class="fname">'+newfname+'</p></div></div>').on("DOMNodeInserted", Folder_manip(newfname));
                  $('#body').append('<div class="window-frame" id="'+newfname+'-window"><div class="manage-window" title="'+newfname+'-window"><div class="buttons"><div class="close-button">   <img src="https://png.pngtree.com/svg/20170705/close_icon:_x_x_x_x_x_x_x_1112219.png"/>   </div><div class="window-button"> <i class="fa fa-window-restore" aria-hidden="true"></i> </div><div class="minimize-button"><a>_</a></div></div></div><div class="customize-bar"></div><div class="nav"><ul><li><i class="fa fa-star"></i>Quick access</li><li><i class="fa fa-desktop"></i>This PC</li><li><i class="fa fa-picture-o" aria-hidden="true"></i>Images</li><li><i class="fa fa-music"></i>Songs</li><li><i class="fa fa-file-text" aria-hidden="true"></i>Documents</li></ul></div><div class="window"></div></div>').on("DOMNodeInserted", Window_manip(newfname));                                            
                }//w8 a minute, samo 1 standard window, ali ono kaj je nutra ovisi o folderu

                break;
        }
      
      });

  function Folder_manip(name){

    var ID = "#"+name+"-folder";

    $(ID).draggable({       
      obstacle: ".folder", //it no work, z-index probs.
      containment: "window",
      snap: ".folder", //remove snap when hovering over window
      //snapMode: "outer", //works, but doesn't snap cleanly around anymore
      preventCollision: true, //You thought it was a working piece of code, but it was me, DIO! probs. also zIndex
      //grid: [($(".folder").css("width")).toString().replace("px", ""), ($(".folder").css("height")).toString().replace("px", "")], //nez dal je problem grid ili css
      scroll: false,
      //cursorAt: {right: 450, bottom: 300},
      start: function(){
        $(ID).css("z-index", "999999");
        if($(ID).hasClass("subfolder")){
        $(ID).removeClass("subfolder");
        //$(ID).css({"position": "absolute", "left": "750px", "top": "250px"});
        $(ID).addClass("dragged");
        $(ID).appendTo($("#body"));
        $("#"+name+"-window").appendTo($("#body"));
        }
      },
      stop: function(){
        $(ID).css("z-index", "1");
      }
    });
  //https://greensock.com/forums/topic/11870-draggable-hittest-multiple-elements/
    $(ID).dblclick(function () { 
      maxZ++;       
      $("#" + name + "-window").css({"display":"block", "z-index":maxZ});    
  });
  //add $(ID).selectable
  }

  function Window_manip(name){

  var ID = "#"+name+"-window";

      $(ID).resizable({ handles: 'n, e, s, w, ne, se, sw, nw' });
      $(ID).draggable({
        containment: [-(window.innerWidth-100), 1, window.innerWidth-10, window.innerHeight-10],
        scroll: false
      });

      $(ID).draggable('disable');
      $(ID + " .manage-window").mousedown(function () {$(ID).draggable('enable');});
      $(ID + " .manage-window").mouseup(function () {$(ID).draggable('disable');});

      $(ID + " .close-button").click(function(){
          $(ID).css("display", "none");
        });

      $(ID + ' .window-button').click(function () {
        $(ID).toggleClass("full-size-window");
        $(ID).removeAttr( 'style' );
        maxZ++;
        $(ID).css({"display":"block", "z-index":maxZ});
          //if(hasclass{resizable and dragable ('disable')})
      });

      $(ID + " .minimize-button").click(function(){
        console.log("to be added");
        });

      $(ID).mousedown(function() {
        maxZ++;
        $(ID).css("z-index", maxZ)
      });

      $( ".subfolder" ).draggable("disable");

      $(ID).droppable({
        drop: function(event, ui){
          
          $("#"+ui.draggable.text()+"-folder").removeClass("folder");
          $("#"+ui.draggable.text()+"-folder").removeAttr( 'style' );
          $("#"+ui.draggable.text()+"-folder").addClass("subfolder");
          $("#"+ui.draggable.text()+"-folder").appendTo($(ID).find($(".window")));
          $("#"+ui.draggable.text()+"-window").appendTo($(ID).find($(".window")));
        } //draggable "revert"
      });

  }

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
      }); 

      $(".folder").removeClass("selected");
              $(".name-cntnr").css("height", "2.5vh");
  */

  var modal = document.getElementById('id01');
  
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}//NANI!?

  $("#notifications").click(function(){$("#mySidenav").toggleClass("shownotifications")});

  $(document.body).click( function() {
    $("#mySidenav").removeClass("shownotifications")
  });

  $("#notifications").click( function(e) {
    e.stopPropagation(); // this stops the event from bubbling up to the body
  });

  $('#mySidenav').click(function(e){
    e.stopPropagation(); // added this
   });



   $("#windows").click(function(){$("#myWindows").toggleClass("showwindows")});

   $(document.body).click( function() {
    $("#myWindows").removeClass("showwindows")
  });

  $("#windows").click( function(e) {
    e.stopPropagation(); // this stops the event from bubbling up to the body
  });

  $('#myWindows').click(function(e){
    e.stopPropagation(); // added this
   });

   Folder_manip("test");
   Window_manip("test");
};