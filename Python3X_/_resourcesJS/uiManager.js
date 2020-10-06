

/******************************************************************************* INIT */

function _init(){
  buildHomepage()
  document.getElementById("shortButton").addEventListener("click", function(){loadNewTest()});
  document.getElementById("longButton").addEventListener("click", function(){showWeightComparaison()});
}

_init();



/******************************************************************************* RULES PAGE */
var rules = "NotSetYet";

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

  rules = {mental:mental_rule, physical:physical_rule, temporal:temporal_rule, performance:performance_rule, effort:effort_rule, frustration:frustration_rule};

  if (version == "long"){
    /* initiation de la version longue */
  }

  showRules();
}

function showRules(){
  for (var i =0; i<criterias.length; i++){
    buildRuleElement(criterias[i], _FRcontent, rules)
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

var feedback_scores = null;

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



/******************************************************************************* WEIGHT PAGE */

function showWeightComparaison(){

  //clear div container
  document.getElementById("CONTAINER").innerHTML = "";

  // Initialization of associated scores to criterias
  var weightScore = {mental:0, physical:0, temporal:0, performance:0, effort:0, frustration:0};
  // Creation of the list of pairs and shuffle
  var allPairs = findAllPair(criterias);
  allPairs = shuffle(allPairs);

  // counter made to show all pair from allPairs list
  var pairCounter = 0;
  // choosen criteria = None by default
  var selectedCriteria = "First";

  // Creation of container for criterias and submit button
  addElement("div", document.getElementById("CONTAINER"), "weightChoice_container");
  addElement("div", document.getElementById("CONTAINER"), "weightChoice_submit", "None", "Confirmer");
  document.getElementById("weightChoice_submit").addEventListener("click", function(){clickOnNextPair()});

  // click function to increment the counter and show the next pair
  function clickOnNextPair(){
    if(selectedCriteria != "None"){
      // icrement counter
      pairCounter++;
      // re-initialize value of selected criteria
      selectedCriteria = "None"
      // show next pair
      showPairs(allPairs, pairCounter);
      console.log(weightScore);
    }
    else{
      alert("Veuillez sélectionner un choix...");
    }
  }
  // Show a pair from 'mylist' at 'myIndex'
  function showPairs(myList, myIndex){
    // If it's not the first item
    if (selectedCriteria != "First"){
      weightScore[selectedCriteria]+=1;
    }
    // delete content of the module container
    document.getElementById("weightChoice_container").innerHTML = "";
    // if all the pairs isn't showed
    if(pairCounter<allPairs.length){
      // build a new pairs comparaison
      buildWeightModule(document.getElementById("weightChoice_container"), myList[myIndex]);
    }
    else{
      console.log(weightScore);
      alert("test terminé");
    }
  }


  // show the first comparaison
  showPairs(allPairs, pairCounter);

}
