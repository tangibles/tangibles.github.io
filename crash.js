(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [{
      id: "Crash_Ref_Number",
      alias: "Crash ID",
      dataType: tableau.dataTypeEnum.string
     }, {
       id: "Crash_Severity",
       alias: "Severity",
       dataType: tableau.dataTypeEnum.string
     };

    schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function(resp) {
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
