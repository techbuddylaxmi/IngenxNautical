sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("negotiation.controller.NegotiationDashboard", {
            onInit: function () {

            },
            onInviteNegotiation: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteInviteNegotiation");
              },
              onCompareNegotiation: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteCompareNegotiation");
              },
        });
    });
