var menuitem={
    "id": "Poket_Wiki",
    "title": "Poket Wiki",
    "contexts" : ["selection"]
};
chrome.contextMenus.create(menuitem);

// function to append selected text into url
function fixedEncodeUri(str){
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId === "Poket_Wiki" && clickData.selectionText){
        var wikiurl = "https://en.wikipedia.org/wiki/" + fixedEncodeUri(clickData.selectionText);
        var createData = {
            "url" : wikiurl,
            "type" : "popup",
            "top" : 5,
            "left" : 5,
            "width" : parseInt(screen.availWidth/2),
            "height" : parseInt(screen.availHeight/2)
        };
        chrome.windows.create(createData, function(){});
    };
});