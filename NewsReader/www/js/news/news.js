

var currentCounts={
    newsFeed:{currentCount:1,topLimit:1,bottomLimit:1},
    newsTopic:{currentCount:1,topLimit:1,bottomLimit:1},
    newsChannel:{currentCount:1,topLimit:1,bottomLimit:1}
};
var verticalColumns={1:"newsChannel",2:"newsTopic",3:"newsFeed"};
var verticalCount=3;
var rssFeeds={
    CNN:{
        Top_Stories:{LABEL:"Top Stories", LINK:"http://rss.cnn.com/rss/edition.rss"},
        World:{LABEL:"World", LINK:"http://rss.cnn.com/rss/edition_world.rss"},
        Africa:{LABEL:"Africa", LINK:"http://rss.cnn.com/rss/edition_africa.rss"},
        Americas:{LABEL:"Americas", LINK:"http://rss.cnn.com/rss/edition_americas.rss"},
        Asia:{LABEL:"Asia", LINK:"http://rss.cnn.com/rss/edition_asia.rss"},
        Europe:{LABEL:"Europe", LINK:"http://rss.cnn.com/rss/edition_europe.rss"},
        Middle_East:{LABEL:"Middle East", LINK:"http://rss.cnn.com/rss/edition_meast.rss"},
        US:{LABEL:"US", LINK:"http://rss.cnn.com/rss/edition_us.rss"},
        Money:{LABEL:"Money", LINK:"http://rss.cnn.com/rss/money_news_international.rss"},
        Technology:{LABEL:"Technology", LINK:"http://rss.cnn.com/rss/edition_technology.rss"},
        Science_Space:{LABEL:"Science & Space", LINK:"http://rss.cnn.com/rss/edition_space.rss"},
        Entertainment:{LABEL:"Entertainment", LINK:"http://rss.cnn.com/rss/edition_entertainment.rss"},
        World_Sport:{LABEL:"World Sport", LINK:"http://rss.cnn.com/rss/edition_sport.rss"}
    },
    BBC:{
        Top_Stories:{LABEL:"Top Stories", LINK:"http://feeds.bbci.co.uk/news/rss.xml"},
        World:{LABEL:"World", LINK:"http://feeds.bbci.co.uk/news/world/rss.xml"},
        UK:{LABEL:"UK", LINK:"http://feeds.bbci.co.uk/news/uk/rss.xml"},
        Business:{LABEL:"Business", LINK:"http://feeds.bbci.co.uk/news/business/rss.xml"},
        Politics:{LABEL:"Politics", LINK:"http://feeds.bbci.co.uk/news/politics/rss.xml"},
        Health:{LABEL:"Health", LINK:"http://feeds.bbci.co.uk/news/health/rss.xml"},
        Education_Family:{LABEL:"Education & Family", LINK:"http://feeds.bbci.co.uk/news/education/rss.xml"},
        Science_Environment:{LABEL:"Science & Environment", LINK:"http://feeds.bbci.co.uk/news/science_and_environment/rss.xml"},
        Technology:{LABEL:"Technology", LINK:"http://feeds.bbci.co.uk/news/technology/rss.xml"},
        Entertainment_Arts:{LABEL:"Entertainment & Arts", LINK:"http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml"}
    },
    TIME:{
        Top_Stories:{LABEL:"Top Stories", LINK:"http://feeds.feedburner.com/time/topstories?format=xml"},
        Politics:{LABEL:"Politics", LINK:"http://time.com/politics/feed/"},
        World_News:{LABEL:"World News", LINK:"http://feeds.feedburner.com/time/world?format=xml"},
        Business_News:{LABEL:"Business News", LINK:"http://time.com/business/feed/"},
        Technology_News:{LABEL:"Technology News", LINK:"http://time.com/tech/feed/"},
        Science_Health:{LABEL:"Science Health", LINK:"http://feeds.feedburner.com/time/scienceandhealth?format=xml"},
        Opinion:{LABEL:"Opinion", LINK:"http://feeds.feedburner.com/time/joeklein?format=xml"}
    },
    FOX:{
        Top_Stories:{LABEL:"Top Stories", LINK:"http://feeds.foxnews.com/foxnews/latest?format=xml"},
        Entertainment:{LABEL:"Entertainment", LINK:"http://feeds.foxnews.com/foxnews/entertainment?format=xml"},
        Health_News:{LABEL:"Health News", LINK:"http://feeds.foxnews.com/foxnews/health?format=xml"},
        Opinion:{LABEL:"Opinion", LINK:"http://feeds.foxnews.com/foxnews/opinion?format=xml"},
        Politics:{LABEL:"Politics", LINK:"http://feeds.foxnews.com/foxnews/politics?format=xml"},
        Technology:{LABEL:"Technology", LINK:"http://feeds.foxnews.com/foxnews/tech?format=xml"},
        Travel:{LABEL:"Travel", LINK:"http://feeds.foxnews.com/foxnews/internal/travel/mixed?format=xml"}
    },
    NYT:{
        Top_Stories:{LABEL:"Top Stories", LINK:"http://rss.nytimes.com/services/xml/rss/nyt/InternationalHome.xml"},
        World:{LABEL:"World", LINK:"http://rss.nytimes.com/services/xml/rss/nyt/World.xml"},
        US:{LABEL:"US", LINK:"http://rss.nytimes.com/services/xml/rss/nyt/US.xml"},
        Europe:{LABEL:"Europe", LINK:"http://rss.nytimes.com/services/xml/rss/nyt/Europe.xml"},
        AsiaPacific:{LABEL:"AsiaPacific", LINK:"http://rss.nytimes.com/services/xml/rss/nyt/AsiaPacific.xml"},
        MiddleEast:{LABEL:"MiddleEast", LINK:"http://rss.nytimes.com/services/xml/rss/nyt/MiddleEast.xml"},
        Americas:{LABEL:"Americas", LINK:"http://rss.nytimes.com/services/xml/rss/nyt/Americas.xml"},
        Africa:{LABEL:"Africa", LINK:"http://rss.nytimes.com/services/xml/rss/nyt/Africa.xml"},
        Health:{LABEL:"Health", LINK:"http://rss.nytimes.com/services/xml/rss/nyt/Health.xml"},
        Science:{LABEL:"Science", LINK:"http://rss.nytimes.com/services/xml/rss/nyt/Science.xml"},
        InternationalSports:{LABEL:"InternationalSports", LINK:"http://rss.nytimes.com/services/xml/rss/nyt/InternationalSports.xml"},
        Technology:{LABEL:"Technology", LINK:"http://rss.nytimes.com/services/xml/rss/nyt/Technology.xml"},
        Business:{LABEL:"Business", LINK:"http://rss.nytimes.com/services/xml/rss/nyt/Business.xml"}
    },
    TOI:{
        Top_Stories:{LABEL:"Top Stories", LINK:"http://toi.timesofindia.indiatimes.com/rssfeedstopstories.cms"},
        India_News:{LABEL:"India News", LINK:"http://timesofindia.feedsportal.com/c/33039/f/533916/index.rss"},
        World_News:{LABEL:"World News", LINK:"http://timesofindia.feedsportal.com/c/33039/f/533917/index.rss"},
        Business_News:{LABEL:"Business News", LINK:"http://timesofindia.feedsportal.com/c/33039/f/533919/index.rss"},
        Cricket_News:{LABEL:"Cricket News", LINK:"http://timesofindia.feedsportal.com/c/33039/f/533920/index.rss"},
        Sports:{LABEL:"Sports", LINK:"http://timesofindia.feedsportal.com/c/33039/f/533921/index.rss"},
        Health_Fitness:{LABEL:"Health & Fitness", LINK:"http://timesofindia.feedsportal.com/c/33039/f/533968/index.rss"},
        Science_News:{LABEL:"Science News", LINK:"http://timesofindia.feedsportal.com/c/33039/f/533922/index.rss"},
        Technology_News:{LABEL:"Technology News", LINK:"http://timesofindia.feedsportal.com/c/33039/f/533923/index.rss"},
        Entertainment_News:{LABEL:"Entertainment News", LINK:"http://timesofindia.feedsportal.com/c/33039/f/533928/index.rss"},
        South_Asia:{LABEL:"South Asia", LINK:"http://timesofindia.feedsportal.com/c/33039/f/533993/index.rss"},
        USA:{LABEL:"USA", LINK:"http://timesofindia.feedsportal.com/c/33039/f/533991/index.rss"},
        Europe_News:{LABEL:"Europe News", LINK:"http://timesofindia.feedsportal.com/c/33039/f/533995/index.rss"},
        GULF:{LABEL:"GULF", LINK:"http://timesofindia.feedsportal.com/c/33039/f/533997/index.rss"}
        
    },
    NDTV:{
        Top_Stories:{LABEL:"Top Stories", LINK:"http://feeds.feedburner.com/NdtvNews-TopStories?format=xml"},
        Trending_News:{LABEL:"Trending News", LINK:"http://feeds.feedburner.com/NDTV-Trending?format=xml"},
        Business_News:{LABEL:"Business News", LINK:"http://feeds.feedburner.com/NDTV-Business?format=xml"},
        Cricket_News:{LABEL:"Cricket News", LINK:"http://feeds.feedburner.com/NDTV-Cricket?format=xml"},
        All_India:{LABEL:"All India", LINK:"http://feeds.feedburner.com/ndtv/Lsgd?format=xml"},
        World_News:{LABEL:"World News", LINK:"http://feeds.feedburner.com/ndtv/TqgX?format=xml"},
        Technology_News:{LABEL:"Technology News", LINK:"http://feeds.feedburner.com/NDTV-Tech?format=xml"},
        Tamilnadu_News:{LABEL:"Tamil-nadu News", LINK:"http://feeds.feedburner.com/News-TN?format=xml"}
    }
};


