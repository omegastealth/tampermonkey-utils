// ==UserScript==
// @name         Kotaku GIF Display Toggle
// @namespace    http://your.homepage/
// @version      0.2
// @description  Add togglelink to GIFs
// @author       os42
// @include      https://www.kotaku.com.au/20*
// @include      http://www.kotaku.com.au/20*
// @include      https://www.gizmodo.com.au/20*
// @include      http://www.gizmodo.com.au/20*
// @include      https://www.lifehacker.com.au/20*
// @include      http://www.lifehacker.com.au/20*
// @grant        none
// ==/UserScript==

/**
 * Changelog:
 * 0.2 - Added similar behaviour to streamable.com iframe following failure to prevent autoplay of the included video
 * 0.1 - Initial implementation
 */

$(function() {
    //Gifs
    $('div.media_wrap.image.xlarge>a>img[src$=".gif"]').each(
        function(i, el) {
            var id = getGuid();
            var img_div = $(el).parent('a').parent('div').attr('id', id);
            img_div.before(
                $('<div>').html(
                    $('<a>Toggle GIF</a>').click(function() {
                        $('#'+id).toggle();
                    })
                )
            );
            img_div.hide();
        });
    //Streamable.com iframes
    $('iframe[src^="https://streamable"]').each(
        function(i, el) {
            var id = getGuid();
            var vid_iframe = $(el).attr('id', id);
            vid_iframe.before(
                $('<div>').html(
                    $('<a>Toggle Video</a>').click(function() {
                        $('#'+id).toggle();
                    })
                )
            );
            vid_iframe.hide();
        });
});

function getGuid() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
    }

    // then to call it, plus stitch in '4' in the third group
    guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    return guid;
}