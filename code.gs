function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Confessions'); // Adjust to your sheet name if it's not 'Sheet1'
  var confession = e.parameter.confession; // Gets the 'confession' parameter from the POST request
  sheet.appendRow([new Date(), confession]); // Adds a new row with the current date/time and the confession text
  return ContentService.createTextOutput(JSON.stringify({status: 'success'})) // Returns a success message
                       .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Confessions'); // Adjust to your sheet name if it's not 'Sheet1'
  var data = sheet.getRange(2, 2, sheet.getLastRow() - 1).getValues(); // Gets all the confession texts from the second row onwards
  var confessions = data.map(row => row[0]); // Maps the data to a list of confession texts
  return ContentService.createTextOutput(JSON.stringify(confessions)) // Returns the list of confessions in JSON format
                       .setMimeType(ContentService.MimeType.JSON);
}
