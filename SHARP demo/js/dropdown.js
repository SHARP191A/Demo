//default data column
var dataCategoriesTitles = ["Document Life Cycle", "Document Type", "Log Event ID"];
var dataCategoriesColumns = ["_c4", "_c6", "_c9"];

var timeCategoriesTitles = [" ", "Dates Graph", "Daily Time Graph"];

var currentColumn = dataCategoriesColumns[0];
var currentTitle = dataCategoriesTitles[0];

$( document ).ready(function() {
  initialize();
});

function initialize(){
  var sel = document.getElementById('dataCategoriesDropdown');
  for(var i = 0; i < dataCategoriesTitles.length; i++) {
      var opt = document.createElement('option');
      opt.innerHTML = dataCategoriesTitles[i];
      opt.value = dataCategoriesColumns[i];
      sel.appendChild(opt);
  }

  var sel = document.getElementById('timeCategoriesDropdown');
  for(var i = 0; i < timeCategoriesTitles.length; i++) {
      var opt = document.createElement('option');
      opt.innerHTML = timeCategoriesTitles[i];
      opt.value = timeCategoriesTitles[i];
      sel.appendChild(opt);
  }
  makePieChart(currentColumn);
  setHeaderTitle(currentTitle);
}

function setHeaderTitle(currentTitle){
  var e = document.getElementById("headerTitle");
  e.innerHTML = "SHARP CPO Data Analytics";
}


function getSelectedData(){
  var data = document.getElementById("dataCategoriesDropdown");
  currentColumn = data.options[data.selectedIndex].value;
  currentTitle = data.options[data.selectedIndex].text;

  console.log(currentColumn + ' ' + currentTitle);
  makePieChart(currentColumn);
  setHeaderTitle(currentTitle);
}

function getSelectedTime(){
  var e = document.getElementById("timeCategoriesDropdown");
  if (e.options[e.selectedIndex].text == "Dates Graph"){
    makeDateChart();
  }
  else if (e.options[e.selectedIndex].text == "Daily Time Graph"){
    makeTimeChart();
  }
}
