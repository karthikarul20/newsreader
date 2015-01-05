

//Dialog
function openDialog(name, bg, type) {
    closeAllDialog();

    $("#" + name).show();
    $("#" + bg).show();

    if (type !== undefined) {
        if ($("#nID").length > 0) {//for notification
            $("#nID").val(type);
            var notificationStorage;
            var nArray;
            if(saveNotification.readFromLS){
                notificationStorage = window.localStorage.getItem("notificationStorage");
                nArray = JSON.parse(notificationStorage);
            }else{
                nArray = saveNotification.tempStorage;
            }
            
            
            
            var time = nArray[type-1].TIME;
            $("#txtTime").val(time);

            if (type >= 1 && type <= 2) {
                $("#selectAllDate").hide();

            } else {
                $("#selectAllDate").show();

                var data = nArray[type-1].DAYS;
                var dateRange = data.split(" ");

                for (var i = 0; i < dateRange.length; i++) {
                    if (dateRange[i] === "1") {
                        setNotificationDay(i + 1);
                    }
                }
            }


        }
    }
}

function openRedeemDialog(name, bg, id) {
    var obj = JSON.parse(window.localStorage.getItem("wallet"));
    var coupon = obj[parseInt(id)];
    
    $("#txtMCode").on('focusin', function() {
        enableRedeemButton(id);
    });
    $("#lblCpName").html(coupon.COUPON_NAME);
    $("#imgRedeem").attr("src", ip + "../" + coupon.fileURL);
    $("#lblCouponCode").html(coupon.COUPON_CODE + "-" + coupon.COUPON_SERIAL);

    $("#dialogRedeemAllRewards").css("top",($(window).scrollTop()+40)+"px");
    $("#dialogRedeem").css("top",($(window).scrollTop()+40)+"px");
    $("#btnDialogRedeem").off('vclick');
    openDialog(name, bg);
}


function enableRedeemButton(id) {
    $("#btnDialogRedeem").on('vclick', function() {
        couponRedeem(id);
    });
}

function closeAllDialog() {
    $("div[type|='popup']").hide();
    $("div[type|='bg']").hide();
}

function closeDialog(name, bg) {
    $("#" + name).hide();
    $("#" + bg).hide();
    if (name === "dialogBoughtPPLX") //If popup was displayed from OrderReview page then go to my Wallet after confirmation
        goPage("reward/myWallet.html"); //$.mobile.back();    
}

function dialogHeader(title, name, bg) {
    var content = '';
    content += '    <div  class="dialogHeader" >';
    content += '        <div>';
    content += '            <div class="dhLeft" onclick= "closeDialog(\'' + name + '\', \'' + bg + '\');"><img  src="../../img/gr_close.png" style="width:20px; height:20px" /></div>';
    content += '            <div class="dhRight"><img src="../../img/gr_greenbuddy.png" style="width:30px; height:40px" /></div>';
    content += '            <div class="dhMid">' + title + '</div>';
    content += '        </div>';
    content += '    </div>';
    return content;
}

function dialogBg(bg) {
    return   '<div id="' + bg + '"  class="dialogBackground" type="bg"></div>';
}

function generateBoughtDialog(name, bg) {
    var content = '';

    content += '<div id="' + name + '" class="dialogContent" type="popup">';
    content += dialogHeader("Bought Deal!", name, bg);

    content += '    <div  class="dialogBody" >';
    content += '        <div  class="dbContent">';
    content += '            <span id ="lblPopCpName" class="font-green font-bold"></span>&nbsp; has been added to your wallet';
    content += '        </div>';
    content += '        <div class="dbButton center-wrapper">';
    content += '            <div>';
    content += '                <a class="ui-btn" style="background-color: #f2f2f2"  href="#" onclick= "closeDialog(\'' + name + '\', \'' + bg + '\');"> OK</a>';
    content += '            </div>';
    content += '         </div>';
    content += '    </div>';
    content += '</div>';
    content += dialogBg(bg);

    return content;
}

