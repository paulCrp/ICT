



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



function _init(){
  buildhomepage()
  btnShort.addEventListener("click", function(){loadNewTest()});
  btnLong.addEventListener("click", function(){sendDatasToPython()});
}

_init();
