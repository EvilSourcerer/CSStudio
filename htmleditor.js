function changeHTML()
{
    var iframe = document.getElementById('iframe-select');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var editor = ace.edit("editor");

    innerDoc.documentElement.innerHTML=patchHTML(editor.getValue());
}
function patchHTML(input)
{
    output=new DOMParser().parseFromString(input, "text/xml");
    var all=output.querySelectorAll("*");
    for(var i = 0, max = all.length; i < max; i++)
    {
        all[i].setAttribute("safeonmousedown",all[i].getAttribute("onmousedown") || "");
        all[i].setAttribute("safehref",all[i].getAttribute("href") || "");
        all[i]=tagify(all[i]);
    }
    console.log(output);
    return new XMLSerializer().serializeToString(output);
}