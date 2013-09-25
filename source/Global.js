/* Hate globals, but sometimes its just to tempting than trying to figure out the cross component calling */

enyo.kind({kind: "Component", name: "MyButton", onclick: "selectSite"});
var Global = {};

Global.helpSite = "http://translunardesigns.com/webOS/gportal_faq.htm";
Global.startSite = 8;
Global.startSiteKey = "gportal.startsite";
Global.addressListKey = "gportal.list";
Global.gDataList = [];
Global.gportalThis = "";

Global.addressList = [
	{kind: "MyButton", index: 0, site: Global.helpSite, selected: false, name: "Help", caption: ""},
	{kind: "MyButton", index: 1, site: "http://calendar.google.com?ui=html", selected: true, name:"Calendar", caption:"Calendar"},
	{kind: "MyButton", index: 2, site: "http://docs.google.com?ui=html", selected: true, name:"Docs", caption:"Docs"},
	{kind: "MyButton", index: 3, site: "http://images.google.com?ui=html", selected: true, name:"Images", caption:"Images"},
	{kind: "MyButton", index: 4, site: "http://froogle.com", selected: true, name: "Froogle", caption: "Froogle"},
	{kind: "MyButton", index: 5, site: "http://mail.google.com/mail/?ui=html&zy=h", selected: true, name: "Gmail", caption: "Gmail"},
	{kind: "MyButton", index: 6, site: "http://plus.google.com?ui=html", selected: true, name:"Plus", caption:"Plus"},
	{kind: "MyButton", index: 7, site: "http://www.google.com/reader/view/#overview-page?ui=html", selected: true, name:"Reader", caption:"Reader"},
	{kind: "MyButton", index: 8, site: "http://www.google.com", selected: true, name:"Search", caption:"Search"},
	{kind: "MyButton", index: 9, site: "http://mail.google.com/tasks/canvas?ui=html", selected: true, name:"Tasks", caption:"Tasks"},
	{kind: "MyButton", index: 10, site: "http://voice.google.com?ui=html", selected: true, name:"Voice", caption:"Voice"}
	
];

	js_traverse = function(jsonObject) {
		var type = typeof jsonObject;
		if (type == "object") {
			for (var key in jsonObject) {
				enyo.log("key: ", key);
				js_traverse(jsonObject[key]);
			}
		} else {
			enyo.log(jsonObject);
		}
	};