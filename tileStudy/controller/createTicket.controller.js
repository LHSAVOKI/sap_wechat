sap.ui.define([
	"jerryTile/controller/BaseController",
	'sap/ui/model/json/JSONModel'
], function(Controller,JSONModel) {
	"use strict";

	return Controller.extend("jerryTile.controller.createTicket", {
			onInit: function() {
				this.accountModel = new JSONModel({
					"text":"",
				},true);
				var that = this;
				this.getView().byId("createForm").setModel(this.accountModel,"ticket");
				this.getView().byId("createForm").bindElement("ticket>/");
			},

			onSubmit :function(){
				var oTicket = {};
				var that = this;
				oTicket = this.accountModel.getData();
				this.getView().setBusy(true);
				setTimeout( function(){
					that.getView().setBusy(false);
					that.showMessage("Ticket created successfully");
					that.navBack();
				}, 1000);
			},
			onCancel :function(){
				this.navBack();
			},
	});
});
