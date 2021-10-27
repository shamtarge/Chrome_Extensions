// chrome.storage.sync.get(['file1'], function(result) {
//     const f1 = result.key;
//     console.log('Value currently is ' + result.key);
//     document.getElementById("first").src=result;
// });
// chrome.storage.sync.get(['file2'], function(result) {
//     const f2 = result.key;
//     console.log('Value currently is ' + result.key);
//     document.getElementById("second").src="screenshot (4).png";
// });
// chrome.storage.sync.get(['file3'], function(result) {
//     const f3 = result.key;
//     console.log('Value currently is ' + result.key);
//     document.getElementById("third").src="screenshot (5).png";
// });


console.log("ready!!")
var win_ = document.getElementById('snaps');
document.getElementById("first").src="screenshot.png";
document.getElementById("second").src="screenshot (1).png";
document.getElementById("third").src="screenshot (2).png";
win_.addEventListener("click", function(){
    // chrome.runtime.sendMessage({Perform : "MinimizeWindow"}, function(response) {
    //     console.log(response)
    // });

    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
        
        chrome.tabs.sendMessage(tabs[0].id, {Perform : "CaptureSnap"}, function(response){
            setTimeout(function(){
                console.log(response);
            }, 500) 
                                // console.log(response.msg)
        });
        console.log("Msg Sent to capture snap")
        
              
});
    // console.log("Msg Sent to capture snap")


    // chrome.desktopCapture.chooseDesktopMedia(["screen","window","tab"],function (captureID){
    //     //check whether the user canceled the request or not
    //     if (captureID && captureID.length) {
    //         console.log("Capture ID : "+ captureID)
    //         chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
    //             // setTimeout(function(){
    //             //     chrome.tabs.sendMessage(tabs[0].id, {Perform : "CaptureSnap",captureID}, function(response){
    //             //         console.log(response.Status);
    //             //         // console.log(response.msg)
    //             //     });
    //             //     console.log("Msg Sent to capture snap")
    //             // }, 500)
    //             chrome.tabs.sendMessage(tabs[0].id, {Perform : "CaptureSnap",captureID}, function(response){
    //                 console.log(response.Status);
    //                 // console.log(response.msg)
    //             });
    //             console.log("Msg Sent to capture snap")
                
    //         });
    //     }
    // })
     


    // chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    //     console.log ("Proceeding to do Download ")
    //     if(request.perform === "download" && request.imageID){
    //         chrome.downloads.download({
    //             filename: 'screenshot.png',
    //             url: request.imageID
    //         }, function (downloadID){
    //             console.log("Sending success for downloaded image!")
    //             setTimeout(function() {
    //                  sendResponse({success: true});
    //             }, 10);
    //             // sendResponse({success:true})
    //         })
    //         console.log("Download Successful")
    //         return true;
    //     }
    // });
    // tab_.addEventListener("click", function(){
    //     chrome.runtime.sendMessage({Perform : "MinimizeWindow"}, function(response) {
    //         console.log(JSON.stringify(response))
    //     });
    //     chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
    //         chrome.tabs.sendMessage(tabs[0].id, {Perform : "TabTake"}, function(response) {
    //             console.log(response);
    //         });
    //     });
    // });
    // custom.addEventListener("click", function(){
    //     chrome.runtime.sendMessage({Perform : "MinimizeWindow"}, function(response) {
    //         console.log(JSON.stringify(response))
    //     });
    //     chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
    //         chrome.tabs.sendMessage(tabs[0].id, {Perform : "Customize"}, function(response) {
    //             console.log(response);
    //         });
    //     });
    // });
});
