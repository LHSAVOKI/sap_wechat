sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("jerryTile.controller.BaseController", {

		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},
		getDeviceModel: function() {
			return this.getOwnerComponent().getModel("device");
		},
		getServiceUrl: function() {
			return "https://www.sap.com";
		},

		callService: function(sPath, method, postData, callBack,errorCallback) {
			var url = this.getServiceUrl() + sPath;

			$.ajax({
				url: url,
				type: method,
				data: postData,
				success: callBack,
				error: errorCallback
			});
		},

		showMessage: function(sMessage, Type) {
			jQuery.sap.require("sap.m.MessageBox");
			switch (Type) {
				case "error":
					sap.m.MessageBox.error(sMessage, {
						title: "错误", 
						onClose: null, 
						textDirection: sap.ui.core.TextDirection.Inherit 
					});
					break;
				case "warnning":
					sap.m.MessageBox.warning(sMessage, {
						title: "警告", 
						onClose: null, 
						textDirection: sap.ui.core.TextDirection.Inherit 
					});
					break;
				default:
					sap.m.MessageToast.show(sMessage, {
						duration: 3000, 
						width: "15em", 
						my: "center bottom", 
						at: "center bottom", 
						of: window, 
						offset: "0 0", 
						collision: "fit fit", 
						onClose: null, 
						autoClose: true, 
						animationTimingFunction: "ease", 
						animationDuration: 3000, 
						closeOnBrowserNavigation: true 
					});
			}
		},

		navBack: function() {
			var oRouter = this.getRouter();

			var oHistory = History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				history.go(-1);
				return;
			} else {
				oRouter.navTo("home", true);
			}
		}
	});
});
