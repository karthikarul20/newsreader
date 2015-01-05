/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//var ip ="http://localhost:9000/appibuddy8/";
//var ip="http://10.0.1.9:9000/";
//var ip="http://10.0.1.41:9000/appibuddy/";
//var ip = "http://appibuddy.tklapp.com/";
//var ip="http://alx-xsrv-mini.local:9000/appibuddy/"
//var ip = "https://staging.appibuddy.com/appibuddy8/";
//var ip="https://ec2-54-169-60-210.ap-southeast-1.compute.amazonaws.com/appibuddy/";
//var ip = "https://singtel.appibuddy.com/appibuddy8/";
//var ip = "https://appibuddy.com/appibuddy/";
//aws t2 Debian 7
//var ip = "https://ec2-54-169-60-210.ap-southeast-1.compute.amazonaws.com/appibuddy/";
//Azure test instances
//var ip = "https://appiprod.cloudapp.net/appibuddy8/";
//var ip = "https://appibuddy-com.cloudapp.net/appibuddy/";
//aws t2 Ubuntu 14
//var ip = "https://ec2-54-169-61-168.ap-southeast-1.compute.amazonaws.com/appibuddy8/";
var ip = "https://prod.appibuddy.com/appibuddy8/";

//global constant default timeout in ms for most of our ajax calls
var deftimeout=100000;


//Todo Replace all console.log() calls by debuglog()
// debuglog will only output to console when DEBUG_MODE_ON=true
app.APP_VERSION = "1.2";
app.APP_BUILD = " 20141209_230900";
app.CAROUSEL_IMAGES_ONE_BY_ONE=0;
app.BLACK_SIDE_PANEL = 1;

var DEBUG_MODE_ON = false;
var DEBUG_CONSOLE_ON_DEVICE = false;
// DBG flag is to use before console log with logical short-circuit evaluation such as: DBG && console.log(' ')
//var DBG = true; now defined in index.js as it is loaded before global.js
var STEP_FREQUENCY=250;
//Use paypal express checkout instead of paypal mSDK plugin
var PAYPAL_EXPRESS=true;
var ACTIVITY_BUDDY = 20;
var SHARE_BUDDY = 10;
var QUESTIONNAIRE_BUDDY = 10;

function decimalKeyPad(nameList) {

    if (app.isAndroid()) {
        if (nameList) //Change the type of the given list
        {
            for (var i = 0;i < nameList.length; i++) {
                $("#" + nameList[i]).attr("type", "tel");
                $("#" + nameList[i]).trigger("create");
            }
        }
        else
        { //Change all input type in the document (having class alxAndroidDecimal)
            $('input.alxAndroidDecimal[type=number]').each(function() {
                $(this).attr("type", "tel");
                $(this).trigger("create");
            });
        }
    }
}
   



var debuglog = DEBUG_MODE_ON ? console.log : function() {
};

