setTimeout(function() /*REMOVE ALL LINKS. MAKE IT INTERACTABLE. SET IDS FOR EVERYTHING.*/
{
    var iframe = document.getElementById('iframe-select');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var all = innerDoc.querySelectorAll("a,h1,h2,h3,h4,h5,h6,p,section,nav,footer,div,input,button");

    for (var i = 0, max = all.length; i < max; i++)
    {
        var att = document.createAttribute("safehref");
        att.value = all[i].href;
        all[i].setAttributeNode(att);
        all[i].safehref = all[i].href;
        all[i].href = "javascript:void(0)";
        all[i].id = Math.random().toString(36).substr(2, 9);
        var att = document.createAttribute("onmousedown");
        att.value = "event.stopPropagation(); window.parent.selectcontrol(\"" + all[i].id + "\");";
        all[i].setAttributeNode(att);
        if (all[i].tagName == "A" || all[i].tagName == "H1" || all[i].tagName == "H2" || all[i].tagName == "H3" || all[i].tagName == "H4" || all[i].tagName == "H5" || all[i].tagName == "H6" || all[i].tagName == "P")
        {
            var att = document.createAttribute("ondblclick");
            att.value = "window.parent.EditElement(\"this.id\");";
            all[i].setAttributeNode(att);
            var att = document.createAttribute("onmouseover");
            att.value = "window.parent.onhover(this.id)";
            all[i].setAttributeNode(att);
        }
    }
    
}, 10);