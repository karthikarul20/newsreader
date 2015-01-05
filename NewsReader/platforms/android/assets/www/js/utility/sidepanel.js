 function setupSideBar(main,sub,pageId,onSwipeLeft,onSwipeRight,dyThreshold)
 {
    var panelMenu = $("#panelMenu");
    if(sub==='Food' && main==='Log')
    {
        $(".bars").parent().on("click",null,checkFoodLogSave);
    }
    if(main==='Dashboard')
    {
        panelMenu.before('<div style="border-bottom: #699622 solid 1px;height:40px;padding:5px 0 5px 0;background-color:#36a348;" onclick="closePanel();"><div style="padding-top:6px;padding-left: 16px;"><div style="float:left"><img src="'+app.imgFullPath +'tab_Dashboard_selected.png" style="width:25px;height:25px">  </div> <div style="float:left;padding-left:10px;padding-top: 5px" class="font-white font-bold">Dashboard </div></div></div>');
    }
    else
    {
        panelMenu.before('<div style="border-bottom: #699622 solid 1px;height:40px;padding:5px 0 5px 0" onclick="sideOpenPage(\'home.html\');"><div style="padding-top:6px;padding-left: 16px;"><div style="float:left"><img src="'+app.imgFullPath +'tab_Dashboard.png" style="width:25px;height:25px">  </div> <div style="float:left;padding-left:10px;padding-top: 5px" class="font-green font-bold">Dashboard </div></div></div>');
    }
    panelMenu.html(generateSideBar(main,sub));

    panelMenu.addClass('divOverflowScroll');
    //Notification in the sidebar is not visible due to the fixed Dashboard. Hence reducing the size to make it visible.
//    var height=panelMenu.height();
//    panelMenu.height(height-50);
    $("#mypanel").trigger("updatelayout");
    panelMenu.scrollTop(panelScrollTop);
    if (arguments.length>2)
    {
        return new SwipeOpenPanel(pageId,onSwipeLeft,onSwipeRight,true,dyThreshold);
    }
 }
 function checkFoodLogSave(){
        if(confirmLog.isModified === true)
        {
                dynConfirmPopup("Save Food Log", "Your Food Entry has been modified.<br>Do you want to save?",
                function() {//onOk
                    submitLog();
                    confirmLog.isModified = false;
                    openPanel();
                },
                function() {//onCancel
                    onFoodLogPageShow.curDayRecords=[];
                    onFoodLogPageShow.recordsRead = false;
                    openPanel();
                },
                function() {//onClose
                    
                });
            return false;
        }
    }

