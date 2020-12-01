sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"Camera/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("Camera.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
			UIComponent.prototype.init.apply(this, arguments);
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});
