var currentPage = "";

function randomizeData(){
  //function to mimic sync to database
  generatedJSON = generateJSON(1000);
  console.log("randomize data");
  changePage(currentPage);
}


function changePage(pathToFile){
  console.log("changing page to " + pathToFile);
  $("#chartdivTemplate").empty();
  $("#chartdivTemplate").load(pathToFile);
  currentPage = pathToFile;
}

function createHome(){
  console.log("creating home pie");
  makeBarChart("chartSpace1", "docLifeCycle");
  console.log("creating home time");
  makeTimeline("chartSpace2","All","All");
  makePieChart("right1", false, "userType");
  makeSimplePieChart("right2","eventId");
  setAverageStoragePerPrincipal();
  setAveragePrincipalsPerTenant();
  
}

function createPieChart(){
  var data = document.getElementById("pieOptions");
  currentValue = data.options[data.selectedIndex].value;
  makePieChart("chartdiv", true, currentValue);
}

function createTimeline(){
  var eventId = document.getElementById("eventIdOptions");
  eventId = eventId.options[eventId.selectedIndex].value;

  var userType = document.getElementById("userTypeOptions");
  userType = userType.options[userType.selectedIndex].value;
  console.log(eventId + " " + userType);
  makeTimeline("chartdiv",eventId,userType);
}

function createGeographic(){
  var data = document.getElementById("geographicOptions");
  currentValue = data.options[data.selectedIndex].value;

  if (currentValue == "Global Trends"){
    makeGlobalTrendsMap();
  }
  else if (currentValue == "US Heat Map"){
    makeUSHeatMap();
  }
}

function setAverageStoragePerPrincipal(){
	var principalCount = parsePrincipalCount();
	var totalStorage = parseTotalStorage();
	var average = (totalStorage/principalCount).toFixed(2);
	document.getElementById("averageStoragePerPrincipal").innerHTML = average + " MB";
}

function setAveragePrincipalsPerTenant(){
	var principalCount = parsePrincipalCount();
	var tenantCount = parseTenantCount();
	var average = Math.floor(principalCount/tenantCount);
	document.getElementById("averagePrincipalsPerTenant").innerHTML = average + " Users";
}
