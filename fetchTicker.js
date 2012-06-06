
// Google Docs JS Macro to process fetch a GLBSE tciker
// Written by znort987@yahoo.com, tips to: 1ZnortsoStC1zSTXbW6CUtkvqew8czMMG

function fetchTicker(
    tickerName,     // e.g. :  'COGNITIVE'
    fieldName       // e.g. :  'ask'  (see code for full list of args)
)
{
    // Fetch live data from GLBSE API
    var json = UrlFetchApp.fetch("https://glbse.com/api/asset/" + tickerName)
    if ('undefined' == typeof(json))
        return 'No data for ticker ' + tickerName + ' from GLBSE'
        
    json = json.getContentText()
    if (json.length<=0)
        return 'GLBSE returned invalid data for ticker ' + tickerName
        
    json = Utilities.jsonParse(json)
    if ('undefined' == typeof(json))
        return 'Malformed JSON data returned by GLBLSE for ticker ' + tickerName
        
    json = json[fieldName]
    if ('undefined' == typeof(json))
        return 'Unknown field ' + fieldName + ' for ticker ' + tickerName

    /*
        Fields are:

        {
            "ask":0
            "bid":0,
            "btc_vol_total":0,
            "latest_trade":0,
            "max":0,
            "min":0,
            "t24havg":0,
            "t24hvol":0,
            "t5davg":0,
            "t5dvol":0,
            "t7davg":0,
        }
    */

    return json
}

