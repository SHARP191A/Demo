//generated list of n number of JSON objects
var generatedJSON = generateJSON(rand(1000,10000));


//helper functions to randomly choose an item from a list with the given weights
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function rand(min, max) {
    return Math.random()*(max - min) + min;
};

function getRandomItem(list, weight) {
    var total_weight = weight.reduce(function (prev, cur, i, arr) {
        return prev + cur;
    });
    var random_num = rand(0, total_weight);
    var weight_sum = 0;
    for (var i = 0; i < list.length; i++) {
        weight_sum += weight[i];
        weight_sum = +weight_sum.toFixed(2);
        if (random_num <= weight_sum) {
            return list[i];
        }
    }
};

function getRandomValues(field){
  if(field == "docType"){
    var docType_categories = ["Text File", "IWB image", "MP3", "User Profile", "Photos", "Employee Record", "Contract", "Unit", "Folder", "Bill of Lading"];
    var weight = [0.6, 0.01, 0.02, 0.10, 0.17, 0.02, 0.02, 0.03, 0.04, 0.01];
    return getRandomItem(docType_categories,weight);
  }
  else if (field == "eventId"){
    var eventId_categories = ["securityUpdated", "linkExpired", "lifecycle_transition_event", "documentCreated", "documentMoved", "rootUnregistered", "deleted", "linkSent", "documentDuplicated"];
    var weight = [.03, .01, .28, 0.35, .08, .09, .19, .01, .06];
    return getRandomItem(eventId_categories,weight);
  }
  else if (field == "docLifeCycle"){
    var docLifeCycle_categories = ["Recently Created", "Active", "Stale", "Recently Deleted"];
    var weight = [.19, .40, .22,.19];
    return getRandomItem(docLifeCycle_categories,weight);
  }
  else if (field == "docUUID"){
	  //1500 Documents
    return Math.floor(rand(80000,81500));
  }
  else if (field == "tenantId"){
	  //5 tenants
    var tenantId_categories = ["United Postal Service", "FedEx", "Irvine Company", "Intel", "UCI ICS"];
    var weight = [.2, .1, .4, .25, .05];
    return getRandomItem(tenantId_categories,weight);
  }
  else if (field == "userType"){
    var userType_categories = ["Admin", "General","Guest", "Miscellaneous"];
    var weight = [.12, .70, .16, .02];
    return getRandomItem(userType_categories,weight);
  }
  else if (field == "sourceDevice"){
    var sourceDevice_categories = ["Phone", "Tablet","Laptop", "Printer", "IWB"];
    var weight = [.18, .20, .42, .09, .1];
    return getRandomItem(sourceDevice_categories, weight);
  }
  else if(field == "id"){
	  return Math.floor(rand(10000,99999));
  }
  else if(field == "principalName"){
	  //5000 Principals
	  return Math.floor(rand(75000,80000));
  }
  else if(field == "docSize"){
	  return rand(0.3,8.1)
  }
  else if(field == "location"){
	  var location_categories = 	["US-AL", "US-AK", "US-AZ", "US-AR", "US-CA", "US-CO", "US-CT", "US-DE", "US-FL", "US-GA",
	                                 "US-HI", "US-ID", "US-IL", "US-IN", "US-IA", "US-KS", "US-KY", "US-LA", "US-ME", "US-MD",
	                                 "US-MA", "US-MI", "US-MN", "US-MS", "US-MO", "US-MT", "US-NE", "US-NV", "US-NH", "US-NJ",
	                                 "US-NM", "US-NY", "US-NC", "US-ND", "US-OH", "US-OK", "US-OR", "US-PA", "US-RI", "US-SC",
	                                 "US-SD", "US-TN", "US-TX", "US-UT", "US-VT", "US-VA", "US-WA", "US-WV", "US-WI", "US-WY",
	                                 ]
	  var weight = [.01, .01, .02, .02, .4, .1, .00, .02, .1, .02, //0.7
	                .02, .01, .02, .02, .02, .01, .02, .00, .02, .01,//0.15
	                .02, .02, .00, .02, .02, .02, .02, .00, .02, .02,//0.16
	                .02, .15, .02, .00, .02, .02, .02, .02, .02, .00,//0.29
	                .00, .02, .15, .02, .02, .02, .1, .02, .00, .00,]//0.25
	  return getRandomItem(location_categories, weight);
	  }
}

//generate a list of x number of JSON objects, each represent 1 log entry
function generateJSON(numberOfLogs){
  var generatedJSON = [];
  for (var i = 0; i < numberOfLogs; i++){
    var randDate = randomDate(new Date(2015, 6, 2), new Date());
    var logEntry =  {
          "entity-type": "logEntry",
          "category": "eventDocumentCategory",
          "principalName": getRandomValues("principalName"),
          "comment": "Document does not exist anymore!",
          "docLifeCycle": getRandomValues("docLifeCycle"),
          "docPath": "/16a22186-f547-44f5-813d-2c9fd69368fe/UserWorkspaces/9/Copy of v1demos.xls._1452712490363_.trashed",
          "docType": getRandomValues("docType"),
          "docUUID": getRandomValues("docUUID"),
          "eventId": getRandomValues("eventId"),
          "repositoryId": "default",
          "eventDate": randDate,
          "docSize": getRandomValues("docSize"),
          //new category source device
          "sourceDevice" : getRandomValues("sourceDevice"),
          "location": getRandomValues("location"),
          "userType" : getRandomValues("userType"),
          "id": getRandomValues("id"),
          "logDate": randDate,
          "extended": {
            "tenantId": getRandomValues("tenantId"),
            "name": "Copy of v1demos.xls._1452712490363_.trashed",
            "parentPath": "/16a22186-f547-44f5-813d-2c9fd69368fe/UserWorkspaces/9"}
    }
    generatedJSON.push(logEntry);
  }
  return generatedJSON;
}
