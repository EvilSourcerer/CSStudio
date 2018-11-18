function addAttributeListener(id, attrtype, placeholder, title, style)
{
    if (style)
    {
        var iframe = document.getElementById('iframe-select');
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        var currentelement = innerDoc.getElementById(id);
        document.getElementById("sidebar2").insertAdjacentHTML('beforeend', '<h1 id="oldcontent" style="font-size: 19px;color: rgb(157,157,157);">' + title + '</h1>');
        document.getElementById("sidebar2").insertAdjacentHTML('beforeend', '<input id="' + attrtype + 'setting" oninput="editAttr(\'' + id + '\',\'' + attrtype + '\',\'' + attrtype + 'setting\',true)" placeholder="' + placeholder + '" style="width: 95%;margin-left: 5px;outline: none;border-style: none;border-bottom: 1px solid rgb(102,182,255);background-color: rgb(51,50,58);color: rgb(255,255,255);" value=\"' + currentelement.style.getPropertyValue(attrtype) + '\">');
    }
    else
    {
        var iframe = document.getElementById('iframe-select');
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        var currentelement = innerDoc.getElementById(id);
        document.getElementById("sidebar2").insertAdjacentHTML('beforeend', '<h1 id="oldcontent" style="font-size: 19px;color: rgb(157,157,157);">' + title + '</h1>');
        document.getElementById("sidebar2").insertAdjacentHTML('beforeend', '<input id="' + attrtype + 'setting" oninput="editAttr(\'' + id + '\',\'' + attrtype + '\',\'' + attrtype + 'setting\',false)" placeholder="' + placeholder + '" style="width: 95%;margin-left: 5px;outline: none;border-style: none;border-bottom: 1px solid rgb(102,182,255);background-color: rgb(51,50,58);color: rgb(255,255,255);" value=\"' + currentelement.getAttribute(attrtype) + '\">');
    }

}

function editAttr(id, attrtype, editid,style)
{
    var newval=document.getElementById(id);
    var element = (document.getElementById('iframe-select').contentDocument || document.getElementById('iframe-select').contentWindow.document).getElementById(id);
    if(style)
    {
        element.style.setAttribute(attrtype,newval);
    }
    else
    {
        element.setAttribute(attrtype,newval);
    }
}