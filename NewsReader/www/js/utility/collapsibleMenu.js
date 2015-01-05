function changeCollapsibleMenu(name, type) {

    var status = $("#CollapsibleMenuContent" + name).css("display") + "";


    for (var i = 1; i <= 9; i++) {

        if (name === i)
        {
            if (status === "none") {
                openCollapsibleMenu(i);
            } else {
                closeCollapsibleMenu(i);
            }
        }
        else
        {
            if (type === undefined) {
                closeCollapsibleMenu(i);
            }
        }
    }

}


function openCollapsibleMenu(name) {
    $("#CollapsibleMenuContent" + name).css("display", "block");

    $("#changeCollapsibleMenuImg" + name).attr("src", app.imgFullPath + "icon_minus_c.png");


}

function closeCollapsibleMenu(name) {
    $("#CollapsibleMenuContent" + name).css("display", "none");

    $("#changeCollapsibleMenuImg" + name).attr("src", app.imgFullPath + "icon_plus_c.png");
}


$(document).on("pageshow", "#gameplay", function() {
    changeCollapsibleMenu(1);
    $("#CollapsibleMenuContent" + 1).css("display", "block");
    $("#changeCollapsibleMenuImg" + 1).attr("src", "../menu/img/foodtips/icon_minus.png");

});