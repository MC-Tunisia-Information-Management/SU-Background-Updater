# SU-Background-Updater
The function "updateSpreadsheetWithAPI" updates a Google Sheets spreadsheet named "LIVE" by fetching academic experience data from the AIESEC API based on IDs stored in the second column (B). For each row, if columns I (backgroundsName) and M (organizationName) are either empty or contain "-", it sends a request to retrieve academic experiences. If successful (HTTP status 200), it parses the response to extract organization names and background names, updating columns M and I accordingly for each row. If no data is found for an ID, it logs an appropriate message, and it logs errors if the API request fails for any reason.
