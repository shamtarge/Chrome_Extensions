$(document).ready(function(){
    console.log("ready!!")
    var win_ = document.getElementById('snaps');
    win_.addEventListener("click", function(){
        // chrome.runtime.sendMessage({Perform : "MinimizeWindow"}, function(response) {
        //     console.log(response)
        // });
        chrome.desktopCapture.chooseDesktopMedia(["screen","window","tab"],function (captureID){
            //check whether the user canceled the request or not
            if (captureID && captureID.length) {
                chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
                    setTimeout(function(){
                        chrome.tabs.sendMessage(tabs[0].id, {Perform : "CaptureSnap",captureID});//, function(response){
                        //     console.log(response)
                        // });
                        console.log("Msg Sent to capture snap")
                    }, 200)
                    
                });
            }
        })
         
    });
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