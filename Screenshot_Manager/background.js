
console.log("Backsc running")
// "default_popup": "window.html"

// chrome.browserAction.onClicked.addListener(function(activeTab){
//     var win={
//         url: chrome.runtime.getURL("window.html"),
//         type: "popup" ,
//         height : 800,
//         width : 800,
//         left : (screen.width/2)-400,
//         top : (screen.height/2) - 400
//     };
//     console.log("opening windoe") 
//     chrome.windows.create(win);
//     console.log("Done windoe")
// });
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    console.log ("Proceeding to do Download ")
    if(request.perform === "download" && request.imageID){
        // var openimageurl = "https://www.fotor.com/photo-editor-app/editor/basic/"+request.imageID;
        // chrome.tabs.create({
        //     url: request.imageID
        // });
        var num=1;
        var name;
        chrome.downloads.download({
            filename: 'screenshot.png',
            saveAs:true,
            url: request.imageID
        }, function (downloadID){
            console.log(downloadID)
           
            
            // var key;
            // if(num==1){
            //     key = 'file1';
            // }
            // else if(num==2){
            //     key = 'file2';
            // }
            // else{
            //     key = 'file3';
            // }
            // num = num+1;
            // chrome.storage.sync.set({[key]: request.imageID}, function() {
            //     console.log('Saved', key, downloadID);
            // });
            sendResponse({success:true});
            // console.log(chrome.downloads.download.filename);
        })
        
        console.log("Download Successful")
        return true;
    }
    else{
        console.log("inside else")
    }
});
console.log("After the msg is send")
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
