
/******************************************************************************* VARIABLE */

// variable de stockage des object contenant chaque règles
var ruleObjects;
// choosen criteria = settled to first at the begining
var selectedCriteria = "First";
// Selection du langage par defaut
var _selectedLangageContent;


/******************************************************************************* INIT */

_init();

function _init(){
  showHomepage();
  _selectedLangageContent = _FRcontent;
}



/******************************************************************************* HOME PAGE */

function showHomepage(){
  // Build structure
  buildHomepage()
  // Link to other functions
  document.getElementById("shortButton").addEventListener("click", function(){
    document.body.style.background = "white";
    loadNewTest()
  });
  document.getElementById("longButton").addEventListener("click", function(){
    document.body.style.background = "white";
    showWeightComparaison()
  });
  // additional UI
  document.getElementById("HEADER").innerHTML = "";
  document.getElementById("HEADER").style.background = "transparent";
}



/******************************************************************************* RULES PAGE */

function loadNewTest(version="short"){
  //clear div container
  document.getElementById("CONTAINER").innerHTML = "";
  /* initiation des objet règle */
  let mental_rule = new tlxRules(criterias[0]);
  let physical_rule = new tlxRules(criterias[1]);
  let temporal_rule = new tlxRules(criterias[2]);
  let performance_rule = new tlxRules(criterias[3]);
  let effort_rule = new tlxRules(criterias[4]);
  let frustration_rule = new tlxRules(criterias[5]);
  ruleObjects = {Mental:mental_rule, Physical:physical_rule, Temporal:temporal_rule, Performance:performance_rule, Effort:effort_rule, Frustration:frustration_rule};
  if (version == "long"){
    /* initiation de la version longue */
  }
  showRules();
}

function showRules(){
  for (var i =0; i<criterias.length; i++){
    buildRuleElement(document.getElementById("CONTAINER"), criterias[i], _selectedLangageContent, ruleObjects)
  }
  btnChannelToPython = document.createElement("BUTTON");
  btnChannelToPython.innerHTML = "SEND";
  document.getElementById("CONTAINER").appendChild(btnChannelToPython);
  btnChannelToPython.addEventListener("click", function(){sendDatasToPython()});
  /*
  for (let i = 0; i < 6; i++) {
    rules[i].buildRules(document.getElementById("CONTAINER"));
  }
  */
}

var feedback_scores = null; // ! possible de suprimer??
// Fonction d'envoie des donnée à python
function sendDatasToPython(){
  // Création du channel
  new QWebChannel(qt.webChannelTransport, function(channel) {
    // Construction de l'object "channel"
    feedback_scores = channel.objects.feedback_scores;
    // Fonction d'envoi des données
    feedback_scores.getRef(JSON.stringify(scores));
  });
}
/******************************************************************************* Score Calculation */
// Create score button
addElement("div", document.getElementById("CONTAINER"), "weightChoice_score", "None", "Score");
buttonScore = document.getElementById("weightChoice_score");
buttonScore.addEventListener("click", function(){
// Assign score brut and weight to variables
    var scoreBrut = [45, 80, 25, 70, 100, 15];
    var scoreWeight = [0, 3, 4, 3, 3, 2];
// Merge score brut and weight in one array
    var totalScore = mergeScore(scoreBrut, scoreWeight);
    console.log(totalScore);
// NASA TLX score calculation
    var result = scoreCalculation(totalScore);
    console.log(result);
  }
);


/******************************************************************************* WEIGHT PAGE */

function showWeightComparaison(){

  //clear div container
  document.getElementById("CONTAINER").innerHTML = "";

  // Creation of the list of pairs and shuffle
  var allPairs = findAllPair(criterias);
  allPairs = shuffle(allPairs);

  // counter made to show all pair from allPairs list
  var pairCounter = 0;

  // Creation of container for criterias and submit button
  addElement("div", document.getElementById("CONTAINER"), "weightChoice_container");
  addElement("div", document.getElementById("CONTAINER"), "weightChoice_submit", "None", "Confirmer");
  document.getElementById("weightChoice_submit").addEventListener("click", function(){clickOnNextPair()});

  // click function to increment the counter and show the next pair
  function clickOnNextPair(){
    if(selectedCriteria != "None"){
      // icrement counter
      pairCounter++;
      // show next pair
      showPairs(allPairs, pairCounter);
      console.log(weightScores);
    }
    else{
      console.log(selectedCriteria)
      alert("Veuillez sélectionner un choix...");
    }

    // re-initialize value of selected criteria
    selectedCriteria = "None"
  }
  // Show a pair from 'mylist' at 'myIndex'
  function showPairs(myList, myIndex){
    // If it's not the first item
    if (selectedCriteria != "First"){
      weightScores[selectedCriteria]+=1;
    }
    // delete content of the module container
    document.getElementById("weightChoice_container").innerHTML = "";
    // if all the pairs isn't showed
    if(pairCounter<allPairs.length){
      // build a new pairs comparaison
      buildWeightModule(document.getElementById("weightChoice_container"), myList[myIndex]);
    }
    else{
      console.log(weightScores);
      alert("test terminé");
    }
  }


  // show the first comparaison
  showPairs(allPairs, pairCounter);

}
