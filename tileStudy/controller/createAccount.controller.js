sap.ui.define([
	"jerryTile/controller/BaseController",
	'sap/ui/model/json/JSONModel'
], function(Controller,JSONModel) {
	"use strict";
	return Controller.extend("jerryTile.controller.createAccount", {
		 onInit: function() {
			 this.accountModel = new JSONModel({
				 "lastName":"",
				 "firstName":"",
				 "address":"",
				 "phone":"",
			 },true);
			 var that = this;
			 this.getView().byId("createForm").setModel(this.accountModel,"createAccpunt");
			 this.getView().byId("createForm").bindElement("createAccpunt>/");
			 this.getRouter().getRoute("createAccount").attachPatternMatched(this._onCreate, this);
		 },

		 _onCreate: function(){
		 	this.showMessage("route matched!");
		 }, 
		 onSubmit :function(){
			 var oAccount = this.accountModel.getData();
			 var that = this;
			 setTimeout( function(){
					that.getView().setBusy(false);
					that.showMessage("Account created successfully");
					that.navBack();
				}, 1000);
		 },
		 onCancel :function(){
			 this.navBack();
		 },
	});
});
