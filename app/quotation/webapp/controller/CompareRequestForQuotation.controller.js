sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator"
    ],
    function(BaseController,Filter,FilterOperator) {
      "use strict";
      let sloc;
      let getModelData = [];
  
      return BaseController.extend("com.ingenx.nauti.quotation.controller.CompareRequestForQuotation", {
        onInit: function() {
           
        },

        charteringValueHelp: function () {
          var oView = this.getView();
  
  
          if (!this._oTankInfomat) {
            this._oTankInfomat = sap.ui.xmlfragment(oView.getId(), "com.ingenx.nauti.quotation.fragments.requestForChartering", this);
            oView.addDependent(this._oTankInfomat);

          }
          
          this._oTankInfomat.open();
  
        },
        onValueHelpClose1: function (oEvent) {

          var oSelectedItem = oEvent.getParameter("selectedItem");
  
          oEvent.getSource().getBinding("items").filter([]);
  
          if (!oSelectedItem) {
            return;
          }
          this.byId("charteringNo").setValue(oSelectedItem.getTitle());
          var loc = this.getView().byId("charteringNo");
          console.log("Final Value", loc);
          sloc = loc.getValue();

          if (sloc) {
            var oVBox = this.getView().byId("idVbox"); 
            if (oVBox) {
                oVBox.setVisible(true);
            }
        }
  
  
          console.log("get model data", getModelData);
          var filter = getModelData.filter(function (data) {
  
            return data.Voyno === sloc
  
          })
  
  
        },
        onChartSearch1: function (oEvent) {
          var sValue1 = oEvent.getParameter("value");
  
          var oFilter1 = new Filter("Chrnmin", FilterOperator.Contains, sValue1);
  
          oEvent.getSource().getBinding("items").filter([oFilter1]);
        },
       
      });
    }
  );
  