// Nice console popup for on device debugging found at http://eclipsesource.com/blogs/2012/08/14/debugging-javascript-on-android-and-ios/
//Now also activated on Right-click / contextmenu in browser
function activateDebugDevice() {
    if (DEBUG_CONSOLE_ON_DEVICE) {
        console = {
            "_log": [],
            "log": function() {
                var arr = [];
                for (var i = 0; i < arguments.length; i++) {
                    arr.push(arguments[ i ]);
                }
                this._log.push(arr.join(", "));
            },
            "trace": function() {
                var stack;
                try {
                    throw new Error();
                } catch (ex) {
                    stack = ex.stack;
                }
                DBG && console.log("console.trace()\n" + stack.split("\n").slice(2).join("  \n"));
            },
            "dir": function(obj) {
                DBG && console.log("Content of " + obj);
                for (var key in obj) {
                    var value = typeof obj[ key ] === "function" ? "function" : obj[ key ];
                    DBG && console.log(" -\"" + key + "\" -> \"" + value + "\"");
                }
            },
        "show": function() {
        //alert(this._log.join("\n"));
        var logtxt = this._log.join("\n");
        if (confirm(logtxt) && window.socialmessage)
        {
            var subject;    
            if (window.device && device.platform && device.version && device.model && device.cordova)
                subject = "Log on:" + device.platform + " v" + device.version + " " + device.model + " /cdv-" + device.cordova;            
            else
                subject = "Appibuddy debug log";                        
            window.socialmessage.send({text: logtxt,subject: subject});
        }
        this._log = [];
        }};
          
        if (window.navigator.msPointerEnabled)
            window.addEventListener("MSPointerDown",
                function (e) {
                    if (!e.isPrimary) { //secondary pointer means multi touch
                        console.show();
                    }
                });
        else
           window.addEventListener("touchstart", 
                function (e) {
                 if (e.touches.length > 1) {              
                    console.show();
                }
            });
        if (!is_cordova())
        {
            window.addEventListener("contextmenu", function(e) {
                console.show();
            });
        }
    }
    if (DBG) {
        window.onerror = function (msg, url, line) {
            DBG && console.log("ERROR: \"" + msg + "\" at \"" + url + "\", line " + line);
        };
    }
}

var fatMaleTable = [
    [7, 7, 13, 20, 25],
    [8, 8, 13, 21, 26],
    [9, 9, 13, 22, 27],
    [10, 10, 13, 23, 28],
    [11, 11, 13, 23, 28],
    [12, 12, 13, 23, 28],
    [13, 13, 12, 22, 27],
    [14, 14, 12, 21, 26],
    [15, 15, 11, 21, 24],
    [16, 16, 10, 20, 24],
    [17, 17, 10, 20, 24],
    [18, 18, 10, 20, 24],
    [19, 19, 9, 20, 24],
    [20, 39, 8, 20, 24],
    [40, 59, 11, 22, 28],
    [60, 79, 13, 25, 30]

];

var fatFemaleTable = [
    [7, 7, 10, 25, 29],
    [8, 8, 10, 26, 30],
    [9, 9, 11, 27, 31],
    [10, 10, 11, 28, 32],
    [11, 11, 11, 29, 33],
    [12, 12, 11, 29, 33],
    [13, 13, 11, 29, 33],
    [14, 14, 11, 30, 34],
    [15, 15, 11, 30, 34],
    [16, 16, 11, 30, 34],
    [17, 17, 11, 30, 35],
    [18, 18, 12, 31, 36],
    [19, 19, 14, 32, 37],
    [20, 39, 21, 33, 39],
    [40, 59, 23, 34, 40],
    [60, 79, 24, 36, 42]

];

var idealMaleTable = [
    [1, 12, 15.0],
    [13, 17, 14.0],
    [18, 20, 15.0],
    [21, 25, 17.0],
    [26, 30, 18.0],
    [31, 35, 19.5],
    [36, 40, 21.0],
    [41, 45, 22.0],
    [46, 50, 23.0],
    [51, 55, 25.0],
    [56, 99, 26.0]
];

var idealFemaleTable = [
    [1, 12, 20.5],
    [13, 17, 21.5],
    [18, 20, 22.5],
    [21, 25, 23.5],
    [26, 30, 24.5],
    [31, 35, 25.5],
    [36, 40, 26.5],
    [41, 45, 27.5],
    [46, 50, 28.5],
    [51, 55, 29.5],
    [56, 99, 30.5]
];


// Wait for device API libraries to load
//
var pictureSource;   // picture source
var destinationType; // sets the format of returned value

app. initialize();



