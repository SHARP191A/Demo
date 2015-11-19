//default data column
var dataCategoriesTitles = ["Document Life Cycle", "Document Type", "Log Event ID","Map Key","Dates Graph", "Daily Time Graph","US Heat Map","Global Trends"];
var dataCategoriesColumns = ["_c4", "_c6", "_c9", "_c15"];

var timeCategoriesTitles = ["Dates Graph", "Daily Time Graph"];
var geographicCategoriesTitles = ["US Heat Map","Global Trends"];

var currentValue = dataCategoriesColumns[0];

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
  makePieChart(currentValue);
  // makeRadarChart(currentColumn);
  //makeDateChart();
  //makeUSHeatMap();
}


function getSelectedData(){
  var data = document.getElementById("dataCategoriesDropdown");
  currentValue = data.options[data.selectedIndex].value;
  currentText =  data.options[data.selectedIndex].text;
  console.log(currentValue + " " + currentText);
  if(isInArray(currentValue,dataCategoriesColumns)){
      makePieChart(currentValue);
  }
  else if (currentText == "Dates Graph"){
    makeDateChart();
  }
  else if (currentText == "Daily Time Graph"){
    makeTimeChart();
  }
  else if (currentText == "Global Trends"){
    makeGlobalTrendsMap();
  }
  else if (currentText == "US Heat Map"){
    makeUSHeatMap();
  }

}

//helper function
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
