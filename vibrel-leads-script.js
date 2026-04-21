/**
 * Vibrel Lead Capture — Google Apps Script
 * Receives POST FormData from the contact form.
 * Writes a new row to Google Sheets + sends Gmail notification.
 *
 * IMPORTANT: After pasting this, go to:
 *   Deploy → Manage Deployments → Edit → "New Version" → Deploy
 * You must redeploy after any code change for it to take effect.
 */

const SHEET_NAME   = 'Sheet1';               // Sheet tab name
const NOTIFY_EMAIL = 'connect.vibrel@gmail.com';

function doPost(e) {
  try {
    // FormData fields come through e.parameter (not e.postData.contents)
    const name     = e.parameter.name     || '';
    const email    = e.parameter.email    || '';
    const business = e.parameter.business || 'Not provided';
    const message  = e.parameter.message  || '';

    // Open the sheet
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    // Auto-create header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Business', 'Message']);
      sheet.getRange(1, 1, 1, 5)
           .setFontWeight('bold')
           .setBackground('#141414')
           .setFontColor('#8FA68E');
    }

    // Write the lead
    sheet.appendRow([
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      name,
      email,
      business,
      message,
    ]);

    // Email notification
    MailApp.sendEmail({
      to:      NOTIFY_EMAIL,
      subject: `🚀 New Lead — ${name} (Vibrel.in)`,
      body: [
        'New lead from your Vibrel website.',
        '─────────────────────────────',
        `Name:     ${name}`,
        `Email:    ${email}`,
        `Business: ${business}`,
        `Time:     ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
        '─────────────────────────────',
        'Message:',
        message,
        '─────────────────────────────',
        `All leads: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`,
      ].join('\n'),
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Run this manually once to confirm the sheet is accessible
function testSetup() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Sheet1');
  Logger.log('Sheet found: ' + sheet.getName());
  Logger.log('Rows so far: ' + sheet.getLastRow());
  Logger.log('✅ Ready to receive leads.');
}
