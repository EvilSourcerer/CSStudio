var iframe = document.getElementById('iframe-select');
var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
var safe = new XMLSerializer().serializeToString(innerDoc);
var beautify = ace.require("ace/ext/beautify"); // get reference to extension
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/html");
editor.session.setValue(safe);
