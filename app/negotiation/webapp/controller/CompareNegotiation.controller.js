sap.ui.define(
          [
              "sap/ui/core/mvc/Controller",
              "sap/ui/model/json/JSONModel",
              'sap/ui/core/Fragment',
              "sap/ui/model/Filter",
              "sap/ui/model/FilterOperator"
          ],
          function(BaseController,Filter,FilterOperator,JSONModel,Fragment) {
            "use strict";
            let sloc;
            let getModelData = [];
            let dataArray = [];
            let voyagesetModel;
        
            return BaseController.extend("negotiation.controller.CompareNegotiation", {
              onInit: function() {
                var that = this;
 
                voyagesetModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(voyagesetModel, "voyagesetModel");
         
                let oModel1 = this.getOwnerComponent().getModel();
                let oBindList = oModel1.bindList("/xNAUTIxVOYAGEHEADERTOITEM");
         
                oBindList.requestContexts(0,Infinity).then(function (aContexts) {
                  // dataArray = [];
                  aContexts.forEach(function (oContext) {
                    dataArray.push(oContext.getObject());
                  });
                }).catch(function (error) {
                  console.error("Error fetching Chartering no items:", error);
                });
                 
              },
      
              VoyageValueHelp: function (oEvent) {
                var oView = this.getView();
        
        
                if (!this._oTankInfomat) {
                  this._oTankInfomat = sap.ui.xmlfragment(oView.getId(), "negotiation.fragments.VoyageNumber", this);
                  oView.addDependent(this._oTankInfomat);
      
                }
                
                this._oTankInfomat.open();
        
              },
              onValueHelpCloseVoyage: function (oEvent) {
      
                var oSelectedItem = oEvent.getParameter("selectedItem");
        
                oEvent.getSource().getBinding("items").filter([]);
        
                if (!oSelectedItem) {
                  return;
                }
                this.byId("VoyageNo").setValue(oSelectedItem.getTitle());
                var loc = this.getView().byId("VoyageNo");
                sloc = loc.getValue();
                console.log("sloc", sloc);
                // console.log("Voyage",dataArray);
                var filterValueData = dataArray.filter(obj=>obj.Voyno==sloc)
                console.log("filterValueData",filterValueData);
                voyagesetModel.setData(filterValueData)
                console.log("voyagesetModel",this.getView().getModel("voyagesetModel")?.oData);


                var btn = this.getView().byId("Button1")
                btn.setVisible(true);
      
                if (sloc) {
                  var oVBox = this.getView().byId("idVboxVoyage"); 
                  if (oVBox) {
                      oVBox.setVisible(true);
                  }
              }
        
        
                console.log("get model data", getModelData);
                var filter = getModelData.filter(function (data) {
        
                  return data.Voyno === sloc
        
                })
        
        
              },
              onVoyageSearch: function (oEvent) {
                var sValue1 = oEvent.getParameter("value");
        
                var oFilter1 = new Filter("Chrnmin", FilterOperator.Contains, sValue1);
        
                oEvent.getSource().getBinding("items").filter([oFilter1]);
              },

              
              VendorDetails: function() {
              var oView = this.getView();
              if (!this._oDialog1) {
                  this._oDialog1 = sap.ui.xmlfragment("negotiation.fragments.AwardVendorDetails", this);
                  oView.addDependent(this._oDialog1);
          
            
              }
              this._oDialog1.open();
          },
        oncan: function () {
          this._oDialog1.close();
      },
             
            });
          }
        );