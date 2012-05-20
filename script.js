
// Google Docs JS Macro to process GLBSE .CSV account export

// Install new menu entry in spreadsheet
function onOpen() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var menuEntries = [ {name: "P&L Calculator", functionName: "pnlCalc"}];
    ss.addMenu("Scripts", menuEntries);
}

// Find a specific column in a row
function findCol(
    row,
    name
) {
    var lastCol = row.getLastColumn()
    for (i=1; i<=lastCol; ++i) {
        var content = row.getCell(1, i).getValue()
        if (name.toString()==content.toString())
            return i
    }
    throw("Couldn't locat column " + name + " in sheet 'Import'")
}

// Compute profit and loss
function pnlCalc() {

    // Ticker closure
    var tickersByName = {}
    var ticker = function(
        tickerName
    ) {
        var tick = tickersByName[tickerName]
        if (typeof(tick) == 'undefined') {
            tick = tickersByName[tickerName] = {}
            tick.amnt = 0
            tick.shrs = 0
            tick.divp = 0
        }
        return tick
    }
    
    // Grab 'Import' sheet
    var importSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Import")
    if (!importSheet)
        throw("Couldn't find sheet 'Import' ... please import GLBSE data in a sheet named 'Import'")
  
    // Find column indices
    var lastRow = importSheet.getLastRow()
    var lastCol = importSheet.getLastColumn()
    var headerRow = importSheet.getRange(1, 1, 1, lastCol)
    var typeCol = findCol(headerRow, "type")
    var dateCol = findCol(headerRow, "timestamp")
    var amntCol = findCol(headerRow, "btc_amount")
    var tickCol = findCol(headerRow, "asset")
    var shrsCol = findCol(headerRow, "quantity")
    var acctCol = findCol(headerRow, "account")
    var addrCol = findCol(headerRow, "address")
    var noteCol = findCol(headerRow, "fee_note")
    
    // Walk the entries of the import sheet
    for (var i=2; i<lastRow; ++i) {
    
        var row = importSheet.getRange(i, 1, 1, lastCol)
        if (0==(i%5) || lastRow==i)
           row.activate()
        
        var type = row.getCell(1, typeCol).getValue()
        var date = row.getCell(1, dateCol).getValue()
        var amnt = row.getCell(1, amntCol).getValue()
        var tick = row.getCell(1, tickCol).getValue()
        var shrs = row.getCell(1, shrsCol).getValue()
        var acct = row.getCell(1, acctCol).getValue()
        var addr = row.getCell(1, addrCol).getValue()
        var note = row.getCell(1, noteCol).getValue()
        
        if (type == 'withdrawal') {
            ticker('GLBSE_CASH').amnt -= amnt
            ticker('WALLT_CASH').amnt += amnt
        }
        else if (type == 'fee') {
            ticker('GLBSE_CASH').amnt -= amnt
            ticker('GLBSE_FEES').amnt += amnt
        }
        else if(type == 'dividend') {
            ticker(tick).divp -= amnt
            ticker('GLBSE_CASH').amnt += amnt
        }
        else if(type == 'sell') {
            amnt *= shrs;
            ticker(tick).shrs -= shrs
            ticker(tick).amnt -= amnt
            ticker('GLBSE_CASH').amnt += amnt
        }
        else if(type == 'buy') {
            amnt *= shrs
            ticker('GLBSE_CASH').amnt -= amnt
            ticker(tick).amnt += amnt
            ticker(tick).shrs += shrs
        }
        else if(type == 'deposit') {
            ticker('WALLT_CASH').amnt -= amnt
            ticker('GLBSE_CASH').amnt += amnt
        }
        else if(type == 'transfer_to') {
            ticker(tick).shrs -= shrs
        }
        else if(type == 'transfer_from') {
            ticker(tick).shrs += shrs
        }
        else
            throw("Unknown transaction type on row " + i + " ... aborting.")
    }

    // Get a hold of the PNL sheet (create if needed) and wipe it
    var pnlSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("PNL")
    if (!pnlSheet) {
        pnlSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("PNL")
        if (!pnlSheet)
            throw("Couldn't create sheet 'PNL'")
    }    
    pnlSheet.clear()
    
    // Populate PNL sheet with results gathered
    pnlSheet.appendRow(['asset', 'shares', 'invested', 'dividend'])
    pnlSheet.getRange("1:1").setFontWeight("bold");
    pnlSheet.setFrozenRows(1);

    for (var tickerName in tickersByName) {
        if (tickersByName.hasOwnProperty(tickerName)) {
            var tick = tickersByName[tickerName]
            pnlSheet.appendRow([tickerName, tick.shrs, -tick.amnt, -tick.divp])
        }
    }
}
  

