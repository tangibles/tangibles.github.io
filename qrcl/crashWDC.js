(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "id",
        dataType: tableau.dataTypeEnum.string
    }, {
      id: "Crash_Ref_Number",
      alias: "place",
      dataType: tableau.dataTypeEnum.string
     }, {
       id: "Crash_Severity",
       alias: "mseconds",
       dataType: tableau.dataTypeEnum.int
     };

    schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://data.qld.gov.au/api/action/datastore_search?resource_id=e88943c0-5968-4972-a15f-38e120d72ec0&limit=5", function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].id,
                    "place": feat[i].properties.place,
                    "time": feat[i].properties.time,
                    "mag": feat[i].properties.mag,
                    "tsunami": feat[i].properties.tsunami,
                    "title": feat[i].properties.title,
                    "location": feat[i].geometry
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
    $(document).ready(function () {
      $("#submitButton").click(function () {
        tableau.connectionName = "USGS Earthquake Feed";
        tableau.submit();
    });
});
})();
