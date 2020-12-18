/*******************************************************************************
********************************************************************************
********************************************************************************


model.js

Permet la gestion des variables, des données et de la logique des calculs

:: VARIABLES ::
  > stockage des contenus <
    - _FRcontent --------------------------------------------------------------- Consigne relative au critères du NTLX en Français
    - _ENcontent --------------------------------------------------------------- Consigne relative au critères du NTLX en Anglais
    - _FRorder ----------------------------------------------------------------- Consigne relative au parcours utilisateur dans le logiciel - en français
    - _ENorder ----------------------------------------------------------------- Consigne relative au parcours utilisateur dans le logiciel - en Anglais
  > stockage donnée relative à la bdd <
    - resultpath --------------------------------------------------------------- Chemin de la base de donnée
    - archProfiles ------------------------------------------------------------- bdd sous forme de dictionnaire :: exemple = {"Expe1":{"Group1":["Id1", "Id2"], ...}}
  > stockage donnée par defaut <
    - defaultlanguage ---------------------------------------------------------- Valeur de la variable langage issue de _config.ini > DEFAULT_VALUES
    - defaultversion ----------------------------------------------------------- Valeur de la variable version issue de _config.ini > DEFAULT_VALUES
    - defaultCriterias --------------------------------------------------------- Valeur de la variable criteria issue de _config.ini > DEFAULT_VALUES
  > variable sélectionné pour l'affichage ui des bouton de la homepage <
    - choosenlanguage ---------------------------------------------------------- valeur de la variable langage de la homepage
    - choosenversion ----------------------------------------------------------- valeur de la variable version de la homepage
    - choosenexperiment -------------------------------------------------------- valeur de la variable du nom de l'expérience sélectionné sur la homepage
    - choosengroup ------------------------------------------------------------- valeur de la variable du groupe sélectionné de la homepage
    - choosenparticipantid ----------------------------------------------------- valeur de la variable du nom de participant sélectionné de la homepage
  > variable de fonctionnement de l class homepage <
    - bufferCheckedCriteriasBox ------------------------------------------------ Critère sélectionné et coché dans la checkbox criteria du module de choix de critère
    - homepageId --------------------------------------------------------------- Id de la homepage visible
  > stockage dynamique <
    - criterias ---------------------------------------------------------------- Critère séléctionné pour la passation du NTLX
    - tlxCriteria -------------------------------------------------------------- Non dynamique :: liste correspondante au modèle de base des critère du NTLX
    - scores ------------------------------------------------------------------- dictionnaire enregistrant les score exacte au NTLX autoévalué par le participant :: format = {Mental:"None", Physical:"None", Temporal:"None", Performance:"None", Effort:"None", Frustration:"None"}
    - roudedScores ------------------------------------------------------------- dictionnaire enregistrant les score arrondie à +/- 5pt au NTLX autoévalué par le participant :: format = {Mental:"None", Physical:"None", Temporal:"None", Performance:"None", Effort:"None", Frustration:"None"}
    - weightScores ------------------------------------------------------------- dictionnaire enregistrant les weightscores au NTLX autoévalué par le participant :: format = {Mental:0, Physical:0, Temporal:0, Performance:0, Effort:0, Frustration:0}
    - _selectedLangageContent -------------------------------------------------- Langage séléctionné pour l'explication des critère NTLX
    - _selectedOrdersContent --------------------------------------------------- Langage sélectionné pour les consigne du parcour utilisateur
    - selectedCriteria --------------------------------------------------------- Critère sélectionné pour les weightscores

:: ICONS ::

:: FUNCTIONS ::
  > checkRulesValidity() ------------------------------------------------------- Check si l'ensemble de la grille de score à été remplie :: return undefinedKeys :: undefinedKeys = liste des critères n'ayant pas été rempli
  > findAllPair()
  > shuffle()
  > setRoundedScores()
  > globalScoresCalculation()
  > calculateSumCoef()

:: NOTES ::




********************************************************************************
********************************************************************************
*******************************************************************************/



/******************************************************************************* VARIABLES */

