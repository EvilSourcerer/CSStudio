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
            if (dragging.id == "dragheading") {
                var itemid = Math.random().toString(36).substr(2, 9);
                innerDoc.elementsFromPoint(event.clientX, event.clientY)[0].insertAdjacentHTML('beforeend', tagify("<h1>Heading</h1>"));
            }
            if (dragging.id == "dragnav") {
                var itemid = Math.random().toString(36).substr(2, 9);
                innerDoc.elementsFromPoint(event.clientX, event.clientY)[0].insertAdjacentHTML('beforeend', tagify('<nav class="navbar navbar-light navbar-expand-xl fixed-top bg-white clean-navbar"> <div class="container"><a class="navbar-brand logo" href="#" style="margin-right:16px;font-size:13px;">Simpodex</a><button class="navbar-toggler" data-toggle="collapse" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button> <div class="collapse navbar-collapse" id="navcol-1"> <ul class="nav navbar-nav ml-auto"> <li class="nav-item" role="presentation" style="width:60px;"><a class="nav-link" href="https://www.simpodex.com/index.html" style="width:62px;font-size:12px;">Home</a></li> </ul> </div> </div> </nav>'));
            }
            if (dragging.id == "dragbutton") {
                var itemid = Math.random().toString(36).substr(2, 9);
                innerDoc.elementsFromPoint(event.clientX, event.clientY)[0].insertAdjacentHTML('beforeend',
                    '<a class="btn btn-primary" role="button" ondblclick="window.parent.EditElement()" onmousedown="event.stopPropagation();window.parent.selectcontrol(\'' + itemid +
                    '\')" id=' + itemid + '>a</a>');
            }
            if (dragging.id == "dragdiv") {
                var itemid = Math.random().toString(36).substr(2, 9);
                innerDoc.elementsFromPoint(event.clientX, event.clientY)[0].insertAdjacentHTML('beforeend',
                    '<div style="height:100px; width:100%; background-color:rgb(255, 0, 157)" ondblclick="window.parent.EditElement()" onmousedown="event.stopPropagation();window.parent.selectcontrol(\'' + itemid +
                    '\')" id="' + itemid + '"></div>');
            }
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