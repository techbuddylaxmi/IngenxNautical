sap.ui.define(
          [
              "sap/ui/core/mvc/Controller",
              "sap/ui/model/json/JSONModel",
              'sap/ui/core/Fragment',
              "sap/ui/model/Filter",
              "sap/ui/model/FilterOperator",
              "sap/ui/model/Sorter"
          ],
          function(BaseController,Filter,FilterOperator,JSONModel,Fragment,Sorter) {
            "use strict";
            let sloc;
            let getModelData = [];
            let dataArray = [];
            let voyagesetModel;
            let oModel;
            let testDataModel;
            let chdata;
            let ChartModel;
            let CharterNumberModel;
        
            return BaseController.extend("negotiation.controller.CompareNegotiation", {
              onInit: function() {

                 oModel = new sap.ui.model.json.JSONModel();
                 CharterNumberModel = new sap.ui.model.json.JSONModel();
            var oView = this.getView();

            // Load the JSON file
            $.getJSON("model/data/TestData.json", function(data) {
              let ChartDataArr=data?.TestData
              console.log("ChartNumber",ChartDataArr);
              var uniqueArray = removeDuplicates(ChartDataArr);
              
              CharterNumberModel.setData(uniqueArray)
              oView.setModel(CharterNumberModel,"CharterNumberModel")
              console.log("uniqueArray",oView.getModel("CharterNumberModel"));

                oModel.setData(data);
                chdata = data?.TestData
                oView.setModel(oModel, "testDataModel");
              
            });

            function removeDuplicates(arr) {
              var seen = new Set();
              return arr.filter(item => {
                  if (seen.has(item.CharterNumber)) {
                      return false;
                  } else {
                      seen.add(item.CharterNumber);
                      return true;
                  }
              });
          }
      
                // var that = this;
 
                // voyagesetModel = new sap.ui.model.json.JSONModel();
                // this.getView().setModel(voyagesetModel, "voyagesetModel");
         
                // let oModel1 = this.getOwnerComponent().getModel();
                // let oBindList = oModel1.bindList("/xNAUTIxVOYAGEHEADERTOITEM");
         
                // oBindList.requestContexts(0,Infinity).then(function (aContexts) {
                //   // dataArray = [];
                //   aContexts.forEach(function (oContext) {
                //     dataArray.push(oContext.getObject());
                //   });
                // }).catch(function (error) {
                //   console.error("Error fetching Chartering no items:", error);
                // });
                 
              },
              chartValueHelp: function (oEvent) {
                var oView = this.getView();
                if (!this._oTankInfomat) {
                    this._oTankInfomat = sap.ui.xmlfragment(oView.getId(), "negotiation.fragments.CharteringNo", this);
                    oView.addDependent(this._oTankInfomat);
                }
                
                // Refresh the binding to ensure data is reloaded
                var oBinding = this._oTankInfomat.getBinding("items");
                oBinding.filter([]);
            
                this._oTankInfomat.open();
            },
            
            onValueHelpCloseVoyage: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                oEvent.getSource().getBinding("items").filter([]);
                if (!oSelectedItem) {
                    return;
                }
            
                this.byId("CharteringNo").setValue(oSelectedItem.getTitle());
                var loc = this.getView().byId("CharteringNo");
                var sloc = loc.getValue();
                
                var filterValueData = chdata.filter(obj => obj.CharterNumber === sloc);
                console.log("filterValueData", filterValueData);
                oModel.setData(filterValueData);
                console.log("testDataModel", this.getView().getModel("testDataModel")?.oData);
            
                var btn = this.getView().byId("ButtonAward");
                btn.setVisible(true);
                var idVoyge = this.getView().byId("idVoyge");
                idVoyge.setVisible(true);
            
                if (sloc) {
                    var oVBox = this.getView().byId("idVboxVoyage");
                    if (oVBox) {
                        oVBox.setVisible(true);
                    }
                }
            
                console.log("get model data", getModelData);
                var filter = getModelData.filter(function (data) {
                    return data.Voyno === sloc;
                });
            },
            
            onVoyageSearch: function (oEvent) {
                var sValue1 = oEvent.getParameter("value");
            
                var oFilter1 = new Filter("CharterNumber", FilterOperator.Contains, sValue1);
            
                oEvent.getSource().getBinding("items").filter([oFilter1]);
            }
,            
      
              // chartValueHelp: function (oEvent) {
              //   var oView = this.getView();
              //   if (!this._oTankInfomat) {
              //     this._oTankInfomat = sap.ui.xmlfragment(oView.getId(), "negotiation.fragments.CharteringNo", this);
              //     oView.addDependent(this._oTankInfomat);
              //   }

              //   this._oTankInfomat.open();
              // },
              // onValueHelpCloseVoyage: function (oEvent) {
              //   var oSelectedItem = oEvent.getParameter("selectedItem");
              //   oEvent.getSource().getBinding("items").filter([]);
              //   if (!oSelectedItem) {
              //     return;
              //   }

              //   this.byId("CharteringNo").setValue(oSelectedItem.getTitle());
              //   var loc = this.getView().byId("CharteringNo");
              //   sloc = loc.getValue();
              //   // console.log("sloc", sloc);
              //   // console.log("Voyage",chdata);
              //   var filterValueData = chdata.filter(obj=>obj.CharterNumber==sloc)
              //   console.log("filterValueData",filterValueData);
              //   oModel.setData(filterValueData)
              //   console.log("testDataModel",this.getView().getModel("testDataModel")?.oData);


              //   var btn = this.getView().byId("ButtonAward")
              //   btn.setVisible(true);
              //   var idVoyge = this.getView().byId("idVoyge");
              //   idVoyge.setVisible(true);
      
              //   if (sloc) {
              //     var oVBox = this.getView().byId("idVboxVoyage"); 
              //     if (oVBox) {
              //         oVBox.setVisible(true);
              //     }
              // }
        
        
              //   console.log("get model data", getModelData);
              //   var filter = getModelData.filter(function (data) {
        
              //     return data.Voyno === sloc
        
              //   })
        
        
              // },
              // onVoyageSearch: function (oEvent) {
              //   var sValue1 = oEvent.getParameter("value");
        
              //   var oFilter1 = new Filter("CharterNumber", FilterOperator.Contains, sValue1);
        
              //   oEvent.getSource().getBinding("items").filter([oFilter1]);
              // },

              
              VendorDetails: function(oEvent) {
                ChartModel=new sap.ui.model.json.JSONModel();
                var oSelectedItem = oEvent.getSource();
                var oBindingContext = oSelectedItem.getBindingContext("testDataModel");
                var selectedData=this.getView().getModel("testDataModel")?.oData;
                var iIndex = oBindingContext.getPath().split("/").pop();
                var SelectedChartData=selectedData[iIndex];
                ChartModel.setData(SelectedChartData);
                this.getView().setModel(ChartModel,"ChartingFilterModel")
                console.log("selectedData",this.getView().getModel("ChartingFilterModel")?.oData);
            
                console.log("Selected Row Index:", SelectedChartData);
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

      oncheckdata: function(){
        this.getView().byId("ButtonAward").setEnabled(true)
        
      }
             
            });
          }
        );