function EditElement() /* ALLOWS BUTTONS OTHER TEXT TO BE EDITABLE. */ {
    var att = document.createAttribute("contenteditable");
    att.value = "true";
    currentelement.setAttributeNode(att);
    currentelement.focus();
}