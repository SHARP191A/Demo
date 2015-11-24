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
  // document.getElementById("icon").style.visibility = "hidden";

  getSelectedTab('Home');
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
  document.getElementById("mapdiv").innerHTML = '';
  document.getElementById("icon").innerHTML = '';

  if(tab == "Home"){
    document.getElementById("chartdiv").innerHTML = '<h2>Welcome to CPO Analytics!</h2><h4>Select a tab to see a visualization</h4> <img id = "userStatistics" src = "img/home_image.png" width = "50%" style = "margin-left:270px; padding-top:0px" alt = "Sharp">';

  }
  else if(tab == "Categorical"){
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
    for(var i = 0; i < geographicCategoriesTitles.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = geographicCategoriesTitles[i];
        sel.appendChild(opt);
    }
  }
  else if (tab == "Coming Soon"){
    //document.getElementById("chartdiv").innerHTML = '<img id = "userStatistics" src = "img/user_statistics.png" width = "85%" style = "padding-left:120px; padding-top:40px" alt = "Sharp">';
    document.getElementById("chartdiv").innerHTML = '<h2>Coming Soon Section</h2>';

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

  document.getElementById("mapdiv").innerHTML = '';
  document.getElementById("icon").innerHTML = '';

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


function showComingSoon(){

}