$(document).keydown(function(e) {
    console.log(e.which);
    var currentVariable=verticalColumns[verticalCount];
    $("#"+currentVariable+"_"+currentCounts[currentVariable]["currentCount"]).parent().scrollTop(getCurrentScrollHeight(currentVariable,currentCounts[currentVariable]["currentCount"]));
    if(e.which == 38) {
        console.log('You pressed up!');
        if(currentCounts[currentVariable]["currentCount"]!==currentCounts[currentVariable]["topLimit"])
        {
            currentCounts[currentVariable]["currentCount"]--;
        }
        else
        {
            console.log('Top reached....');
        }
        clearHighlight(currentVariable);
        highlightElement(currentVariable+"_"+currentCounts[currentVariable]["currentCount"]);
    }
    else if(e.which == 40) {
        console.log('You pressed down!');
        if(currentCounts[currentVariable]["currentCount"]!==currentCounts[currentVariable]["bottomLimit"])
        {
            currentCounts[currentVariable]["currentCount"]++;
        }
        else
        {
            console.log('Bottom reached....');
        }
        clearHighlight(currentVariable);
        highlightElement(currentVariable+"_"+currentCounts[currentVariable]["currentCount"]);
    }
    else if(e.which == 37) {
        console.log('You pressed left!');
        if(verticalCount!==1)
            verticalCount--;
        clearHighlight(currentVariable);
        highlightElement(verticalColumns[verticalCount]+"_"+currentCounts[verticalColumns[verticalCount]]["currentCount"]);
    }
    else if(e.which == 39) {
        console.log('You pressed right!');
        if(verticalCount!==3)
            verticalCount++;
        clearHighlight(currentVariable);
        highlightElement(verticalColumns[verticalCount]+"_"+currentCounts[verticalColumns[verticalCount]]["currentCount"]);
    }
    else if(e.which == 13) {
        console.log('You pressed Enter!');
        $("#"+currentVariable+"_"+currentCounts[currentVariable]["currentCount"]+"").click();
        clearClick(currentVariable);
        clickElement(verticalColumns[verticalCount]+"_"+currentCounts[verticalColumns[verticalCount]]["currentCount"]);
    }
});