function onBackKeyDown() {
    //alert($.mobile.activePage.attr('id'));
    //navigator.app.backHistory();

    var currentPageName = $.mobile.activePage.attr("name");


    if (currentPageName === "appHome") {
        navigator.app.exitApp();
    } else if (currentPageName === "app") {
        navigator.notification.confirm(
                'Do you want to quit',
                onConfirmQuit,
                'Exit Application ',
                'OK,Cancel'
                );
    } else if (currentPageName === "registration") {
        navigator.notification.confirm(
                'Do you want to complete your registration later?',
                onConfirmRegistration,
                'Exit Registration',
                'OK,Cancel'
                );
    } else if (currentPageName === "home") {

    } else if (currentPageName === "loggps") {
        var GPSStatus = window.localStorage.getItem("GPSStatus");
        GPSStatus = GPSStatus === null ? 0 : parseInt(GPSStatus);

        if (GPSStatus === 0) {
            var cal = parseInt($("#lblCalUsed").html());
            var dist = parseFloat($("#lblDistance").html());
            var step = parseInt($("#lblSteps").html());


            if (cal > 0 || dist > 0 || step > 0) {
                document.getElementById('gpsSaveConfirm').style.display = 'block';
                document.getElementById('fadeActivity').style.display = 'block';
            } else {
                $.mobile.changePage("activityLogHome.html");
            }
        }
    } else {
        navigator.app.backHistory();
    }

}

/* Debug helper (allow JSON.stringify part of event)
 * return a copy of an object with only non-object keys
 * we need this to avoid circular references
 */
function simpleKeys(original) {
    return Object.keys(original).reduce(function (obj, key) {
        obj[key] = typeof original[key] === 'object' ? '{ ... }' : original[key];
        return obj;
    }, {});
}

//Android menubutton event handler
function onMenuKeyDown()
{
    togglePanel();
}

function onConfirmRegistration(button) {

    if (button === 1) {
        $.mobile.changePage("../../main.html");
    }
}


function onConfirmQuit(button) {
    if (button === 1) {
        navigator.app.exitApp();
    }
}




function checkMainPage() {


    var checkTut = window.localStorage.getItem("noShowTutV1");
    checkTut = checkTut === null ? "" : checkTut;

    var rmbUser = window.localStorage.getItem("v8rmbUser");
    var rmbPass = window.localStorage.getItem("v8rmbPass");

    rmbUser = rmbUser === null ? "" : rmbUser;
    rmbPass = rmbPass === null ? "" : rmbPass;
    // $.mobile.changePage("page/profile/profile.html");
    DBG && console.log("checkMainPage");

    if (rmbUser === "" || rmbPass === "") {
        if (checkTut === "1") {
            $.mobile.changePage("main.html");
        } else {
            $.mobile.changePage("page/tutorial/tut0.html");
        }
    } else {
        var target = document.getElementById("spin");
        var spinner_opts = {//See example/doc at http://www.javascriptoo.com/spin-js
            color: '#000000'
        };
        var spinner = new Spinner(spinner_opts).spin();
        target.appendChild(spinner.el);
        login(login.AUTO_LOGIN, spinner);
    }

}

function noShowTut() {
    window.localStorage.setItem("noShowTutV1", "1");
    $.mobile.changePage("../../main.html");
}



function clearStorage(type) {
    var yes = $("#checkFirst").prop("checked");

    if (yes) {
        var rmbUser = window.localStorage.getItem("v8rmbUser");
        var rmbPass = window.localStorage.getItem("v8rmbPass");
        var checkTut = window.localStorage.getItem("noShowTutV1");

        if (rmbUser === null || rmbUser === "null") {
            rmbUser = "";
        }

        if (rmbPass === null || rmbPass === "null") {
            rmbPass = "";
        }

        window.localStorage.clear();
        onFoodRecordsPageShow.recordsRead = false;
        getFoodMenu.recordsRead = false;
        GetAllUserActivity.recordsRead=false;

        window.localStorage.setItem("v8rmbUser", rmbUser);
        window.localStorage.setItem("v8rmbPass", rmbPass);
        window.localStorage.setItem("noShowTutV1", checkTut);
        window.localStorage.setItem("isFirst", "0");
        if (type === 1) {
            goPage("profile/index.html");
        } else {
            goPage("login.html");
        }

    } else {
        navigator.notification.alert(
                'Please read and agree to the Terms of Agreement', // message
                alertDismissed, // callback
                'Sign In Error', // title
                'OK'                  // buttonName
                );
    }
}