function generateConfirmBuyDialog(name, bg) {
    var content = '';

    content += '<div id="' + name + '" class="dialogContent" type="popup">';
    content += dialogHeader("Buy Deal", name, bg);

    content += '    <div  class="dialogBody" >';
    content += '        <div  class="dbContent">';
    content += '            <span id ="lblPopCpBuddy" class="font-green font-bold"></span>&nbsp;buddies will be removed from your wallet. Do you want to checkout?';
    content += '        </div>';
    content += '        <div class="dbButton center-wrapper">';
    content += '            <div id="btnCpBuy">';
    content += '                <a class="ui-btn" style="background-color: #f2f2f2"  href="#" >Checkout</a>';
    content += '            </div>';
    content += '            <div style="margin-top:5px">';
    content += '                <a class="ui-btn" style="background-color: #f2f2f2"  href="#" onclick= "closeDialog(\'' + name + '\', \'' + bg + '\');">';
    content += '                    <span class="font-orange">Cancel</span>';
    content += '                </a>';
    content += '            </div> ';
    content += '         </div>';
    content += '    </div>';
    content += '</div>';
    content += dialogBg(bg);

    return content;
}



function generateBoughtReviewDialog(name, bg) {
    var content = '';

    content += '<div id="' + name + '" class="dialogContent" type="popup">';
    content += dialogHeader("Bought Deal!", name, bg);

    content += '    <div  class="dialogBody" >';
    content += '        <div  class="dbContent">';
    content += '            <span id ="lblPopCpNameReview" class="font-green font-bold"></span>&nbsp; has been added to your wallet';
    content += '        </div>';
    content += '        <div class="dbButton center-wrapper">';
    content += '            <div>';
    content += '                <a class="ui-btn" style="background-color: #f2f2f2"  href="#" onclick= "closeDialog(\'' + name + '\', \'' + bg + '\');"> OK</a>';
    content += '            </div>';
    content += '         </div>';
    content += '    </div>';
    content += '</div>';
    content += dialogBg(bg);

    return content;
}

function generateConfirmBuyReviewDialog(name, bg) {
    var content = '';

    content += '<div id="' + name + '" class="dialogContent" type="popup">';
    content += dialogHeader("Buy Deal", name, bg);

    content += '    <div  class="dialogBody" >';
    content += '        <div  class="dbContent">';
    content += '            <span id ="lblPopCpBuddyReview" class="font-green font-bold"></span>&nbsp;buddies will be removed from your wallet. Do you want to checkout?';
    content += '        </div>';
    content += '        <div class="dbButton center-wrapper">';
    content += '            <div id="btnCpBuyReview">';
    content += '                <a class="ui-btn" style="background-color: #f2f2f2"  href="#" >Checkout</a>';
    content += '            </div>';
    content += '            <div style="margin-top:5px">';
    content += '                <a class="ui-btn" style="background-color: #f2f2f2"  href="#" onclick= "closeDialog(\'' + name + '\', \'' + bg + '\');">';
    content += '                    <span class="font-orange">Cancel</span>';
    content += '                </a>';
    content += '            </div> ';
    content += '         </div>';
    content += '    </div>';
    content += '</div>';
    content += dialogBg(bg);

    return content;
}




function generateActualConfirmBuyDialog(name, bg) {
    var content = '';

    content += '<div id="' + name + '" class="dialogContent" type="popup">';
    content += dialogHeader("Buy Deal", name, bg);

    content += '    <div  class="dialogBody" >';
    content += '        <div  class="dbContent">';
    content += '            <span id ="lblPopCpBuddyCoup" class="font-green font-bold"></span>&nbsp;buddies will be removed from your wallet. Do you want to checkout?';
    content += '        </div>';
    content += '        <div class="dbButton center-wrapper">';
    content += '            <div id="btnCpBuyCoup">';
    content += '                <a class="ui-btn" style="background-color: #f2f2f2"  href="#" >Checkout</a>';
    content += '            </div>';
    content += '            <div style="margin-top:5px">';
    content += '                <a class="ui-btn" style="background-color: #f2f2f2"  href="#" onclick= "closeDialog(\'' + name + '\', \'' + bg + '\');">';
    content += '                    <span class="font-orange">Cancel</span>';
    content += '                </a>';
    content += '            </div> ';
    content += '         </div>';
    content += '    </div>';
    content += '</div>';
    content += dialogBg(bg);

    return content;
}