$(document).on("pageshow", "#bbc", function () {
    var html = "";
    var count = 0;
    for (var channel in rssFeeds) {
        if (rssFeeds.hasOwnProperty(channel)) {
            count++;
            html += "<li onclick=\"constructNewsTopicsList('" + channel + "', '"+count+"')\" class='newsChannel' id='newsChannel_" + count + "' style='text-decoration: none;padding: 10% 4% 10% 4%;border-bottom: 1px solid red;";
            html += "   <a style='text-decoration: none;'>" + channel + "</a>";
            html += "</li>";
        }
    }
    
    currentCounts.newsChannel.bottomLimit=count;
    $("#newsChannelsList").html(html).trigger("create");

    constructNewsTopicsList("CNN");
    currentCounts.newsChannel.currentCount=1;
    currentCounts.newsChannel.bottomLimit=7;
    
});

function constructNewsTopicsList(channel,currentCountTemp)
{
    if(currentCountTemp)
        currentCounts.newsChannel.currentCount=currentCountTemp;
   var html="";
   var count=0;
   for (var topic in rssFeeds[channel]) {
        if (rssFeeds[channel].hasOwnProperty(topic)) {
            count++;
            html += "<li onclick=\"constructNewsFeedList('"+channel+"','"+topic+"', '"+count+"')\" class='newsTopic' id='newsTopic_"+count+"' style='text-decoration: none;padding: 10% 4% 10% 4%;border-bottom: 1px solid red;";
            html += "   <a style='text-decoration: none;'>"+rssFeeds[channel][topic]["LABEL"]+"</a>";
            html += "</li>";
        }
    }
    currentCounts.newsTopic.currentCount=1;
    currentCounts.newsTopic.bottomLimit=count;
    $("#newsTopicsList").html(html).trigger("create");
    constructNewsFeedList(channel, "Top_Stories");
    $("#newsHeading").html(channel+" -- "+"");
    
}

