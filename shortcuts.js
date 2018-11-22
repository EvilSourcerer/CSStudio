const electronLocalshortcut = require('electron-localshortcut');
var undoqueue = [];
var undoparent = [];
/*  */
electronLocalshortcut.register(require('electron').remote.getCurrentWindow(), 'Ctrl+D', () =>
{
    if (currentelement.getAttribute("contenteditable") == "false" || currentelement.getAttribute("contenteditable") == null)
    {
        currentelement.parentElement.insertAdjacentHTML('beforeend', currentelement.outerHTML);
    }
});
/* DELETE CONTROL */
electronLocalshortcut.register(require('electron').remote.getCurrentWindow(), 'Delete', () =>
{
    if (currentelement.getAttribute("contenteditable") == "false" || currentelement.getAttribute("contenteditable") == null)
    {
        undoparent.push(currentelement.parentElement);
        currentelement.style.borderStyle = previousstyleborder;
        currentelement.style.borderColor = previousstylebordercolor;
        currentelement.contentEditable=false;
        undoqueue.push(currentelement.outerHTML);
        var tempcurrent = currentelement.parentElement;
        currentelement.remove();
        currentelement = tempcurrent;
        previousid = 0;
    }
});
/* UNDO */
electronLocalshortcut.register(require('electron').remote.getCurrentWindow(), 'Ctrl+Z', () =>
{
    if (currentelement.getAttribute("contenteditable") == "false" || currentelement.getAttribute("contenteditable") == null)
    {
        undoparent[undoparent.length - 1].insertAdjacentHTML('beforeend', undoqueue[undoqueue.length - 1]);
        var xmlString = undoqueue[undoqueue.length - 1];
        parser = new DOMParser();
        doc = parser.parseFromString(xmlString, "text/xml");
        innerDoc.getElementById(doc.id).style.borderStyle = previousstyleborder;
        undoparent.length -= 1;
        undoqueue.length -= 1;
    }
});