function generateActualBoughtDialog(name, bg) {
    var content = '';

    content += '<div id="' + name + '" class="dialogContent" type="popup">';
    content += dialogHeader("Bought Deal!", name, bg);

    content += '    <div  class="dialogBody" >';
    content += '        <div  class="dbContent">';
    content += '            <span id ="lblPopCpNameCoup" class="font-green font-bold"></span>&nbsp; has been added to your wallet';
    content += '        </div>';
    content += '        <div class="dbButton center-wrapper">';
    content += '            <div>';
    content += '                <a class="ui-btn" style="background-color: #f2f2f2"  href="#" onclick= "closeDialog(\'' + name + '\', \'' + bg + '\');"> OK</a>';
    content += '            </div>';
    content += '         </div>';
    content += '    </div>';
    content += '</div>';
    content += dialogBg(bg);

    return content;
}

function generateRedeemDialog(name, bg) {
    var content = '';
    content += '<div id="' + name + '" class="dialogContent" type="popup" style="position:absolute;top:10%">';
    content += dialogHeader("Coupon Redemption", name, bg);

    content += '    <div  class="dialogBody" >';
    content += '        <div  class="dbContent center-wrapper">';
    content += '            <table>';
    content += '                <tr>';
    content += '                     <td><img src=""  style="width:240px;height:180px" id="imgRedeem"/></td>';
    content += '                 </tr>';
    content += '                <tr>';
    content += '                     <td class="font-bold"><span id ="lblCpName">Coupon Name</span></td>';
    content += '                 </tr>';
    content += '                <tr>';
    content += '                     <td class="font-grey font-10">ID: <span id="lblCouponCode">0-0</span></td>';
    content += '                 </tr>';
    content += '                <tr>';
    content += '                     <td class="font-green font-10">Present this screen to the retailer to enter their merchant code in order to redeem.</td>';
    content += '                 </tr>';
    content += '                 <tr>';
    content += '                      <td>';
    content += '                            <input name="txtMCode" id="txtMCode" placeholder="Merchant Code" value="" type="text"   >';
    content += '                             </div>';
    content += '                       </td>';
    content += '                 </tr>';
    content += '             </table>';
    content += '        </div>';
    content += '        <div class="dbButton center-wrapper">';
    content += '            <div id="btnDialogRedeem">';
    content += '                <a class="ui-btn" style="background-color: #f2f2f2"  href="#"  >Redeem</a>';
    content += '            </div>';
    content += '         </div>';
    content += '    </div>';
    content += '</div>';
    content += dialogBg(bg);

    return content;
}


function generateNotificationSettingDialog(name, bg, checkId) {
    var content = '';

    content += '<div id="' + name + '" class="dialogContent" type="popup" >';
    content += dialogHeader("Select Time & Day", name, bg);

    content += '    <div  class="dialogBody" >';
    content += '        <div  class="dbContent center-wrapper">';
    content += '            <table style="width:100%">';
    content += '                <tr>';
    content += '                     <td>';
    content += '                       <div style="float:left" class="font-12 font-green">Time:</div>';
    content += '                        <div style="float:right">';

    if (!device.platform || device.platform === "Android" || device.platform === "Win32NT" || device.platform === "WinCE") {
        content += "<input name=\"txtTime\" id=\"txtTime\" type=\"time\" data-role=\"datebox\"  data-theme=\"b\"  value=\"\" \n\
                                                   data-options='{\"mode\": \"timeflipbox\",\"centerVert\": true,\"useModal\":true,\"useFocus\": true}'   onchange=\"changeDuration();\">";
    } else {
        content += "<input name=\"txtTime\" id=\"txtTime\" placeholder=\"\" onchange=\"changeDuration();\" \n\
                                               value=\"\" type=\"time\" data-mini=\"true\" width=\"50px\" >";

    }
    content += '                        </div>';
    content += '                    </td>';
    content += '                 </tr>';
    content += '                <tr>';
    content += '            <td align="left" class="font-12 font-green" id="selectAllDate">';
    content += '                 <input type="hidden" id="nID" value="0"/>';
    content += '                  <br><div>Days to receive reminder:</div>';
    content += '                 <table cellspacing="10px" style="margin-left:-10px"><tr>        ';
    for (var i = 1; i < 6; i++) {
        content += '<td><img src="img/' + i + '-0.png" style="width:40px;height:40px" id="imgDay' + i + '" onclick="checkNotificationDay(' + i + ')"></td>';

    }
    content += '                 </tr>';
    content += '                 <tr>';
    for (var i = 6; i < 8; i++) {
        content += '<td><img src="img/' + i + '-0.png" style="width:40px;height:40px"  id="imgDay' + i + '" onclick="checkNotificationDay(' + i + ')"></td>';

    }
    content += '                 </tr>';
    content += '             </table>';
    content += '                 </td>';
    content += '                 </tr>';
    content += '             </table>';
    content += '        </div>';
    content += '        <div class="dbButton center-wrapper">';
    content += '            <div id="btnDialogRedeem">';
    content += '                <a class="ui-btn" style="background-color: #f2f2f2"  href="#"  onclick="saveCurrentNotification()" >Confirm</a>';
    content += '            </div>';
    content += '         </div>';
    content += '    </div>';
    content += '</div>';
    content += dialogBg(bg);

    return content;
}

