$(document).ready(function(){
    // alert("Inside content Script")
    chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
        // alert("Msg recieved from popup")
        if(request.Perform === "CaptureSnap" && request.captureID){
            var track, canvas
            navigator.mediaDevices.getUserMedia({
                video: {
                    mandatory:{
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: request.captureID
                    }
                }
            }).then(function (stream){
                // alert("Track recieved")
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
                // alert("Sending Image URL")
                chrome.runtime.sendMessage({perform : "download", imageID}, function(response){
                    console.log("Response recieved of sent URL")
                    if(response.success){
                        alert("Screen Captured Successfully!")
                    }
                    else{
                        alert("Could not save Screenshot")
                    }
                    canvas.remove()
                    sendResponse({success: true});
                //     setTimeout(function() {
                //         sendResponse({success: "Success"});
                //    }, 20);
                    
                })
            }).catch(function(error_){
                alert("Capture Failed :(")
                sendResponse({success: false, msg:error_})
            })
            return true;
        }
    });

});
