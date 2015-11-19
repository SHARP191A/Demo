//default data column
var dataCategoriesTitles = ["Document Life Cycle", "Document Type", "Log Event ID","Map Key"];
var dataCategoriesColumns = ["_c4", "_c6", "_c9", "_c15"];

var timeCategoriesTitles = ["Dates Graph", "Daily Time Graph"];
var geographicCategoriesTitles = ["US Heat Map","Global Trends"];

var currentValue = dataCategoriesColumns[0];

$( document ).ready(function() {
  initialize();
});

function initialize(){
  // var sel = document.getElementById('dataCategoriesDropdown');
  // for(var i = 0; i < dataCategoriesTitles.length; i++) {
  //     var opt = document.createElement('option');
  //     opt.innerHTML = dataCategoriesTitles[i];
  //     opt.value = dataCategoriesColumns[i];
  //     sel.appendChild(opt);
  // }
  // makePieChart(currentValue);
  // makeRadarChart(currentColumn);
  //makeDateChart();
  //makeUSHeatMap();
}

function getSelectedTab(tab){
  clearDropdown();
  
  if(tab == "Categorical"){
    makePieChart(currentValue);
  }
  else if (tab == "Time"){
    makeDateChart();
  }
  else if (tab == "Geographic"){
    makeUSHeatMap();
  }
  else if (tab == "Coming Soon"){
    makeGlobalTrendsMap();
  }
  setDropdown(tab);

}

function setDropdown(tab){
  clearDropdown();
  var sel = document.getElementById('dataCategoriesDropdown');

  if(tab == "Categorical"){
    for(var i = 0; i < dataCategoriesTitles.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = dataCategoriesTitles[i];
        opt.value = dataCategoriesColumns[i];
        sel.appendChild(opt);
    }
  }
  else if (tab == "Time"){
    for(var i = 0; i < timeCategoriesTitles.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = timeCategoriesTitles[i];
        sel.appendChild(opt);
    }
  }
  else if (tab == "Geographic"){
    for(var i = 0; i < timeCategoriesTitles.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = geographicCategoriesTitles[i];
        sel.appendChild(opt);
    }
  }
  else if (tab == "Coming Soon"){
  }
}

function clearDropdown(){
  var select = document.getElementById("dataCategoriesDropdown");
  var length = select.options.length;
  for (i = 0; i < length; i++) {
    select.options[i] = null;
  }
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
  clearDropdown();
  setDropdown(tab);


}

//helper function
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
