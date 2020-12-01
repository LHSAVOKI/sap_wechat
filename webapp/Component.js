/*eslint linebreak-style: ["error", "unix"]*/
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"jerrylist/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("jerrylist.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			UIComponent.prototype.init.apply(this, arguments);

			this.setModel(models.createDeviceModel(), "device");
			var oModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("jerrylist.model","/mock.json"));
			this.setModel(oModel);

			var nickName = jQuery.sap.getUriParameters().get("nickname");

			var newTitleName = nickName + "'s Service Order";
			var oTitleModel = new sap.ui.model.json.JSONModel({"MasterTitle": newTitleName });
			this.setModel(oTitleModel,"modelForview");

		}
	});
});