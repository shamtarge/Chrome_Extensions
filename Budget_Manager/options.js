$(function(){
    chrome.storage.sync.get('limit', function(budget){
        $('#limit').val(budget.limit);
    })
    $('#savelimit').click(function(){
        var limit= $('#limit').val();
        if(limit){
            chrome.storage.sync.set({'limit': limit}, function(){
                close();
            })
        }
    });
    $('#resettotal').click(function(){
        chrome.storage.sync.set({'total':0}, function(){
            
            var notifi={
                type : 'basic',
                iconUrl : 'image/icon48.png',
                title : 'Total Reset',
                message : 'Total has been reset to 0'
            };
            chrome.notifications.create('totalReset', notifi);
            chrome.notifications.clear('totalReset');
        })
    })
})