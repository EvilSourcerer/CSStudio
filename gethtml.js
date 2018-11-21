document.getElementById('iframe-select').onload=function() {
var iframe = document.getElementById('iframe-select');
var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
var safe = new XMLSerializer().serializeToString(innerDoc);
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/html");
var pretty = require("pretty");
safe = pretty(readableHTML(safe),false);
editor.session.setValue(safe);
}
function readableHTML(input) {
    output=new DOMParser().parseFromString(input, "text/xml");
    var all=output.querySelectorAll("*");
    for(var i = 0, max = all.length; i < max; i++)
    {
        all[i].setAttribute("onmousedown",all[i].getAttribute("safeonmousedown") || "");
        all[i].setAttribute("href",all[i].getAttribute("safehref") || "");
    }
    console.log(output);
    return new XMLSerializer().serializeToString(output);
}