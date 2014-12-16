/**
 * @author Konstantin Kitmanov <doctor.hogart@gmail.com>
 * @license MIT
 */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) { // AMD anonymous module
		define([], factory);
	} else if (typeof exports === 'object') { // NodeJS/CommonJS-like module
		module.exports = factory();
	} else { // Browser globals (root is window)
		root.vtt2srt = factory();
	}
}(this, function () {
	'use strict';

    'use strict';

    // based on https://github.com/ymoradi/SubtitleHelper/blob/master/SubtitleHelper.cs
    
    var vttRemoval = /(WEBVTT\s+)(\d{2}:)/mg;
    var itemMatcher = /(\d{2}:\d{2}:\d{2})\.(\d{3}\s+)-->(\s+\d{2}:\d{2}:\d{2})\.(\d{3}\s*)/mg;

    function vtt2srt (vttString, separator) {
        separator = arguments.length === 2 ? separator : vtt2srt.separator;

        var srtString = vttString.replace(vttRemoval, '$2'); // removes VTT header
        var lineCounter = 0;

        srtString = srtString.replace(itemMatcher, function (match) {
            lineCounter++;

            return lineCounter + separator + match.replace(itemMatcher, '$1,$2-->$3,$4');
        });

        return srtString;
    }

    vtt2srt.separator = '\n';

    return vtt2srt;
}));