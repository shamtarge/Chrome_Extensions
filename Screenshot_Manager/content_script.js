
console.log("Inside content Script")
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    console.log("Msg recieved from popup")
    // && request.captureID
    if(request.Perform === "CaptureSnap"){
        var track, canvas
        console.log("Befor Navigator")
        navigator.mediaDevices.getDisplayMedia({
            // video: {
            //     mandatory:{
            //         chromeMediaSource: 'desktop',
            //         chromeMediaSourceId: request.captureID
            //     }
            // }
            video : true
        }).then(function (stream){
            console.log("Track recieved")
            track = stream.getVideoTracks()[0]
            var image_ = new ImageCapture(track)
            return image_.grabFrame()
        }).then(function (bitImage){
            console.log("BitImage recieved")
            track.stop()
            canvas = document.createElement('canvas');
            canvas.width = bitImage.width;
            canvas.height = bitImage.height;
            var dimen = canvas.getContext('2d');
            dimen.drawImage(bitImage,0,0,bitImage.width,bitImage.height);
            return canvas.toDataURL();
        }).then(function(imageID){
            // console.log("Inside then block :",imageID)
            // console.log("Sending Image URL")
            chrome.runtime.sendMessage({perform : "download", imageID}, function(response){
                console.log("Response recieved of sent URL")
                if(response.success){
                    console.log("Screen Captured Successfully!")
                }
                else{
                    console.log("Could not save Screenshot")
                }
                canvas.remove()
                console.log("Before Send")
                sendResponse({Status : "Successfull!!"});
                return true;
            //     setTimeout(function() {
            //         sendResponse({success: "Success"});
            //    }, 20);
                
            })
        }).catch(function(error_){
            console.log("Capture Failed :("+error_)
            sendResponse({Status: "Failed", msg:error_});
        })
        // return true;
        // console.log("Before send response")
        // sendResponse({Status : "Successfull!!"});
        console.log("before else line 54");
    }
    else{
        console.log("Not the correct request !!");
    }
    
});
console.log("Outside onmsg")
