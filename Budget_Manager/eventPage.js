var contItem ={
    "id" : "spend_Money",
    "title" : "Spend Money",
    "contexts" : ["selection"]
};

//to create context menu on right click
chrome.contextMenus.create(contItem);

//if no. is int
function isInt(value){
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

chrome.contextMenus.onClicked.addListener(function(clickData){
    
    //if some text is selected n context menu is also selectred   
    if(clickData.menuItemId === "spend_Money" && clickData.selectionText){
        if(isInt(clickData.selectionText)){
            //get value of total amnd limit
            chrome.storage.sync.get(['total', 'limit'], function(budget){
                var newtotal = 0;
                //if earlier total s present add it
                if(budget.total){
                    newtotal+= parseInt(budget.total);
                }
                // add selected text in variable
                newtotal += parseInt(clickData.selectionText);
                // add variable to storage total
                chrome.storage.sync.set({'total': newtotal}, function(){
                    //Notification if limit exceeded
                    if(newtotal >= budget.limit){
                        var notif={
                            type: 'basic',
                            iconUrl : 'image/icon48.png',
                            title: 'Limit reached!',
                            message : 'Uh oh! Looks like uh have reached ur limit!'
                        };
                        chrome.notifications.create('limitNoti', notif);
                        chrome.notifications.clear('limitNoti');
                    }
                })
            })
        }
    }
})
//Badge on icon
// chrome.storage.onChanged.addListener(function(changes, storageName){
//     chrome.browserAction.setBadgeText({'text' : changes.total.newValue.toString()});
// })