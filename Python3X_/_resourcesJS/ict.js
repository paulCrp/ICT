



/* Variable de stockage dynamique des scores */

var defaultCriterias = ["Mental", "Physical", "Temporal", "Performance", "Effort", "Frustration"];
var scores = {Mental:"None", Physical:"None", Temporal:"None", Performance:"None", Effort:"None", Frustration:"None"};
var roudedScores = {};
var weightScores = {Mental:0, Physical:0, Temporal:0, Performance:0, Effort:0, Frustration:0};




/******************************************************************************* Asumption check */

// Check si l'ensemble de la grille de score à été remplie
function checkRulesValidity(){
  // pool de clé du dictionnaire "scores" qui n'aurait pas été remplie
  undefinedKeys = [];
  // pour chaque clé du dictionnaire
  for (key in scores){
    // vérification de la valeur
    if (scores[key] == "None"){
      // ajout de la valeur au pool si elle ne correspond pas
      undefinedKeys.push(key)
    }
  }
  // return result
  return undefinedKeys;
}



/******************************************************************************* Manage criteria */

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



/******************************************************************************* Score Calculation in UiManager !!!! */

// ! need to set it
function alexft(){
  createRoundedArray();
  scoreG = scoreCalculation();
}



/******************************************************************************* Score Calcultation */
// Round number to 5
function createRoundedArray(){
  mykeys = Object.keys(scores);
  for (key in mykeys){
    roudedScores[mykeys[key]] = Math.round(scores[mykeys[key]]/5)*5;
  }
}
// Calculation of the weighted average of score with the weight and the rounded score
function scoreCalculation(){
  // empty result need to return
  var scoreGlobal = 0;
  // calcul sum of all coef
  totalcoef = calculateSumCoef();
  // if is a short version
  if (totalcoef == 0){
    totalcoef = defaultCriterias.length;
    weightScores = {Mental:1, Physical:1, Temporal:1, Performance:1, Effort:1, Frustration:1};
  }
  console.log(totalcoef)
  // calcul Score global
  for(element in roudedScores){
    scoreGlobal = scoreGlobal + roudedScores[element] * weightScores[element];
  }
  scoreGlobal = scoreGlobal / totalcoef;
  console.log(scoreGlobal)
  // return score global
  return scoreGlobal;
}
// Verify the value of cummulate coef
function calculateSumCoef(){
  totalcoef = 0;
  // verif weightScore
  for (i in weightScores){
    totalcoef += weightScores[i];
  }
  return totalcoef
}


/******************************************************************************* link to python */

var feedback_scores = null; // ! possible de suprimer??
// Fonction d'envoie des donnée à python
function sendDatasToPython(datas){
  // Création du channel
  new QWebChannel(qt.webChannelTransport, function(channel) {
    // Construction de l'object "channel"
    feedback_scores = channel.objects.feedback_scores;
    // Fonction d'envoi des données
    feedback_scores.getRef(JSON.stringify(datas));
  });
}
