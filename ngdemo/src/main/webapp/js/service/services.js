var sheetfactory = function ($http) {
    var factory = {};

    factory.getScriptSheet = function () {
        /*console.log(topsheet);
        return topsheet;*/
    	/*return $resource('/ngdemo/rest/users', {}, {
            query: {
                method: 'GET',
                params: {},
                isArray: false
            }
        })*/
    	var jsonresponse=$http.get('/ngdemo/rest/documents');
    	console.log(jsonresponse + "jsonrespo");
    	return jsonresponse;
    	//return topsheet;
    }
    return factory;
    
};
angular.module('qaApp').factory('sheetFactory', sheetfactory);
var topsheet = [
    {
        "Test Case ID": 1100,
        "Test Step": "Development",
        "Request URL": "http://qascript.atmecs.in",
        "Type (GET/POST)": "GET",
        "Expected Assertion": "status",
        "Expected Value": "ok",
        "Status": "done"
    }
    ,
    {
        "Test Case ID": 1101,
        "Test Step": "Deployment",
        "Request URL": "http://qascript.atmecs.in",
        "Type (GET/POST)": "POST",
        "Expected Assertion": "status",
        "Expected Value": "ok",
        "Status": "done"
    }];