/*
This looks pretty complex, but it really isn't! This is just the drag-drop mechanism! It even has a few useful functions such as tagify, which makes html clickable! 
*/
var dragging;
$(function () {
    var clientFrameWindow = $('#iframe-select').get(0).contentWindow;
    $("#myDropdown a").on('dragstart', function () {
        dragging = event.target;
    });
    $("#myDropdown a").on('dragend', function () {
        event.preventDefault();
        event.stopPropagation();
        var iframe = document.getElementById('iframe-select');
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;


        if (innerDoc.elementsFromPoint(event.clientX, event.clientY)[0].tagName != "section") {
            var key=dragging.innerHTML;
            var fs = require('fs');
            var obj = JSON.parse(fs.readFileSync(__dirname + '\\controls.json', 'utf8'));
            innerDoc.elementsFromPoint(event.clientX, event.clientY)[0].insertAdjacentHTML('beforeend', tagify(obj[key]));
        }
    });
    $('#iframe-select').on('load', function () {
        var total = 0;
        $(clientFrameWindow.document.body).find('*').on('dragenter', function (event) {
            event.preventDefault();
            event.stopPropagation();
            total += 1;
        }).on('dragover', function (event) {
            event.preventDefault();
            event.stopPropagation();
            total += 1;
        });
    });
});
function addelement(x, y)
{

}
function tagify(htmlcode)
{
    parser = new DOMParser();
    doc = parser.parseFromString(htmlcode, "text/xml");
    var all = doc.querySelectorAll("a,h1,h2,h3,h4,h5,h6,p,section,nav,footer,div,input");
    for (var i = 0, max = all.length; i < max; i++) {
        var itemid=Math.random().toString(36).substr(2, 9);
        all[i].id = itemid;
        all[i].setAttribute("safehref",all[i].getAttribute("href"));
        all[i].setAttribute("href","javascript:void(0)");
        all[i].setAttribute("ondblclick","window.parent.editElement()");
        all[i].setAttribute("onmousedown","event.stopPropagation();window.parent.selectcontrol('" + itemid + "');");
    }
    return new XMLSerializer().serializeToString(doc);
}