//return array of objects with column as key and count as value
function parseData(dataset, column){
	var resultJSON = [];
	var map = new Map();
	var rowLength = dataset.length;
	
	for(var i=0; i < rowLength; i++){
		var key = dataset[i][column];
		if(map.has(key)){
			map.set(key, map.get(key)+1);
		}
		else{
			map.set(key,1);
		}
	}
	
	for(var key of map.keys()){
		map.set(key, map.get(key));
		var categoryObject = new Object();
		categoryObject[column] = key;
		categoryObject["units"] = map.get(key);
		resultJSON.push(categoryObject);
	}
	console.log(resultJSON);
	return resultJSON;
}

// return map of dates to sourceDevice usage with eventIdFilter and userTypeFilter
function parseDateOfData(dataset,eventIdFilter,userTypeFilter){
	  column = "eventDate";
	  var resultJSON = [];
	  var dateMap = new Map();
	  var deviceMap = new Map();
	  var rowLength = dataset.length;

	  //fill in map
	  for(var i = 0; i < rowLength; i++){
	    var userType = dataset[i]["userType"];
	    var eventId = dataset[i]["eventId"];
	    if (eventId == eventIdFilter || eventIdFilter == "All"){
	      if (userType == userTypeFilter || userTypeFilter == "All"){
	        var day = dataset[i][column].getDay() + 1;
	        var month = dataset[i][column].getMonth() + 1;
	        if (day < 10){day = "0" + day;}
	        if (month < 10){ month = "0" + month;}
	        var key = dataset[i][column].getFullYear() + "-" + day + "-" + month;
	        var sourceDevice = dataset[i]["sourceDevice"];

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
	  return resultJSON;
}

//return number of users in specified DATASET
function parsePrincipalCount(dataset){
	var principalArray = [];
	for (var i=0; i < dataset.length; i++){
		var principalId = dataset[i]["principalName"];
		if(principalArray.indexOf(principalId) == -1){
			principalArray.push(principalId);
		}
	}
	console.log("Total Principals: " + principalArray.length);
	return principalArray.length;
}

//return total amount of storage used 
function parseTotalStorage(dataset){
	var totalStorage = 0;
	var docMap = new Map();
	for(var i=0; i < dataset.length; i++){
		var docId = dataset[i]["docUUID"];
		var currentDocSize = dataset[i]["docSize"];
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

//return count of Tenants in the specified DATASET
function parseTenantCount(dataset){
	var tenantsArray = [];
	for (var i=0; i < dataset.length; i++){
		var tenantId = dataset[i]["extended"]["tenantId"];
		if(tenantsArray.indexOf(tenantId) == -1){
			tenantsArray.push(tenantId);
		}
	}
	console.log("Total Tenants: " + tenantsArray.length)
	return tenantsArray.length;
}

//return all logs in specified dataset where the value of CATEGORY == VALUE
function filterLogs(dataset,category, value){
	console.log(category, value);
	var result = [];
	if(category=="tenantId"){
		for(var i of dataset){
			if(i["extended"]["tenantId"]==value){
				result.push(i);
			}
		}
	}
	else{
		for (var i of dataset){
			if(i[category] == value){
				result.push(i)
			}
		}
	}
	console.log(result.length);
	return result;
}

//return array of objects mapping tenant to storage usage
function parseTenantStorageUsage(dataset){
	var resultJSON = [];
	var tenantMap = new Map();
	
	for(var i of dataset){
		var tenantId = i["extended"]["tenantId"];
		var docSize = i["docSize"];
		if(tenantMap.has(tenantId)){
			var currentStorage = tenantMap.get(tenantId);
			var newStorage = parseFloat(currentStorage+docSize).toFixed(2);
			tenantMap.set(tenantId,newStorage);
		}
		else{
			tenantMap.set(tenantId,docSize.toFixed(2));
		}
	}
	for(var key of tenantMap.keys()){
		resultJSON.push({category: key, units: tenantMap.get(key)})
	}
	return resultJSON;
}

function parseTenantCPOUsage(dataset){
	var resultJSON = [];
	var tenantMap = new Map();
	
	for(var i of dataset){
		var tenantId = i["extended"]["tenantId"];
		if(tenantMap.has(tenantId)){
			var currentCount = tenantMap.get(tenantId);
			tenantMap.set(tenantId,currentCount+1);
		}
		else{
			tenantMap.set(tenantId,1);
		}
	}
	for(var key of tenantMap.keys()){
		resultJSON.push({category: key, units: tenantMap.get(key)})
	}
	return resultJSON;
}

function parseFileTypeStorage(dataset){
	var resultJSON = [];
	var fileTypeMap = new Map();
	
	for(var i of dataset){
		var fileType = i["docType"];
		var docSize = i["docSize"];
		if(fileTypeMap.has(fileType)){
			var currentStorage = fileTypeMap.get(fileType);
			var newStorage = parseFloat(currentStorage + docSize).toFixed(2);
			fileTypeMap.set(fileType,newStorage);
		}
		else
			fileTypeMap.set(fileType,docSize);
	}
	
	for(var key of fileTypeMap.keys()){
		resultJSON.push({category: key, units: fileTypeMap.get(key)})
	}
	return resultJSON;
}

function dateFilter(dataset,dateFilter){
	var resultJSON = [];
	var check = new Date().getTime() - (dateFilter*24*60*60*1000);
	for(var i of dataset){
		if(i["logDate"] > check || check=="total"){
			resultJSON.push(i);
		}
	}
	return resultJSON;
}