function updateSpreadsheetWithAPI() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("LIVE");
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  var numRows = values.length;

  for (var i = 1; i < numRows; i++) {
    // Assuming the first row contains headers
    var id = values[i][1]; // Assuming the ID is in the second column (column B)
    var organizationName = values[i][12]; // Column M
    var backgroundsName = values[i][8]; // Column I

    // Check if columns I and M contain "-" or are empty
    if (
      (organizationName === "-" || organizationName === "") &&
      (backgroundsName === "-" || backgroundsName === "")
    ) {
      var url =
        "https://gis-api.aiesec.org/v2/people/" +
        id +
        "/academic_experiences?access_token=";
      var response = UrlFetchApp.fetch(url);

      if (response.getResponseCode() === 200) {
        var data = JSON.parse(response.getContentText());
        if (data.length > 0) {
          organizationName = data[0].organisation_name;
          backgroundsName = data[0].backgrounds[0].name;

          // Update the corresponding cells in columns M and I
          sheet.getRange(i + 1, 13).setValue(organizationName); // Column M
          sheet.getRange(i + 1, 9).setValue(backgroundsName); // Column I
        } else {
          Logger.log("No data found for ID: " + id);
        }
      } else {
        Logger.log(
          "API request for ID " +
            id +
            " failed with status code: " +
            response.getResponseCode()
        );
      }
    }
  }
}
