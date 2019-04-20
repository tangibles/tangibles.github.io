(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [
      { id: "Crash_Ref_Number", alias: "Crash ID", dataType: tableau.dataTypeEnum.int
      }, { id: "Crash_Severity", alias: "Severity", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Year", alias: "Year", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Month", alias: "Month", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Day_Of_Week", alias: "Weekday", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Hour", alias: "Hour", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Nature", alias: "Nature", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Type", alias: "Type", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Longitude_GDA94", alias: "Long", dataType: tableau.dataTypeEnum.float
      }, { id: "Crash_Latitude_GDA94", alias: "Lat", dataType: tableau.dataTypeEnum.float
      }, { id: "Crash_Street", alias: "Street", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Street_Intersecting", alias: "Intersecting Street", dataType: tableau.dataTypeEnum.string
      }, { id: "Loc_Suburb", alias: "Suburb", dataType: tableau.dataTypeEnum.string
      }, { id: "Loc_Local_Government_Area", alias: "LGA", dataType: tableau.dataTypeEnum.string
      }, { id: "Loc_Post_Code", alias: "Postcode", dataType: tableau.dataTypeEnum.string
      }, { id: "Loc_ABS_Statistical_Area_2", alias: "ABS SA2", dataType: tableau.dataTypeEnum.string
      }, { id: "Loc_ABS_Statistical_Area_3", alias: "ABS SA3", dataType: tableau.dataTypeEnum.string
      }, { id: "Loc_ABS_Statistical_Area_4", alias: "ABS SA4", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Controlling_Authority", alias: "Controlling Authority", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Roadway_Feature", alias: "Roadway Feature", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Traffic_Control", alias: "Traffic Control", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Speed_Limit", alias: "Speed Limit", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Road_Surface_Condition", alias: "Road Surface Condition", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Atmospheric_Condition", alias: "Atmospheric Condition", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Lighting_Condition", alias: "Lighting Condition", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Road_Horiz_Align", alias: "Road Horiz Align", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_Road_Vert_Align", alias: "Road Vert Align", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_DCA_Description", alias: "DCA Description", dataType: tableau.dataTypeEnum.string
      }, { id: "Crash_DCA_Group_Description", alias: "DCA Group Description", dataType: tableau.dataTypeEnum.string
      }, { id: "Count_Casualty_Fatality", alias: "Fatalities", dataType: tableau.dataTypeEnum.int
      }, { id: "Count_Casualty_Hospitalised", alias: "Hospitalised", dataType: tableau.dataTypeEnum.int
      }, { id: "Count_Casualty_MedicallyTreated", alias: "Medically Treated", dataType: tableau.dataTypeEnum.int
      }, { id: "Count_Casualty_MinorInjury", alias: "Minor Injury", dataType: tableau.dataTypeEnum.int
      }, { id: "Count_Casualty_Total", alias: "Casualties", dataType: tableau.dataTypeEnum.int
      }
   ];

     var tableSchema = {
         id: "crashFeed",
         alias: "Crash feed",
         columns: cols
     };

    schemaCallback([tableSchema]);
  };



    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://data.qld.gov.au/api/action/datastore_search?resource_id=e88943c0-5968-4972-a15f-38e120d72ec0&limit=200",
        function(resp) {
            var feat = resp.result.records,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                  Crash_Ref_Number: feat[i].Crash_Ref_Number,
                  Crash_Severity: feat[i].Crash_Severity,
                  Crash_Year: feat[i].Crash_Year,
                  Crash_Month: feat[i].Crash_Month,
                  Crash_Day_Of_Week: feat[i].Crash_Day_Of_Week,
                  Crash_Hour: feat[i].Crash_Hour,
                  Crash_Nature: feat[i].Crash_Nature,
                  Crash_Type: feat[i].Crash_Type,
                  Crash_Longitude_GDA94: feat[i].Crash_Longitude_GDA94,
                  Crash_Latitude_GDA94: feat[i].Crash_Latitude_GDA94,
                  Crash_Street: feat[i].Crash_Street,
                  Crash_Street_Intersecting: feat[i].Crash_Street_Intersecting,
                  Loc_Suburb: feat[i].Loc_Suburb,
                  Loc_Local_Government_Area: feat[i].Loc_Local_Government_Area,
                  Loc_Post_Code: feat[i].Loc_Post_Code,
                  Loc_ABS_Statistical_Area_2: feat[i].Loc_ABS_Statistical_Area_2,
                  Loc_ABS_Statistical_Area_3: feat[i].Loc_ABS_Statistical_Area_3,
                  Loc_ABS_Statistical_Area_4: feat[i].Loc_ABS_Statistical_Area_4,
                  Crash_Controlling_Authority: feat[i].Crash_Controlling_Authority,
                  Crash_Roadway_Feature: feat[i].Crash_Roadway_Feature,
                  Crash_Traffic_Control: feat[i].Crash_Traffic_Control,
                  Crash_Speed_Limit: feat[i].Crash_Speed_Limit,
                  Crash_Road_Surface_Condition: feat[i].Crash_Road_Surface_Condition,
                  Crash_Atmospheric_Condition: feat[i].Crash_Atmospheric_Condition,
                  Crash_Lighting_Condition: feat[i].Crash_Lighting_Condition,
                  Crash_Road_Horiz_Align: feat[i].Crash_Road_Horiz_Align,
                  Crash_Road_Vert_Align: feat[i].Crash_Road_Vert_Align,
                  Crash_DCA_Description: feat[i].Crash_DCA_Description,
                  Crash_DCA_Group_Description: feat[i].Crash_DCA_Group_Description,
                  Count_Casualty_Fatality: feat[i].Count_Casualty_Fatality,
                  Count_Casualty_Hospitalised: feat[i].Count_Casualty_Hospitalised,
                  Count_Casualty_MedicallyTreated: feat[i].Count_Casualty_MedicallyTreated,
                  Count_Casualty_MinorInjury: feat[i].Count_Casualty_MinorInjury,
                  Count_Casualty_Total: feat[i].Count_Casualty_Total
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
