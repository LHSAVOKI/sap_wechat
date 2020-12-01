sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("jerryTile.controller.app", {
			onInit: function() {
			this.appdata = this.getOwnerComponent();
		}
	});
});
