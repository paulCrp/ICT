






function buildhomepage(){
  btnShort = document.createElement("BUTTON");
  btnShort.innerHTML = "SHORT";
  document.getElementById("CONTAINER").appendChild(btnShort);
  btnLong = document.createElement("BUTTON");
  btnLong.innerHTML = "LONG";
  document.getElementById("CONTAINER").appendChild(btnLong);
}
