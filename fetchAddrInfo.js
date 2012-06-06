
// Google Docs JS Macro to fetch data about given bitcoin address
// Written by znort987@yahoo.com, tips to: 1ZnortsoStC1zSTXbW6CUtkvqew8czMMG

function fetchAddrInfo(
    addrName,   // e.g. :  '1dice37EemX64oHssTreXEFT3DXtZxVXK'
    fieldName   // e.g. :  'final_balance'  (see code for full list of args)
)
{
    // Fetch live data from blockchain.info
    var json = UrlFetchApp.fetch('http://blockchain.info/rawaddr/' + addrName + '?limit=0')
    if ('undefined' == typeof(json))
        return 'No data for address ' + addrName + ' from blockchain.info'
        
    json = json.getContentText()
    if (json.length<=0)
        return 'blockchain.info returned invalid data for address ' + addrName
        
    json = Utilities.jsonParse(json)
    if ('undefined' == typeof(json))
        return 'Malformed JSON data returned by blockchain.info for address ' + addrName
        
    json = json[fieldName]
    if ('undefined' == typeof(json))
        return 'Unknown field ' + fieldName + ' for address ' + addrName

    /*
        Possible fields:

        {
            "hash160":"06f1b66e8e95765789598c8a5089f535cfc7c6ef",
            "address":"1dice37EemX64oHssTreXEFT3DXtZxVXK",
            "n_tx":2414,
            "n_unredeemed":135,
            "total_received":7533007537,
            "total_sent":6979010177,
            "final_balance":553997360,
        }
    */

    return json
}

