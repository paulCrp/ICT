/*******************************************************************************
********************************************************************************
********************************************************************************


uiBuilder.js

Ici gestion de l'interface utilisateur et des modules permettant l'affichage de l'application



:: VARIABLES ::


:: APP.PAGE.HOMEPAGE ::


:: APP.PAGE.RULES ::


:: APP.PAGE.CHOICE ::


:: TOOLS ::


:: NOTES ::




********************************************************************************
********************************************************************************
*******************************************************************************/










/******************************************************************************* VARIABLES */

var _FRcontent = {
  Mental:{title:"Exigence Mentale", content:"Quelle a été l’importance de l’activité mentale et intellectuelle requise (ex. réflexion, décision, calcul, mémorisation, observation, recherche etc.) ? La tâche vous a-t-elle paru simple, nécessitant peu d’attention (faible) ou complexe, nécessitant beaucoup d’attention (élevée) ?", scaleMin:"Faible", scaleMax:"Elevée"},
  Physical:{title:"Exigence Physique", content:"Quelle a été l’importance de l’activité physique requise (ex. pousser, porter, tourner, marcher, activer, etc.) ? La tâche vous a-t-elle paru facile, peu fatigante, calme (faible) ou pénible, fatigante, active (élevée) ?", scaleMin:"Faible", scaleMax:"Elevée"},
  Temporal:{title:"Exigence Temporelle", content:"Quelle a été l’importance de la pression temporelle causée par la rapidité nécessitée pour l’accomplissement de la tâche ? Etait-ce un rythme lent et tranquille (faible) ou rapide et précipité (élevé) ?", scaleMin:"Faible", scaleMax:"Elevée"},
  Performance:{title:"Performance", content:"Quelle réussite pensez-vous avoir eu dans l’accomplissement de votre tâche ? Comment pensez-vous avoir atteint les objectifs déterminés par la tâche ?", scaleMin:"Bonne", scaleMax:"Mauvaise"},
  Effort:{title:"Effort", content:"Quel degré d’effort avez-vous dû fournir pour exécuter la tâche demandée, (mentalement et physiquement) ?", scaleMin:"Faible", scaleMax:"Elevée"},
  Frustration:{title:"Frustration", content:"Pendant l’exécution du travail vous êtes-vous senti satisfait, relaxé, sûr de vous (niveau de frustration faible), ou plutôt découragé, irrité, stressé, sans assurance (niveau de frustration élevé) ?", scaleMin:"Faible", scaleMax:"Elevée"}
};

var _ENcontent = {
  Mental:{title:"Mental Demand", content:"How much mental and perceptual activity was required? Was the task easy or demanding, simple or complex?", scaleMin:"Low", scaleMax:"High"},
  Physical:{title:"Physical Demand", content:"How much physical activity was required? Was the task easy or demanding, slack or strenuous?", scaleMin:"Low", scaleMax:"High"},
  Temporal:{title:"Temporal Demand", content:"How much time pressure did you feel due to the pace at which the tasks or task elements occurred? Was the pace slow or rapid?", scaleMin:"Low", scaleMax:"High"},
  Performance:{title:"Performance", content:"How successful were you in performing the task? How satisfied were you with your performance?", scaleMin:"Low", scaleMax:"High"},
  Effort:{title:"Effort", content:"How hard did you have to work (mentally and physically) to accomplish your level of performance?", scaleMin:"Low", scaleMax:"High"},
  Frustration:{title:"Frustration", content:"How irritated, stressed, and annoyed versus content, relaxed, and complacent did you feel during the task?", scaleMin:"Low", scaleMax:"High"}
};



/******************************************************************************* APP.PAGE.HOMEPAGE */

function buildHomepage(){
  addElement("div", document.getElementById("CONTAINER"), "pathElement_container");
  addElement("input", document.getElementById("pathElement_container"), "pathInput");
  addElement("BUTTON", document.getElementById("pathElement_container"), "pathSelectButton", "None", "Choose");
  addElement("input", document.getElementById("CONTAINER"), "profilNameElement");
  addElement("input", document.getElementById("CONTAINER"), "groupNameElement");
  addElement("input", document.getElementById("CONTAINER"), "participantIdElement");
  addElement("div", document.getElementById("CONTAINER"), "submit_container");
  addElement("BUTTON", document.getElementById("submit_container"), "shortButton", "None", "Short");
  addElement("BUTTON", document.getElementById("submit_container"), "longButton", "None", "Long");
}