dynConfirmPopup.onOk = function()
{
    if (!dynConfirmPopup.isValid || dynConfirmPopup.isValid())
    {
        $('#DynPopupConfirm').popup('close');
        dynConfirmPopup.btnClicked = "ok";
    }
    else if (dynConfirmPopup.isValid && !dynConfirmPopup.isValid())
    {
        $("#dynConfirmPopupErrorMsg").show();
    }
};
dynConfirmPopup.onCancel = function()
{
    $('#DynPopupConfirm').popup('close');
    dynConfirmPopup.btnClicked = "cancel";
};
dynConfirmPopup.onClose = function()
{
    $('#DynPopupConfirm').popup('close');
    dynConfirmPopup.btnClicked = "close";
};
dynConfirmPopup.isValid = function()
{
    return true;
};
//Sample call:
//dynConfirmPopup('Save Activity Log','You have not saved this activity.<br>Do you want to save?',addGPSLog,closeGPSLog);

function dynConfirmPopup(title,message,onOk,onCancel,onClose,okBtnText,cancelBtnText,isSingleButton, isValid)//onClosePage,onCloseScrollTo)
{
    if(!okBtnText)
    {
        okBtnText="OK";
    }
    if(!cancelBtnText)
    {
        cancelBtnText="Do Not Save";
    }
    if (isValid)
    {
        dynConfirmPopup.isValid = isValid;
    }
    else
    {
        dynConfirmPopup.isValid = function()
        {
            return true;
        };
    }
    //dynConfirmPopup.cbonOk=onOk;
    //dynConfirmPopup.cbonCancel=onCancel;
    dynConfirmPopup.btnClicked=null;
    var secondButton='';
    if(!isSingleButton){
        secondButton +='<div style="margin-top:5px">';
        secondButton +='<a class="ui-btn" style="background-color: #f2f2f2"  href="#" onclick="dynConfirmPopup.onCancel()">';
        secondButton +='<span class="font-red">'+cancelBtnText+'</span>';
        secondButton +='</a>';
        secondButton +='</div>';
    }
    var content=[
        '<div id="divdynConfirmPopup" class="dynpopupContent">',
        '   <div  class="dialogHeader" >',
        '      <div>',
        '        <div class="dhLeft" onclick= "dynConfirmPopup.onClose()"><img  src="' + app.rootFullPath + 'img/gr_close.png" style="width:20px; height:20px" name="dynConfirmPopupCloseBtn"/></div>',
        '        <div class="dhRight"><img src="' + app.rootFullPath + 'img/gr_greenbuddy.png" style="width:30px; height:40px" /></div>',
        '        <div class="dhMid">' + title +'</div>',
        '       </div>',
        '   </div>',
        '   <div  class="dialogBody" >',
        '       <div  class="dbContent">' + message,
        '       </div>',
        '   <div class="dbButton center-wrapper">',
        '       <div>',
        '           <div>',
        '               <a class="ui-btn" style="background-color: #f2f2f2"  href="#" onclick= "dynConfirmPopup.onOk()">'+okBtnText+'</a>',
        '           </div>',secondButton,
        '       </div>',
        '   </div>',
        '       <div  id="dynConfirmPopupErrorMsg" class="dbContent" style="margin-left: 20px;margin-top: 20px;color: rgb(243, 94, 94);font-weight: bold;display:none"> Please check the entered values',
        '       </div>',
        '</div>'
].join('\n');

    var callbackObject = {
        popupafteropen: function(e) { //cbAfterOpen
            decimalKeyPad();            
        },
        popupafterclose: function(e) { //cbAfterClose                
            debuglog("dynConfirmPopup" + message + "\nafterclose");
            if (dynConfirmPopup.btnClicked === "ok")
            {
                if (onOk)
                    onOk();
            }
            else if (dynConfirmPopup.btnClicked === "cancel")
            {
                if (onCancel)
                    onCancel();
            }
            else if (dynConfirmPopup.btnClicked === "close")
            {
                if (onClose)
                    onClose();
                else if (onCancel)
                    onCancel();
            }
        },
        beforeposition: function(event, ui)
        {
            var w = $(event.target).attr("width");
            var h = $(event.target).attr("height");
            debuglog('beforeposition w:' + w + ' h:' + h);
            $(event.target).attr("width", "280px");
        }
    };
        
    $.dynamic_popup({
        content: content,
        popupId: "DynPopupConfirm",
        'data-transition': 'flip', //was 'flow'
        'data-position-to': 'window', //Centered on window can also be any other selector suche #divid
        'dismissible' : false //modal dialog no click outside see http://api.jquerymobile.com/popup/#option-dismissible
    }).bind(callbackObject);  
};

