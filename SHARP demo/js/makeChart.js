function displayChart(selectedDiv, chart) {
  chart.write(selectedDiv);
}

function makePieChart(dataset, column) {
  var pieChart = new AmCharts.AmPieChart();
  pieChart.valueField = "units";
  pieChart.titleField = column;
  pieChart.legend = {
    "position": "right",
    "marginRight": 100,
    "autoMargins": false
  }
  pieChart.dataProvider = dataset;
  pieChart.pullOutOnlyOne = true;
  return pieChart;
}

function makeTimeline(dataset) {
  var timeline = new AmCharts.AmSerialChart();
  timeline.graphs = [{
    "balloonText": "<div style='margin:5px; font-size:11px;'><span style='font-size:12px;'>[[category]]</span><span style='font-size:12px; font-weight:bold'><br> Events Logged: [[value]] <br></span> <span style='font-size:9px;'> Phone: [[Phone]]<br> Tablet: [[Tablet]]<br> Laptop: [[Laptop]]<br> Printer: [[Printer]]<br> IWB: [[IWB]]</span></div>",
    "bullet": "round",
    "bulletBorderAlpha": 1,
    "bulletColor": "#FFFFFF",
    "bulletSize": 5,
    "hideBulletsCount": 0,
    "id": "g1",
    "lineThickness": 2,
    "title": "red line",
    "useLineColorForBulletBorder": true,
    "valueField": "value",
  }];
  timeline.categoryField = "date";
  timeline.dataProvider = dataset;
  timeline.categoryAxis = {
    "parseDates": true,
    "dashLength": 1,
    "minorGridEnabled": true
  };
  timeline.chartScrollbar = {
    "graph": "g1",
    "oppositeAxis": false,
    "offset": 30,
    "scrollbarHeight": 30,
    "backgroundAlpha": 0,
    "selectedBackgroundAlpha": 0.1,
    "selectedBackgroundColor": "#888888",
    "graphFillAlpha": 0,
    "graphLineAlpha": 0.5,
    "selectedGraphFillAlpha": 0,
    "selectedGraphLineAlpha": 1,
    "autoGridCount": true,
    "color": "#AAAAAA"
  };

  timeline.legend = {
    "enabled": false,
    "position": "right",
    "marginRight": 100,
    "autoMargins": true
  }
  return timeline;
}

function makeBarChart(dataset, column) {
  var barChart = new AmCharts.AmSerialChart();
  barChart.graphs = [{
    "type": "column",
    "valueField": "units",
    "fillAlphas": 0.8
  }];
  barChart.categoryField = column;
  barChart.dataProvider = dataset;

  //cosmetic changes
  barChart.categoryAxis.gridAlpha = 0;
  barChart.colors = ["#67b7dc"];
  barChart.startAlpha = 1;


  barChart.legend = {
    "enabled": false,
    "position": "right",
    "marginRight": 100,
    "autoMargins": true
  }
  barChart.addListener("clickGraphItem",function(e){
    console.log(e);
    console.log(e.item.category);
    e.chart.fillColorsR = "#FFFFFF";
  })

  return barChart;
}


function makeGeographicChart(dataset){
	var geographicChart = new AmCharts.AmMap();
	geographicChart.type = "map";
	geographicChart.dataProvider = {
			map: "usaLow",
			areas: dataset
	}
	geographicChart.areasSettings = {
		    autoZoom: true
		  };
	geographicChart.valueLegend = {
		    right: 10,
		    minValue: "little",
		    maxValue: "a lot!"
		  };

	return geographicChart;
}

function linkStoragePieCharts(mainChart, slaveChart, masterColumn, slaveColumn) {
  mainChart.addListener("pullOutSlice", function(e) {
    var filteredLogs = filterLogs(generatedJSON, masterColumn, e.dataItem.dataContext.category);
    var dataSubset = parseFileTypeStorage(filteredLogs, slaveColumn);
    console.log(dataSubset);
    slaveChart.dataProvider = dataSubset;
    slaveChart.validateData();
    slaveChart.animateAgain();
  })

  mainChart.addListener("pullInSlice", function(e) {
    slaveChart.dataProvider = parseFileTypeStorage(generatedJSON);
    slaveChart.validateData();
    slaveChart.animateAgain();
  });
}

function linkBarChartAndTimeline(mainChart, slaveChart, masterColumn, slaveColumn){
	slaveChart.zoomed = false;
	mainChart.addListener("clickGraphItem", function(e){
		if(slaveChart.zoomed == false){
			var value = e.item.dataContext[masterColumn];
			var filteredLogs = filterLogs(generatedJSON, masterColumn, value);
			var dataSubset = parseDateOfData(filteredLogs,"All", "All");

			slaveChart.zoomed = true;
			slaveChart.previousClicked = e.item.dataContext[masterColumn];

			slaveChart.dataProvider = dataSubset;
			slaveChart.validateData();
			slaveChart.animateAgain();
		}
		else{
			var currentClicked = e.item.dataContext[masterColumn];
			if(currentClicked == slaveChart.previousClicked){
				slaveChart.dataProvider = parseDateOfData(generatedJSON, "All", "All");
				slaveChart.validateData();
				slaveChart.animateAgain();
				slaveChart.zoomed = false;
			}
			else{
				var filteredLogs = filterLogs(generatedJSON,masterColumn,currentClicked);
				var newSubset = parseDateOfData(filteredLogs,"All","All");

				slaveChart.dataProvider = newSubset;
				slaveChart.validateData();
				slaveChart.animateAgain();
			}
		}

	});
}

function linkGeographicChartAndPieChart(mainChart,slaveChart, masterColumn, slaveColumn){
	mainChart.addListener("clickMapObject", function(e){
		var id = e.mapObject.id;
		var filteredLogs = filterLogs(generatedJSON, masterColumn, id);
		var dataSubset = parseTenantCPOUsage(filteredLogs)
		slaveChart.dataProvider = dataSubset;

		slaveChart.validateData();
		slaveChart.animateAgain();
	});
	mainChart.addListener("homeButtonClicked",function(e){
		console.log("clickedHomeButton");
		slaveChart.dataProvider = parseTenantCPOUsage(generatedJSON);

		slaveChart.validateData();
		slaveChart.animateAgain();
	})
}

function removeChartLegend(chart){
	chart.legend["enabled"] = false;
}

function disableAnimation(chart){
	chart.startDuration = .001;
}

function adjustPieChartToSmall(pieChart) {
  pieChart.labelsEnabled = false;
  pieChart.autoMargins = false;
  pieChart.marginTop = 5;
  pieChart.marginBottom = 5;
  pieChart.marginLeft = 7;
  pieChart.marginRight = 7;
  pieChart.pullOutRadius = 0;
}

function moveChartLegendToBottom(chart){
	chart["legend"]["position"] = "bottom";
}
