/**
 * Sequentially loads the required PlayCanvas application runtime script libraries
 * @param {*} libs - string or string[] of required canvas script libraries to load
 * @param {*} callback - function to call when all required script libraries are loaded
 */
pc.Application.prototype.require = function(libs, callback) {
    var injectScriptTags = function (scripts, index, callback) {
        var header = document.head || document.getElementsByTagName("head")[0];        
        if (scripts[index]) {
            var filesrc = scripts[index];
            var fileref = document.createElement("script");
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", filesrc);
            fileref.onerror = function(err) {
                console.warn("Failed to load PlayCanvas script tag for " + filesrc + ". " + err.message);
                index = index + 1;
                injectScriptTags(scripts, index, callback)
            };
            fileref.onload = function() {
                index = index + 1;
                injectScriptTags(scripts, index, callback)
            };
            header.appendChild(fileref)
        } else {
            if (callback != null) {
                callback();
            }
        }
    };
    if (libs != null && libs instanceof String) {
        injectScriptTags([libs], 0, callback);
    } else if (libs != null && libs instanceof Array) {
        injectScriptTags(libs, 0, callback);
    } else {
        console.warn("Invalid required script libraries specfied for the pc.Application.require prototype.");
    }
};