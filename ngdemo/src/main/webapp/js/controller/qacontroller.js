var app = angular.module('qaApp', [ 'wijspread', 'ui.bootstrap', 'dialogs', 'ngResource' ]);
app
		.controller(
				'QAController',
				function($scope, $rootScope, $timeout, $modal, $log, $dialogs,
						sheetFactory) {
					var sheetData = [];

					$scope.launch = function() {
						var dlg = null;
						// Create Your Own Dialog
						dlg = $dialogs.create('/dialogs/howmanyrows.html',
								'howManyRowsCtrl', {}, {
									key : false,
									back : 'static'
								});
						$scope.sheetname = "csheet";
					}; // end launch

					/* get sheet data on save button click */
					$scope.saveScript = function() {
						console.log("in controller");
						var spread = $("#ss").wijspread("spread");
						var sheet = spread.getActiveSheet();
						// sheet.isPaintSuspended(true);

						var rc = sheet.getRowCount();
						var cc = sheet.getColumnCount();
						console.log(rc);
						console.log(cc);
						var isRowEmpty = true;
						var jsonObject = {};
						/* iterate spreadsheet to get cell data */
						for (var r = 0; r < rc; r++) {
							for (var c = 0; c < cc; c++) {

								var cellKey = sheet.getValue(0, c,
										$.wijmo.wijspread.SheetArea.colHeader);
								var cellValue = sheet.getValue(r, c);
								if (cellValue != null)
									isRowEmpty = false;
								jsonObject[cellKey] = cellValue;
							}// inner for
							if (!isRowEmpty) {
								sheetData.push(jsonObject);
								isRowEmpty = true;
							}// end if

							jsonObject = {};
						}// outer for
						console.log(JSON.stringify(sheetData));
					};// end saveScript

					$scope.getSheet = function() {
						$scope.sheetname = "vsheet";
						sheetFactory.getScriptSheet().success(function(data){
							$scope.viewsheet=data;
						});
					}; 
					$scope.getSheet();
					// end getSheet
				})
		// end QAController
		.controller(
				'howManyRowsCtrl',
				function($scope, $modalInstance, data) {
					$scope.user = {
						rows : ''
					};

					$scope.cancel = function() {
						$modalInstance.dismiss('canceled');
					}; // end cancel

					$scope.save = function() {
						$modalInstance.close($scope.user.rows);
						// console.log("in save: "+$scope.user.rows);
						$("#createSheetDiv").empty();
						$("#createSheetDiv").wijspread({
							sheetCount : 1
						});
						var spreadSheet = $("#createSheetDiv").wijspread(
								"spread");
						if ($.browser.msie
								&& parseInt($.browser.version, 10) < 9) {
							// run for ie7/8
							spreadSheet.bind("SpreadsheetObjectLoaded",
									function() {
										createSpread($scope.user.rows,
												spreadSheet);
									});
						} else {
							createSpread($scope.user.rows, spreadSheet);
						} // end if-else
					}; // end save

					$scope.hitEnter = function(evt) {
						if (angular.equals(evt.keyCode, 13)
								&& !(angular.equals($scope.name, null) || angular
										.equals($scope.name, '')))
							$scope.save();
					}; // end hitEnter
				})
		// end howManyRowsCtrl
		.run(
				[
						'$templateCache',
						function($templateCache) {
							$templateCache
									.put(
											'/dialogs/howmanyrows.html',
											'<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span>Row Numbers</h4></div><div class="modal-body"><ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]"><label class="control-label" for="username">Rows:</label><input type="number" min="1" max="20" class="form-control" name="username" id="username" ng-model="user.rows" ng-keyup="hitEnter($event)" required><span class="help-block">Number of rows in sheet</span></div></ng-form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button><button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button></div></div></div></div>');
						} ]);

/* create spread sheet with user given no. of rows */
function createSpread(noOfRows, spread) {
	spread.useWijmoTheme = true;
	spread.tabStripVisible(false);
	spread.showHorizontalScrollbar(false);
	spread.showVerticalScrollbar(false);

	var sheet = spread.getActiveSheet();
	sheet.isPaintSuspended(true);

	sheet.setRowCount(noOfRows);
	sheet.setColumnCount(7);
	var rc = sheet.getRowCount();
	var cc = sheet.getColumnCount();

	/* set column header name */
	sheet.setValue(0, 0, "Test Case ID", $.wijmo.wijspread.SheetArea.colHeader);
	sheet.setValue(0, 1, "Test Step", $.wijmo.wijspread.SheetArea.colHeader);
	sheet.setValue(0, 2, "Request URL", $.wijmo.wijspread.SheetArea.colHeader);
	sheet.setValue(0, 3, "Type (GET/POST)",$.wijmo.wijspread.SheetArea.colHeader);
	sheet.setValue(0, 4, "Expected Assertion",
			$.wijmo.wijspread.SheetArea.colHeader);
	sheet.setValue(0, 5, "Expected Value",
			$.wijmo.wijspread.SheetArea.colHeader);
	sheet.setValue(0, 6, "Status", $.wijmo.wijspread.SheetArea.colHeader);
	/* set column width */
	sheet.setColumnWidth(0, 100);
	sheet.setColumnWidth(1, 300);
	sheet.setColumnWidth(2, 200);
	sheet.setColumnWidth(3, 150);
	sheet.setColumnWidth(4, 150);
	sheet.setColumnWidth(5, 100);
	sheet.setColumnWidth(6, 100);
	var filter = new $.wijmo.wijspread.HideRowFilter(
			new $.wijmo.wijspread.Range(-1, 0, -1, 2));
	sheet.rowFilter(filter);
	filter.setShowFilterButton(false);
	sheet.isPaintSuspended(false);
}