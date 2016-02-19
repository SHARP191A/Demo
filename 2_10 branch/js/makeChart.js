var pieChart;
var dateChart;
var barChart;

function makePieChart(selectedDiv, labelsFlag, column){
    pieChart = AmCharts.makeChart(selectedDiv, {
      "type": "pie",
      "labelsEnabled": labelsFlag,
      "autoMargins":false,
      "marginTop": 0,
      "marginBottom": 0,
      "marginLeft": 0,
      "marginRight": 0,
      "pullOutRadius":15,
      "startDuration": 0,
      "theme": "light",
      "addClassNames": true,
      "legend":{
       	"position":"right",
        "marginRight":100,
        "autoMargins":false
      },
      "innerRadius": "30%",
      "defs": {
        "filter": [{
          "id": "shadow",
          "width": "200%",
          "height": "200%",
          "feOffset": {
            "result": "offOut",
            "in": "SourceAlpha",
            "dx": 0,
            "dy": 0
          },
          "feGaussianBlur": {
            "result": "blurOut",
            "in": "offOut",
            "stdDeviation": 5
          },
          "feBlend": {
            "in": "SourceGraphic",
            "in2": "blurOut",
            "mode": "normal"
          }
        }]
      },
      "dataProvider": parseGeneratedJSON(column),
      "valueField": "litres",
      "titleField": "country",
      "export": {
        "enabled": true
      }
    });

  pieChart.addListener("init", handleInit);
  pieChart.addListener("rollOverSlice", function(e) {
    handleRollOver(e);
  });
  pieChart.addListener("clickSlice", function(e){
	  console.log(column);
	  console.log(e.dataItem.dataContext.country);
	  var dataSubset = filterLogs(generatedJSON, column, e.dataItem.dataContext.country);
	  dateChart.dataProvider = dataSubset;
	  console.log("Changing dataprovider for dateChart")
  });
}

function makePieChartAndTimeline(selectedDiv1, labelsFlag, column, selectedDiv2, docLifeCycle, userType){	
    pieChart = AmCharts.makeChart(selectedDiv1, {
        "type": "pie",
        "labelsEnabled": labelsFlag,
        "autoMargins":false,
        "marginTop": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "marginRight": 0,
        "pullOutRadius":15,
        "startDuration": 0,
        "theme": "light",
        "addClassNames": true,
        "legend":{
         	"position":"right",
          "marginRight":100,
          "autoMargins":false
        },
        "innerRadius": "30%",
        "defs": {
          "filter": [{
            "id": "shadow",
            "width": "200%",
            "height": "200%",
            "feOffset": {
              "result": "offOut",
              "in": "SourceAlpha",
              "dx": 0,
              "dy": 0
            },
            "feGaussianBlur": {
              "result": "blurOut",
              "in": "offOut",
              "stdDeviation": 5
            },
            "feBlend": {
              "in": "SourceGraphic",
              "in2": "blurOut",
              "mode": "normal"
            }
          }]
        },
        "dataProvider": parseGeneratedJSON(column),
        "valueField": "litres",
        "titleField": "country",
        "export": {
          "enabled": true
        }
      });

    pieChart.addListener("init", handleInit);
    pieChart.addListener("rollOverSlice", function(e) {
      handleRollOver(e);
    });
    pieChart.addListener("pullOutSlice", function(e){
  	  var dataSubset = parseDateOfGeneratedJSON2("All","All",filterLogs(generatedJSON, column, e.dataItem.dataContext.country));
  	  dateChart.dataProvider = dataSubset;
  	  dateChart.validateData();
  	  dateChart.animateAgain();
    });
    pieChart.addListener("pullInSlice", function(e){
    	  dateChart.dataProvider = parseDateOfGeneratedJSON(docLifeCycle,userType);
    	  dateChart.validateData();
    	  dateChart.animateAgain();
      });
    
    var dateChart = AmCharts.makeChart(selectedDiv2, {
        "type": "serial",
        "theme": "default",
        "marginRight": 80,
        "autoMarginOffset": 20,
        "dataDateFormat": "YYYY-MM-DD",
        "valueAxes": [{
            "id": "v1",
            "axisAlpha": 0,
            "position": "left"
        }],
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },
        "graphs": [{
            "id": "g1",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "title": "red line",
            "useLineColorForBulletBorder": true,
            "valueField": "value",
            "balloonText": "<div style='margin:5px; font-size:11px;'><span style='font-size:12px;'>[[category]]</span><span style='font-size:12px; font-weight:bold'><br> Events Logged: [[value]] <br></span> <span style='font-size:9px;'> Phone: [[Phone]]<br> Tablet: [[Tablet]]<br> Laptop: [[Laptop]]<br> Printer: [[Printer]]<br> IWB: [[IWB]]</span></div>"
        }],
        "chartScrollbar": {
            "graph": "g1",
            "oppositeAxis":false,
            "offset":30,
            "scrollbarHeight": 80,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "graphLineAlpha": 0.5,
            "selectedGraphFillAlpha": 0,
            "selectedGraphLineAlpha": 1,
            "autoGridCount":true,
            "color":"#AAAAAA"
        },
        "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha":0,
            "valueLineAlpha":0.2
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "export": {
            "enabled": true
        },
        "dataProvider":   parseDateOfGeneratedJSON(docLifeCycle,userType)
      	});
    console.log("Initial Data:");
    console.log(parseDateOfGeneratedJSON(docLifeCycle,userType));
      dateChart.addListener("rendered", zoomChart);
      dateChart.zoomToIndexes(dateChart.dataProvider.length - 40, dateChart.dataProvider.length - 1);
}

