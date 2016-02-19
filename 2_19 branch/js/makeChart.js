  var pieChart;
  var dateChart;
  var barChart;

  function makePieChart(selectedDiv, column, dateFilter) {
    pieChart = AmCharts.makeChart(selectedDiv, {
      "type": "pie",
      "labelsEnabled": true,
      "autoMargins": false,
      "marginTop": 30,
      "marginBottom": 5,
      "marginLeft": 5,
      "marginRight": 5,
      "pullOutRadius": 15,
      "startDuration": 0,
      "theme": "light",
      "addClassNames": true,
      "legend": {
        "position": "right",
        "marginRight": 100,
        "autoMargins": false
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
      "dataProvider": parseGeneratedJSON(column, dateFilter),
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
  }

  function handleInit() {
    pieChart.legend.addListener("rollOverItem", handleRollOver);
  }

  function handleRollOver(e) {
    var wedge = e.dataItem.wedge.node;
    wedge.parentNode.appendChild(wedge);
  }

  function zoomChart() {

  }

  function makeSimplePieChart(selectedDiv, column) {
    var pieChart = AmCharts.makeChart(selectedDiv, {
      "type": "pie",
      "theme": "light",
      "labelsEnabled": false,
      "dataProvider": parseGeneratedJSON(column),
      "valueField": "litres",
      "titleField": "country",
      "balloon": {
        "fixedPosition": true
      },
      "export": {
        "enabled": true
      }
    });

  }

  //BAR CHART
  function makeBarChart(selectedDiv, column) {
    var chart = AmCharts.makeChart(selectedDiv, {
      "type": "serial",
      "theme": "light",
      "dataProvider": parseGeneratedJSON(column),
      "valueAxes": [{
        "gridColor": "#FFFFFF",
        "gridAlpha": 0.2,
        "dashLength": 0
      }],
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [{
        "balloonText": "Documents [[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "litres"

      }],
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
    });
  }



  function makeTimeline(selectedDiv, docLifeCycle, userType) {
    var dateChart = AmCharts.makeChart(selectedDiv, {
      "type": "serial",
      "theme": "default",
      "marginRight": 15,
      "autoMarginOffset": 20,
      "dataDateFormat": "YYYY-MM-DD",
      "valueAxes": [{
        "id": "v1",
        "axisAlpha": 0,
        "position": "left",
        // "title": "Events Count"
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
        "title": "Number Events",
        "useLineColorForBulletBorder": true,
        "valueField": "value",
        "balloonText": "<div style='margin:5px; font-size:11px;'><span style='font-size:12px;'>[[category]]</span><span style='font-size:12px; font-weight:bold'><br> Events Logged: [[value]] <br></span> <span style='font-size:9px;'> Phone: [[Phone]]<br> Tablet: [[Tablet]]<br> Laptop: [[Laptop]]<br> Printer: [[Printer]]<br> IWB: [[IWB]]</span></div>"
      }],
      "chartScrollbar": {
        "graph": "g1",
        "oppositeAxis": false,
        "offset": 30,
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
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha": 0,
        "valueLineAlpha": 0.2
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
      "dataProvider": parseDateOfGeneratedJSON(docLifeCycle, userType)
    });

    dateChart.addListener("rendered", zoomChart);

    dateChart.zoomToIndexes(dateChart.dataProvider.length - 40, dateChart.dataProvider.length - 1);
  }




  function makeUSHeatMap() {
    var heatmap = AmCharts.makeChart("chartdiv", {
      type: "map",
      "theme": "none",

      colorSteps: 10,

      dataProvider: {
        map: "usaLow",
        areas: [{
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
        }]
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

    });

    heatmap.addListener("clickMapObject", function(event) {
      document.getElementById("icon").innerHTML = '<img id ="icon" src="img/user_single.png" alt="sharp">';
    });
  }
