function nativeAlert(title, msg){
    
           navigator.notification.alert(
                msg, // message
                alertDismissed, // callback
                title, // title
                'OK'                  // buttonName
                );
}


function alertDismissed() {
    // do something after alertbox
}
