var win={
    url: chrome.runtime.getURL("window.html"),
    type: "popup" ,
    height : 800,
    width : 800,
    left : (screen.width/2)-400,
    top : (screen.height/2) - 400
};
chrome.browserAction.onClicked.addListener(function(activeTab){
    chrome.windows.create(win);
});
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    console.log ("Proceeding to do Download ")
    if(request.perform === "download" && request.imageID){
        chrome.downloads.download({
            filename: 'screenshot.png',
            url: request.imageID
        }, function (downloadID){
            console.log("Sending success for downloaded image!")
            // setTimeout(function() {
            //      sendResponse({success: true});
            // }, 10);
            sendResponse({success:true})
        })
        console.log("Download Successful")
        return true;
    }
});
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
//     if (request.Perform == "MinimizeWindow"){
//         console.log("Request Recieved")
//         Id_ = chrome.windows.getCurrent(function(tab){});
//         console.log(JSON.stringify(Id_));
//         chrome.browserAction.onClicked.addListener(function(activeTab){
//             chrome.windows.update(Id_, { state: 'minimized' });
//         });
//         // chrome.windows.update(win, { state: 'minimized' });
//         setTimeout(function() {
//             sendResponse({status: true});
//         }, 100);
//         console.log("Window Minimized")
//     }
// });