//default data column
var dataCategoriesTitles = ["Document Life Cycle", "Document Type", "Log Event ID"];
var dataCategoriesColumns = ["_c4", "_c6", "_c9"];

var timeCategoriesTitles = ["Dates Graph", "Daily Time Graph"];

var currentColumn = dataCategoriesColumns[0];

$( document ).ready(function() {
  initialize();
});

function initialize(){
  var sel = document.getElementById('dataCategoriesDropdownPie');
  for(var i = 0; i < dataCategoriesTitles.length; i++) {
      var opt = document.createElement('option');
      opt.innerHTML = dataCategoriesTitles[i];
      opt.value = dataCategoriesColumns[i];
      sel.appendChild(opt);
  }

  var sel = document.getElementById('dataCategoriesDropdownRadar');
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
  makeRadarChart(currentColumn);
  makeDateChart();
}


function getSelectedDataPie(){
  var data = document.getElementById("dataCategoriesDropdownPie");
  currentColumn = data.options[data.selectedIndex].value;

  makePieChart(currentColumn);
}

function getSelectedDataRadar(){
  var data = document.getElementById("dataCategoriesDropdownRadar");
  currentColumn = data.options[data.selectedIndex].value;

  makeRadarChart(currentColumn);
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
