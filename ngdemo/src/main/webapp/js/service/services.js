'use strict'
/*services*/
var services = angular.module('qaApp');

services.factory('QAScriptFactory' , function ($http) {
	var factory={};
	factory.getSheetData=function(){
		return $http.get("/ngdemo/rest/qascript");
	};
	factory.postSheetData=function(scriptData){
		return $http.post("/ngdemo/rest/qascript", scriptData);
	};
	return factory;
	/*return $resource('/ngdemo/rest/qascript', {});*/
	
	/*return $resource('/ngdemo/rest/qascript' , {} , {
		post : {
					method : 'POST'
				}	
		});*/
});