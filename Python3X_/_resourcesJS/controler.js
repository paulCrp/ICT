


/******************************************************************************* INIT */
let homepage;

_init();

function _init(){
  _QtC_getInitValues()
  intropage()

  function intropage(){
    setTimeout(function () {
          homepage = new ShowHomepage();
      }, 1000);
  }
}




/******************************************************************************* HOME PAGE */


// selected criterias for the test // AVOIR SI SA NE FAIT PAS DOUBLON AVEC DEFAULT CRITERIA

// choosen criteria = settled to first at the begining







/******************************************************************************* RULES PAGE */
// variable de stockage des object contenant chaque règles
var ruleObjects;

function loadNewTest(version="Short"){
  // init scores
  scores = {Mental:"None", Physical:"None", Temporal:"None", Performance:"None", Effort:"None", Frustration:"None"};
  roudedScores = format = {Mental:"None", Physical:"None", Temporal:"None", Performance:"None", Effort:"None", Frustration:"None"};
  weightScores = {Mental:0, Physical:0, Temporal:0, Performance:0, Effort:0, Frustration:0};

  //clear div container
  pageStyle();

  ruleObjects = {};
  /* initiation des objet règle */
  for(var i=0; i<criterias.length;i++){
    ruleObjects[criterias[i]] = new TlxRules(criterias[i])
  }
  /*
  let mental_rule = new TlxRules(criterias[0]);
  let physical_rule = new TlxRules(criterias[1]);
  let temporal_rule = new TlxRules(criterias[2]);
  let performance_rule = new TlxRules(criterias[3]);
  let effort_rule = new TlxRules(criterias[4]);
  let frustration_rule = new TlxRules(criterias[5]);
  // Enregistrement dans une liste
  ruleObjects = {Mental:mental_rule, Physical:physical_rule, Temporal:temporal_rule, Performance:performance_rule, Effort:effort_rule, Frustration:frustration_rule};
  // Initiation ui de la page
  */
  showRules(version);
}

function showRules(version){
  // affichage ui de la consigne
  buildAdviceElement(document.getElementById("CONTAINER"), _selectedOrdersContent["rulesAdvice"])
  // création de toutes les règles curseurs
  for (var i =0; i<criterias.length; i++){
    buildRuleElement(document.getElementById("CONTAINER"), criterias[i], _selectedLangageContent, ruleObjects)
  }
  // Si c'est une version longue
  if (version == "Long"){
    // création btn next
    buildNextBtn(document.getElementById("CONTAINER"), _selectedOrdersContent["nextBtn"], showWeightComparaison)
  }
  // Si c'est une version courte
  else{
    buildNextBtn(document.getElementById("CONTAINER"), _selectedOrdersContent["nextBtn"], finished)
    //btnNext.addEventListener("click", function(){sendDatasToPython()});
  }
  // ! a remplacer
  function finished(){
    saveResult()
  }
}



/******************************************************************************* WEIGHT PAGE */

function showWeightComparaison(){
  //clear div container
  document.getElementById("CONTAINER").innerHTML = "";
  // Creation of the list of pairs and shuffle
  var allPairs = findAllPair(criterias);
  allPairs = shuffle(allPairs);
  // counter made to show all pair from allPairs list
  var pairCounter = 0;
  // Build UI advice
  buildAdviceElement(document.getElementById("CONTAINER"), _selectedOrdersContent["weightAdvice"])
  // Creation of container for criterias and submit button
  addElement("div", document.getElementById("CONTAINER"), "weightChoice_container");
  // Build btn
  buildNextBtn(document.getElementById("CONTAINER"), _selectedOrdersContent["nextBtn"], clickOnNextPair, "weight")
  // show the first comparaison
  showPairs(allPairs, pairCounter);
  // click function to increment the counter and show the next pair
  function clickOnNextPair(){
    if(selectedCriteria != "None"){
      // icrement counter
      pairCounter++;
      // show next pair
      showPairs(allPairs, pairCounter);
    }
    else{
      alert("Veuillez sélectionner un choix...");
    }
    // re-initialize value of selected criteria
    selectedCriteria = "None"
  }
  // Show a pair from 'mylist' at 'myIndex'
  function showPairs(myList, myIndex){
    // If it's not the first item
    if (selectedCriteria != "None"){
      weightScores[selectedCriteria]+=1;
    }
    // delete content of the module container
    document.getElementById("weightChoice_container").innerHTML = "";
    // if all the pairs isn't showed
    if(pairCounter<allPairs.length){
      // build a new pairs comparaison
      buildWeightModule(document.getElementById("weightChoice_container"), myList[myIndex], [_selectedLangageContent[myList[myIndex][0]]["title"], _selectedLangageContent[myList[myIndex][1]]["title"]]);
    }
    else{
      console.log(weightScores);
      saveResult();
      alert("test terminé");
    }
  }
}



/******************************************************************************* POST TEST VALDATION */

