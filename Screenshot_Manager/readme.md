This Chrome extension is part of a Task given to me by SDS club.

Done till Now:
1)Added background.js so when user presses the extension, it pops a window.
2)The window is a HTML file "window.html" which links window.js with it so when the button "click" is pressed we do.....
3)When the button is pressed it promts a window which asks us to select a tab , window or the screem(chrome api desktopCapture used for this).
4)The api returns the selected option in the form of byte (captureID) and sends it to content script using sendMessage.

What is supposed to happen
5)Content script is suppose to form an image and send the imageURL to backgroundscript (again using sendMessage).
6)The Backgroundscript is supposed to save the image locally and send response back to content script.
7)If all this is successfull, the content script is supposed to send response back to window.js(as it had first sent msg (captureID)).

What actually happens:
It works completely fine till step 4), but the contentscript is unable to contact backgroundscript and instead send response to window.js and prompts error "Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist."

I have tried every thing that I could but still unable to find a fix, please help me!
