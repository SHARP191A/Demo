//generated list of n number of JSON objects
var generatedJSON = generateJSON(10000);

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
  console.log("running parse: " + column);
  console.log(JSON.stringify(resultJSON));
  return resultJSON;
}

function parseDateOfGeneratedJSON(eventIdFilter,userTypeFilter){
  column = "eventDate";
  var resultJSON = [];
  var dateMap = new Map();
  var deviceMap = new Map();
  var rowLength = generatedJSON.length;

  //fill in map
  for(var i = 0; i < rowLength; i++){
    var userType = generatedJSON[i]["userType"];
    var eventId = generatedJSON[i]["eventId"];
    if (eventId == eventIdFilter || eventIdFilter == "All"){
      if (userType == userTypeFilter || userTypeFilter == "All"){
        var day = generatedJSON[i][column].getDay() + 1;
        var month = generatedJSON[i][column].getMonth() + 1;
        if (day < 10){day = "0" + day;}
        if (month < 10){ month = "0" + month;}
        var key = generatedJSON[i][column].getFullYear() + "-" + day + "-" + month;
        var sourceDevice = generatedJSON[i]["sourceDevice"];

        if(dateMap.has(key)){
          dateMap.set(key, dateMap.get(key)+1);
        }
        else{
          dateMap.set(key, 1);
        }
          if(deviceMap.has(key)){
            if(sourceDevice == "Phone") deviceMap.set(key, {Phone:deviceMap.get(key).Phone + 1, Tablet:deviceMap.get(key).Tablet, Laptop:deviceMap.get(key).Laptop, Printer:deviceMap.get(key).Printer, IWB:deviceMap.get(key).IWB});
            else if(sourceDevice == "Tablet") deviceMap.set(key, {Phone:deviceMap.get(key).Phone, Tablet:deviceMap.get(key).Tablet + 1, Laptop:deviceMap.get(key).Laptop, Printer:deviceMap.get(key).Printer, IWB:deviceMap.get(key).IWB});
            else if(sourceDevice == "Laptop") deviceMap.set(key, {Phone:deviceMap.get(key).Phone, Tablet:deviceMap.get(key).Tablet, Laptop:deviceMap.get(key).Laptop + 1, Printer:deviceMap.get(key).Printer, IWB:deviceMap.get(key).IWB});
            else if(sourceDevice == "Printer") deviceMap.set(key, {Phone:deviceMap.get(key).Phone, Tablet:deviceMap.get(key).Tablet, Laptop:deviceMap.get(key).Laptop, Printer:deviceMap.get(key).Printer + 1, IWB:deviceMap.get(key).IWB});
            else if(sourceDevice == "IWB") deviceMap.set(key, {Phone:deviceMap.get(key).Phone, Tablet:deviceMap.get(key).Tablet, Laptop:deviceMap.get(key).Laptop, Printer:deviceMap.get(key).Printer, IWB:deviceMap.get(key).IWB + 1});
          }
          else{
            if(sourceDevice == "Phone") deviceMap.set(key, {Phone:1, Tablet:0, Laptop:0, Printer:0, IWB:0});
            else if(sourceDevice == "Tablet") deviceMap.set(key, {Phone:0, Tablet:1, Laptop:0, Printer:0, IWB:0});
            else if(sourceDevice == "Laptop") deviceMap.set(key, {Phone:0, Tablet:0, Laptop:1, Printer:0, IWB:0});
            else if(sourceDevice == "Printer") deviceMap.set(key, {Phone:0, Tablet:0, Laptop:0, Printer:1, IWB:0});
            else if(sourceDevice == "IWB") deviceMap.set(key, {Phone:0, Tablet:0, Laptop:0, Printer:0, IWB:1});
          }
      }
    }
  }
  for (var key of dateMap.keys()) {
        resultJSON.push({date:key, value:dateMap.get(key), Phone:deviceMap.get(key).Phone, Tablet:deviceMap.get(key).Tablet, Laptop:deviceMap.get(key).Laptop, Printer:deviceMap.get(key).Printer, IWB:deviceMap.get(key).IWB});
  }
  resultJSON.sort(function(a,b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
//  console.log(JSON.stringify(resultJSON));
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

//return count of Principals
function parsePrincipalCount(){
	var principalArray = [];
	for (var i=0; i < generatedJSON.length; i++){
		var principalId = generatedJSON[i]["principalName"];
		if(principalArray.indexOf(principalId) == -1){
			principalArray.push(principalId);
		}
	}
	console.log("Total Principals: " + principalArray.length);
	return principalArray.length;
}

//return total amount of storage used 
function parseTotalStorage(){
	var totalStorage = 0;
	var docMap = new Map();
	for(var i=0; i < generatedJSON.length; i++){
		var docId = generatedJSON[i]["docUUID"];
		var currentDocSize = generatedJSON[i]["docSize"];
		if(docMap.has(docId)){
			totalStorage = totalStorage - docMap.get(docId) + currentDocSize;
			docMap.set(docId,currentDocSize);
		}
		else{
			totalStorage = totalStorage + currentDocSize;
			docMap.set(docId,currentDocSize);
		}
	}
	console.log("Total Storage: " + totalStorage);
	return totalStorage;
}

//return count of Tenants
function parseTenantCount(){
	var tenantsArray = [];
	for (var i=0; i < generatedJSON.length; i++){
		var tenantId = generatedJSON[i]["extended"]["tenantId"];
		if(tenantsArray.indexOf(tenantId) == -1){
			tenantsArray.push(tenantId);
		}
	}
	console.log("Total Tenants: " + tenantsArray.length)
	return tenantsArray.length;
}

//return all logs in specified dataset E where criteria is met
function filterLogs(dataset,category, value){
	var result = [];
	console.log(dataset);
	for (var i of dataset){
		if(i[category] == value){
			result.push(i)
		}
	}
	console.log(result);
	return result;
}