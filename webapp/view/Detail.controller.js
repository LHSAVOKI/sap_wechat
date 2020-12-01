jQuery.sap.require("jerrylist.util.Formatter");
jQuery.sap.require("sap.m.MessageBox"); 
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("jerrylist.view.Detail", {

	handleNavButtonPress : function (evt) {
		this.nav.back("Master");
	},
	onBeforeRendering:function(){ 
		this.byId("SupplierForm").bindElement("BusinessPartner");
		// doesnot help - onBeforeRendering will only be triggered
		// once during master list line item click 
		this.byId("jerryimage").setSrc("pic/" + this.getPictureUrl());
	},
	
	getPictureUrl: function(){
		var picturePool = ["a.png", "b.png", "c.png", "d.png"];
		var size = picturePool.length;
		var index = Math.ceil(Math.random()* ( size -1 ) );  // 获取从1到10的随机整数 ，取0的概率极小。
		console.log("index: " + index);
		return picturePool[index];
	}, 
	onInit: function() {
	},
	handleApprove : function (evt) {

		// show confirmation dialog
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		sap.m.MessageBox.confirm(
			bundle.getText("ApproveDialogMsg"),
			function (oAction) {
				if (sap.m.MessageBox.Action.OK === oAction) {
					// notify user
					var successMsg = bundle.getText("ApproveDialogSuccessMsg");
					sap.m.MessageToast.show(successMsg);
					// TODO call proper service method and update model (not part of this session)
				}
			},
			
			bundle.getText("ApproveDialogTitle")
		);
	},
	
	handleLineItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("LineItem", context);
	}
});