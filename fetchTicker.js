
// Google Docs JS Macro to process fetch a GLBSE ticker
// Written by znort987@yahoo.com, tips to: 1ZnortsoStC1zSTXbW6CUtkvqew8czMMG

function dontHammerGLBSE()
{
    var cache = CacheService.getPublicCache()
    var now = (new Date()).getTime()
    var last = cache.get('last')

    if (null != last) {
        var lastTime = parseInt(last)
        var elapsed = now - lastTime
        var waitFor = 5 - elapsed
        if (0<waitFor)
            Utilities.sleep(waitFor)
    }
    
    cache.put('last', String(now))
}

function fetchCached(url)
{
    var publicCache = CacheService.getPublicCache()
    var cached = publicCache.get(url)

    if (null == cached) {
    
        dontHammerGLBSE()
        
        var response = UrlFetchApp.fetch(url)
        if ('undefined' != typeof(response)) {
            var code = response.getResponseCode()
            if (code<300) {
                var fiveMin = 5 * 60
                cached = response.getContentText()
                publicCache.put(url, cached, fiveMin)
            }
        }
    }

    return cached
}

function fetchTicker(
    tickerName,     // e.g. :  'COGNITIVE'
    fieldName       // e.g. :  'ask'  (see code for full list of args)
)
{
    // Fetch live data from GLBSE API
    var r = fetchCached("https://glbse.com/api/asset/" + tickerName)
    if ('undefined' == typeof(r))
        return 'No data for ticker ' + tickerName + ' from GLBSE'
        
    r = Utilities.jsonParse(r)
    if ('undefined' == typeof(r))
        return 'Malformed JSON data returned by GLBLSE for ticker ' + tickerName
        
    r = r[fieldName]
    if ('undefined' == typeof(r))
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

    return r
}