function handleInit(){
    pieChart.legend.addListener("rollOverItem", handleRollOver);
  }

function handleRollOver(e){
    var wedge = e.dataItem.wedge.node;
    wedge.parentNode.appendChild(wedge);
}

function zoomChart() {

}

function makeTimeline(selectedDiv,docLifeCycle,userType){
	console.log("Making Timeline");
  var dateChart = AmCharts.makeChart(selectedDiv, {
    "type": "serial",
    "theme": "default",
    "marginRight": 80,
    "autoMarginOffset": 20,
    "dataDateFormat": "YYYY-MM-DD",
    "valueAxes": [{
        "id": "v1",
        "axisAlpha": 0,
        "position": "left"
    }],
    "balloon": {
        "borderThickness": 1,
        "shadowAlpha": 0
    },
    "graphs": [{
        "id": "g1",
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "title": "red line",
        "useLineColorForBulletBorder": true,
        "valueField": "value",
        "balloonText": "<div style='margin:5px; font-size:11px;'><span style='font-size:12px;'>[[category]]</span><span style='font-size:12px; font-weight:bold'><br> Events Logged: [[value]] <br></span> <span style='font-size:9px;'> Phone: [[Phone]]<br> Tablet: [[Tablet]]<br> Laptop: [[Laptop]]<br> Printer: [[Printer]]<br> IWB: [[IWB]]</span></div>"
    }],
    "chartScrollbar": {
        "graph": "g1",
        "oppositeAxis":false,
        "offset":30,
        "scrollbarHeight": 80,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount":true,
        "color":"#AAAAAA"
    },
    "chartCursor": {
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha":0,
        "valueLineAlpha":0.2
    },
    "categoryField": "date",
    "categoryAxis": {
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true
    },
    "export": {
        "enabled": true
    },
    "dataProvider":   parseDateOfGeneratedJSON(docLifeCycle,userType)
  	});
  dateChart.addListener("rendered", zoomChart);
  dateChart.zoomToIndexes(dateChart.dataProvider.length - 40, dateChart.dataProvider.length - 1);
}

function makeTimeChart(){
	var timeChart = AmCharts.makeChart("chartdiv", {
		"type": "serial",
    "theme": "light",
    "marginRight": 80,
    "dataProvider":  parseTimeJSON(),
    "valueAxes": [{
        "position": "left",
        "title": "Number Logs Created"
    }],
    "graphs": [{
        "id": "g1",
        "fillAlphas": 0.4,
        "valueField": "value",
         "balloonText": "<div style='margin:5px; font-size:19px;'>Logs Created:<b>[[value]]</b></div>"
    }],
    "chartScrollbar": {
        "graph": "g1",
        "scrollbarHeight": 80,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount": true,
        "color": "#AAAAAA"
    },
    "chartCursor": {
        "categoryBalloonDateFormat": "JJ:NN",
        "cursorPosition": "mouse"
    },
    "categoryField": "date",
    "categoryAxis": {
        "minPeriod": "mm",
        "parseDates": true
    },
    "export": {
        "enabled": true
    }
});

timeChart.addListener("dataUpdated", zoomChart);
// when we apply theme, the dataUpdated event is fired even before we add listener, so
// we need to call zoomChart here
// this method is called when chart is first inited as we listen for "dataUpdated" event
  // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    //timeChart.zoomToIndexes(chartData.length - 250, chartData.length - 100);
}

