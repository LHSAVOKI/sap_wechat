sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"jerryTile/model/models"
], function(UIComponent, Device, models) {
	"use strict";
	return UIComponent.extend("jerryTile.Component", {
		metadata: {
			manifest: "json",
			config: {
				serviceUrl: "https://www.sap.com"
			}
		},
		AppData : {
			userInfo:{}
		},

		init: function() {
			UIComponent.prototype.init.apply(this, arguments);

			this.setModel(models.createDeviceModel(), "device");
			this._initializeRouter();
		},
		_initializeRouter: function() {
			this._oRouter = this.getRouter();
			this._oRouter.initialize();
		}
	});
});