//DB Function
function errorHandler(transaction, error) {
    alert('Error: ' + error.message + ' code: ' + error.code);

}

function successCallBack() {
    //alert("DEBUGGING: success");

}

function successCallBack() {}

function nullHandler() {}


function ListDBValues() {

    if (!window.openDatabase) {
        alert('Databases are not supported in this browser.');
        return;
    }
    $('#lbUsers').html('');


    db.transaction(function(transaction) {
        transaction.executeSql('SELECT * FROM User;', [],
                function(transaction, result) {
                    if (result != null && result.rows != null) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var row = result.rows.item(i);
                            $('#lbUsers').append('<br>' + row.UserId + '. ' +
                                    row.FirstName + ' ' + row.LastName);
                        }
                    }
                }, errorHandler);
    }, errorHandler, nullHandler);

    return;

    }

//BL 20140207 authentication bug fix we now use directly CredentialsObject() inside the ajax call to avoid using more global_variable badly set (not when needed) by get_credentials()
//CredentialsObject calculates and holds basic authentication base64 encoded credentials
//based on email and passord arguments (alternatively use the global var values from local storage)
function CredentialsObject(email, pass) {
    if (email === undefined)
        email = window.localStorage.getItem("email");
    if (pass === undefined)
        pass = window.localStorage.getItem("pass");
    this.email = email;
    this.pass = pass;
    this.basic64 = "Basic " + window.btoa(email + ":" + pass);
}

function alxAjaxGet(api, args,ext, argoptions) { //onSuccess, onError, onComplete, bwithoutUserid, async) {
    var url;
    var options = $.extend({//default options
            bWithoutUserid:false,
            async:true}
        ,argoptions);
    if (!api || !api.length)
        return;
    if (api.slice(-1)!=='/') //We support api with or without ending /
        api = api + '/';
    if (options.bWithoutUserid) //default if undefined will be using userid
        url = ip + api + ((args && args.length) ? args.join('/') : '');
    else
    {
        var fullargs=[window.localStorage.userid];
        if (args && args.length)
            fullargs=fullargs.concat(args);
        url = ip + api + fullargs.join('/');// window.localStorage.userid + ((args && args.length) ? args.join('/') : '');
    }

    if (ext)
        url += ext;
    $.ajax({
        url: url,
        timeout: deftimeout,
        beforeSend: function(xhr) {
            var credentials = new CredentialsObject();
            xhr.setRequestHeader("Authorization", credentials.basic64);
            xhr.withCredentials = true;
        },
        dataType: 'json',
        async: options.async,
        success: function(result) {
            if (options.success)
                options.success(result);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            DBG && console.log("global.js ln431 alxAjaxGet " + url + "\nERROR:", jqXHR.status, textStatus, errorThrown);
            networkError();
            if (options.error)
                options.error(jqXHR, textStatus, errorThrown);
        },
        complete: function(jqXHR, textStatus) {
            if (options.complete)
                options.complete(jqXHR, textStatus);
        }
    });
}
//BL 2014/02/16 Attempt to use jquery vclick event (generated on touch) to call original onclick handler of all buttons
function installVClickHandlers()
{
    $(document).on("vclick", ".ui-btn", function(e) {
        var vclickHandler = $(this).attr("onclick");


        if (vclickHandler && vclickHandler !== undefined)
        {
            debuglog("btn on:", vclickHandler);
            e.preventDefault();

            if ($('form').length > 0) {
                $('form').valid();
            }

            eval(vclickHandler);
        }
    });
    $(document).on("vclick", "a", function(e) {

        var href = $(this).attr("href");
        var back = $(this).attr("data-rel");
        var target = $(this).attr("target");
        if (href !== undefined && href.indexOf(".html") >= 0) {
            if (href.indexOf("http:") >= 0 || href.indexOf("https") >= 0)
            {
                //External link let default handler open the link based on target attribute
                e.preventDefault();
                if (target === undefined)
                    target = '_system'; //else can be _blank=> in app browser or _self -> inside current webview
                window.open(href, target); //_blank would be in app browsing
                return false; //if return true let event bubble and default link handling (open inside current webview without control
            }
            e.preventDefault();
            $.mobile.changePage(href);
            debuglog("vclick on", href);
            return false;
        } else if (back !== undefined && back === "back") {
            debuglog("back", href);
            $.mobile.back();
            return false;
        }
    });


    $(document).on("vclick", "div", function(e) {
        var id = $(this).attr("id");

        // temp solved..
//need to solve this... div div img... sigh..
        if (id !== "foodLog" && id !== undefined) {

            var vclickHandler = $(this).attr("onclick");
            if (vclickHandler && vclickHandler !== undefined)
            {
                debuglog("div on:", vclickHandler);
                e.preventDefault();
                eval(vclickHandler);
            }
        }
    });

    $(document).on("vclick", "img", function(e) {


        var id = $(this).attr("id");
//    if (id==="yourimage")
//        return; //Keeping regular click and touchandhold for setting photo
        var vclickHandler = $(this).attr("onclick");
        if (vclickHandler && vclickHandler !== undefined)
        {
            debuglog("double on:", vclickHandler);
            e.preventDefault();
            eval(vclickHandler);
        }
    });

    $(document).on("vclick", "li", function(e) {

        var vclickHandler = $(this).attr("onclick");
        if (vclickHandler && vclickHandler !== undefined)
        {
            DBG && console.log("li on:", vclickHandler);
            e.preventDefault();
            eval(vclickHandler);
        }
    });

    $(document).on("vclick", "tr", function(e) {

        var vclickHandler = $(this).attr("onclick");
        if (vclickHandler && vclickHandler !== undefined)
        {
            DBG && console.log("tr on:", vclickHandler);
            e.preventDefault();
            eval(vclickHandler);
        }
    });


    $(document).on("vclick", "area", function(e) {

        var id = $(this).attr("id");
        var vclickHandler = $(this).attr("onclick");
        if (vclickHandler && vclickHandler !== undefined)
        {
            e.preventDefault();
            eval(vclickHandler);
        }
    });

}


