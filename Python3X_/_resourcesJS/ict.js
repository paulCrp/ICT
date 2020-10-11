



/* Variable de stockage dynamique des scores */

var defaultCriterias = ["Mental", "Physical", "Temporal", "Performance", "Effort", "Frustration"];
var scores = {Mental:"None", Physical:"None", Temporal:"None", Performance:"None", Effort:"None", Frustration:"None"};
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
}



/******************************************************************************* Score Calcultation */
// Round number to 5
function round(score){
  return Math.round(score/5)*5;
}
// Merge two list in one array
function mergeScore(scoreBrut, weightScore){
  var mergedScore = [];
  for (element in criterias){
    // Push in array brut score, weight score and brut score rounded
    mergedScore.push([scoreBrut[element], weightScore[element], round(scoreBrut[element])]);
  }
  return mergedScore;
}
// Calculation of the weighted average of score with the weight and the rounded score
function scoreCalculation(scoreList){
  var scoreTotal = 0;
  var coef = 0;
  for(element in scoreList){
    scoreTotal = scoreTotal + scoreList[element][1] * scoreList[element][2];
    coef = coef + scoreList[element][1];
  }
  scoreTotal = scoreTotal / coef;
  return scoreTotal;
}



/******************************************************************************* link to python */

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