function makeUSHeatMap(){
  var heatmap = AmCharts.makeChart( "chartdiv", {
  type: "map",
  "theme": "none",

  colorSteps: 10,

  dataProvider: {
    map: "usaLow",
    areas: [ {
      id: "US-AL",
      value: 4447100
    }, {
      id: "US-AK",
      value: 623932
    }, {
      id: "US-AZ",
      value: 5130632
    }, {
      id: "US-AR",
      value: 2673400
    }, {
      id: "US-CA",
      value: 33871648
    }, {
      id: "US-CO",
      value: 4301261
    }, {
      id: "US-CT",
      value: 3405565
    }, {
      id: "US-DE",
      value: 783600
    }, {
      id: "US-FL",
      value: 15982378
    }, {
      id: "US-GA",
      value: 8186453
    }, {
      id: "US-HI",
      value: 1211537
    }, {
      id: "US-ID",
      value: 1293953
    }, {
      id: "US-IL",
      value: 12419293
    }, {
      id: "US-IN",
      value: 6080485
    }, {
      id: "US-IA",
      value: 2926324
    }, {
      id: "US-KS",
      value: 2688418
    }, {
      id: "US-KY",
      value: 4041769
    }, {
      id: "US-LA",
      value: 4468976
    }, {
      id: "US-ME",
      value: 1274923
    }, {
      id: "US-MD",
      value: 5296486
    }, {
      id: "US-MA",
      value: 6349097
    }, {
      id: "US-MI",
      value: 9938444
    }, {
      id: "US-MN",
      value: 4919479
    }, {
      id: "US-MS",
      value: 2844658
    }, {
      id: "US-MO",
      value: 5595211
    }, {
      id: "US-MT",
      value: 902195
    }, {
      id: "US-NE",
      value: 1711263
    }, {
      id: "US-NV",
      value: 1998257
    }, {
      id: "US-NH",
      value: 1235786
    }, {
      id: "US-NJ",
      value: 8414350
    }, {
      id: "US-NM",
      value: 1819046
    }, {
      id: "US-NY",
      value: 18976457
    }, {
      id: "US-NC",
      value: 8049313
    }, {
      id: "US-ND",
      value: 642200
    }, {
      id: "US-OH",
      value: 11353140
    }, {
      id: "US-OK",
      value: 3450654
    }, {
      id: "US-OR",
      value: 3421399
    }, {
      id: "US-PA",
      value: 12281054
    }, {
      id: "US-RI",
      value: 1048319
    }, {
      id: "US-SC",
      value: 4012012
    }, {
      id: "US-SD",
      value: 754844
    }, {
      id: "US-TN",
      value: 5689283
    }, {
      id: "US-TX",
      value: 20851820
    }, {
      id: "US-UT",
      value: 2233169
    }, {
      id: "US-VT",
      value: 608827
    }, {
      id: "US-VA",
      value: 7078515
    }, {
      id: "US-WA",
      value: 5894121
    }, {
      id: "US-WV",
      value: 1808344
    }, {
      id: "US-WI",
      value: 5363675
    }, {
      id: "US-WY",
      value: 493782
    } ]
  },

  areasSettings: {
    autoZoom: true
  },

  valueLegend: {
    right: 10,
    minValue: "No Activity",
    maxValue: "Most Activity"
  },

  "export": {
    "enabled": true
  }

} );

heatmap.addListener("clickMapObject", function (event) {
    document.getElementById("icon").innerHTML = '<img id ="icon" src="img/user_single.png" alt="sharp">';
});
}

function makeGlobalTrendsMap2(){
  // create AmMap object
  var map = new AmCharts.AmMap();
  // set path to Images
  map.pathToImages = "ammap/Images/";

  /* create data provider object
   map property is usually the same as the name of the map file.

   getAreasFromMap indicates that amMap should read all the areas available
   in the map data and treat them as they are included in your data provider.
   in case you don't set it to true, all the areas except listed in data
   provider will be treated as unlisted.
  */
  var dataProvider = {
      map: "worldLow",
      getAreasFromMap:true
  };
  // pass data provider to the map object
  map.dataProvider = dataProvider;

  /* create areas settings
   * autoZoom set to true means that the map will zoom-in when clicked on the area
   * selectedColor indicates color of the clicked area.
   */
  map.areasSettings = {
      autoZoom: true,
      selectedColor: "#CC0000"
  };

  // let's say we want a small map to be displayed, so let's create it
  map.smallMap = new AmCharts.SmallMap();

  // write the map to container div
  map.write("chartdiv");
}

var map;

var chart;
var chartData = {};

chartData.world = [
    { source: "PDF", energy: 3882.1},
    { source: "Image", energy: 2653.1},
    { source: "Text", energy: 3278.3},
    { source: "Video", energy: 610.5},
    { source: "Audio", energy: 740.3}];

