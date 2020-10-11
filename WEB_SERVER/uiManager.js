
/******************************************************************************* VARIABLE */

// variable de stockage des object contenant chaque règles
var ruleObjects;
// Selection du langage par defaut
var _selectedLangageContent;
var _selectedOrdersContent;
// selected criterias for the test
var criterias;
// choosen criteria = settled to first at the begining
var selectedCriteria = "None";


/******************************************************************************* INIT */

_init();

function _init(){
  showHomepage();
  _selectedLangageContent = _FRcontent;
  _selectedOrdersContent = _FRorder;
  criterias = defaultCriterias;
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
    loadNewTest("long")
  });
  // additional UI
  document.getElementById("HEADER").innerHTML = "";
  document.getElementById("HEADER").style.background = "transparent";
}



/******************************************************************************* RULES PAGE */

function loadNewTest(version="short"){
  //clear div container
  document.getElementById("CONTAINER").innerHTML = "";
  document.getElementById("HEADER").style.background = "black";
  /* initiation des objet règle */
  let mental_rule = new tlxRules(criterias[0]);
  let physical_rule = new tlxRules(criterias[1]);
  let temporal_rule = new tlxRules(criterias[2]);
  let performance_rule = new tlxRules(criterias[3]);
  let effort_rule = new tlxRules(criterias[4]);
  let frustration_rule = new tlxRules(criterias[5]);
  // Enregistrement dans une liste
  ruleObjects = {Mental:mental_rule, Physical:physical_rule, Temporal:temporal_rule, Performance:performance_rule, Effort:effort_rule, Frustration:frustration_rule};
  // Initiation ui de la page
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
  if (version == "long"){
    // création btn next
    buildNextBtn(document.getElementById("CONTAINER"), _selectedOrdersContent["nextBtn"], showWeightComparaison)
  }
  // Si c'est une version courte
  else{
    buildNextBtn(document.getElementById("CONTAINER"), _selectedOrdersContent["nextBtn"], finished)
    //btnNext.addEventListener("click", function(){sendDatasToPython()});
  }
  // ! a remplacer
  function finished(){console.log("finish")}
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
    console.log(selectedCriteria)
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
      alert("test terminé");
    }
  }
}



/******************************************************************************* POST TEST VALDATION */

function saveResult(){
  
}