//Generic Javascript Utility functions could move into utility/ when enough
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
//This method to decode HTML entities is used for streetdeal coupon description decoding
String.prototype.decodeHTML = function() {
    var map = {"lt":"<","gt":">","quot":'"',"amp":"&"};
    return this.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, function($0, $1) {
        if ($1[0] === "#") {
            return String.fromCharCode($1[1].toLowerCase() === "x" ? parseInt($1.substr(2), 16)  : parseInt($1.substr(1), 10));
        } else {
            return map.hasOwnProperty($1) ? map[$1] : $0;
        }
    });
};

function addBuddies(buddyEarned, reward_id,path, local_var) {
    var userid = window.localStorage.getItem("userid");
    $.mobile.loading("show");

    var url = ip + "api/rest/USER_TRANSACTION.json";
    dic = {"USER_ID": parseInt(userid), "TRAN_TYPE_ID": 1, "REWARDS_ID": reward_id, "AMOUNT": buddyEarned, "REMARK": ""};
    $.ajax({type: 'POST',
        url: url,
        timeout: deftimeout,
        async: false,
        beforeSend: function(xhr) {
            var credentials = new CredentialsObject();
            xhr.setRequestHeader("Authorization", credentials.basic64);
            xhr.withCredentials = true;
        },
        dataType: 'json',
        data: dic,
        success: function(resp) {
            updateBuddies(resp);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            DBG && console.log("global.js ln586/  ajax POST " + url + " profile ERROR:", jqXHR.status, textStatus, errorThrown);
            networkError();
        },
        complete: function(jqXHR, textStatus) {
            window.localStorage.setItem(local_var, "1");
            $.mobile.loading("hide");
            if (path)
                goPage(path);
        }
    });
}
