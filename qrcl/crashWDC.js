(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "id",
        dataType: tableau.dataTypeEnum.string
    }, {
      id: "place",
      alias: "place",
      dataType: tableau.dataTypeEnum.string
     }, {
       id: "time",
       alias: "mseconds",
       dataType: tableau.dataTypeEnum.int
     }, {
        id: "mag",
        alias: "magnitude",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "title",
        alias: "title",
        dataType: tableau.dataTypeEnum.string
    }, {
      id: "tsunami",
      alias: "tsunami",
      dataType: tableau.dataTypeEnum.int
  }, {
        id: "location",
        dataType: tableau.dataTypeEnum.geometry
    }];

    var tableSchema = {
        id: "earthquakeFeed",
        alias: "Earthquakes in the last 30 days",
        columns: cols
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
