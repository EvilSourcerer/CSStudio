/*
Hey! This is where all the click events are!

*/
var previousid = 0;
var currentelement = null;
function selectcontrol(controlid,controltype) /* SELECT A CONTROL */
{
    try { document.getElementById("sidebar2").querySelectorAll('*').forEach(element => element.remove()); } catch{ console.log("oops"); }
    
    
    deselect();
    
    var iframe = document.getElementById('iframe-select');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    currentelement = innerDoc.getElementById(controlid);
    previousstyleborder = currentelement.style.borderStyle;
    previousstylebordercolor = currentelement.style.borderColor;
    currentelement.style.borderStyle = "solid";
    currentelement.style.borderColor = "#7ccc70";
    // function addAttributeListener(id, attrtype, placeholder, title, style)

    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync(__dirname + '\\options.json', 'utf8'));
    for(secondkey in obj[controltype])
    {
        addAttributeListener(currentelement.id,obj[controltype][secondkey][1],obj[controltype][secondkey][0],obj[controltype][secondkey][0],obj[controltype][secondkey][2]);
    }
    for(key in obj.Global)
    {
        addAttributeListener(currentelement.id,obj.Global[key][1],obj.Global[key][0],obj.Global[key][0],obj.Global[key][2]);
    }
    previousid = controlid;
}
function deselect()
{
    var iframe = document.getElementById('iframe-select');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    if (previousid != 0)
    {
        var previouselement = innerDoc.getElementById(previousid);
        previouselement.style.borderStyle = previousstyleborder;
        previouselement.style.borderColor = previousstylebordercolor;
        previouselement.contentEditable = false;
    }
}