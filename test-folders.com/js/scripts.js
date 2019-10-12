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
                  //var copyText = $(event.target);
                  var copyText = CurrentSelection.Selector.getSelected();
                  console.log(copyText.htmlText);
                 // document.execCommand("copy");
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








      var parentContainerId = "yeet"
		
	if(!window.CurrentSelection){
		CurrentSelection = {}
	}
	
	CurrentSelection.Selector = {}
	
	//get the current selection
	CurrentSelection.Selector.getSelected = function(){
		var sel = '';
		if(window.getSelection){
			sel = window.getSelection()
		}
		else if(document.getSelection){
			sel = document.getSelection()
		}
		else if(document.selection){
			sel = document.selection.createRange()
        }
        window.alert(sel); //ne dela bez ostaloga V
		return sel
	}
	//function to be called on mouseup
	CurrentSelection.Selector.mouseup = function(){
		
		var st = CurrentSelection.Selector.getSelected()
		if(document.selection && !window.getSelection){
			var range = st
			range.pasteHTML("<span class='selectedText'>" + range.htmlText + "</span>");			
		}
		else{
			var range = st.getRangeAt(0)    
			var newNode = document.createElement("span");
			newNode.setAttribute("class", "selectedText");
			range.surroundContents(newNode);
			//
		   var getTitle = newNode.innerHTML;
		   newNode.setAttribute("title", getTitle);
           
		   //
		   var popDiv = document.createElement('span');
		   popDiv.setAttribute('class', 'popDiv');
		   popDiv.innerHTML = getTitle;

		   if(newNode.innerHTML.length > 0) {
		    newNode.appendChild(popDiv);
		   }		   
		   //Remove Selection: To avoid extra text selection in IE  
		   if (window.getSelection) {
		     window.getSelection().removeAllRanges();
		   }
	       else if (document.selection){ 
	        document.selection.empty();
	       }
	       //
		}
	}
        
	$(function(){

		$("#"+parentContainerId).on('mouseup', function(){
			$('span.selectedText').contents().unwrap();
			$(this).find('span.popDiv').remove();			
		});

		$("#"+parentContainerId).bind("mouseup",CurrentSelection.Selector.mouseup);	
	})
};

 

 