/******************************************************************************* APP.PAGE.RULES */

class tlxRules{

  /* Class de construction de l'affichage graphique d'une règle avec curseur pour la saisie des donnée de l'interface
  *
  *     > constructor (rulename) ------------------------------------------------- constructeur de la class || args :: rulename = nom du critère NTLX issue de tlx.js > var criterias
  *     > buildRules(parentObject) ----------------------------------------------- Création des éléments HTML constitutif de la règle curseur enfant de "parentObject"
  *
  */

  constructor(rulename){
    this.rulename = rulename;
  }
  buildRules(parentObject){
    var rulesID = this.rulename;
    // Build container
    addElement("div", parentObject, "tlxRules_container_"+rulesID, "tlxRules_container_");
    var tlxRules_container_ = document.getElementById("tlxRules_container_"+rulesID);
    // Build socle
    addElement("div", tlxRules_container_, "tlxRules_baseGridline_"+rulesID, "tlxRules_baseGridline_");
    // Build bar1
    addElement("div", tlxRules_container_, "tlxRules_Gridline1_"+rulesID, "tlxRules_Gridline1_ tlxRules_lightGridline_");
    // Build bar2
    addElement("div", tlxRules_container_, "tlxRules_Gridline2_"+rulesID, "tlxRules_Gridline2_ tlxRules_lightGridline_");
    // Build bar3
    addElement("div", tlxRules_container_, "tlxRules_Gridline3_"+rulesID, "tlxRules_Gridline3_ tlxRules_lightGridline_");
    // Build bar4
    addElement("div", tlxRules_container_, "tlxRules_Gridline4_"+rulesID, "tlxRules_Gridline4_ tlxRules_lightGridline_");
    // Build bar5
    addElement("div", tlxRules_container_, "tlxRules_Gridline5_"+rulesID, "tlxRules_Gridline5_ tlxRules_lightGridline_");
    // Build bar6
    addElement("div", tlxRules_container_, "tlxRules_Gridline6_"+rulesID, "tlxRules_Gridline6_ tlxRules_lightGridline_");
    // Build bar7
    addElement("div", tlxRules_container_, "tlxRules_Gridline7_"+rulesID, "tlxRules_Gridline7_ tlxRules_lightGridline_");
    // Build bar8
    addElement("div", tlxRules_container_, "tlxRules_Gridline8_"+rulesID, "tlxRules_Gridline8_ tlxRules_lightGridline_");
    // Build bar9
    addElement("div", tlxRules_container_, "tlxRules_Gridline9_"+rulesID, "tlxRules_Gridline9_ tlxRules_lightGridline_");
    // Build bar10
    addElement("div", tlxRules_container_, "tlxRules_Gridline10_"+rulesID, "tlxRules_Gridline10_ tlxRules_lightGridline_");
    // Build bar11
    addElement("div", tlxRules_container_, "tlxRules_Gridline11_"+rulesID, "tlxRules_Gridline11_ tlxRules_strongGridline_");
    // Build bar12
    addElement("div", tlxRules_container_, "tlxRules_Gridline12_"+rulesID, "tlxRules_Gridline12_ tlxRules_lightGridline_");
    // Build bar13
    addElement("div", tlxRules_container_, "tlxRules_Gridline13_"+rulesID, "tlxRules_Gridline13_ tlxRules_lightGridline_");
    // Build bar14
    addElement("div", tlxRules_container_, "tlxRules_Gridline14_"+rulesID, "tlxRules_Gridline14_ tlxRules_lightGridline_");
    // Build bar15
    addElement("div", tlxRules_container_, "tlxRules_Gridline15_"+rulesID, "tlxRules_Gridline15_ tlxRules_lightGridline_");
    // Build bar16
    addElement("div", tlxRules_container_, "tlxRules_Gridline16_"+rulesID, "tlxRules_Gridline16_ tlxRules_lightGridline_");
    // Build bar17
    addElement("div", tlxRules_container_, "tlxRules_Gridline17_"+rulesID, "tlxRules_Gridline17_ tlxRules_lightGridline_");
    // Build bar18
    addElement("div", tlxRules_container_, "tlxRules_Gridline18_"+rulesID, "tlxRules_Gridline18_ tlxRules_lightGridline_");
    // Build bar19
    addElement("div", tlxRules_container_, "tlxRules_Gridline19_"+rulesID, "tlxRules_Gridline19_ tlxRules_lightGridline_");
    // Build bar20
    addElement("div", tlxRules_container_, "tlxRules_Gridline20_"+rulesID, "tlxRules_Gridline20_ tlxRules_lightGridline_");
    // Build bar21
    addElement("div", tlxRules_container_, "tlxRules_Gridline21_"+rulesID, "tlxRules_Gridline21_ tlxRules_lightGridline_");
    // Build range slider
    tlxRules_container_.addEventListener("click", function(event){
      /// Calculate actual position
      var mouseposOnclick = event.clientX;
      var posDiv = findAbsolutePos(tlxRules_container_)
      var sizeDiv = tlxRules_container_.offsetWidth;
      var cursorStartPosition = Math.round(((parseInt(mouseposOnclick)-parseInt(posDiv))*100)/parseInt(sizeDiv));
      // Création du curseur si inexistant
      if (scores[rulesID] == "None"){
        // Create cursor
        addSliderCursor(tlxRules_container_, rulesID, cursorStartPosition, "tlxRules_slider_"+rulesID, "tlxRules_slider_")
      }
      else{
        // MAJ de la position si existant
        document.getElementById("tlxRules_slider_"+rulesID+"_line_").style.left = cursorStartPosition+"%";
      }
      // MAJ score
      scores[rulesID] = cursorStartPosition;
      console.log(scores)
    });
  }

}
function buildRuleElement(parent, criteria, content, rules){
  // Build container
  addElement("div", parent, "rulesElement_container_"+criteria, "rulesElement_container_");
  // Build title
  addElement("div", document.getElementById("rulesElement_container_"+criteria), "rulesElement_title_"+criteria, "rulesElement_title_", content[criteria]["title"]);
  // Build content
  addElement("div", document.getElementById("rulesElement_container_"+criteria), "rulesElement_content_"+criteria, "rulesElement_content_", content[criteria]["content"]);
  // Build rules
  rules[criteria].buildRules(document.getElementById("rulesElement_container_"+criteria));
  // Build container max/min scale
  addElement("div", document.getElementById("rulesElement_container_"+criteria), "rulesElement_scaleContainer_"+criteria, "rulesElement_scaleContainer_");
  // Build min
  addElement("div", document.getElementById("rulesElement_scaleContainer_"+criteria), "rulesElement_min_"+criteria, "rulesElement_min_", content[criteria]["scaleMin"]);
  // Build max
  addElement("div", document.getElementById("rulesElement_scaleContainer_"+criteria), "rulesElement_max_"+criteria, "rulesElement_max_", content[criteria]["scaleMax"]);
}

