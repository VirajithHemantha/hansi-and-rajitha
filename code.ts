const SHEET_ID = '1Om-q1zR7J9ghVqXM04ZomkJmsevBjuGkI4-WAfniazU';

function doGet(e: any) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.openById(SHEET_ID);
    
    // e.parameter contains the URL query parameters sent by your React app
    const params = e.parameter;
    const formName = params.formName; // "rsvp" or "wish"
    
    // Determine sheet name and required headers based on the form type
    const sheetName = formName === "rsvp" ? "RSVP Responses" : "Guest Wishes";
    let sheet = doc.getSheetByName(sheetName);
    
    // Define the headers based on the form type
    let headers: string[] = [];
    if (formName === "rsvp") {
      headers = ["Timestamp", "Name", "Guests", "Dietary Notes"];
    } else if (formName === "wish") {
      headers = ["Timestamp", "Name", "Message"];
    } else {
       // fallback for unknown types
       headers = ["Timestamp", "Data"];
    }
    
    // Auto-create the sheet and add headers if it doesn't exist yet
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
      sheet.appendRow(headers);
      // Make the headers bold
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      // Freeze the top row
      sheet.setFrozenRows(1);
    }
    
    // Prepare the row data to match the column headers perfectly
    const rowData: any[] = [];
    headers.forEach(header => {
      if (header === "Timestamp") {
        rowData.push(new Date()); // Current date and time
      } else if (header === "Data") {
        rowData.push(JSON.stringify(params));
      } else {
        // Match the query parameter that maps to this exact header
        rowData.push(params[header] || "");
      }
    });
    
    // Append the new submission to the bottom of the sheet
    sheet.appendRow(rowData);
    
    // Return success to the client
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", row: sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error: any) {
    // Return error if something goes wrong
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    // Release the lock so the next submission can be processed
    lock.releaseLock();
  }
}
