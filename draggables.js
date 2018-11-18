var fs = require('fs');
var obj = JSON.parse(fs.readFileSync(__dirname + '\\controls.json', 'utf8'));
var container=document.getElementById("myDropdown");
for (var key in obj) {
    container.insertAdjacentHTML("beforeend",'<a role="button" draggable="true" style="color:white;" id="drag' + key + '">' + key + '</a>');
}