function buildRulePage(){

}


/******************************************************************************* APP.PAGE.WEIGHT */


// Fill the two criterias' container and allow to fill the selectedCriteria with a click on the element
function buildWeightModule(parent, pairs){
  // Create UI element
  addElement("div", parent, "weightChoice_element1_"+pairs[0], "weightChoice_element1_ weightChoice_element", _selectedLangageContent[pairs[0]]["title"]);
  addElement("div", parent, "weightChoice_sepaline");
  addElement("div", parent, "weightChoice_element2_"+pairs[1], "weightChoice_element2_ weightChoice_element", _selectedLangageContent[pairs[1]]["title"]);
  // select element on click
  document.getElementById("weightChoice_element1_"+pairs[0]).addEventListener("click", function(){
    selectedCriteria = pairs[0];
    console.log(selectedCriteria);
    document.getElementById("weightChoice_element1_"+pairs[0]).style.color = "blue";
  });
  document.getElementById("weightChoice_element2_"+pairs[1]).addEventListener("click", function(){
    selectedCriteria = pairs[1];
    console.log(selectedCriteria);
    document.getElementById("weightChoice_element2_"+pairs[1]).style.color = "blue";
  });
}
// Creation of the list of all pairs possible
function findAllPair(mylist){
  // empty pool of pair
  pairs = [];
  // for every criteria in the list of selected criterias
  for (element in mylist){
    // counter to evaluate the position of the element in the list
    var counter = element;
    // loop to make a pair with every element of the list positionate after the counter
    while (counter<mylist.length){
      // only to supress double
      if (element != counter){
        // add the pair to the pool
        pairs.push([mylist[element], mylist[counter]])
      }
      // increment counter
      counter ++;
    }
  }
  // return result
  return pairs;
}
// Randomise the list
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function buildWeightPage(){

}


