// Fill the two criterias' container and allow to fill the selectedCriteria with a click on the element
function module(parent, pairs){
  var criteria1 = pairs[0];
  var criteria2 = pairs[1];
  console.log(pairs[0]);
  console.log(pairs[1]);
  addElement("div", parent, "weightChoice_element1_"+criteria1, "weightChoice_element1_ weightChoice_element", criteria1);
  addElement("div", parent, "weightChoice_sepaline");
  addElement("div", parent, "weightChoice_element2_"+criteria2, "weightChoice_element2_ weightChoice_element", criteria2);
  buttonelement1 = document.getElementById("weightChoice_element1_"+criteria1)
  buttonelement1.addEventListener("click", function(){selectedCriteria = criteria1});
  buttonelement2 = document.getElementById("weightChoice_element2_"+criteria2)
  buttonelement2.addEventListener("click", function(){selectedCriteria = criteria2});
}

// Creation of the list of pairs
function findAllPair(mylist){
  pairs = [];
  for (element in mylist){
    var counter = element;
    while (counter<mylist.length){
      if (element != counter){
        pairs.push([mylist[element], mylist[counter]])
      }
      counter ++;
    }
  }
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

// TOOLS

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