function constructNewsFeedList(channel, topic, currentCountTemp)
{
    if(currentCountTemp)
        currentCounts.newsTopic.currentCount=currentCountTemp;
    
    var FEED_URL=rssFeeds[channel][topic]["LINK"];
    $.get(FEED_URL, function (data) {
        var html = "";
        var imageUrl="";
        
        var channelTitle=$(data).find("channel>title").text();
        var channelDescription=$(data).find("channel>description").text();
        var channelImage=$(data).find("channel>image>url").text();
        
        $("#channelTitle").html(channelTitle);
        $("#channelDescription").html(channelDescription);
        $("#channelImage").attr("src",channelImage);
        
        var count=0;
        $(data).find("item").each(function () {
            count++;
            var el = $(this);
            if(el.find("thumbnail")[1])
            {
                imageUrl=el.find("thumbnail")[1].getAttribute("url");
            }
            else if(el.find("thumbnail")[0])
            {
                imageUrl=el.find("thumbnail")[0].getAttribute("url");
            }
            html += "<li onclick='openInAppBrowser(\"" + el.find("link").text() + "\")' class='newsFeed' id='newsFeed_"+count+"' data-role='fieldcontain' style='background: white;padding: 5px 7px 2px 7px;color: black;border-bottom: 1px solid red;margin: 0px 3px 3px 3px;' class='font-11'>";
            html += "  <table>";
            html += "      <tr>";
            html += "          <td rowspan='2'>";
            //max-width: 140px; for 768 width
            html += "             <img style='width:"+((140/768)*$(window).width())+"px"+" ;' src='" + imageUrl + "'/>";
            html += "          </td>";
            html += "          <td class='font-bold'>";
            html += "              " + el.find("title").text();
            html += "          </td>";
            html += "      </tr>";
            html += "      <tr class='newsContent'>";
            html += "          <td>";
            html += "              " + el.find("description").text().split("<")[0];
            html += "          </td>";
            html += "      </tr>";
            html += "      </tr>";
            html += "  </table>";
            html += "</li>";
        });
        
        currentCounts.newsFeed.currentCount=1;
        currentCounts.newsFeed.bottomLimit=count;
        $("#newsFeedsList").html(html).trigger("create");
        $("#newsFeedsList").css("overflow","scroll");
        adjustHeight();
        clearClick(verticalColumns[1]);
        clearClick(verticalColumns[2]);
        clearHighlight(verticalColumns[1]);
        clearHighlight(verticalColumns[2]);
        
        clickElement("newsFeed_"+currentCounts.newsFeed.currentCount);
        clickElement("newsTopic_"+currentCounts.newsTopic.currentCount);
        clickElement("newsChannel_"+currentCounts.newsChannel.currentCount);
        
        highlightElement("newsFeed_"+currentCounts.newsFeed.currentCount);
    });
    
}

