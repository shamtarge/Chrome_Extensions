var timeinterval;
$(document).ready(function () {

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.Perform == "Enabling") {
            
            console.log("ENABLED");
            timeinterval = setInterval(function(){

                var ele = document.querySelector('.video-stream');
                if(ele){
                                           
                    var skipi = document.querySelector('.ytp-ad-skip-button');
                    if(skipi){
                        console.log("Skip Available");
                        skipi.click();
                        console.log("Advertisement skipped");
                    }
                    else{
                        console.log("Video Playing :) !")
                    }

                }
                else{
                    console.log("Video not streaming yet");
                }
            },1000);
            
        }
        if (request.Perform == "Disabling") {
            console.log("***********");
            clearInterval(timeinterval);
            // console.log("timeInterval is cleared")
            console.log("EXTENSION DISABLED");
        }
        sendResponse(JSON.stringify("request"));
        
    });

});