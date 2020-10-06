// Initialization of criterias and associated scores
var criterias = ["mental", "physical", "temporal", "performance", "effort", "frustration"];
var weightScore = {mental:0, physical:0, temporal:0, performance:0, effort:0, frustration:0};

// Creation of the list of pairs and shuffle
var allPairs = findAllPair(criterias);
shuffle(allPairs);

var pairCounter = 0;
var selectedCriteria = "None";


// Creation of container for criterias and submit button
addElement("div", document.getElementById("CONTAINER"), "weightChoice_container");
addElement("div", document.getElementById("CONTAINER"), "weightChoice_submit", "None", "Confirmer");
buttonSubmit = document.getElementById("weightChoice_submit");

// Onlick will increment the counter and show the next pair
buttonSubmit.addEventListener("click", function(){
  if(selectedCriteria != "None"){
    pairCounter++;
    showPairs(allPairs, pairCounter);
    console.log(weightScore);
  }
  else{
    alert("Veuillez sélectionner un choix...");
  }
});

console.log(allPairs);

// Increment the score of selectedCriteria and reset selectedCriteria and the criteria's container
// Check if all the pairs have been processed
function showPairs(myList, myIndex){
  weightScore[selectedCriteria]+=1;
  selectedCriteria = "None";
  document.getElementById("weightChoice_container").innerHTML = "";
  console.log(pairCounter);
  if(pairCounter<15){
    module(document.getElementById("weightChoice_container"), myList[myIndex]);
  }
  else{
    console.log(weightScore);
    alert("test terminé");
  }
}

showPairs(allPairs, pairCounter);