function getCurrentScrollHeight(currentVariable,count)
{
    var height=0;
    for(var i=1; i<count; i++)
    {
        height=height+$("#"+currentVariable+"_"+i).outerHeight();
    }
    return height;
}

function clickElement(id)
{
    $("#"+id).css("border","4px solid rgb(255, 104, 104)");
    //for 768 - 7px
//    $("#"+id).css("border-radius",((7/768)*$(window).width())+"px");
}

function clearClick(classVar)
{
    $("."+classVar).css("border","0");
//    $("."+classVar).css("border-radius","");
    $("."+classVar).css("border-bottom","1px solid red");
    //for 768 - 7px
//    $("."+classVar).css("border-bottom-radius",((7/768)*$(window).width())+"px");
}

function highlightElement(id)
{
    $("#"+id).css("background","rgb(203, 199, 199)");
}

function clearHighlight(classVar)
{
    $("."+classVar).css("background","");
}

function adjustHeight(){
    
    var width = $(window).width();
    var height = $(window).height();
    $("#newsChannelsList").width(width * 0.1);
    $("#newsTopicsList").width(width * 0.15);
    $("#newsFeedsList").width(width * 0.75);
    
    $("#newsChannelsList").height(height);
    $("#newsFeedsList").height(height);
    $("#newsTopicsList").height(height);
    
    
    //for 768 - 24pt 
    $("#channelTitle").css("font-size", ((24/768)*width)+"pt");
    //for 768 - 15pt 
    $("#channelDescription").css("font-size", ((15/768)*width)+"pt");
    //for 768 - 13pt 
    $("#otherFontsTable").css("font-size", ((14/768)*width)+"pt");
    $(".newsContent").css("font-size", ((13/768)*width)+"pt");

    
}

function openInAppBrowser(link)
{
    window.open(link, '_blank', 'location=yes');
}
//
//
//$(document).on("pageshow", "#bbc", function () {
//    var FEED_URL = "http://feeds.bbci.co.uk/news/rss.xml";
//
//    $.ajax({
//        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(FEED_URL),
//        dataType: 'json',
//        success: function (data) {
//            if (data.responseData.feed && data.responseData.feed.entries) {
//                var html="";
//                $.each(data.responseData.feed.entries, function (i, e) {
////                    console.log("------------------------");
////                    console.log("title      : " + e.title);
////                    console.log("author     : " + e.author);
////                    console.log("description: " + e.description);
//                    html +="<li  data-role='fieldcontain' style='background: #CBC7C7;padding: 5px 7px 2px 7px;color: rgb(90, 88, 88);border: 1px solid rgb(173, 173, 173);margin: 3px 3px 3px 3px;' class='font-11'>";
//                    html +="  <a target='_blank' href='"+e.link+"'>";
//                    html +="  <table>";
//                    html +="      <tr>";
//                    html +="          <td class='font-bold'>";
//                    html +="              "+e.title;
//                    html +="          </td>";
//                    html +="      </tr>";
//                    html +="      <tr>";
//                    html +="          <td>";
//                    html +="              "+e.content;
//                    html +="          </td>";
//                    html +="      </tr>";
//                    html +="      </tr>";
//                    html +="  </table>";
//                    html +="  </a>";
//                    html +="</li>";
//                });
//                
//                $("#bbcListView").append(html).trigger("create");
//            }
//        }
//    });
//});