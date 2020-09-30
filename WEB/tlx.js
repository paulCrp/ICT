// Récupération des données
// Création du tableau
const rows = [
  ["mental", 20]
  ["physical", 40]
  ["temporal", 50]
  ["performance", 50]
  ["effort", 12]
  ["frustration", 75]
];

let csvContent = "data:text/csv;charset=utf-8,";

rows.forEach(function(rowArray) {
  let row = rowArray.join(",");
  csvContent += row + "\r\n";
});

// Création du fichier CSV
var name = "test";
name = name.concat(".csv");

alert("ça marche");

var encodedUri = encodedUri(csvContent);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", name);
document.body.apprendChild(link);

link.click();
// Export vers CSV
