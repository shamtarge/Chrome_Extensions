$(document).ready(function (){

    var enab = document.getElementById('enable_');
    var disbl = document.getElementById('disable_');
    enab.addEventListener("click", function(){
        chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {Perform : "Enabling"}, function(response) {
                console.log(JSON.stringify(response));
            });
        }); 
    });
    disbl.addEventListener("click", function(){
        chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {Perform : "Disabling"}, function(response) {
                console.log(response);
            });
        });
    });
});
