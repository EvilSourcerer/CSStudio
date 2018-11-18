const electronLocalshortcut = require('electron-localshortcut');
var undoqueue = [];
var undoparent = [];
/*  */
electronLocalshortcut.register(require('electron').remote.getCurrentWindow(), 'Ctrl+D', () => {
    currentelement.parentElement.insertAdjacentHTML('beforeend', currentelement.outerHTML);
});
/* DELETE CONTROL */
electronLocalshortcut.register(require('electron').remote.getCurrentWindow(), 'Delete', () => {
    undoparent.push(currentelement.parentElement);
    undoqueue.push(currentelement.outerHTML);
    var tempcurrent = currentelement.parentElement;
    currentelement.remove();
    currentelement = tempcurrent;
    previousid = 0;
});
/* UNDO */
electronLocalshortcut.register(require('electron').remote.getCurrentWindow(), 'Ctrl+Z', () => {
    undoparent[undoparent.length - 1].insertAdjacentHTML('beforeend', undoqueue[undoqueue.length - 1]);
    var xmlString = undoqueue[undoqueue.length - 1];
    parser = new DOMParser();
    doc = parser.parseFromString(xmlString, "text/xml");
    innerDoc.getElementById(doc.id).style.borderStyle = previousstyleborder;
    undoparent.length -= 1;
    undoqueue.length -= 1;
});