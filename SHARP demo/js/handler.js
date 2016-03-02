var currentPage = "";

//function to mimic sync to database
function randomizeData() {
  generatedJSON = generateJSON(rand(1000,10000));
  console.log("randomize data");
  changePage(currentPage);
}

function changePage(pathToFile){
	  console.log("changing page to " + pathToFile);
	  $("#chartdivTemplate").empty();
	  $("#chartdivTemplate").load(pathToFile);
	  currentPage = pathToFile;
}

function prepareHomePage(){
	var barChartData = parseData(generatedJSON,"docLifeCycle");
	var homeBarChart = makeBarChart(barChartData, "docLifeCycle");

	var timelineData = parseDateOfData(generatedJSON, "All", "All");
	var homeTimeline = makeTimeline(timelineData);

	linkBarChartAndTimeline(homeBarChart,homeTimeline,"docLifeCycle");

	var pieChartData = parseData(generatedJSON,"userType");
	var homePieChart = makePieChart(pieChartData,"userType");
	adjustPieChartToSmall(homePieChart);
	removeChartLegend(homePieChart);
  moveChartLegendToBottom(homePieChart);

	setTotalNumberLogs(generatedJSON);
  setnumberUsers(generatedJSON);
	setAverageStoragePerPrincipal(generatedJSON);

	displayChart("chartSpace1",homeBarChart);
	displayChart("chartSpace2",homeTimeline);
	displayChart("right1chart",homePieChart);

  var userStorageData = parsePrincipalStorageUsage(generatedJSON);
  userStorageData = userStorageData.slice(0,5);
  makeUserStorageTable("tableRows",userStorageData);

}

function prepareStoragePage(){

	var storageData = parseTenantStorageUsage(generatedJSON);
	var storagePieChart = makePieChart(storageData,"category");
//	adjustPieChartToSmall(storagePieChart);

	var fileTypeData = parseFileTypeStorage(generatedJSON);
	var fileTypeChart = makePieChart(fileTypeData,"category");
//	adjustPieChartToSmall(usagePieChart);
	disableAnimation(fileTypeChart);
	removeChartLegend(fileTypeChart);

	var userStorageData = parsePrincipalStorageUsage(generatedJSON);
	userStorageData = userStorageData.slice(0,5);
  makeUserStorageTable("tableRows",userStorageData);

	linkStoragePieCharts(storagePieChart,fileTypeChart,"tenantId","docType");

	displayChart("chartdiv1",storagePieChart);
	displayChart("chartdiv2",fileTypeChart);

}

function prepareDocumentsPage(){

	var documentData = parseDateOfData(generatedJSON,"All","All");
	console.log(documentData);
	var timelineChart = makeTimeline(documentData);

	displayChart("chartdiv1",timelineChart);
}

function preparePiePage(){
	var pieChartData = parseData(generatedJSON,"docLifeCycle");
	var pieChart = makePieChart(pieChartData,"docLifeCycle");
	displayChart("chartdiv1",pieChart);
}

function prepareGeographicPage(){
	var geographicDataset = parseLocationOfData(generatedJSON);
	var geographicChart = makeGeographicChart(geographicDataset);

	var tenantUsageData = parseTenantCPOUsage(generatedJSON);
	var tenantUsageChart = makePieChart(tenantUsageData,"category");
	moveChartLegendToBottom(tenantUsageChart);
//	removeChartLegend(tenantUsageChart);
	adjustPieChartToSmall(tenantUsageChart);

	//var barChartData = parseData(generatedJSON,"docLifeCycle");
	//var homeBarChart = makeBarChart(barChartData, "docLifeCycle");

  setSelectedArea("USA");
  setMostActiveTenant(generatedJSON);
  setTotalStorageUsed(generatedJSON);
  setNumberOfUsers(generatedJSON);
  setAverageStoragePerUserInArea(generatedJSON);

	linkGeographicChartAndPieChart(geographicChart,tenantUsageChart,"location","b");

	displayChart("mapDiv",geographicChart);
	displayChart("pieDiv",tenantUsageChart);
	//displayChart("barDiv",homeBarChart);

}

function applyTimelineOptions(){
	var eventIdElement = document.getElementById("eventIdOptions");
	var eventIdValue = eventIdElement.options[eventIdElement.selectedIndex].value;

	var userTypeElement = document.getElementById("userTypeOptions");
	var userTypeValue = userTypeElement.options[userTypeElement.selectedIndex].value;

	var dataset = parseDateOfData(generatedJSON,eventIdValue,userTypeValue);

	var timeline = makeTimeline(dataset);
	timeline.write("chartdiv1");
}

function applyPieOptions(){
	var dataOptionElement = document.getElementById("pieOptions");
	var dateFilterElement = document.getElementById("dateFilterOptions");
	var dataOption = dataOptionElement.options[dataOptionElement.selectedIndex].value;
	var dateFilterOption = dateFilterElement.options[dateFilterElement.selectedIndex].value;

	var dateFilteredDataset = dateFilter(generatedJSON,dateFilterOption);
	var dataset = parseData(dateFilteredDataset,dataOption);

	var pieChart = makePieChart(dataset,dataOption);
	displayChart("chartdiv1",pieChart);
}

function setTotalNumberLogs(dataset){
	document.getElementById("totalNumberLogs").innerHTML = dataset.length + " logs";
}

function setnumberUsers(dataset){
	document.getElementById("numberOfUsers").innerHTML = Math.ceil(dataset.length/3) + " users";
}

function setAverageStoragePerPrincipal(dataset){
	var principalCount = parsePrincipalCount(dataset);
	var totalStorage = parseTotalStorage(dataset);
	var average = (totalStorage/principalCount).toFixed(2);
	document.getElementById("averageStoragePerPrincipal").innerHTML = average + " MB";
}

function setSelectedArea(area){
	document.getElementById("selectedArea").innerHTML = area;
}


function setMostActiveTenant(dataset){
	var tenantMap = parseTenantCPOUsage(dataset);
	var topTenant = tenantMap.sort(valueCompare)[0];
	console.log(topTenant[0]);
	document.getElementById("mostActiveTenant").innerHTML = topTenant.category;
}

function setTotalStorageUsed(dataset){
	var storage = parseTotalStorage(dataset);
	document.getElementById("totalStorageUsed").innerHTML = storage.toFixed(2) + " GB";
}


function setNumberOfUsers(dataset){
	var userCount = parsePrincipalCount(dataset);
	document.getElementById("numberOfUsers").innerHTML = userCount;
}

function setAverageStoragePerUserInArea(dataset){
	var principalCount = parsePrincipalCount(dataset);
	var totalStorage = parseTotalStorage(dataset);
	var average = (totalStorage/principalCount).toFixed(2);
	document.getElementById("averageStoragePerUser").innerHTML = average + " MB";
}