chartData.US = [
    { source: "PDF", energy: 842.9},
    { source: "Image", energy: 588.7},
    { source: "Text", energy: 498},
    { source: "Video", energy: 190.2},
    { source: "Audio", energy: 62.2}];

chartData.CN = [
    { source: "PDF", energy: 404.6},
    { source: "Image", energy: 79.8},
    { source: "Text", energy: 1537.4},
    { source: "Video", energy: 15.9},
    { source: "Audio", energy: 139.3}];

chartData.CA = [
    { source: "PDF", energy: 124.9},
    { source: "Image", energy: 350.7},
    { source: "Text", energy: 82.9},
    { source: "Video", energy: 37},
    { source: "Audio", energy: 39.8}];

chartData.IN = [
    { source: "PDF", energy: 148.5},
    { source: "Image", energy: 46.7},
    { source: "Text", energy: 245.8},
    { source: "Video", energy: 3.8},
    { source: "Audio", energy: 24}];

chartData.JP = [
    { source: "PDF", energy: 197.6},
    { source: "Image", energy: 78.7},
    { source: "Text", energy: 108.8},
    { source: "Video", energy: 62.1},
    { source: "Audio", energy: 16.7}];

function makeGlobalTrendsMap() {
    // *** CREATE CHART *********************************************************
    // PIE CHART
    chart = new AmCharts.AmPieChart();

    // title of the chart
    chart.addLabel("0", "!20", "World", "center", 16);

    chart.backgroundAlpha = 0.4;
    chart.backgroundColor = "#000000";
    chart.dataProvider = chartData.world;
    chart.titleField = "source";
    chart.valueField = "energy";
    chart.sequencedAnimation = true;
    chart.startEffect = "elastic";
    chart.labelsEnabled = false;
    chart.labelText = "[[title]]";
    chart.startDuration = 2;
    chart.labelRadius = 10;

    // WRITE
    chart.write("mapdiv");

    // *** CREATE MAP ***********************************************************

    map = new AmCharts.AmMap();
    map.pathToImages = "http://www.ammap.com/lib/Images/";
    //map.panEventsEnabled = true; // this line enables pinch-zooming and dragging on touch devices
    var dataProvider = {
        mapVar: AmCharts.maps.worldLow
    };

    map.areasSettings = {
        unlistedAreasColor: "#DDDDDD",
        rollOverOutlineColor: "#FFFFFF",
        rollOverColor: "#CC0000" };

    dataProvider.areas = [
        { title: "United States", id: "US", selectable: true },
        { title: "China", id: "CN", selectable: true },
        { title: "Canada", id: "CA", selectable: true },
        { title: "India", id: "IN", selectable: true },
        { title: "Japan", id: "JP", selectable: true }
    ];

    map.dataProvider = dataProvider;
    map.write("chartdiv");

    map.addListener("clickMapObject", function (event) {
        if (event.mapObject.id != undefined && chartData[event.mapObject.id] != undefined) {
            chart.dataProvider = chartData[event.mapObject.id];
            chart.clearLabels();
            chart.addLabel("0", "!20", event.mapObject.title, "center", 16);
            chart.validateData();
        }

    });
  }


  //BAR CHART
function makeBarChart(selectedDiv, column){
  var chart = AmCharts.makeChart( selectedDiv, {
  "type": "serial",
  "theme": "light",
  "dataProvider": parseGeneratedJSON(column),
  "valueAxes": [ {
    "gridColor": "#FFFFFF",
    "gridAlpha": 0.2,
    "dashLength": 0
  } ],
  "gridAboveGraphs": true,
  "startDuration": 1,
  "graphs": [ {
    "balloonText": "Documents [[category]]: <b>[[value]]</b>",
    "fillAlphas": 0.8,
    "lineAlpha": 0.2,
    "type": "column",
    "valueField": "litres"

  } ],
  "chartCursor": {
    "categoryBalloonEnabled": false,
    "cursorAlpha": 0,
    "zoomable": false
  },
  "categoryField": "country",
  "categoryAxis": {
    "gridPosition": "start",
    "gridAlpha": 0,
    "tickPosition": "start",
    "tickLength": 20
  },
  "export": {
    "enabled": true
  }

} );
}

function makeSimplePieChart(selectedDiv,column){

  var pieChart = AmCharts.makeChart( selectedDiv, {
  "type": "pie",
  "theme": "light",
  "labelsEnabled" : false,
  "dataProvider": parseGeneratedJSON(column),
  "valueField": "litres",
  "titleField": "country",
   "balloon":{
   "fixedPosition":true
  },
  "export": {
    "enabled": true
  }
} );

}
