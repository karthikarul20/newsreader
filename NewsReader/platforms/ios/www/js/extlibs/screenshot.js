	var exec = require('cordova/exec');

    module.exports = {

    	saveScreenshot: function(mills) {
			exec(null, null, "Screenshot", "saveScreenshot", []);
        }
	};
