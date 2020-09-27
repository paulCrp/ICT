/*******************************************************************************
********************************************************************************
********************************************************************************


ui.js

Ici gestion de l'interface utilisateur et des modules permettant l'affichage de l'application



:: VARIABLES ::


:: INITIALISATION ::


:: HOMEPAGE ::


:: APP.PAGE.RULES ::


:: APP.PAGE.CHOICE ::


:: TOOLS ::


:: NOTES ::




********************************************************************************
********************************************************************************
*******************************************************************************/






/******************************************************************************* APP.PAGE.RULES */



/******************************************************************************* TOOLS */
var scores = {mental:50, physical:50, temporal:50, performance:50, effort:50, frustration:50};



class tlxRules{

  constructor(rulename, linkedvalue, parentObject){
    this.linkedvalue = linkedvalue;
    this.parentObject = parentObject;
    this.rulename = rulename;
  }

  buildRules(){
    // Build container
    addElement("div", this.parentObject, "tlxRules_container_"+this.rulename, "tlxRules_container_", this.rulename);
    // Build socle
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_baseGridline_"+this.rulename, "tlxRules_baseGridline_");
    // Build bar1
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline1_"+this.rulename, "tlxRules_Gridline1_ tlxRules_lightGridline_");
    // Build bar2
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline2_"+this.rulename, "tlxRules_Gridline2_ tlxRules_lightGridline_");
    // Build bar3
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline3_"+this.rulename, "tlxRules_Gridline3_ tlxRules_lightGridline_");
    // Build bar4
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline4_"+this.rulename, "tlxRules_Gridline4_ tlxRules_lightGridline_");
    // Build bar5
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline5_"+this.rulename, "tlxRules_Gridline5_ tlxRules_lightGridline_");
    // Build bar6
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline6_"+this.rulename, "tlxRules_Gridline6_ tlxRules_lightGridline_");
    // Build bar7
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline7_"+this.rulename, "tlxRules_Gridline7_ tlxRules_lightGridline_");
    // Build bar8
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline8_"+this.rulename, "tlxRules_Gridline8_ tlxRules_lightGridline_");
    // Build bar9
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline9_"+this.rulename, "tlxRules_Gridline9_ tlxRules_lightGridline_");
    // Build bar10
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline10_"+this.rulename, "tlxRules_Gridline10_ tlxRules_lightGridline_");
    // Build bar11
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline11_"+this.rulename, "tlxRules_Gridline11_ tlxRules_strongGridline_");
    // Build bar12
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline12_"+this.rulename, "tlxRules_Gridline12_ tlxRules_lightGridline_");
    // Build bar13
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline13_"+this.rulename, "tlxRules_Gridline13_ tlxRules_lightGridline_");
    // Build bar14
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline14_"+this.rulename, "tlxRules_Gridline14_ tlxRules_lightGridline_");
    // Build bar15
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline15_"+this.rulename, "tlxRules_Gridline15_ tlxRules_lightGridline_");
    // Build bar16
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline16_"+this.rulename, "tlxRules_Gridline16_ tlxRules_lightGridline_");
    // Build bar17
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline17_"+this.rulename, "tlxRules_Gridline17_ tlxRules_lightGridline_");
    // Build bar18
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline18_"+this.rulename, "tlxRules_Gridline18_ tlxRules_lightGridline_");
    // Build bar19
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline19_"+this.rulename, "tlxRules_Gridline19_ tlxRules_lightGridline_");
    // Build bar20
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline20_"+this.rulename, "tlxRules_Gridline20_ tlxRules_lightGridline_");
    // Build bar21
    addElement("div", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_Gridline21_"+this.rulename, "tlxRules_Gridline21_ tlxRules_lightGridline_");
    // Build range slider
    addElement("slider", document.getElementById("tlxRules_container_"+this.rulename), "tlxRules_slider_"+this.rulename, "tlxRules_slider_");
    var slider = document.getElementById("tlxRules_slider_"+this.rulename);
    var nameforRecord = this.rulename;
    slider.oninput = function() {
      scores[nameforRecord] = parseInt(this.value);
      console.log(scores);
    }
  }



}







let mental = new tlxRules("mental", scores["mental"], document.getElementById("CONTAINER"));
let physical = new tlxRules("physical", scores["physical"], document.getElementById("CONTAINER"));
let temporal = new tlxRules("temporal", scores["temporal"], document.getElementById("CONTAINER"));
let performance = new tlxRules("performance", scores["performance"], document.getElementById("CONTAINER"));
let effort = new tlxRules("effort", scores["effort"], document.getElementById("CONTAINER"));
let frustration = new tlxRules("frustration", scores["frustration"], document.getElementById("CONTAINER"));

var myrules = [mental, physical, temporal, performance, effort, frustration];
console.log(myrules[0])
for (let i = 0; i < 6; i++) {
  myrules[i].buildRules();
}











function addElement(type, parent, id="None", divClass="None", content="None", image="None"){

  if (type == "img")
  {
    myElement = BUILD_IMAGE(id, divClass, image)
  }
  else if (type == "input"){
    myElement = BUILD_INPUT(id, divClass, content)
  }
  else if (type == "slider"){
    myElement = BUILD_SLIDER(id, divClass, content)
  }
  else{
    myElement = BUILD_ELEMENT(type, id, divClass, content);
  }
  parent.appendChild(myElement);
}

function BUILD_ELEMENT (type, id="None", divClass="None", content="None", image="None"){
  // crée un nouvel élément div
  var myDiv = document.createElement(type);
  // assignation de l'id
  if (id != "None"){
    myDiv.id = id;
  }
  // assignation de la class
  if (divClass != "None"){
    myDiv.className = divClass;
  }
  // assignation de l'image
  if (image != "None"){
    myDiv.src = image;
  }
  // assignation du contenu
  if (content != "None"){
    var newContent = document.createTextNode(content);
    myDiv.appendChild(newContent);
  }
  return myDiv;
}
function BUILD_IMAGE(id="None", divClass="None", image="None"){
  var img = document.createElement('img');
  if (id != "None"){
    img.id = id;
  }
  if (divClass != "None"){
    img.className = divClass;
  }
  img.src =  image;
  return img;
}
function BUILD_INPUT(id="None", divClass="None", content="None"){
  // crée un nouvel élément div
  var myDiv = document.createElement("input");
  // assignation de l'id
  if (id != "None"){
    myDiv.id = id;
  }
  // assignation de la class
  if (divClass != "None"){
    myDiv.className = divClass;
  }
  // assignation du contenu
  if (content != "None"){
    myDiv.placeholder = content;
  }
  return myDiv;
}
function BUILD_SLIDER(id="None", divClass="None", content="None"){
  // crée un nouvel élément div
  var myDiv = document.createElement("input");
  myDiv.type = "range";
  myDiv.min = 0;
  myDiv.max = 100;
  // assignation de l'id
  if (id != "None"){
    myDiv.id = id;
  }
  // assignation de la class
  if (divClass != "None"){
    myDiv.className = divClass;
  }
  // assignation du contenu
  if (content != "None"){
    myDiv.placeholder = content;
  }
  return myDiv;
}