///implementation of rich popup using jquery mobile dynamic_popup plugin
// used for local and push notification display for now
function dynPopup(title,message,cbObject,cbAfterOpen,cbAfterClose)
{
//Display dynamically a popup dialogbox without having to insert template in all pages
//Content of the dynamic popup can be text only or Full html - we reuse here the markup from current appibuddy Dialog (see dialogContent class in htmls)
// with a new css class dynpopupContent derived from dialogContent see custom.css
// main difference is that dynpopupContent is visible by default and display absolute instead of fixed


var content=[
        '<div class="dynpopupContent">',
        '    <div  class="dialogHeader" >',
        '       <div>',
        '            <div class="dhLeft" onclick= "$(\'#DynPopupPushNotif\').popup(\'close\')"><img  src="' + app.rootFullPath + 'img/gr_close.png" style="width:20px; height:20px" /></div>',
        '            <div class="dhRight"><img src="' + app.rootFullPath + 'img/gr_greenbuddy.png" style="width:30px; height:40px" /></div>',
        '            <div class="dhMid"><span id ="lblAlertTitle">' + title + '</span></div>',
        '        </div>',
        '    </div>',
        '    <div  class="dialogBody" >',
        '        <div  class="dbContent">',
        '            <span id ="lblAlertMsg">' + message,
        '            </span>',
        '        </div>',
        '        <div class="dbButton center-wrapper">',
        '            <div >',
        '                <div>',
        '                    <a class="ui-btn" style="background-color: #f2f2f2"  href="#" data-role="button" data-rel="back"> OK</a>',
        '                </div>',
        '            </div>',
        '        </div>',
        '    </div>',
        '</div>'].join('\n');

    if (!cbObject) //null cbObject passed then we could use directly the callback function            
        cbObject = {
            popupafteropen: cbAfterOpen,
            popupafterclose: cbAfterClose
        };
    if ( ! ("beforeposition" in cbObject)) //providing default beforeposition callback
    {
        cbObject.beforeposition = function(event, ui)
        {
            var w = $(event.target).attr("width");
            var h = $(event.target).attr("height");
            debuglog('beforeposition w:' + w + ' h:' + h);
            $(event.target).attr("width", "280px");
        };
    }
    $.dynamic_popup({
        content: content,
        popupId: "DynPopupPushNotif",
        'data-transition': 'none', //was 'flow'
        'data-position-to': 'window', //Centered on window can also be any other selector suche #divid
        'dismissible' : false //modal dialog no click outside see http://api.jquerymobile.com/popup/#option-dismissible
    }).bind(cbObject);
//Default dynamic+popup parameter
//    $.dynamic_popup({
//    content: '',
//    popupId: 'popup' + $activePage.attr('id'),
//    'data-theme': 'a',
//    'data-overlay-theme': 'none',
//    'data-position-to': 'window',
//    'data-rel': 'back',
//    'data-dismissible': true,
//    'data-transition': 'none',
//    'data-arrow': false
//});
};

/*
 * safe mobile.loading() and fadeToblack display handling
 */

function loadingNfade(action, fadeId)
//action: "hide" / "show" loading
//fadeId:
{
    var fadeElem;
    if (fadeId)
        fadeElem = document.getElementById(fadeId);
    if (action === "hide")
    {
        $.mobile.loading("hide");
        if (fadeElem)
            fadeElem.style.display = 'none';
    }
    else
    { //assume action == "show" /default
        $.mobile.loading("show");
        if (fadeElem)
            fadeElem.style.display = 'block';
    }
}