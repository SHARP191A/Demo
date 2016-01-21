//generated list of n number of JSON objects
var generatedJSON = generateJSON(1000);

function parseGeneratedJSON(column){
  var resultJSON = [];
  var map = new Map();
  var rowLength = generatedJSON.length;

  //fill in map
  for(var i = 0; i < rowLength; i++){
    var key = generatedJSON[i][column];
    if(map.has(key)){
      map.set(key, map.get(key)+1);
    }
    else{
      map.set(key, 1);
    }
  }

  for (var key of map.keys()) {
        map.set(key, map.get(key));
    resultJSON.push({country:key, litres:map.get(key)});
  }
  console.log(JSON.stringify(resultJSON));
  return resultJSON;
}

function parseDateOfGeneratedJSON(){
  column = "eventDate";
  var resultJSON = [];
  var map = new Map();
  var rowLength = generatedJSON.length;

  //fill in map
  for(var i = 0; i < rowLength; i++){
    var day = generatedJSON[i][column].getDay() + 1;
    var month = generatedJSON[i][column].getMonth() + 1;
    if (day < 10){day = "0" + day;}
    if (month < 10){ month = "0" + month;}
    var key = generatedJSON[i][column].getFullYear() + "-" + day + "-" + month;
    if(map.has(key)){
      map.set(key, map.get(key)+1);
    }
    else{
      map.set(key, 1);
    }
  }
  for (var key of map.keys()) {
        map.set(key, map.get(key));
        resultJSON.push({date:key, value:map.get(key)});
  }
  resultJSON.sort(function(a,b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  console.log(JSON.stringify(resultJSON));
  return resultJSON;
}


// parse time function still using static data.
function parseTimeJSON(){
  column = "_c8";
  var resultJSON = [];
  var map = new Map();
  var rowLength = json.report.section.table.rows.row.length;

  //fill in map
  for(var i = 0; i < rowLength; i++){
    var key = json.report.section.table.rows.row[i][column];
    key = key.split(" ")[1].substring(0,5);
    if(map.has(key)){
      map.set(key, map.get(key)+1);
    }
    else{
      map.set(key, 1);
    }
  }

  for (var key of map.keys()) {
        //create associated date object
        var hour = key.substring(0,2);
        var minutes = key.substring(4,5);
        var now = new Date();
        var dateCreated = new Date(0, 0, 0, hour, minutes, 1, 1);
        resultJSON.push({date:dateCreated, value:map.get(key)});
  }

  //Sort based on time
  resultJSON.sort(function(a,b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  console.log(JSON.stringify(resultJSON));
  return resultJSON;
}
