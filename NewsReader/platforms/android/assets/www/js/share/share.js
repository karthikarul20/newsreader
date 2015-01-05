/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*** requires cordova plugin add https://github.com/leecrossley/cordova-plugin-social-message.git
 *
 * @param {string} subject
 * @param {string} txt
 * @returns {undefined}
 */
"use strict";
ImgDownload.fs = null;
function ImgDownload()
{
    var is_cordova = function() {
        return (typeof (cordova) !== 'undefined' || typeof (phonegap) !== 'undefined');
    };
    this.Init = function(OnSuccess, OnError) {
        if (is_cordova())
        {
            debuglog("ImgDownload requesting LocalFileSystem");
            ImgDownload.OnInitSuccess = OnSuccess;
            ImgDownload.OnInitError = OnError;
            if (ImgDownload.fs == null)
                window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, onFileSystemSuccess, fail);
            else
            {
                debuglog("LocalFileSystem already initialized");
                OnSuccess(ImgDownload.fs);
            }
        }

        else {
            //CHROME
            debuglog("ImgDownload requesting Chrome LocalFileSystem");
            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
            window.storageInfo = window.storageInfo || navigator.webkitTemporaryStorage; //navigator.webkitPersistentStorage
            if (!window.storageInfo) {
                debuglog('Your browser does not support the html5 File API', 2);
                if (OnError)
                    OnError();
                return;
            }
            // request space for storage
            var quota_size = 5 * 1024 * 1024;
            var persistence = window.storageInfo.TEMPORARY; //window.storageInfo.PERSISTENT
            window.storageInfo.requestQuota(
                    quota_size,
                    function() { /* success*/
                        debuglog('Got localstorage quota - requesting file system ');
                        window.requestFileSystem(persistence, quota_size, onFileSystemSuccess, fail);
                    },
                    function(error) { /* error*/
                        debuglog('Failed to request quota: ' + error.code, 3);
                        if (OnError)
                            OnError();
                    }
            );
        }
    }

    var onFileSystemSuccess = function(fileSystem) {
        ImgDownload.fs = fileSystem;
        debuglog("fsname:", fileSystem.name);
        debuglog("fs root name:", fileSystem.root.name);
        debuglog("fs root path:", fileSystem.root.fullPath);
        if (ImgDownload.OnInitSuccess)
            ImgDownload.OnInitSuccess(fileSystem);
    }

    var fail = function(evt) {
        ImgDownload.fs = null;
        debuglog(evt.target.error.code);
        if (ImgDownload.OnInitError)
            ImgDownload.OnInitError(evt.target.error.code);
    }

    this.createFile = function()
    {
        if (ImgDownload.fs)
        {
            ImgDownload.fs.root.getFile("tempimg.png", {create: true, exclusive: true}, this.gotFileEntry, fail);
        }
    }
    this.gotFileEntry = function(fileEntry) {
        fileEntry.file(gotFile, fail);
        var fileURL = fileEntry.toURL();
        debuglog("fileEntry URL:", fileURL);
        debuglog("fileEntry fullPath:", fileEntry.name, fileEntry.fullPath)
    }
    function gotFile(file) {
        readDataUrl(file);
        readAsText(file);
    }
}


