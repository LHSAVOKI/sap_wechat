sap.ui.define([
	"jerryTile/controller/BaseController",
	'sap/ui/model/json/JSONModel'
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("jerryTile.controller.home", {
		onInit: function() {
			var oModel = new JSONModel({
				"TileCollection": [{
					"type": "Create",
					"title": "Create Account",
					"info": "Please create account",
					"infoState": "Success",
					"key":"CA"
				}, {
					"type": "Create",
					"title": "Create Ticket",
					"info": "Please create ticket",
					"infoState": "Success",
					"key":"CT"
				}]
			});
			this.getView().setModel(oModel);
		},
		
		onTilePress :function(oEvent){
			var tileKey = oEvent.getSource().getBindingContext().getObject().key;
			switch(tileKey){
				case 'CA':
					this.getRouter().navTo("createAccount", {}, false);
				break;
				case 'CT':
					this.getRouter().navTo("createTicket", {}, false);
				break;
			}
		}
	});
});