function generateSideBar(main, sub) {

    var expand = 1;

    var photo = window.localStorage.getItem("PHOTO");
    var insulin = window.localStorage.getItem("INSULIN");
     var tfeq = window.localStorage.getItem("TFEQ");
     var medical = window.localStorage.getItem("MEDICAL");
    var nickname = window.localStorage.getItem("NICKNAME");

    var completeness = 100;
    var missingProfile='';
    if (photo === null || photo === "" || photo === "null") {
        completeness -= 5;
        missingProfile +='Photo';
        photo = app.imgFullPath+"noImg.png";
    }

    if (photo.indexOf('data:') !== -1)
    {
        CropAndZoomin(photo, 360, 360, 0, null, Setyourimage);
        function Setyourimage(callerdata, finalImage) {
            if ($("#imgProfile").length > 0) {
                $("#imgProfile").attr("src", finalImage);
            }
        }
    }
    else {
        if ($("#imgProfile").length > 0) {
            $("#imgProfile").attr("src", photo);
        }
    }

    if (insulin === null || insulin === "" || insulin === "null") {
        missingProfile +=',Insulin Resistance Questionnaire';
        completeness -= 10;
    }
    
     if (tfeq=== null || tfeq === "" || tfeq === "null") {
         missingProfile +=',Eating Habits Questionnaire';
        completeness -= 10;
    }
    
     if (medical=== null || medical === "" || medical === "null") {
         missingProfile +=',Medical History Questionnaire';
        completeness -= 10;
    }
    var email_verified = window.localStorage.getItem('email_verified');
    if (parseInt(email_verified) !== 1)
    {
        missingProfile +=',Verify Email';
        completeness -= 5;
    }

    if ($("#lblCompleteMsg").length > 0) {
        if (completeness >= 100) {

            $("#lblCompleteMsg").html("Edit");
        } else {

            $("#lblCompleteMsg").html("Complete ");
        }
        $("#lblCompletePercentage").html(completeness + "%");
    }

    window.localStorage.setItem("missingProfile", missingProfile);
    var mood = window.localStorage.getItem("MOOD");
    mood = mood === null ? "Happy" : mood;
    if (mood === null) {
        window.localStorage.setItem("MOOD", "Happy");
    }


    //populating the rewards and buddy balance
    var rewardLevel = window.localStorage.getItem("rewardsLevel");
    var buddy = window.localStorage.getItem("BUDDY_BALANCE");

    $("#lblBuddyHome").html(buddy + ' pts');
    $("#imgHomeLevelHome").attr("src", app.imgFullPath + 'reward/level' + rewardLevel + '_lg.png');



    //change the mood in profile page
    var locationPath = app.imgFullPath;
    locationPath += "mood/";
    $("#lblHomeMoodDisplayProfile").html("I feel "+mood);
    $("#tdHomeMoodDisplayProfile").css("backgroundImage", "url(" + locationPath + "m" + mood + "_selected.png)");

    /*var dictMenu = new Array();
    dictMenu["Home"] = "home.html";
    dictMenu["Food"] = {"Menu": "menu/main.html", "Food Log": "menu/foodLogEntry.html", "My Records": "menu/foodRecords.html", "Food Tips": "menu/foodTips.html"};
    dictMenu["Activity"] = {"Activity Log": "activity/activityLogHome.html", "Sleep Log": "activity/sleepLogHome.html", "My Records": "activity/activityRecordsMain.html"};//, "Activity Plans": ""
    dictMenu["Rewards"] = {"Rewards Store": "reward/rewardStore.html", "My Wallet": "reward/myWallet.html"};
    dictMenu["Blood_Sugar_Monitor"] = "setting/bloodSugar.html";
    dictMenu["Kiosk_Locations"] = "more/kiosklocation.html";
    dictMenu["Invite_Friends"] = "";
    //dictMenu["In-app_Store"] = "";
    //dictMenu["More_Apps"] = "";*/
    
    var dictMenu = new Array();
    dictMenu["Food_Tips"] = "menu/foodTips.html";
    dictMenu["Set_Your_Goals"] = "setting/goal.html";
    //dictMenu["Log"] = {"Food": "menu/foodLogEntry.html","Activity": "activity/activityLogHome.html", "Sleep": "activity/sleepLogHome.html", "Blood Sugar": "setting/bloodSugar.html"};//, "Activity Plans": ""
    if(onPageShowHealthHistory.showLabResults===1)
    {
    dictMenu["Records"] = {"Food": "menu/foodRecords.html", "Activity & Sleep": "activity/activityRecordsMain.html","Blood Sugar":"bsugar/bsRecords.html", "Lab Records": "setting/labRecords.html"};//,"Blood Sugar":"bsugar/bsRecords.html"
    }
    else
    {
    dictMenu["Records"] = {"Food": "menu/foodRecords.html", "Activity & Sleep": "activity/activityRecordsMain.html","Blood Sugar":"bsugar/bsRecords.html","Health History":"setting/healthHistory.html"};//,"Blood Sugar":"bsugar/bsRecords.html"
    }
    dictMenu["Rewards"] = {"Rewards Store": "reward/rewardStore.html", "My Wallet": "reward/myWallet.html"};
    dictMenu["Data_Input"] = "setting/datainput.html";    
//    dictMenu["Blood_Sugar"] = "setting/bloodSugar.html";    
    dictMenu["Kiosk_Locations"] = "more/kiosklocation.html";
    dictMenu["Invite_Friends"] = "";
    dictMenu["Notifications"] = "setting/notification.html";


    var height =$('[data-role="page"]').height() + 'px';

    var content = '';
    content += '<ul data-role="listview" data-divider-theme="b" data-inset="true" style="height:' + height + ';margin-top: 0px;" id="ulMenu" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"> ';
    //border-bottom: #CECECE solid 1px -- after margin-top

    //generate profile
    content += '<li class="ui-li-static ui-body-inherit ui-first-child" style="border:0">';
    content += '<div style="width: 100%;height:20px;margin:5px 0 0 1px">';
    content += '<div style="float:left" class="font-green font-bold font-11">';
    content += ' Profile';
    content += ' </div>';
    content += '<div style="float:right;width:40px;text-align:center;height: 40px;" ';
    if (main === "Setting") {
        content += 'onclick="closePanel()"';
    } else {
        content += 'onclick="sideOpenPage(\'setting/settings.html\')"';
    }
    content += '><img src="' + app.imgFullPath + 'icon_settings.png" style="width:20px;height:20px;margin-top: 10px;">';
    content += '</div>';
    content += '</div>';
    content += '<div>';
    content += ' <div style="float:left;width: 42px;height:55px; background-color: white;margin-right: 10px;" >';
    content += '<div style="margin:8px 0 5px 1px" onclick="viewProfile(1)"><img src="' + photo + '" style="width:40px;height:40px;overflow:hidden;border-radius:40px; "></div>';
    content += ' </div>';
    content += ' <div style="float:left;margin-top: 18px" class="font-10">';
    content += '<span id ="lblCompletePercentage" style="color:';
    if (completeness >= 100) {
        content += '#699622';
    } else {
        content += '#F7801E';
    }
    content += '">' + completeness + '%' + '</span><span style="color:'
    if (completeness >= 100) {
        content += '#699622';
    } else {
        content += '#F7801E';
    }
    content += '"> complete</span><br>';
    content += '<span class="font-green">' + nickname + '</span>';
    content += ' </div>';
    content += ' </div>  ';
    content += '</li>';

    content += '<li class="ui-li-static ui-body-inherit" style="border-width: 0 0 0 0;">'
    content += '<div  style="height: 29px;padding-top: 10px" onclick="openMoodDialog();">';
    content += '<div style="float:left" class="font-12 font-green font-bold">';
    var birthday = window.localStorage.getItem("BIRTHDAY");
    var curDay = moment();
    var bDay = moment(birthday);

    var realAge = moment.duration(curDay - bDay).asYears() | 0;

    content += realAge + ' Years';
    content += '</div>';
    content += '<div style="float:right;width: 52%;" >';
    content += '<div id ="tdMoodDisplay"  style="background-image: url(\'' + app.imgFullPath + 'mood/m' + mood + '_selected.png\');margin-bottom: 3px;background-position: right;" class="home-medium-icon" >';
    content += ' <div  style="margin-left: 0px;" id="lblMoodDisplay"  class="home-medium-icon-font"><span id="lblMoodDisplaySpan" >';
    content += "I feel "+ mood;
    content +='</span><!--<img src="' + app.imgFullPath;
    content += 'icon_nestright.png';
    content += '" style="width:15px;height:15px;float:right;margin-top:4px;padding-left:3px;">-->';
    content += '</div>';
    content += '</div>';
    content += '</div>';
    content += '</div>';
    content += '</li>';

    content += '<li  style="background: #f0ffca;border-width: 0 0 0 0;" onclick="goPage(\'reward/gameplay.html\');" class="ui-li-static ui-body-inherit ui-last-child">';
    content += '<table><tr><td>';
    content += '<img src="' + app.imgFullPath + 'reward/level' + rewardLevel + '_lg.png" style="height:25px;width:25px;" id ="imgHomeLevel"/> ';
    content += '</td>';
    content += '<td class="font-green font-bold">Level</td>';  
    content += '<td style="width:50px;" >&nbsp;</td>';
    content += '<td id="lblBuddy" class="font-green font-bold">' + buddy + ' pts</td>';
    //content +='<td><img src="' + app.imgFullPath;
    //content += 'icon_nestright.png';
    //content += '" style="width:15px;height:15px;float:right;margin-top:4px"></td>';
    content += '</tr></table>';
    content += '</li>';

    content += ' <li  style="background: #f0ffca;border-width: 0 0 0 0;" onclick="goPage(\'reward/rewardStore.html\')" class="ui-li-static ui-body-inherit">';
    content += '<table><tr><td>';
    content += '<img src="' + app.imgFullPath + 'tab_Savings.png" style="height:25px;width:25px;"/></td>';
    content += '<td class="font-green font-bold">Savings</td>';
    content += '<td style="width:31px;" >&nbsp;</td>';
    var coupon_saving = window.localStorage.getItem("coupon_saving");
    $("#rewardSavingHome").html('Savings&nbsp;$<b>'+coupon_saving+"</b>");
    content += '<td class="font-green  font-bold" >$ '+Math.round(coupon_saving).toFixed(2)+'</td>';
//    content += '<td class="font-green  font-bold" > $'+coupon_saving.toFixed(2)+'</td>';
//    content += ' <td align="right" style="padding-top:8px"><img src="' + app.imgFullPath;
//    content += 'icon_nestright.png';
//    content += '" style="width:15px;height:15px"></td>';
    content += '</tr></table></li>';


    for (var key in dictMenu) {
        content += '<li class="ui-field-contain ui-li-static ui-body-inherit" ';
        if (key === "Invite_Friends") {
            content += 'onclick="inviteFriends()" style="border-width:0 0 0 0"  ';
        } else if (key !== main) {
            if (dictMenu[key].length === undefined) {
//                if (expand === 1) {
//                    content += 'onclick="closeSubNav(\'' + key + '\')" ';
//                } else {
//                    content += 'onclick="openSubNav(\'' + key + '\')" ';
//                }
            } else {
                content += 'onclick="sideOpenPage(\'' + dictMenu[key] + '\');" ';
            }
        } else if (sub !== null) { 
           // content += 'onclick="closeSubNav(\'' + key + '\')" ';
        } else {
            content += 'onclick="closePanel()" ';
        }
        if (sub === null) {
            if (key === main) {
                content += 'style="height:40px;background-color:#36a348;"  ';
            }
        }
        if(key==='Food' || key==='Activity' || key==='Records' || key==='Rewards')
        {
            content += 'style="border-bottom: #699622 solid 1px;border-width:0 0 0 0"  '; //;border-top: #699622 solid 1px;
        }
        if(key==="Dashboard"){
            content += 'style="border-bottom: #699622 solid 1px;height:40px" id="mainNav' + key + '">';
        }else{
            content += 'style="border-width:0 0 0 0" id="mainNav' + key + '">';
        }

        content += '<div style="padding-top:6px;">';
        content += '<div style="float:left">';
        content += '<img src="' + app.imgFullPath + 'tab_' + key;
        var imgContent = '.png" style="width:25px;height:25px"/> ';
        if (sub === null) {
            if (key === main) {
                imgContent = '_selected.png" style="width:25px;height:25px"/> ';
            }
        }
        content += imgContent;
        content += ' </div>';
        content += ' <div style="float:left;padding-left:10px;padding-top: 5px" class="';
//hardcode for testing purpose
// if(key==='Food' || key==='Activity' || key==='Records' || key==='Rewards')
//        {
//            content += 'font-grey ';
//        }else{
        if (key === main && sub === null) {
            content += 'font-white ';
        } else {
            content += 'font-green ';
        }
//    }

        content += 'font-bold">';
        content += key.replace(/_/g, " ");
        
        content += ' </div>';
        
//        if (dictMenu[key].length === undefined) {
//            content += '<div style="float:right;padding-top: 5px" >';
//            content += '<img src="' + app.imgFullPath;
//            if (sub !== null && key === main || expand === 1) {
//                content += 'icon_navdown';
//            } else {
//                content += 'icon_navright';
//            }
//            content += '.png" style="width:20px;height:20px" id="imgNav' + key + '"/>';
//            content += '</div>';
//        }
        content += '</div>';
/*
         if(key!=='Log' && key!=='Records' && key!=='Rewards')
        {
            /*content +='<img src="' + app.imgFullPath;
            if (key === main) {
                content += 'icon_nestselect.png';
            } else {
                //content += 'icon_nestright.png';
            }
            content += '" style="width:15px;height:15px;float:right;margin-top:9px">';
        }
*/        
        content += '</li>';

        if (dictMenu[key].length === undefined) {

            content += ' <li style="padding:0px;';
            if (sub !== null && key === main || expand === 1) {
                content += 'display:block"';
            } else {
                content += 'display:none"';
            }
            content += ' class="ui-field-contain ui-li-static ui-body-inherit" id="subNav' + key + '">';
            content += ' <table style="width:100%" cellpadding="0" cellspacing="0">';

            var obj = dictMenu[key];
            for (var k in obj) {
                content += '<tr ';

                if (k === sub && key === main) {
                    content += 'onclick="closePanel();" ';
                    content += 'style="background-color:#36a348;"';
                } else {
                    content += 'onclick="sideOpenPage(\'' + obj[k] + '\');" ';

                }
                content += '> ';
                content += '<td style="width:50px;height:33px" >&nbsp;</td>';
                content += '<td align="left" class="'
                if (k === sub && key === main) {
                    content += "font-white";
                } else {
                    content += 'font-green';
                }
                content += '" >' + k + '</td>';
                content += ' <td align="right" style="padding-top:8px"><img src="' + app.imgFullPath;
                if (k === sub && key === main) {
                    content += 'icon_nestselect.png';
                } else {
                    content += 'icon_nestright.png';
                }
                content += '" style="width:15px;height:15px"></td>';
                content += '<td style="width:15px;" >&nbsp;</td>';
                content += ' </tr>';

            }

            content += '</table>';
            content += '</li>';
        }
        
    }

    content += '</ul>';

    var moodContent = '';
    moodContent += '<div id="dialogMood" class="dialogContent">';
    moodContent += '<div  class="dialogHeader" >';
    moodContent += ' <div>';
    moodContent += '<div class="dhLeft" onclick= "closeMoodDialog()"><img  src="' + app.imgFullPath + 'gr_close.png" style="width:20px; height:20px"/></div>';
    moodContent += '<div class="dhRight"><img src="' + app.imgFullPath + 'gr_greenbuddy.png" style="width:30px; height:40px" /></div>';
    moodContent += '<div class="dhMid">Today\'s Mood</div>';
    moodContent += '</div>';
    moodContent += '</div>';
    moodContent += ' <div  class="dialogBody" >';
    moodContent += '<div  class="dbContent">';
    moodContent += '<table style="width:100%">';
    moodContent += '<tr>';
    moodContent += '<td><img id= "moodSad" src="' + app.imgFullPath + 'mood/mMoody.png" style="width:60px; height:50px" onclick="changeMood(\'Moody\')"/></td>';
    moodContent += ' <td><img id ="moodHappy" src="' + app.imgFullPath + 'mood/mHappy.png" style="width:60px; height:50px" onclick="changeMood(\'Happy\');"/></td>';
    moodContent += '<td><img id ="moodHealthy" src ="' + app.imgFullPath + 'mood/mHealthy.png" style="width:60px; height:50px" onclick="changeMood(\'Healthy\')"/></td>';
    moodContent += '<td><img id ="moodWealthy" src="' + app.imgFullPath + 'mood/mWealthy.png" style="width:60px; height:50px" onclick="changeMood(\'Wealthy\')"/></td>';
    moodContent += ' </tr>';
    moodContent += '</table>';
    moodContent += '</div>';
    moodContent += '<div class="dbButton center-wrapper">';
    moodContent += '<div >';
    moodContent += '<div>';
    moodContent += '<a class="ui-btn" style="background-color: #f2f2f2"  href="#" onclick= "saveMood();"> OK</a>';
    moodContent += '</div>';
    moodContent += '<div style="margin-top:5px">';
    moodContent += '<a class="ui-btn" style="background-color: #f2f2f2"  href="#" onclick="closeMoodDialog()">';
    moodContent += '<span class="font-red">Cancel</span>';
    moodContent += '</a></div></div></div></div></div>';

    moodContent += '   <div id="fadeMood"  class="dialogBackground" ></div>';
   

    $("#panelMood").html(moodContent);
    
    
    var earnBuddyContent ='';
    earnBuddyContent += ' <div id="dialogEarnBuddy" class="dialogContent">';
    earnBuddyContent += ' <div  class="dialogHeader" ><div>';
    earnBuddyContent += '<div class="dhLeft" onclick= "closeEarnDialog()"><img  src="' + app.imgFullPath + 'gr_close.png" style="width:20px; height:20px" /></div>';
    earnBuddyContent += ' <div class="dhRight"><img src="' + app.imgFullPath + 'gr_greenbuddy.png"  style="width:30px; height:40px" /></div>';
    earnBuddyContent += '<div class="dhMid">Share with Friends</div> </div></div>';
    earnBuddyContent += '<div  class="dialogBody" >';
    earnBuddyContent += '<div  class="dbContent center-wrapper" style="font-size: 14pt">';
    earnBuddyContent += 'You earned <span class="font-green font-bold">10 buddies</span><br></div>';
    earnBuddyContent += '<div class="dbButton center-wrapper">';
    earnBuddyContent += ' <div ><div>';
    earnBuddyContent += ' <a class="ui-btn" style="background-color: #f2f2f2"  href="#" onclick= "closeEarnDialog()">Grab</a>';
    earnBuddyContent += '</div></div></div></div></div>';
    earnBuddyContent += '<div id="fadeEarnBuddy"  class="dialogBackground" ></div>'
    
    $("#panelEarnBuddy").html( earnBuddyContent );

    return content;
}