function ImgtoFile(URL, callerdata, OnSuccess, OnError)
{

    var downloadObject = new ImgDownload();
    downloadObject.Init(function(filesystem)
    {
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(URL);
        var filePath = filesystem.root.fullPath + "/map.png";

        fileTransfer.download(
                uri,
                filePath,
                function(entry) {
                    debuglog("download complete: " + entry.fullPath);
                    OnSuccess(entry);
                },
                function(error) {
                    debuglog("download error source " + error.source);
                    debuglog("download error target " + error.target);
                    debuglog("download error code" + error.code);
                    OnError(error);
                },
                true
                );
    });
}
function wrapText(context, text, x, y, maxWidth, lineHeight,measureHeightonly) {
    var lines = text.split('\n');
    var hText =y; //keep initial y here for actual height calculation on exit
    for (var l=0;l<lines.length;l++)
    {
        var words = lines[l].split(' ');
        var line = '';
        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if ( n > 0 && (testWidth > maxWidth)) {
                if (!measureHeightonly)
                    context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        if (!measureHeightonly)
            context.fillText(line, x, y);
        y += lineHeight;
    }
    hText = y - hText;
    return hText;
}
//Load img at given URL and  async returns a new image dataURL
function ImgtoDataURL(imgURL, callerdata, OnSuccess, OnError,subject,msg)
{
    // load image from data url
    var imageObj = new Image();
    var localImgURL; //WP8 only
    if (OnError)
        imageObj.onerror = OnError;
 
  
    imageObj.onload = function() {
        var msgHeight=0;
        var canvas = document.createElement('canvas');
        var msgHeight=0;
        var baseFontSize = 20;
        var leftMargin = 20;
        var baseLineHeight = 1.2 * baseFontSize;
        var txt='';
        if (subject)
            txt = subject;
        if (msg)
            txt += '\n' + msg;
     
        canvas.width = this.width;
        canvas.height = this.height;
        var context = canvas.getContext('2d');
        if (txt.length)
        {
            var maxMsgWidth = this.width - 2*leftMargin;
            //measuring the height of the text once wrapped on multiple line (of 16 pixels)
            context.textBaseline="top"; //y position  will refer to top of the text (Default is Alphabetical)
            context.font=baseFontSize + "px Arial";
            msgHeight = baseLineHeight + wrapText(context, txt, leftMargin + 4, 0, maxMsgWidth, baseLineHeight ,true);
            DBG && console.log("actual msgHeight="+msgHeight);

            //reset canvas size (this will clear it)
            canvas.height = this.height + msgHeight;
            context.textBaseline="top"; //y position  will refer to top of the text (Default is Alphabetical)
            context.fillStyle = 'white';
            context.font=baseFontSize + "px Arial";
            context.fillRect(0,0,canvas.width,canvas.height);
            context.fillStyle = 'black';
            wrapText(context, txt, leftMargin + 4, baseLineHeight/2, maxMsgWidth, baseLineHeight, false);
        }      
        context.drawImage(this, 0, msgHeight, this.width, this.height);
        var dataURL = canvas.toDataURL("image/png");         //"data:image/jpeg;base64,"
        if (localImgURL)//release memory associated with blob url in wp8/ie10 case
            URL.revokeObjectURL(localImgURL);
        OnSuccess(callerdata, dataURL);
    }; 
    if (device.platform === "Win32NT") {
        //on wp8 IE10 CORS is not supported
        //make the remote image a local one use XML httprequest
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var localImgURL = URL.createObjectURL(this.response);
            imageObj.src = localImgURL;
            DBG && console.log("xhr.onload success - loading local image");
        };
        xhr.onerror = function () {
            DBG && console.log("xhr ERROR on loading as blob (" + imgURL + ")");
            // URL.revokeObjectURL(url);
        };
        xhr.open('GET', imgURL, true);
        xhr.responseType = 'blob';
        xhr.send();
    }
    else {
        imageObj.crossOrigin = "anonymous";//Important set atherwise browser through tainted canvas security CORS exception
        imageObj.src = imgURL;
    }

}
function uploadImage(imgData,api,id,field,onSuccess,onError)
{
    var url = ip + api + id + ".json";
    var data ={};
    data[field]=imgData;
    $.ajax({type: 'PUT',
        url: url,
        timeout: deftimeout,
        beforeSend: function(xhr) {
            var credentials = new CredentialsObject();
            xhr.setRequestHeader("Authorization", credentials.basic64);
            xhr.withCredentials = true;
        },
        data: data,
        success: function(resp) {
            DBG && console.dir("uploadImage resp=" + resp);
            if (resp.img_url) {
                DBG && console.log("Image url=" + resp.img_url);
                if (onSuccess)
                {
                    var host = ip.slice(0, ip.indexOf('/appibuddy'));
                    onSuccess(host + resp.img_url);
                }
                    
            }
            else
                onError("error getting uploadImage url");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            DBG && console.log("share.js/uploadImage ln249 ajax PUT " + url + " ERROR:", jqXHR.status, textStatus, errorThrown);
            if (onError)
                onError(textStatus);
        }
    });
}
function shareSpecificRoute()
{
    shareRoute();
    closeSpecificShareDialog();

}

