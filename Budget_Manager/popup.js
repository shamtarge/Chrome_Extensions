$(function(){
    //api to chgrome storage
    chrome.storage.sync.get(['total','limit'], function(budget){
        $('#total').text(budget.total); //set in id total
        $('#limit').text(budget.limit); // id limit
    })
    // console.log("phase1");
    //if spend(button) is clicked
    $('#spentAmount').click( function(){
        // console.log("phase2");
        chrome.storage.sync.get(['total','limit'], function(budget){
            var newt=0;
            //if earlier value present add it
            if(budget.total){
                newt += parseInt(budget.total);
            }
            var amount = $('#amount').val();
            //add entered amount
            if(amount){
                newt += parseInt(amount);
            }
            //value is set in storage
            chrome.storage.sync.set({'total' : newt}, function(){
                //if amount is non-zero n newtotal exceeds limit, send notification
                if(amount && newt>= budget.limit){
                    var notif={
                        type: 'basic',
                        iconUrl : 'image/icon48.png',
                        title: 'Limit reached!',
                        message : 'Uh oh! Looks like uh have reached ur limit!'
                    };
                    chrome.notifications.create('limitNotif', notif);
                    chrome.notifications.clear('limitNotif');
                }
            });
            //display total in front of total
            $('#total').text(newt);
            //have nothing in input box
            $('#amount').val(' ');
        })
        
    })
})