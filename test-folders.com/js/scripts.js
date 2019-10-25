var win = window.onload = function() {
//context menu from here to...
//CurrentSelection.Selector.getSelected 
// Function to get the Selected Text  
function getSelectedText() { 
    var selectedText = ''; 

    // window.getSelection 
    if (window.getSelection) { 
        selectedText = window.getSelection(); 
    } 
    // document.getSelection 
    else if (document.getSelection) { 
        selectedText = document.getSelection(); 
    } 
    // document.selection 
    else if (document.selection) { 
        selectedText = document.selection.createRange().text; 
    } else return; 
    return selectedText;
    // To write the selected text into the textarea 
    //document.testform.selectedtext.value = selectedText; 
} 

    $(document).bind("contextmenu",function(e){
        e.preventDefault();

        /* $("#cntnr").remove();
        var large = '<div id="cntnr"><ul id="items"><li id="copy">Copy</li>            <li id="paste">Paste</li>            <li id="delete">Delete</li>            </ul>          <hr />          <ul id="items">            <li id="new">New</li>          </ul>          <hr />          <ul id="items">            <li id="personalize">Personalize</li>            <li id="properties">Properties</li>            </ul>        </div>';
        $('body').append(large); */

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
        //$("#cntnr").remove();
        $(document).off("click");
        });
      }

      $("#items > li").click(function(){
          switch(this.id){
              case "copy":
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
          }
        
        });
//here
//fix for necessary double click after dragging
var notSelected = true;

$(".folder").click(function () {
    if (notSelected) {
        $(this).toggleClass("selected");
        notSelected = false;
        //console.log(notSelected + ", folder");
    }
});

$(document).click(function () {
    if (notSelected) {
        $(".folder").removeClass("selected");
        //console.log(notSelected);
        
    } else notSelected = true;
});
  
$(".folder").dblclick(function () {   
    $('body').append('<div class="window"><div class="manage-window"><div class="buttons"><div class="close-button"></div><div class="window-button"></div><div class="minimize-button"></div></div></div>');
    //win();
});

    $( function() {
        $( ".folder" ).draggable({
            containment: "window",
            grid: [70, 90],
            scroll: false
          });
     });

     $( ".window" ).resizable({ handles: 'n, e, s, w, ne, se, sw, nw' });
      $( ".window" ).draggable({ containment: [-(window.innerWidth-10), 1, window.innerWidth-10, window.innerHeight-10], scroll: false });

      $(".close-button").click(function(){
        $(".window").remove();
      });

      $('.window-button').click(function () {
          $(".window").toggleClass("full-size-window");
          $(".window").removeAttr( 'style' );
          //if(hasclass{resizable and dragable ('disable')})
    });

    $(".minimize-button").click(function(){
        $(".window").removeClass( "full-size-window" );
      });


};

 

 

