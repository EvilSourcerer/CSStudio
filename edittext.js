function editElement(id) {
    var iframe = document.getElementById('iframe-select');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var currentelement=innerDoc.getElementById(id);
    currentelement.setAttribute("contenteditable","true");
}