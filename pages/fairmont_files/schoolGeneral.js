/** TODO: this file needs to be reviewed and cleaned up */

var CONST_LOCATION = "/";
var modifiedStatus = false;
var formFocus = false;

var userType="logonStudent";

function chgImg(imgNam, onoff, change){
	if(document.images && change!='on'){	
    document.images[imgNam].src=eval(imgNam+onoff+'.src');
	}
}

function googleBlur(elementVar) {
	if (elementVar.value == '') {
		elementVar.style.background = '#ffffff url('+ googleSearchBackground +') left no-repeat';
	}
}

function googleFocus(elementVar) {
	elementVar.style.background = '#ffffff';

}

function submitPortalUser(form) {
  //var form = document.forms['portalLogonForm'];
  form.method.value=userType;

  form.submit();
  return false;
}

function submitUser(form) {

  form.method.value='logonInstructor'; 

  form.submit(); 
  return false;
}


function changeClass(elementVar, classNameVar) {
    elementVar.className=classNameVar;
    return false;
}

function buttonProminentOver(elementVar) {
     elementVar.className="buttonProminentHover"
     return false;
}

function buttonProminentOut(elementVar) {
     elementVar.className="buttonProminent"
     return false;
}

function buttonBasicOver(elementVar) {
     elementVar.className="buttonBasicHover"
     return false;
}

function buttonBasicOut(elementVar) {
     elementVar.className="buttonBasic"
     return false;
}

// side menu arrow bullets

function act(imgName) {
  if (document.images)
     document.images[imgName.name].src = linkon.src;
}

function inact(imgName) {
  if (document.images)
     document.images[imgName.name].src = linkoff.src;
}

var popF;
function centeredPopup(page, popWidth, popHeight, close_only, properties) {

  if (properties==null) { properties=",resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,top="}
	if ( popF && !popF.closed && popF.close ) {
		popF.close();
	}
	if ( !close_only ) {
		if (popWidth==null) { popWidth=400 }
		if (popHeight==null) { popHeight=400 }
 	    winX=(screen.width-popWidth)/2
	    winY=(screen.height-popHeight)/2
      popF = window.open(page, "Window", "width="+ popWidth + ",height=" + popHeight + properties +winY+",left="+winX);
  }
}

function create() {
        this.width = ''
        this.height = ''
        this.src = ''
        this.href = ''
        this.border = ''
        this.mouseover = ''
        this.sponsor = ''
}

function setModifiedStatus() {
  modifiedStatus = true
}

function checkModifiedStatus() {
  if (formFocus==false) {
    return true;
  }
  if (modifiedStatus==true) {
    if (confirm(checkModifiedMessage)) {
      return true;
    }
    return false;
  }

}

function gotoLink (linkValue) {
    document.location=linkValue;
    return true;
}

function submitMethod(method, formElement) {
  var theForm=document.forms[0];
  if (formElement!=null) {
    theForm = formElement;
  }
  theForm.method.value=method;
  theForm.submit();

  return false;
}

function checkForUserName(elementName) {
	if (elementName.value=="User Name") {
	   elementName.value='';
	}
}

function checkUserNameEmpty(elementName) {
	if (elementName.value=="") {
	   elementName.value='User Name';
	}
}

if (document.images)	{
    searchArrow1Off =new Image(); searchArrow1Off.src= publicAppVar + "images/search_arrow_off.gif";
    searchArrow1On =new Image();  searchArrow1On.src= publicAppVar + "images/search_arrow_on.gif";

    searchArrow2Off =new Image(); searchArrow2Off.src=publicAppVar + "images/search_arrow_off.gif";
    searchArrow2On =new Image();  searchArrow2On.src=publicAppVar + "images/search_arrow_on.gif";

}

function setTab(tabType) {
  if (tabType=="Instructor") {
	studentLogin.style.display='none';
    instructorLogin.style.display='';
    studentTab.style.backgroundImage='url('+ publicAppVar +'images/student_tab_on.gif)';
    studentTab.style.color='#666666';  

    instructorTab.style.backgroundImage='url('+ publicAppVar +'images/instructor_tab_on.gif)';
    instructorTab.style.backgroundPosition='bottom left';
    instructorTab.style.color='#ffffff';
  
  } else {
    instructorLogin.style.display='none';
	studentLogin.style.display='';    
  	studentTab.style.backgroundImage='url('+ publicAppVar + 'images/student_tab_off.gif)';
    studentTab.style.color='#ffffff';  

    instructorTab.style.backgroundImage='url('+ publicAppVar + 'images/instructor_tab_off.gif)';
    instructorTab.style.backgroundPosition='bottom left'; 
    instructorTab.style.color='#666666';
         
  }
  return false
}

function getParmater( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

/* usage: onkeypress="bindEnterKey(event, doStuff);" 
 * where doStuff is a function that we want to execute 
 */
function bindEnterKey(e, funcToExecute) {
	var charCode;
    
    if(e && e.which){
        charCode = e.which;
    }else if(window.event){
        e = window.event;
        charCode = e.keyCode;
    }

    if(charCode == 13) {
        //alert("Enter was pressed!");
        funcToExecute();
    }
}

function readOnlyComponent(fieldName){
	var obj = document.getElementByName(fieldName);
	obj.readOnly = true;
}

function disableComponent(fieldName){
	var obj = document.getElementByName(fieldName);
	obj.disabled = true;
}

function disableComponents(fieldName){
	var obj = document.getElementsByName(fieldName);
	for (var i = 0; i < obj.length; i++){
		obj[i].disabled = true;
	}
}

function disableDateController(fieldName){
	disableComponent(fieldName);
	var imgName = fieldName + '_calendar';
	var obj = document.getElementById(imgName);
	obj.disabled = true;
}

function getCurrentYear(){
    var currentTime = new Date();
    return currentTime.getFullYear();
}