function saveResult(){
  /* if long if short*/
  // transform data
  setRoundedScores();
  formatedDatas = {};
  for(var i=0; i<criterias.length;i++){
    formatedDatas["Tlx"+criterias[i]] = roudedScores[criterias[i]];
    formatedDatas["Exact"+criterias[i]] = scores[criterias[i]];
    if(choosenversion == "Long"){
      formatedDatas["Weight"+criterias[i]] = weightScores[criterias[i]]
    }
  }
  globalScores = globalScoresCalculation();
  formatedDatas["TlxGlobal"] = globalScores[0];
  formatedDatas["ExactGlobal"] = globalScores[1];
  if(choosenexperiment != "None"){
    _QtC_setResultValues(formatedDatas)
  }
  else{
    console.log("ICI SAUVEGARDE MANUEL")
  }
}








function getTransformedChoosenHomeValue(type, value){
  // set external value
  if(type == "expe" && value == "None" || type == "group" && value == "None"){
    value = "No selection"
  }
  else if (type == "id" && value == "None"){
    value = ""
  }
  return value
}





/*
var feedback_scores = null; // ! possible de suprimer??
//NOT NEEDED
// Fonction d'envoie des donnée à python
function sendDatasToPython(datas){
  console.log("here")
  // Création du channel
  new QWebChannel(qt.webChannelTransport, function(channel) {
    // Construction de l'object "channel"
    feedback_scores = channel.objects.feedback_scores;
    // Fonction d'envoi des données
    feedback_scores.getRef(JSON.stringify(datas));
  });
}

function qtChannelDataReceiver_(value){
  console.log(value)
}
*/

/******************************************************************************* Channel from/to python */

function _QtC_openFolderFinder(element){
  // Création du channel
  new QWebChannel(qt.webChannelTransport, function(channel) {
    // Construction de l'object "channel"
    channel_openFolderFinder = channel.objects.openFolderFinder;
    // Fonction d'envoi des données
    channel_openFolderFinder.triggerFt("x", function(pyval){
      console.log(pyval)
      valueinjson = JSON.parse(pyval)
      if (valueinjson["path"] != "None"){
        resultpath = valueinjson["path"];
        element.innerHTML = resultpath
      }
      if (valueinjson["error"]==1){
        document.getElementById("S_directoryerror").innerHTML = "* Vous n'avez pas changé de répertoire."
      }
      else if (valueinjson["error"]==2){
        document.getElementById("S_directoryerror").innerHTML = "* Une erreur c'est produite, nous n'avons pas pu changer le repertoire."
      }
      else if(valueinjson["error"] == 0){
        archProfiles = valueinjson["arch"]
        console.log(archProfiles)
      }
    });
  });
}
function _QtC_getInitValues(){
  new QWebChannel(qt.webChannelTransport, function(channel){
    getsetStoredDatas = channel.objects.getsetStoredDatas;
    getsetStoredDatas.getDatas("initValues", function(pyval){
      console.log(pyval)
      valueinjson = JSON.parse(pyval)
      resultpath = valueinjson["resultpath"];
      archProfiles = valueinjson["arch"];
      defaultlanguage = valueinjson["defaultvalues"]["language"];
      defaultversion = valueinjson["defaultvalues"]["version"];
      defaultCriterias = valueinjson["defaultvalues"]["criteria"]
    });
  });
}
function _QtC_setDefaultValues(){
  valuetosend = JSON.stringify({
    "language":defaultlanguage,
    "version":defaultversion,
    "criteria": defaultCriterias
  });
  new QWebChannel(qt.webChannelTransport, function(channel){
    getsetStoredDatas = channel.objects.getsetStoredDatas;
    getsetStoredDatas.setDefaultValues(valuetosend, function(pyval){
      valueinjson = JSON.parse(pyval)
      defaultlanguage = valueinjson["language"];
      defaultversion = valueinjson["version"];
      defaultCriterias = valueinjson["criteria"]
    });
  });
}
function _QtC_createNewProfile(values){
  new QWebChannel(qt.webChannelTransport, function(channel){
    getsetStoredDatas = channel.objects.getsetStoredDatas;
    getsetStoredDatas.createNewProfile(JSON.stringify(values), function(pyval){
      valueinjson = JSON.parse(pyval)
      if (valueinjson["error"] == 0){
        archProfiles = valueinjson["result"];
        homepage.pm_loadfromAw()
      }
      else{
        document.getElementById("EP_displayError").innerHTML = "* "+valueinjson["result"]
      }
    });
  });
}
function _QtC_setResultValues(values){
  valuetosend = JSON.stringify(values);
  new QWebChannel(qt.webChannelTransport, function(channel){
    getsetStoredDatas = channel.objects.getsetStoredDatas;
    getsetStoredDatas.setResultDatas(valuetosend, function(pyval){
      valueinjson = JSON.parse(pyval)
    });
  });
}