function scrollPanel() {
    $('.inside').css({
        'height': ($(document).height()) + 'px'
    });

    $(window).resize(function() {
        $('.inside').css({
            'height': ($(document).height()) + 'px'
        });
    });
}

function sideOpenPage(url) {
    panelScrollTop=$("#panelMenu").scrollTop();
     
    closePanel();
    $.mobile.loading("show");
    var path = app.rootFullPath + "page/" + url;

    //$.mobile.changePage(path);
    $(":mobile-pagecontainer").pagecontainer("change", path);

}

function openSubNav(key) {


    $("#imgNav" + key).attr("src", app.imgFullPath + "icon_navdown.png");
    $("#subNav" + key).css("display", "block");
    $("#mainNav" + key).attr("onclick", "closeSubNav('" + key + "')");
}

function closeSubNav(key) {
    $("#imgNav" + key).attr("src", app.imgFullPath + "icon_navright.png");
    $("#subNav" + key).css("display", "none");
    $("#mainNav" + key).attr("onclick", "openSubNav('" + key + "')");
}


function displaySide(display) { //0 -> hide // 1: display // 2:toggle
    if (!app.BLACK_SIDE_PANEL)
        return;
    if ($("#fadeHideSide").length > 0) {
        if (display === 'toggle')
        {
            var checkFade;
            checkFade = $("#fadeHideSide").css("display");
            DBG && console.log("displaySide(toggle) -> current display = " + checkFade);
            display = (checkFade === 'none') ? 'block' : 'none';
        }
        document.getElementById('fadeHideSide').style.display = display;
        DBG && console.log("displaySide() -> set fadeHideSide.display to " + display);
    }
    else
        DBG && console.log("sidepanel: missing fadeHideSide element");
}
function isPanelOpened()
{
    //if ($(".ui-panel").hasClass("ui-panel-open") == true) {
    if ($("#mypanel").hasClass("ui-panel-open")) {
        //console.log("sidePanel OPENED");
        return(true);
    } else {        
        //console.log("sidePanel CLOSED");
        return(false);
    }
}

