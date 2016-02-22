var currentPage = "";

function randomizeData() {
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

function prepareHomePage(){
	var barChartData = parseData(generatedJSON,"docLifeCycle");
	var homeBarChart = makeBarChart(barChartData, "docLifeCycle");

	var timelineData = parseDateOfData(generatedJSON, "All", "All");
	var homeTimeline = makeTimeline(timelineData);

	var pieChartData = parseData(generatedJSON,"userType");
	var homePieChart = makePieChart(pieChartData,"userType");
	adjustPieChartToSmall(homePieChart);
	removeChartLegend(homePieChart);

	setTotalNumberLogs(generatedJSON);
	setAverageStoragePerPrincipal(generatedJSON);

	displayChart("chartSpace1",homeBarChart);
	displayChart("chartSpace2",homeTimeline);
	displayChart("right1",homePieChart);

}

function prepareStoragePage(){

	var storageData = parseTenantStorageUsage(generatedJSON);
	var storagePieChart = makePieChart(storageData,"category");
//	adjustPieChartToSmall(storagePieChart);

	var fileTypeData = parseFileTypeStorage(generatedJSON);
	var fileTypeChart = makePieChart(fileTypeData,"category");
//	adjustPieChartToSmall(usagePieChart);

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

function setAverageStoragePerPrincipal(dataset){
	var principalCount = parsePrincipalCount(dataset);
	var totalStorage = parseTotalStorage(dataset);
	var average = (totalStorage/principalCount).toFixed(2);
	document.getElementById("averageStoragePerPrincipal").innerHTML = average + " MB";
}
