
// Google Docs JS Macro to fetch data about the bitcoin network
// Written by znort987@yahoo.com, tips to: 1ZnortsoStC1zSTXbW6CUtkvqew8czMMG

function fetchDifficulty()
{
    // Fetch live data from blockchain.info
    var data = UrlFetchApp.fetch('http://blockchain.info/q/getdifficulty')
    if ('undefined' == typeof(data))
        return 'Could not fetch difficulty from blockchain.info'

    data = data.getContentText()
    if (data.length<=0)
        return 'blockchain.info returned invalid data for getdifficulty'

    return data
}

function fetchNextDifficultyEstimate()
{
    // Fetch live data from blockchain.info
    var data = UrlFetchApp.fetch('http://blockexplorer.com/q/estimate')
    if ('undefined' == typeof(data))
        return 'Could not fetch difficulty from blockexplorer.com'

    data = data.getContentText()
    if (data.length<=0)
        return 'blockexplorer.com returned invalid data for getdifficulty'

    return data
}

