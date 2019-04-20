(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [{
      id: "Crash_Ref_Number",
      alias: "Crash_Ref_Number",
      dataType: tableau.dataTypeEnum.int
     }, {
       id: "Crash_Severity",
       alias: "Crash_Severity",
       dataType: tableau.dataTypeEnum.string
     }];

     var tableSchema = {
         id: "crashFeed",
         alias: "Crash feed",
         columns: cols
     };

    schemaCallback([tableSchema]);
  };



    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://data.qld.gov.au/api/action/datastore_search?resource_id=e88943c0-5968-4972-a15f-38e120d72ec0",
        function(resp) {
            var feat = resp,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "Crash_Ref_Number": feat[i].records.Crash_Ref_Number,
                    "Crash_Severity": feat[i].records.Crash_Severity
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    //event listener
    $(document).ready(function () {
      $("#submitButton").click(function () {
        tableau.connectionName = "Qld Road Crash Location Feed";
        tableau.submit();
    });
});

})();