/******************************************************************************* TOOLS */


function addElement(type, parent, id="None", divClass="None", content="None", additional="None"){
  if (type == "img"){
    myElement = BUILD_IMAGE(id, divClass, additional)
  }
  else if (type == "input"){
    myElement = BUILD_INPUT(id, divClass, content)
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

function addSliderCursor(parent, criteria, cursorStartPosition, id="None", divClass="None"){

  /* BUILD_SLIDERCURSOR() ---> Création du curseur du slider
  *
  *   > UI
  *   > Variables
  *   > Event
  *   > Functions
  *     >> resetAbsolutPos()
  *     >> timer()
  *     >> pressingDown(event)
  *     >> notPressingDown(event)
  *
  */

  ////////////////////////////////////////////////////////////////////////////// UI

  // Ajout du témoin indiquant la position du curseur
  var sliderline = document.createElement("div");
  parent.appendChild(sliderline);
  // crée le curseur (invisible et large de 14px pour faciliter l'UX
  var slidercursor = document.createElement("div");
  // Ajout du curseur à la div parent
  sliderline.appendChild(slidercursor);
  // assignation de l'id
  slidercursor.id = id;
  sliderline.id = id+"_line_"
  // assignation de la class
  slidercursor.className = divClass;
  sliderline.className = divClass+"line_"
  // set startposition
  sliderline.style.left = cursorStartPosition+"%";
  // Set parent additional caracteristic
  parent.style.cursor = "pointer";


  ////////////////////////////////////////////////////////////////////////////// Variables

  // position de la div "parent" par rapport à la fenêtre
  let absolutePos = findAbsolutePos(parent);
  // Déclaration de la variable de réactualisation à 60fps
  let timerID;
  // Déclaration du compteur de frame
  let counter = 0;
  // Déclaration du temps d'attente (en ms) avant de considérer le click comme "hold"
  let pressHoldDuration = 10;
  // Déclaration de la variable de position du curseur (en %) dans son parent
  let relativePosCursor;

  ////////////////////////////////////////////////////////////////////////////// Event

  // Détection du click right mouse sur le curseur
  slidercursor.addEventListener("mousedown", pressingDown, false);
  // Détection du déclick right mouse dans l'ensemble de la fenêtre
  document.body.addEventListener("mouseup", notPressingDown, false);
  // if window.resize recalculate position ratio
  window.addEventListener('resize', resetAbsolutPos)


  ////////////////////////////////////////////////////////////////////////////// Functions

  // function to set the absolutePos element when the window resize :: called by event window resize
  function resetAbsolutPos(){absolutePos = findAbsolutePos(parent)}
  // function de détection du hold
  function timer() {
    // set 60 fps listener
    timerID = requestAnimationFrame(timer);
    // Si le hold est encore inférieur à 20ms
    if (counter < pressHoldDuration) {
      counter++;
    }
    // Si le hold est validé
    else {
      //slidercursor.style.left = relativePosCursor+"%";
      sliderline.style.left = relativePosCursor+"%";
      // MAJ scores
      scores[criteria] = Math.round(relativePosCursor)
      console.log(scores)
      //console.log(scores)
    }
  }
  // function de détection du click
  function pressingDown(e) {
    // Start the timer
    requestAnimationFrame(timer);
    // Détection du mouvement de la souris --
    document.body.addEventListener("mousemove",function(e){
      // position de la souris dans la fenêtre
      var mousePos = e.x;
      // position du curseur en px par rapport au parent
      var posX = parseInt(mousePos)-parseInt(absolutePos);
      // position du curseur en % par rapport au parent
      var relativePosX = (posX*100)/parseInt(parent.offsetWidth);
      // Set value du curseur en % avec max et min
      if (relativePosX<=0){
        relativePosCursor = 0;
      }
      else if (relativePosX >= 100){
        relativePosCursor = 100;
      }
      else{
        relativePosCursor = relativePosX;
      }
    });
  }
  // function de détection du déclick
  function notPressingDown(e) {
    // Stop the timer
    cancelAnimationFrame(timerID);
    counter = 0;
  }

}

//Retourne la position absolue d'un objet
function findAbsolutePos(obj){
  var curleft = 0;
  if (obj.offsetParent) {
    curleft = obj.offsetLeft
      while (obj = obj.offsetParent) {
        curleft += obj.offsetLeft;
      }
    }
  return curleft;
}