function shareRoute()
{

    var id = parseInt(window.localStorage.getItem("shareRouteId"));

    var allActivities = getAllActivities();
    var tempDictActivity = allActivities.dictActivity;
    var shareObj;
    for (var date in tempDictActivity) {
        var dayActivity = tempDictActivity[date];
        if (dayActivity && dayActivity.length)
            for (var j = 0; j < dayActivity.length; j++) {
                if (dayActivity[j].id === id) {
                    shareObj = dayActivity[j];
                    break
                }
        }
    }   

    var activityDescription=activityDict[shareObj.activityType][1];
    var cal = shareObj.activityCal;
    var step = shareObj.step;
    var distance = shareObj.distance;
    var routeMap = shortenRoute(shareObj.routeMap, 50); //Reduce the number of point to 25 for staticmap compatibility
    routeMap = routeMap.replace("200x200", "640x480");//Increase default thumbnail resolution for sharing

    var sdt = new Date(shareObj.startTime);

    var routeDuration = new DurationObject(durationStringToms(shareObj.duration));
    //Calculating speed in km/h
    var avgSpeed = routeDuration.totalmsec ? distance / (routeDuration.totalmsec/3600000) : 0;
    var txt = "I enjoyed " +
            activityDescription + " for " + routeDuration.toString("hms") + " at " + shareObj.routeName
            + ".\nI did " + distance + " km" + (step ? ", " + step + " steps" : "") + (avgSpeed ? " at " + avgSpeed.toFixed(1) + " km/h" :"") + " and burnt " + cal + " Cal with Appibuddy!\nPlease download the app @ www.appibuddy.com";
    var subject = sdt.getDate() + "/" + (sdt.getMonth() + 1) + "/" + sdt.getFullYear() + " " + activityDescription + " with Appibuddy";
    closeShareDialog();

    addBuddies(SHARE_BUDDY, 7, null, null);

    DBG && console.log("shareRoute:" + subject + txt +  "routemap Lenth:" + routeMap.length);
    //Download static google map image as base64 dataURL and drawing the text inside the image
    ImgtoDataURL(routeMap, null,
            function(callerdata, dataURL)//OnSuccess
            {
                if (device.platform === "Win32NT" || (DBG && !is_cordova())) //For test purpose before impl. on wp8 we upload image of the map 
                    // uploading Edited Google Map image in USER_ACTIVITY table ROUTE_MAP_IMG => ROUTE_MAP
                    uploadImage(dataURL, "api/rest/USER_ACTIVITY/", shareObj.id, "ROUTE_MAP_IMG",
                        function (uploaded_img_url) {
                            if (!is_cordova()) //For test purpose only we re-download and display the file
                            {
                                DBG && console.log("opening image at: " + uploaded_img_url);
                                window.default_open(uploaded_img_url);
                            }
                            else {
                                DBG && console.log("sharing image at: " + uploaded_img_url);
                                var message = {
                                    text: txt,
                                    subject: subject,
                                    image: uploaded_img_url
                                    //link: "http://www.appibuddy.com"
                                    /*      ,activityTypes: ["PostToFacebook", "PostToTwitter","] */
                                };
                                window.socialmessage.send(message);
                            }
                        }, onImgError);
                else {
                    var message = {
                        text: txt,
                        subject: subject,
                        image: dataURL,
                        link: "http://www.appibuddy.com"
                        /*      ,activityTypes: ["PostToFacebook", "PostToTwitter","] */
                    };
                    if (is_cordova()) {
                        window.socialmessage.send(message);
                    }
                    else
                        window.default_open(dataURL);
                }
            },
            onImgError,
            subject, txt);
    function onImgError(error)
    {
        DBG && console.log("error loading/saving map image, sharing text only");
        var message = {
            text: txt,
            subject: subject
        };
        if (is_cordova())
            window.socialmessage.send(message);
        else
            DBG && console.log("subject: " + subject + "\n text=" + txt);
    }

}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
function durationStringToms(strDuration)
{//Convert back string duration (HH:MM:SS) to ms..
    var digit;
    var ms = 0;
    var digits = strDuration.split(':')
    for (var i = 0; i < digits.length; i++)
        ms = 60 * ms + parseInt(digits[i]);
    ms *= 1000;
    return ms;
}
function sharing() {
    var subject = "";
    var txt = "";
    var type = window.localStorage.getItem("shareType");


    switch (type)
    {
        case "Activity":
            subject = "Working my way to a more active life with Appibuddy!";

            var tempLog = onActivityLogHomeBeforeShow.currActivityLog;
            var calburn = 0;
            var diffMs = 0;
            var acType = "";
            var dist = 0;
            var step = 0;


            if (tempLog.length > 0) {
                for (var i = 0; i < tempLog.length; i++) {

                    var obj = tempLog[i];



                    var activityType = obj.activityType;
                    var lblType = "";

                    for (var a = 0; a < activityTable.length; a++) {
                        if (activityType === activityTable[a][0]) {
                            lblType = activityTable[a][2];
                            break;
                        }
                    }


                    if (lblType.indexOf("steps") < 0) {
                        if (obj.duration) {//Convert back string duration (HH:MM:SS) to ms..
                            diffMs += durationStringToms(obj.duration);
                        }
                        else {
                            var sdt = new Date(obj.startTime);
                            var edt = new Date(obj.endTime);
                            diffMs += (edt - sdt);
                        }

                        if (acType.indexOf(lblType) === -1) {
                            if (acType.length > 1) {
                                acType += ",";
                            }
                            acType += lblType;
                        }
                    }
                    calburn += parseInt(obj.activityCal);
                    step += parseInt(obj.step);
                    dist += parseFloat(obj.distance);
                }

                var activityDuration = new DurationObject(diffMs);

                if (calburn <= 0) {
                    txt = "I have not done any activity yet.";
                } else {

                    if (diffMs > 0) {
                        txt = "I just spent " + activityDuration.toString("hms") + " doing " + acType.toLowerCase() + ". ";
                    }
                    txt += "\nI have burned " + calburn + " Cal and covered " + dist.toFixed(2) + " km" + (step ? ", in " + step + " steps." : ".");
                }


                txt += "\nI enjoy using Appibuddy! \nPlease download the app @ www.appibuddy.com";
            }


            break
        case "Profile":
            var mood = window.localStorage.getItem("MOOD");
            mood = mood === null ? "Happy" : mood;
            var fs = window.localStorage.getItem("FSCORE");
            var bodyAge = window.localStorage.getItem("BODY_AGE");
            subject = "I'm feeling " + mood + " today in #Appibuddy";
            txt = "My Fitness Score is " + fs + " and I'm physically " + bodyAge + " years. What about you? \nPlease download the app @ www.appibuddy.com";
            break;

        case "Sleep":
            subject = "Keeping track of my everyday sleep time";

            var tempSleepLog = window.localStorage.getItem("tempSleepLog");

            tempSleepLog = tempSleepLog === null ? "" : tempSleepLog;

            var tempLog = [];

            if (tempSleepLog.length > 1) {
                tempLog = $.parseJSON(tempSleepLog);
            }

            var totalms = 0;

            if (tempLog.length > 0) {
                for (var i = 0; i < tempLog.length; i++) {

                    var obj = tempLog[i];

                    var sdt = new Date(obj.startDate);
                    var edt = new Date(obj.endDate);

                    var diffMs = (edt - sdt);
                    totalms += diffMs;
                }
                var sleepDuration = new DurationObject(totalms);

                txt += "I slept for a total of " + sleepDuration.toString("hms") + "on "+sdt.alxtoDateString()+". I enjoy using Appibuddy! \nPlease download the app @ www.appibuddy.com";

            }

            break;
        case "ActivityRecord":

            var sortDateRange;

            var allActivities = getAllActivities();
              
            sortDateRange = allActivities.sortDateRange;         

            var dateDirection = parseInt(window.localStorage.getItem("activityDateDirection"));
            var datePostKey = "";

            var post = sortDateRange.length - 1 + dateDirection;
            if (post > 0) {
                datePostKey = sortDateRange [post];
            }

            var currSleepArry = allActivities.dictSleep[datePostKey];
            var currActivityArry = allActivities.dictActivity[datePostKey];

            if (currActivityArry && currActivityArry.length) {
                var totalms = 0;
                var calburn = 0;
                var step = 0;

                for (var i = 0; i < currActivityArry.length; i++) {
                    var obj = currActivityArry[i];

                    debuglog(obj)
                    var diffMs;
                    calburn += parseInt(obj.activityCal);
                    step += parseInt(obj.step);
                    if (obj.duration) {//Convert back string duration (HH:MM:SS) to ms..
                        diffMs = durationStringToms(obj.duration);
                    }
                    else { //If we don't have duration property then let's use start and end times instead
                        var sdt = new Date(obj.startTime);
                        var edt = new Date(obj.endTime);
                        diffMs = (edt - sdt);
                    }


                    totalms += diffMs;
                }
            }
            var activityDuration = new DurationObject(totalms);

            var totalms = 0;
            if (currSleepArry !== undefined) {
                for (var i = 0; i < currSleepArry.length; i++) {
                    var obj = currSleepArry[i];
                    var sdt = new Date(obj.startDate);
                    var edt = new Date(obj.endDate);
                    var diffMs = (edt - sdt);

                    totalms += diffMs;
                }
            }
            var sleepDuration = new DurationObject(totalms);


            subject = "Working my way to a healthy life with Appibuddy!";
            txt = moment(datePostKey).format("DD/MM/YY") + ": I slept for " + sleepDuration.toString("hms") + ", exercised for " + activityDuration.toString("hms") + ", burning a total of " + calburn + (step ? " Cal and covering " + step + " steps" : " Cal") + ". I enjoy using Appibuddy! \nPlease download the app @ www.appibuddy.com";

            break;


        case "Daily Summary":
            var calIntake = window.localStorage.getItem("energyTakeTodaySaved");
            var calBurnt = window.localStorage.getItem("HomeCalBurnt");

            calIntake = calIntake === null ? "0" : calIntake;

            subject = "My accomplishment for today!";
            txt = "I ate " + calIntake + " Cal today, and burnt " + calBurnt + " Cal today!\nPlease download the app @ www.appibuddy.com";


            break;

        case "My Progress":

            var aryWeight = window.localStorage.getItem("HomeWeight");
            aryWeight = aryWeight === null ? [] : JSON.parse(aryWeight);

            debuglog(aryWeight.length);
            var lastValue;
            var preValue;

            var strType = "lost/gain";


            if (aryWeight.length > 1) {
                lastValue = parseFloat(aryWeight[aryWeight.length - 1].value);
                preValue = parseFloat(aryWeight[aryWeight.length - 2].value);
            } else {
                lastValue = 0;
                preValue = 0;
            }

            var txt = "";
            subject = "";
            var userid = window.localStorage.getItem("userid");

            var url = ip + "api/rest/get_weight_progress/" + userid + ".json";
            var start_weight = 0;
            var last_weight = 0;
            var weight_goal = 0;
            var progress = 0;
            var weight_diff = 0;


            $.ajax({
                url: url,
                timeout: deftimeout,
                beforeSend: function(xhr) {
                    var credentials = new CredentialsObject();
                    xhr.setRequestHeader("Authorization", credentials.basic64);
                    xhr.withCredentials = true;
                },
                dataType: 'json',
                async: false,
                success: function(result) {
                    $.each(result, function(key, val) {

                        if (key == "content") {
                            var content = val;
                            start_weight = content["start_weight"];
                            last_weight = content["last_weight"];
                            weight_goal = content["weight_goal"];
                            progress = content["progress"];
                            weight_diff = content["weight_diff"];
                            if (weight_diff > 0) {
                                strType = "lost";
                            } else if (weight_diff < 0) {
                                strType = "gain";
                            } else {
                                strType = "nothing";
                            }
                            if (strType !== "nothing") {
                                subject = "I'm making progress on #Appibuddy! ";
                                var detail_msg = "and I enjoy using Appibuddy!.\n My current weight is  " + last_weight.toFixed(2) + " kg vs Start Weight of  " + start_weight.toFixed(2) + " kg.\nMy progress is  " + progress.toFixed(2) + "%.\n";

                                txt = "Hi There,\nI just " + strType + "(" + -weight_diff.toFixed(2) + " kg),\n " + detail_msg;
                                txt += "Please download the app @ www.appibuddy.com";
                            } else {
                                subject = "I enjoy using Appibuddy!";
                                txt = "\nPlease download the app @ www.appibuddy.com";
                            }

                        }
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    debuglog("share.js ln551 get_weight_progress ajax GET ERROR:", jqXHR.status, textStatus, errorThrown);
                    networkError();
                }
            });

            break;
        case "Food Daily Records":
            var cday = "";
            var energyPercentage = "";

            var allActivities = getAllActivities();
            var jsonDaybyDayRecords = window.localStorage.getItem("DaybyDayRecords");
//        $("#divRecDateRange").html(onFoodRecordsPageShow.RecDateRange);
            if (jsonDaybyDayRecords !== null)
            {
                var DaybyDayRecords = JSON.parse(jsonDaybyDayRecords);
                var curRecIndex = onFoodRecordsPageShow.allFoods.curRecIndex;

                var curDay = DaybyDayRecords[curRecIndex];
                var curDayDate = curDay["DATE"];
                var curDayDateObj = new Date(curDayDate);


                cday = moment(curDayDateObj).format("DD/MM/YY");


                var energyConsumed = window.localStorage.getItem("energyTake");
                var energy = window.localStorage.getItem("energyNeed");

                if (energyConsumed === null || energyConsumed === "") {
                    energyConsumed = 0;
                }

                energyConsumed = Math.round(energyConsumed);
                var percentage = Math.round(energyConsumed / energy * 100);
                energyPercentage = percentage + "%";
            }

            subject = "My daily Calorie intake from Appibuddy!";
            txt = cday + ": I ate a total of " + energyConsumed + " Cal today, which is " + energyPercentage + " of my daily target!I enjoy using Appibuddy! \nPlease download the app @ www.appibuddy.com";

            break;
        case "Blood Sugar Monitor":

            var obj = generateBSTemplate.bloodSugarCurrentValue;

            var date;

            var txtResult = "";
            for (var i = 0; i < obj.length; i++) {

                date=obj[i]['time'].split(" ")[0];
                var time = obj[i]['time'].split(" ")[1];
                var value = obj[i]['reading'];
                var condition = obj[i]['condition'];
                var insulin = obj[i]['insulin'];

                if (value !== "" && value !== 0) {
                    if (txtResult.length > 0) {
                        txtResult += ",";
                    }
                    txtResult += value + " mmol/L at " + time;
                    debuglog(insulin === "")
                    txtResult += " and I injected " + (insulin === "" ? 0 : insulin) + " IU " + bloodSugarConditions[condition]["BS_CONDITION"];

                }
            }

            if (txtResult.length < 1) {
                txt += "No Data Yet";
            } else {
                txt += "My blood glucose level records on " + date + " are " + txtResult;
            }
            subject = "Blood Glucose chart for " + date + " (mmol/L)";

            txt += "\nI enjoy using Appibuddy! \nPlease download the app @ www.appibuddy.com";
            break;

    }

    closeShareDialog();
    var message = {
        text: txt,
        subject: subject

    };

    debuglog(txt)
    debuglog(subject)

    addBuddies(SHARE_BUDDY, 7, null, null);

    window.socialmessage.send(message);
    return;
}


function inviteFriends() {
    var subject = "Join me at Appibuddy!";

    var txt = "Hi! I'm eating and living healthy with #Appibuddy! Come and join me, we can compare notes on food and exercise, earn buddy points and motivate each other. \nPlease download the app @ www.appibuddy.com";
    var message = {
        text: txt,
        subject: subject

    };

    addBuddies(SHARE_BUDDY, 7, null, null);

    if (window.socialmessage)
        window.socialmessage.send(message);
}

function openShareRouteDialog(id) {
    window.localStorage.setItem("shareRouteId", id);
    document.getElementById('dialogShare').style.display = 'block';
    document.getElementById('fadeShare').style.display = 'block';
}

function openSpecificShareRouteDialog(id) {
    window.localStorage.setItem("shareRouteId", id);
    document.getElementById('dialogShareRoute').style.display = 'block';
    document.getElementById('fadeShareRoute').style.display = 'block';
}

function closeSpecificShareDialog() {
    document.getElementById('dialogShareRoute').style.display = 'none';
    document.getElementById('fadeShareRoute').style.display = 'none';
}

function openShareDialog(title) {
    window.localStorage.setItem("shareType", title);
    $("#lblTitle").html(title);


    document.getElementById('dialogShare').style.display = 'block';
    document.getElementById('fadeShare').style.display = 'block';
}

function closeShareDialog() {
    document.getElementById('dialogShare').style.display = 'none';
    document.getElementById('fadeShare').style.display = 'none';
}

function openEarnDialog() {
    var earnBuddyElem = document.getElementById('dialogEarnBuddy');
    var fadeEarnBuddyElem = document.getElementById('dialogEarnBuddy');

    if (earnBuddyElem)
        earnBuddyElem.style.display = 'block';
    if (fadeEarnBuddyElem)
        fadeEarnBuddyElem.style.display = 'block';
}

function closeEarnDialog() {
    document.getElementById('dialogEarnBuddy').style.display = 'none';
    document.getElementById('fadeEarnBuddy').style.display = 'none';

    //var currentPageName = $.mobile.activePage.attr("name");

}

function updateBuddies(resp) {
        if (resp && "remaining_buddy_per_week" in resp) {
            var rp = parseInt(resp.remaining_buddy_per_week);
            if (rp > 0) {
                openEarnDialog();
            }
        }

        if (resp && "total_buddy_earned" in resp) {
            var total_buddy = resp.total_buddy_earned;
            if (total_buddy > 0) {
                var buddy = parseInt(total_buddy);
                window.localStorage.setItem("BUDDY_BALANCE", buddy);
                gHomeObject.homeapiMemCache.invalidate();
                $("#lblBuddy").html(buddy + ' pts');
                $("#totalBuddy").html(buddy + ' pts');
                $("#totalBuddyRewards").html(buddy + ' pts');
                $("#totalBuddyReview").html(buddy + ' pts');
                $("#totalBuddyWallet").html(buddy + ' pts');
                $("#totalBuddyCoup").html(buddy + ' pts');
                $("#lblBuddyHome").html(buddy + ' pts');
            }
        }
}
