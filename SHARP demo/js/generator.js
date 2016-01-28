//helper functions to randomly choose an item from a list with the given weights
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

var rand = function(min, max) {
    return Math.random() * (max - min) + min;
};

var getRandomItem = function(list, weight) {
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
    var docType_categories = ["File", "Drawings", "Workspace", "UserProfile", "Picture", "EmployeeRecord", "Contract", "Unit", "Folder", "BillOfLading"];
    var weight = [0.6, 0.01, 0.02, 0.10, 0.17, 0.02, 0.02, 0.03, 0.04, 0.01];
    return getRandomItem(docType_categories,weight);
  }
  else if (field == "eventId"){
    var eventId_categories = ["securityUpdated", "linkExpired", "lifecycle_transition_event", "documentCreated", "documentMoved", "rootUnregistered", "deleted", "linkSent", "documentDuplicated"];
    var weight = [.03, .01, .28, 0.35, .08, .09, .19, .01, .06];
    return getRandomItem(eventId_categories,weight);
  }
  else if (field == "docLifeCycle"){
    var docLifeCycle_categories = ["project", "undefined", "deleted", "null"];
    var weight = [.65, .04, .28, .03];
    return getRandomItem(docLifeCycle_categories,weight);
  }
    else if (field == "docUUID"){
    var docUUID_categories = ["fkfc2wmg", "lshn3x2k", "q9onu5ma", "tam7ht9d","pmq3t6zi", "alv1zice", "ou9vmxfe"];
    var weight = [.45, .04, .28, .03, .05, .05, .10];
    return getRandomItem(docLifeCycle_categories,weight);
  }
    else if (field == "principalName"){
    var principalName_categories = ["project", "undefined", "deleted", "null"];
    var weight = [.65, .04, .28, .03];
    return getRandomItem(docLifeCycle_categories,weight);
  }
    else if (field == "entity-type"){
    var entity-type_categories = ["project", "undefined", "deleted", "null"];
    var weight = [.65, .04, .28, .03];
    return getRandomItem(docLifeCycle_categories,weight);
  }
    else if (field == "tenantId"){
    var tenantId_categories = ["yzt7u9yb", "t8n1weqv", "bmzesczr", "po4rjrof"];
    var weight = [.65, .04, .28, .03];
    return getRandomItem(docLifeCycle_categories,weight);
  }
}


//generate a list of x number of JSON objects, each represent 1 log entry
function generateJSON(numberOfLogs){
  var generatedJSON = [];
  for (i = 0; i < numberOfLogs; i++){
    var randDate = randomDate(new Date(2015, 6, 2), new Date());
    var logEntry =  {
          "entity-type": getRandomValues("logEntry"),
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
          //new category source device
          "sourceDevice" : getRandomValues("sourceDevice"),
          "id": 1353433,
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