function closePanel() {
    $("#mypanel").panel("close");
    displaySide('none');
}
function openPanel() {
    $("#mypanel").panel("open");
    displaySide('block');
}
function togglePanel() {
    
    if(app.getPageFileName()==='foodLogEntry.html')
    {
        checkFoodLogSave();
    }
    else
    {
        $("#mypanel").panel("toggle");
        displaySide('toggle'); 
    }

}

function SwipeOpenPanel(container,onSwipeLeft,onSwipeRight,bDetectLeftBorder,dyThreshold)
{
    this.TouchStart = {};
    if (!dyThreshold)
        dyThreshold = 10;
    this.bStartNearLeftBorder=false;
    //console.log("SOP init[" + container + "]" + ( onSwipeLeft ? " onSwipeLeft" : "") + (onSwipeRight ? " onSwipeRight" : "") + (bDetectLeftBorder? " OpenPanel" : ""));
    if (!onSwipeLeft && !onSwipeRight)
    {
        
        this.bOpenPanelOnly = true;
//        if (!bDetectLeftBorder)
//            debuglog("SOP init[" + container + "] CAUTION nothing to do");     
    }
    else
        this.bOpenPanelOnly = false;
    this.container = container;
        
    $(container).on("touchstart MSPointerDown", this, onStart);
    $(container).on("touchmove MSPointerMove", this, onMove);
    $(container).on("touchend MSPointerUp MSPointerOut", this, onEnd);
    $(container).on("touchcancel MSPointerCancel", this, onCancel);
    $(container).on("touchleave MSPointerLeave", this, onLeave);

    function onStart(e)
    {
        var data=e.data;
        if (!window.navigator.msPointerEnabled && (!("changedTouches" in e.originalEvent) || e.originalEvent.changedTouches.length > 2))
        {
            //console.log("onStart return / nbTouches" + e.originalEvent.changedTouches.length);
            return;        
        }
        var firstTouche;
        if (window.navigator.msPointerEnabled) {
            firstTouche = e.originalEvent;
        }
        else
            firstTouche = e.originalEvent.changedTouches[0];

        data.TouchStart = {x: firstTouche.pageX, y: firstTouche.pageY, timeStamp: e.timeStamp,scrollTop : $(window).scrollTop()};
        data.TouchStart.bPanelOpened=isPanelOpened();
        data.bStartNearSidePanelRightBorder=false;
        if (bDetectLeftBorder && data.TouchStart.x<50)
        {
            data.bStartNearLeftBorder=true;
            //e.preventDefault(); //We don't need to prevent default here so click/vclick events will be triggered normally by the system (we don't need to synthesize them ourselelf
        }
        else
        {
            data.bStartNearLeftBorder=false;
            if (data.TouchStart.bPanelOpened && data.TouchStart.x > 200 && data.TouchStart.x<240)
                data.bStartNearSidePanelRightBorder=true;
        }
        //console.log("\nSOP[" + data.container + "] touchstart:" + data.TouchStart.x + "," + data.TouchStart.y + "\nNearLeftBorder=" + data.bStartNearLeftBorder);
    }
    function onMove(e)
    {
        var data=e.data;
        if (!window.navigator.msPointerEnabled && (!("changedTouches" in e.originalEvent) || e.originalEvent.changedTouches.length > 2))
        {
            //console.log("onMove return / nbTouches" + e.originalEvent.changedTouches.length);
            return;
        }
        var firstTouche;
        if (window.navigator.msPointerEnabled) {
            firstTouche = e.originalEvent;
        }
        else
            firstTouche = e.originalEvent.changedTouches[0];

        var dx = firstTouche.pageX - data.TouchStart.x;
        var dy = firstTouche.pageY - data.TouchStart.y;
        
        //In case we don't have swipe handler,  we have to handle move stratNearLeftBorder if we can have an Open or Close panel case.
        // (startNearLeftBorder for opening or start of swipe left dx <0 for closing)
        var bhasToHandleMove;
        if (data.TouchStart.bPanelOpened)
        {//SidePanel is open we must not try detect swipes only close panel swipe left
            bhasToHandleMove = data.bStartNearSidePanelRightBorder && dx < -4;
        }
        else
        {//SidePanel is closed if no swipe handler then we only try detect swipe open else we have to detect all kind of swipe
            bhasToHandleMove = data.bOpenPanelOnly ? ( data.bStartNearLeftBorder && dx > 4)  : true;
        }
        if (bhasToHandleMove && (data.TouchStart.preventDefault || (!data.TouchStart.preventDefault && ((Math.abs(dy) < dyThreshold) && (Math.abs(dx) > 4)) )))
        {
            //If the first move in y is < 5 then we handle the touch events (until the end)
            //this is required from Android 4.4 not to fire a touchcancel (systematic after first onMove event if no preventDefault call
            //so we have only one move to take the decision (Swipe or scroll)... a bit short in case of slow move....            
                e.preventDefault();
                if (!data.TouchStart.preventDefault) //Just log first move
                {
                    //console.log(" SOP 1st move - handling " + firstTouche.pageX + "," + firstTouche.pageY + " dx=" + dx + " dy=" + dy);
                    data.TouchStart.preventDefault = true;//then set to true => preventDefault will be called on all subsequent moves (until touchend but not logged
                }
        }
        else
        {
            //we didn't prevent default, on Android 4.4 we won't receive anymore event and scrolling will be handled nicely by the os
            //on previous Android version we continue to receive touchmove and touchend event in // with default actions
            //console.log("lets default move event");
            if (!data.TouchStart.firstMove) //Pure log code can disable whole block
            {
                data.TouchStart.firstMove = true; //boolean property just created to display a single Move event on Android <4.4
                //console.log(" SOP 1st move - monitoring " + firstTouche.pageX + "," + firstTouche.pageY + " dx=" + dx + " dy=" + dy);
            }
        }
        
    }
    function onEnd(e)
    {
        var data=e.data;
        if (!("changedTouches" in e.originalEvent)  && !window.navigator.msPointerEnabled)
            return;

        var firstTouche;
        if (window.navigator.msPointerEnabled) {
            firstTouche = e.originalEvent;
        }
        else
            firstTouche = e.originalEvent.changedTouches[0];

        data.TouchEnd = {x: firstTouche.pageX, y: firstTouche.pageY, timeStamp: e.timeStamp,scrollTop : $(window).scrollTop()};
        var dx = data.TouchEnd.x - data.TouchStart.x;
        var dy = data.TouchEnd.y - data.TouchStart.y - (data.TouchEnd.scrollTop - data.TouchStart.scrollTop) ;
        var d = Math.sqrt(dx * dx + dy * dy);
        var t = data.TouchEnd.timeStamp - data.TouchStart.timeStamp;
        var vx = dx / t;
        var vy = dy / t;
        var v = d / t;
        //console.log("\nSOP[" + data.container + "] touchend:" + data.TouchEnd.x + "," + data.TouchEnd.y + " dx,y=" + dx + ","  + dy + " vx,y=" + vx + "," + vy + "\nscrollTop:(s,e):" + data.TouchStart.scrollTop + "," + data.TouchEnd.scrollTop);

        if ( (d > 15 && Math.abs(dx) >= 30) && (Math.abs(dy) < 60)) //10 pixel => it's at least a touch move.  if [dy] >40 this is not a horiz. swipe ...
        { //see for ex. default jquerymobile threshold http://api.jquerymobile.com/swipe/ and our values in  food.js
            if (vx > 0.2) //swipe right
            {
                if (data.bStartNearLeftBorder)
                {
                    e.preventDefault();
                    if(this.id==='foodLog')
                    {
                        if(confirmLog.isModified === true)
                            checkFoodLogSave();
                        else
                            openPanel();
                    }
                    else
                    {
                        openPanel();
                    }
                    //console.log("openPanel()");
                }
                else if (onSwipeRight)
                {
                    //console.log("onSwipeRight()");
                    e.preventDefault();
                    onSwipeRight();
                }
            }
            else if (vx < -0.2) //swipe left
            {                
                if (isPanelOpened())
                {
                    //console.log("swipeLeft -> closePanel()");
                    e.preventDefault();
                    closePanel();
                }
                else if (onSwipeLeft)          
                {                    
                    //console.log("onSwipeLeft()");
                    e.preventDefault();
                    onSwipeLeft();
                }
            }
        }
        else //else this is a click so do not prevent the defaultAction and switch back to default speed.
        {
            //console.log("click should occur");
        }
    }
    function onCancel(e)
    {
        if (!("changedTouches" in e.originalEvent) && !window.navigator.msPointerEnabled)
            return;
        //e.preventDefault();
        var firstTouche;
        if (window.navigator.msPointerEnabled) {
            firstTouche = e.originalEvent;
        }
        else
            firstTouche = e.originalEvent.changedTouches[0];

        //console.log("\ntouchcancel:", firstTouche.pageX, firstTouche.pageY);
    }
    function onLeave(e)
    {
        if (!("changedTouches" in e.originalEvent) && !window.navigator.msPointerEnabled)
            return;
        e.preventDefault();
        var firstTouche;
        if (window.navigator.msPointerEnabled) {
            firstTouche = e.originalEvent;
        }
        else
            firstTouche = e.originalEvent.changedTouches[0];

        //console.log("\nSOP touchleave:", firstTouche.pageX + ',' + firstTouche.pageY);
    }
}

function redirectToHome(){
    goPage("home.html");
}
