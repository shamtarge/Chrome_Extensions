chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var win={
        url: chrome.runtime.getURL("popup.html"),
        type: "popup" ,
        height : 300,
        width : 270,
        left : 10, 
    }
    chrome.windows.create(win);
});