function parseJSON(column,percentBool){
  var resultJSON = [];
  var map = new Map();
  var rowLength = json.report.section.table.rows.row.length;


  //fill in map
  for(var i = 0; i < rowLength; i++){
    var key = json.report.section.table.rows.row[i][column];
    if(map.has(key)){
      map.set(key, map.get(key)+1);
    }
    else{
      map.set(key, 1);
    }
  }

  //convert values to percentages
  for (var key of map.keys()) {
      if(percentBool){
        map.set(key, (map.get(key)/rowLength).toFixed(4) * 100);
      }
      else{
        map.set(key, map.get(key));
      }
    resultJSON.push({country:key, litres:map.get(key)});
    // document.write(key + "-->" + map.get(key) + "</br>");
  }

  console.log(JSON.stringify(resultJSON));
  return resultJSON;
}

function parseDateJSON(){
  column = "_c8";
  var resultJSON = [];
  var map = new Map();
  var rowLength = json.report.section.table.rows.row.length;


  //fill in map
  var counter = 0;
  for(var i = 0; i < rowLength; i++){
    var key = json.report.section.table.rows.row[i][column];
    key = key.split(" ")[0];
    //document.write(key + "</br>");
    if(map.has(key)){
      map.set(key, map.get(key)+1);
    }
    else{
      map.set(key, 1);
    }
    counter++;
  }
  //test debug, take out later
  console.log("COUNTER: ", counter);
  //convert values to percentages
  for (var key of map.keys()) {
        map.set(key, map.get(key));
        resultJSON.push({date:key, value:map.get(key)});
        //document.write(key + "-->" + map.get(key) + "</br>");
  }

  console.log(JSON.stringify(resultJSON));
  return resultJSON;
}

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
        // document.write(key + "-->" + map.get(key) + "</br>");
  }

  //Sort based on time
  resultJSON.sort(function(a,b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  console.log(JSON.stringify(resultJSON));
  return resultJSON;
}
