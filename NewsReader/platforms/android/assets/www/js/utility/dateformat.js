function getDay(d) {

    var weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return  weekday[d.getDay()];

}

function getMonthAbb(d) {

    var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return month[d.getMonth()];
}

function convertDateToOurString(date)
{
    if (date && date instanceof Date)
        d = date;
    else
    {
        var d = new Date();
        if (date !== null && date !== "") {
            d = new Date(date);
        }
    }
    var thisDate;
    if (moment(d).isSame(moment(),"day"))
        thisDate="Today";
    else if (moment(d).isSame(moment().subtract('days', 1),"day"))
        thisDate="Yesterday";
    else if (moment(d).isSame(moment().add('days', 1),"day"))
        thisDate="Tomorrow";
    else
        thisDate = getDay(d) + ", " + d.getDate() + " " + getMonthAbb(d) + " " + d.getFullYear();
    return (thisDate);
}

function pad0Number(number)
{
    var numWith0Padding;
    if (number < 10)
        numWith0Padding = "0" + number.toString();
    else
        numWith0Padding = number.toString();
    return numWith0Padding;
}

var dateFormat = {
    dmmmyyyy: function(date) {
       var currDt = date;

    var curr_date = currDt.getDate();
    var curr_year = currDt.getFullYear();

    return  curr_date + " " + getMonthAbb(currDt) + " " + curr_year;
    }
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

/*** Utilities functions object ***/
//Extending standard Date class with our need
Date.prototype.alxtoTimeString = function()
{
    var hours = pad0Number(this.getHours());
    var minutes = pad0Number(this.getMinutes());
    var seconds = pad0Number(this.getSeconds());
    return(hours + ":" + minutes + ":" + seconds);
};
Date.prototype.alxtoDateString = function()
{
    return(this.getFullYear() + "-" + pad0Number(this.getMonth() + 1) + "-" + pad0Number(this.getDate()));
};
Date.prototype.alxGetTimeZone = function()
{
    var timeString=this.toTimeString();
    var timeZone;
    if(timeString.indexOf("GMT") > -1)
    {
        timeZone=timeString.split("GMT")[1].substring(0, 5);
    }
    else if(timeString.indexOf("UTC") > -1)
    {
        timeZone=timeString.split("UTC")[1].substring(0, 5);
    }
    else
    {
        DBS && console.log("Timezone does not fit into either GMT ot UTC");
        DBS && console.log(timeString);
        timeZone = "+0000";
    }
    return timeZone;
};

//Get week number of this using moment.js (caution this is not always iso8601 week number depending on local
Date.prototype.getWeek = function (dowOffset) {
    var m=moment(this);
    return m.week();
};

function DurationObject(msec)
{
    this.totalmsec = msec;
    //convert totalmsec into hour, min, sec, msec
    this.hour = Math.floor(msec / 1000 / 60 / 60);
    msec -= this.hour * 1000 * 60 * 60;
    this.min = Math.floor(msec / 1000 / 60);
    msec -= this.min * 1000 * 60;
    this.sec = Math.floor(msec / 1000);
    msec -= this.sec * 1000;
    this.msec = msec;
    
    this.toString=function(format)
    {
        var strDuration;
        var h = this.hour + "h ";
        var m = this.min + "min ";
        var s = this.sec + "s";
        if(h==="0h "){h = "";}
        if(m==="0min "){m = "";}
        if(s==="0s"){s = "";}
        switch(format)
        {
            case "HH:MM":
                strDuration=pad0Number(this.hour) + ":" + pad0Number(this.min);
                break;
            case "HH:MM:SS":
                strDuration=pad0Number(this.hour) + ":" + pad0Number(this.min)+ ":" + pad0Number(this.sec);
                break;
            case "HM":
                if(h==="0h "&& m==="0min "){
                    strDuration="0h";
                }else{
                    strDuration = h + "" + m;
                    if (strDuration==="")
                        strDuration="0h";
                }
               break;
            case "hms":                
            default:
                strDuration= h + "" + m + "" + s + "";
                if(strDuration==="")
                    strDuration="0h";
        }
        return(strDuration);
    };
}


function getFirstDayOfWeek(date) {
    var beginNewD = moment(date);

    return  beginNewD.startOf('week').format('YYYY-MM-DD');
}

function getFirstDayOfMonth(date) {


    var beginNewD = moment(date);
    var obj = beginNewD.endOf('month');
    var year = obj.format('YYYY');
    var month = obj.format('MM');



    return  "01-" + month + "-" + year;
}


function getCurrentDayOfWeek(date, id){
    
       var mfirstDayOfWeek = moment(date).weekday(id);
       
     return mfirstDayOfWeek.format("YYYY-MM-DD");
    
}