/* Variable de stockage des contenus */
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
var _FRorder = {
  nextBtn:"Suivant",
  saveBtn:"Sauvegarder",
  rulesAdvice:"Cliquez sur chaque échelle pour déterminer le score attribué à chaques critères",
  weightAdvice:"Cliquez sur le critère qui à contribué le plus à la charge de travail",
  additionalNote:"* Attention, toute les échelles doivent être complétées"
}
var _ENorder = {
  nextBtn:"Next",
  saveBtn:"Save",
  rulesAdvice:"Click on each scale to determine the score assigned to each criteria",
  weightAdvice:"Click on the criterion which contribute the most of the workload",
  additionalNote:"* To continue, every scale need to be set !"
}

/* variable relative à la bdd */
var resultpath = "None";
var archProfiles = {};

/* variable des valeurs par defaut */
var defaultlanguage = "None";
var defaultversion = "None";
var defaultCriterias = ["Mental", "Physical", "Temporal", "Performance", "Effort", "Frustration"];

/* variable sélectionné pour l'affichage ui des bouton de la homepage */
var choosenlanguage = "None";
var choosenversion = "None";
var choosenexperiment = "None";
var choosengroup = "None";
var choosenparticipantid = "None";

/* variable de fonctionnement de l class homepage */
var bufferCheckedCriteriasBox = [];
var homepageId = "HOME";
var createProfileError = {"error":0, "errortype":"None"};

/* Variable de stockage dynamique des scores, des critère NTLX et du langage */
var criterias;
var tlxCriteria = ["Mental", "Physical", "Temporal", "Performance", "Effort", "Frustration"];
var scores = {Mental:"None", Physical:"None", Temporal:"None", Performance:"None", Effort:"None", Frustration:"None"};
var roudedScores = {Mental:"None", Physical:"None", Temporal:"None", Performance:"None", Effort:"None", Frustration:"None"};
var weightScores = {Mental:0, Physical:0, Temporal:0, Performance:0, Effort:0, Frustration:0};
var _selectedLangageContent;
var _selectedOrdersContent;
var selectedCriteria = "None";



/******************************************************************************* ICONS */

var iconAdd = "icons/add.png"



/******************************************************************************* FUNCTIONS */

/************************************************************* Asumption check*/
// Check si l'ensemble de la grille de score à été remplie
function checkRulesValidity(){
  // pool de clé du dictionnaire "scores" qui n'aurait pas été remplie
  undefinedKeys = [];
  // pour chaque clé du dictionnaire
  for (key in scores){
    // si le critère existe et que le score n'a pas été remplie
    if (criterias.includes(key) && scores[key] == "None"){
      // ajout de la valeur au pool si elle ne correspond pas
      undefinedKeys.push(key)
    }
  }
  // return result
  return undefinedKeys;
}

/*************************************************************** Weight Score */
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

/********************************************************* Score Calcultation */
// ajuste les score avec un arrondi à +/-5
function setRoundedScores(){
  mykeys = Object.keys(scores);
  for (key in mykeys){
    roudedScores[mykeys[key]] = Math.round(scores[mykeys[key]]/5)*5;
  }
}
// Calcul des score globaux (exact et arrondie)
function globalScoresCalculation(){
  // empty result need to return
  var scoreTlxGlobal = 0;
  var scoreExactGlobal = 0;
  // calcul sum of all coef
  totalcoef = calculateSumCoef();
  // if is a short version
  if (totalcoef == 0){
    totalcoef = defaultCriterias.length;
    weightScores = {Mental:1, Physical:1, Temporal:1, Performance:1, Effort:1, Frustration:1};
  }
  // calcul Score global
  for(element in roudedScores){
    scoreTlxGlobal = scoreTlxGlobal + roudedScores[element] * weightScores[element];
  }
  scoreTlxGlobal = scoreTlxGlobal / totalcoef;
  for(element in scores){
    scoreExactGlobal = scoreExactGlobal + scores[element] * weightScores[element];
  }
  scoreExactGlobal = scoreExactGlobal / totalcoef;

  // return score global
  return [scoreTlxGlobal, Math.round(scoreExactGlobal)];
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
