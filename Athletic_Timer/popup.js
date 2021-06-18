//Flags used to indicate certain tasks
var isPaused = false, resetAll = false, pro = false, flag = false, set;

//Notifications
var end_timer_notification = {
    type: 'basic',
    iconUrl: './image/icon32.png',
    title: 'Time Up !!',
    message: 'Looks like ur time is up !'
};
var brake_end_notification = {
    type: 'basic',
    iconUrl: './image/icon32.png',
    title: 'Break Ended !!',
    message: 'Hurry up, Get BAck on ur feet !'
};

//Alert function to fit window size
$("<style type='text/css'>#boxMX{display:none;background: #333;padding: 10px;border: 2px solid #ddd;float: left;font-size: 1.2em;position: fixed;top: 50%; left: 50%;z-index: 99999;box-shadow: 0px 0px 20px #999; -moz-box-shadow: 0px 0px 20px #999; -webkit-box-shadow: 0px 0px 20px #999; border-radius:6px 6px 6px 6px; -moz-border-radius: 6px; -webkit-border-radius: 6px; font:13px Arial, Helvetica, sans-serif; padding:6px 6px 4px;width:300px; color: white;}</style>").appendTo("head");
function alertMX(t) {
    $("body").append($("<div id='boxMX'><p class='msgMX'></p><p>CLOSE</p></div>"));
    $('.msgMX').text(t); var popMargTop = 100, popMargLeft = 100;
    $('#boxMX').css({ 'margin-top': -popMargTop, 'margin-left': -popMargLeft }).fadeIn(600);
    $("#boxMX").click(function () { $(this).remove(); });
};


//first Step
$(document).ready(function () {
    $('.normal').hide();
    $('.pro').hide();
    $('.display').hide();

    //when Standard mode selected
    $('#normal_').click(function () {
        $('.normal').show();
        $('.display').show();
        $('.pro').hide();
        set = 1;
    });
    //When Athletic mode is selected
    $('#athletic_').click(function () {
        $('.normal').show();
        $('.display').show();
        $('.pro').show();
        set = 2;
    });

    // When start button is pressed
    $('#start').click(function () {
        var tsecs = $('#seconds').val();
        var tmins = $('#minutes').val();
        var thrs = $('#hours').val();
        var treps = $('#repeat').val();
        var tbrakes = $('#brake').val();
        //Standard Mode
        if (set === 1) {

            var startInterval = setInterval(function () {

                if (!isPaused && !resetAll) {
                    // console.log(thrs + " : " + tmins + " : " + tsecs);

                    var secs = tsecs;
                    var mins = tmins;
                    var hrs = thrs;

                    var message = hrs.toString() + " : " + mins.toString() + " : " + secs.toString();

                    // console.log("before display");
                    $('#display_').text(message);
                    if (tsecs == 0 && tmins != 0) {
                        tsecs = 59;
                        tmins--;
                    }
                    if (tsecs == 0 && tmins == 0 && thrs != 0) {
                        tmins = 59;
                        tsecs = 59;
                        thrs--;
                    }
                    if (tsecs <= 0 && tmins == 0 && thrs == 0) {
                        $('#display_').text("Time's Up !!");
                        alertMX("Time Up !");

                        chrome.notifications.create('end_timer', end_timer_notification);
                        chrome.notifications.clear('end_timer');

                        clearInterval(startInterval);
                    }

                    tsecs--;
                }
                if (resetAll) {
                    $('#hours').text("00");
                    $('#minutes').text("00");
                    $('#seconds').text("00");
                    $('#display_').text(" ");
                    resetAll = false;
                    clearInterval(startInterval);
                }

            }, 1000);//interval end

        }//if end

        // Athletic Mode
        else if (set === 2) {

            var interval = setInterval(function () {

                if (!isPaused && !resetAll) {

                    console.log(treps + " : " + thrs + " : " + tmins + " : " + tsecs);
                    console.log("flag : " + flag);

                    if (!flag) {
                        console.log("in first if");
                        var secs = tsecs;
                        var mins = tmins;
                        var hrs = thrs;
                        var rep = treps;

                        var message = rep.toString() + " :-  " + hrs.toString() + " : " + mins.toString() + " : " + secs.toString();

                        // console.log("before display");
                        $('#display_').text(message);
                        if (tsecs == 0 && tmins != 0) {
                            tsecs = 59;
                            tmins--;
                        }
                        if (tsecs == 0 && tmins == 0 && thrs != 0) {
                            tmins = 59;
                            tsecs = 59;
                            thrs--;
                        }
                    }
                    if (tsecs <= 0 && tmins == 0 && thrs == 0 && treps <= 1) {
                        console.log("terminating if");
                        if (!flag) {
                            $('#display_').text(" ");
                            tbrakes = $('#brake').val();
                        }
                        console.log(tbrakes);
                        console.log(treps + " : " + thrs + " : " + tmins + " : " + tsecs);
                        flag = 1;
                        var brk = tbrakes;
                        message = brk.toString();
                        $('#display_').text(message);
                        if (tbrakes <= 1) {

                            $('#display_').text("Time's Up !!");
                            alertMX("Time Up !")
                            chrome.notifications.create('end_timer', end_timer_notification);
                            chrome.notifications.clear('end_timer');
                            flag=false;
                            clearInterval(interval);
                            
                        }
                        tbrakes--;
                        // clearInterval(interval);
                    }

                    if (tsecs <= 0 && tmins == 0 && thrs == 0 && treps > 1) {
                        console.log("nonterminating if");
                        if (!flag) {
                            $('#display_').text(" ");
                            tbrakes = $('#brake').val();
                        }
                        if (!flag && tbrakes == 0) {
                            treps--;
                            tsecs = $('#seconds').val();
                            tmins = $('#minutes').val();
                            thrs = $('#hours').val();
                            tsecs++;
                        }
                        else {

                            console.log(tbrakes);
                            flag = 1;
                            var brk = tbrakes;
                            message = brk.toString();
                            // console.log(message);
                            $('#display_').text(message);
                            if (tbrakes <= 1) {
                                flag = 0;
                                chrome.notifications.create('end_brake', brake_end_notification);
                                chrome.notifications.clear('end_brake');
                                tbrakes = $('#brake').val();
                                // clearInterval(breakInterval)
                            }
                            tbrakes--;
                            if (!flag) {
                                treps--;
                                tsecs = $('#seconds').val();
                                tmins = $('#minutes').val();
                                thrs = $('#hours').val();
                                tsecs++;
                            }
                        }
                    }
                    if (!flag) {
                        tsecs--;
                    }
                }
                if (resetAll) {
                    $('#hours').text("00");
                    $('#minutes').text("00");
                    $('#seconds').text("00");
                    $('#display_').text("");
                    resetAll = false;
                    clearInterval(interval);
                }

            }, 1000);//end of interval

        }//else end


    });//end of start click

    //Pause Button
    $('#pause').click(function () {
        isPaused = true;
    });

    //Resume Button
    $('#resume').click(function () {
        isPaused = false;
    });

    //Reset Button
    $('#reset').click(function () {
        resetAll = true;
    });

});

