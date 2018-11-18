var previousid = 0;
var currentelement = null;

function selectcontrol(controlid) /* SELECT A CONTROL */
{
    try { document.getElementById("sidebar2").querySelectorAll('*').forEach(element => element.remove()); } catch{ }
    var iframe = document.getElementById('iframe-select');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    deselect();
    currentelement = innerDoc.getElementById(controlid);

    previousstyleborder = currentelement.style.borderStyle;
    previousstylebordercolor = currentelement.style.borderColor;
    currentelement.style.borderStyle = "solid";
    currentelement.style.borderColor = "#7ccc70";
    addAttributeListener(currentelement.id, "href", "lidfshnk", "Ldfshink");
    previousid = controlid;
}
function deselect()
{
    if (previousid != 0)
    {
        var previouselement = innerDoc.getElementById(previousid);
        previouselement.style.borderStyle = previousstyleborder;
        previouselement.style.borderColor = previousstylebordercolor;
        previouselement.contentEditable = false;
    }
}