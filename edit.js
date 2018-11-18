var previousid = 0;
var previousstyleborder = "";
var previousstylebordercolor = "";
var currentelement;
function componentToHex(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return parseInt(result[1], 16) + " " + parseInt(result[2], 16) + " " + parseInt(result[3], 16)
}
function changestyle(value) {
    if (value == "width") {
        currentelement.style.width = document.getElementById("widthsetting").value;
    }
    if (value == "height") {
        currentelement.style.height = document.getElementById("heightsetting").value;
    }
    if (value == "margbot") {
        currentelement.style.marginBottom = document.getElementById("margbotsetting").value;
    }
    if (value == "margtop") {
        currentelement.style.marginTop = document.getElementById("margtopsetting").value;
    }
    if (value == "margleft") {
        currentelement.style.marginLeft = document.getElementById("margleftsetting").value;
    }
    if (value == "margright") {
        currentelement.style.marginRight = document.getElementById("margrightsetting").value;
    }
    if (value == "href") {
        if (document.getElementById("urlsetting").value == "") {
            currentelement.setattribute("safehref", "javascript:void(0)");
        }
        else {
            currentelement.setAttribute("safehref", document.getElementById("urlsetting").value);
        }
    }
    if (value == "backcolor") {
        currentelement.style.backgroundColor = document.getElementById("backgroundcolorsetting").value;
    }
    if (value == "forecolor") {
        currentelement.style.color = document.getElementById("foregroundcolorsetting").value;
    }
    if (value == "backimage") {
        currentelement.style.backgroundImage = "url(" + document.getElementById("backimagesetting").value + ")";
    }
    if (value == "fontsize") {
        currentelement.style.fontSize = document.getElementById("fontsizesetting").value;
    }
    if (value == "fontstyle") {
        currentelement.style.fontFamily = document.getElementById("fontstylesetting").value;
    }
    if (value == "fontstyle") {
        currentelement.style.fontFamily = document.getElementById("fontstylesetting").value;
    }
    if (value == "flexbox") {
        currentelement.style.display = document.getElementById("flexsetting").value;
    }
    if (value == "justify") {
        currentelement.style.justifyContent = document.getElementById("justifysetting").value;
    }
    if (value == "float") {
        currentelement.style.float = document.getElementById("floatsetting").value;
    }
    if (value == "custom") {
        var incustom = document.getElementById("customcss").value.split("\n");
        for (var i = 0; i < incustom.length; i++) {
            currentelement.style.setProperty(incustom[i].split(":")[0], incustom[i].split(":")[1]);
        }
    }
}