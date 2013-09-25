/* Copyright 2010-2011 Trans Lunar Designs, Inc. */

enyo.kind({
	name: "GPortal",
	kind: enyo.VFlexBox,
	published: {
		savedSite: "",
		initialUrl: "http://www.google.com"
	},
	create: function() {
		// Last URL the user set in the webview
		this.savedSite = localStorage.getItem(Global.startSiteKey);
		if (this.savedSite == undefined) {
			this.savedSite = Global.startSite;
		}
		this.initialUrl = Global.addressList[this.savedSite].site;

		this.inherited(arguments);
		Global.gportalThis = this;
		this.render();
	},
	render: function() {
		this.inherited(arguments);
	},
	rendered: function() {
		this.inherited(arguments);
		// list of addresses
		Global.gDataList = localStorage.getItem(Global.addressListKey);
		if (Global.gDataList == undefined) {
			Global.gDataList = Global.addressList;
		} else {
			Global.gDataList = JSON.parse(Global.gDataList);
		}
		if (Global.gDataList.length < Global.addressList.length) {
			// called when list is increased
			Global.gDataList = Global.addressList;
		}
		this.setupToolbarButtons();
		this.selectSite({index: this.savedSite});
	},
    components: [
{
		name: "openAppService",
		kind: "PalmService",
		service: "palm://com.palm.applicationManager/",
		method: "open"
	},
	{
		name: "launchAppService",
		kind: "PalmService",
		service: "palm://com.palm.applicationManager/",
		method: "launch"
	},
	{
		kind: "ApplicationEvents",
		onOpenAppMenu: "openAppMenu",
		onCloseAppMenu: "closeAppMenu"
	},
	{
		kind: "AppMenu",
		automatic: false,
		components: [
		{
			kind: "EditMenu"
		},
		{
			caption: "Choose Services",
			onclick: "openPopup",
			popup: "selectPopup"
		},
		{
			caption: "Help",
			onclick: "openPopup",
			popup: "popupHelp"
		}
		]
	},
	{
		kind: "Popup",
		name: "popupHelp",
		width: "500px",
		layoutKind: "VFlexLayout",
		pack: "center",
		align: "center",
		components: [
		{
			kind: "Image",
			src: "images/LogoColor_162x143.png"
		},
		{
			kind: "Button",
			caption: "Email Support@TransLunarDesigns.com",
			onclick: "buttonClick"
		},
		{
			kind: "enyo.HFlexBox",
			components: [
			{
				kind: "Button",
				caption: "GPortal User manual",
				onclick: "buttonClickLoadHelp"
			},
			{
				kind: "Button",
				caption: "Cancel",
				popupHandler: "Cancel"
			}
			]
		}
		]
	},
	{
		kind: "SelectPopup",
		dataList: Global.gDataList
	},
{kind: enyo.Scroller, name: "WebViewScroller", flex: 1, components: [
        {name: "TBWebView", kind: enyo.WebView, 
            flex: 1, url: "http://www.google.com"
        }]},                  

	{
		kind: "Toolbar",
		name: "ButtonToolbar",
		components: [
{caption: Global.addressList[1].name, onclick: "selectSite", index: Global.addressList[1].index, name: "button_01"},
{caption: Global.addressList[2].name, onclick: "selectSite", index: Global.addressList[2].index, name: "button_02"},
{caption: Global.addressList[3].name, onclick: "selectSite", index: Global.addressList[3].index, name: "button_03"},
{caption: Global.addressList[4].name, onclick: "selectSite", index: Global.addressList[4].index, name: "button_04"},
{caption: Global.addressList[5].name, onclick: "selectSite", index: Global.addressList[5].index, name: "button_05"},
{caption: Global.addressList[6].name, onclick: "selectSite", index: Global.addressList[6].index, name: "button_06"},
{caption: Global.addressList[7].name, onclick: "selectSite", index: Global.addressList[7].index, name: "button_07"},
{caption: Global.addressList[8].name, onclick: "selectSite", index: Global.addressList[8].index, name: "button_08"},	
{caption: Global.addressList[9].name, onclick: "selectSite", index: Global.addressList[9].index, name: "button_09"},	
{caption: Global.addressList[10].name, onclick: "selectSite", index: Global.addressList[10].index, name: "button_10"},
{caption: "<<", onclick: "goBack"},
{caption: ">>", onclick: "goForward"}
		]}
	],
	setupToolbarButtons: function() {
		// skip x == 0
		for (x = 1; x < Global.gDataList.length; x++) {
			var component = "";
			if (1 == x) {
				component = this.$.button_01;
			} else if (2 == x) {
				component = this.$.button_02;
			} else if (3 == x) {
				component = this.$.button_03;
			} else if (4 == x) {
				component = this.$.button_04;
			} else if (5 == x) {
				component = this.$.button_05;
			} else if (6 == x) {
				component = this.$.button_06;
			} else if (7 == x) {
				component = this.$.button_07;
			} else if (8 == x) {
				component = this.$.button_08;
			} else if (9 == x) {
				component = this.$.button_09;
			} else if (10 == x) {
				component = this.$.button_10;
			}
			//enyo.log("DEBUG DEBUG " + x +":" + Global.gDataList[x].selected);
			if (Global.gDataList[x].selected) {
				component.show();
			} else {
				component.hide();
			}
		}
	},
	goBack: function() {
		this.$.TBWebView.goBack();
	},
	reload: function() {
		this.$.TBWebView.reloadPage();
	},
	goForward: function() {
		this.$.TBWebView.goForward();
	},
	openPopup: function(inSender) {
		var p = this.$[inSender.popup];
		if (p) {
			p.openAtCenter();
		}
	},
	selectSite: function(inSender) {
		this.$.TBWebView.setUrl(Global.addressList[inSender.index].site);
		if (inSender.index > 0) {
			this.savedSite = inSender.index;
			localStorage.setItem(Global.startSiteKey, this.savedSite);
		}
	},

	dialogOpened: function() {
		// focuses the input and enables automatic keyboard mode
		this.$.input.forceFocusEnableKeyboard();
	},
	buttonClickLoadHelp: function() {
		this.selectSite({index: 0});
		this.$.popupHelp.close();
	},
	buttonClick: function() {
		this.$.openAppService.call({
			id: 'com.palm.app.email',
			params: {
				summary: "GPortal question/comment",
				text: "",
				recipients: [{
					type: "email",
					role: 1,
					value: "support@translunardesigns.com",
					contactDisplay: "Trans Lunar Designs"
				}]
			}
		});
	},
	openAppMenu: function() {
		var menu = this.myAppMenu || this.$.appMenu;
		menu.open();
	},
	closeAppMenu: function() {
		var menu = this.myAppMenu || this.$.appMenu;
		menu.close();
	}
});
