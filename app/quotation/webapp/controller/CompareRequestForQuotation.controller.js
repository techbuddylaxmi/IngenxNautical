
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v4/ODataModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], function (Controller, JSONModel,Filter,FilterOperator, ODataModel,MessageToast) {
    "use strict";
    let Chrnmin;
    let oModel;

    return Controller.extend("com.ingenx.nauti.quotation.controller.CompareRequestForQuotation", {
        onInit: function () {

        },

        calculateAndBindRankings: function (Chrnmin) {
            // debugger;
            // Define the entity set and filters (if any)
            oModel = this.getOwnerComponent().getModel();
            const sEntitySet = "/calculateRankings";
            const aFilters = [
                new sap.ui.model.Filter("Chrnmin", sap.ui.model.FilterOperator.EQ, Chrnmin)
            ];
            console.log("Chrnmin", Chrnmin);
            const oListBinding = oModel.bindList(sEntitySet, undefined, undefined, aFilters);
        
            // Request data and handle the response
            oListBinding.requestContexts().then(function (aContexts) {
                let aData = aContexts.map(function (oContext) {
                    return oContext.getObject();
                });
        
                // Log the data to the console
                console.log("Fetched Data:", aData);
        
                // Assuming aData contains your fetched data and it has at least one entry
                if (aData && aData.length > 0) {
                    const vendorsData = aData[0].Vendors.map(vendor => ({
                        Chrnmin: aData[0].Chrnmin,
                        Voyno: aData[0].Voyno,
                        vendorId: vendor.vendorId,
                        rank: vendor.rank,
                        score: vendor.score,
                        eligible: vendor.eligible,
                        bidDetails: vendor.bidDetails 
                    }));
        
                    // Set the vendorsData to a JSONModel and bind it to the view
                    // const oModel = new JSONModel({ Vendors: vendorsData });
                    const oModel = new JSONModel({
                        Vendors: vendorsData,
                        Voyno: aData[0].Voyno // Adding Voyno separately for easier binding
                    });
                    this.getView().setModel(oModel, "rankings");
        
                    // Get reference to the table and bind it to the model
                    const oTable = this.getView().byId("table");
                    oTable.bindItems({
                        path: "rankings>/Vendors",
                        template: new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: "{rankings>vendorId}" }),
                                new sap.m.Text({ text: "{rankings>bidDetails/0/Value}" }),
                                new sap.m.Text({ text: "{rankings>bidDetails/0/fScore}" }),
                                new sap.m.Text({ text: "{rankings>bidDetails/1/Value}" }),
                                new sap.m.Text({ text: "{rankings>bidDetails/1/fScore}" }),
                                new sap.m.Text({ text: "{rankings>bidDetails/2/Value}" }),
                                new sap.m.Text({ text: "{rankings>bidDetails/2/fScore}" }),
                                new sap.m.Text({ text: "{rankings>bidDetails/4/Value}" }),
                                new sap.m.Text({ text: "{rankings>bidDetails/4/fScore}" }),
                                new sap.m.Text({ text: "{rankings>rank}" }),
                                new sap.m.Text({ text: "{rankings>score}" }),
                                new sap.m.Text({ text: "{rankings>eligible}" }),
                                
                            ]
                        })
                    });
        
                    MessageToast.show("Data fetched successfully!");
                } else {
                    console.error("No data fetched");
                    MessageToast.show("No data fetched.");
                }
            }.bind(this)).catch(function (oError) {
                // Handle error response
                MessageToast.show("Error fetching data.");
                console.error("Error fetching data:", oError);
            });
        }
        
    ,
           
        charteringValueHelp: function (oEvent) {
            var oView = this.getView();

            if (!this._oTankInfomat) {
                this._oTankInfomat = sap.ui.xmlfragment(oView.getId(), "com.ingenx.nauti.quotation.fragments.CharteringNo", this);
                oView.addDependent(this._oTankInfomat);
            }

            // Refresh the binding to ensure data is reloaded
            var oBinding = this._oTankInfomat.getBinding("items");
            oBinding.filter([]);

            this._oTankInfomat.open();
        },

        onValueHelpClose1: function (oEvent) {
            
            var oSelectedItem = oEvent.getParameter("selectedItem");
        
            oEvent.getSource().getBinding("items").filter([]);
        
            if (!oSelectedItem) {
                return;
            }
        
             Chrnmin = oSelectedItem.getTitle();
            this.byId("charteringNo").setValue(Chrnmin);
          console.log("Chrnminnn",Chrnmin);
        
            // Extract Chrnmin from the selected item's binding context
            // var oContext = oSelectedItem.getBindingContext("oModel");
            // var Chrnmin = oContext.getProperty("Chrnmin").getValue;
            // console.log("Chrnmin:", Chrnmin); // Add this line for debugging
        
            this.calculateAndBindRankings(Chrnmin);
        
            var btn = this.byId("ButtonInvite");
            btn.setVisible(true);
            var idVoyge = this.byId("idVoyge");
            idVoyge.setVisible(true);
            var compare = this.byId("_IdCompare");
            compare.setVisible(false);
            var invite = this.byId("_IdInvite");
            invite.setVisible(true);
        
            if (Chrnmin) {
                var oVBox = this.byId("idVbox");
                if (oVBox) {
                    oVBox.setVisible(true);
                }
            }
        },
        onChartSearch1: function (oEvent) {
            // debugger;
            var sValue = oEvent.getParameter("value");
     
            var oFilter = new Filter("chrnmin", FilterOperator.Contains, sValue);
     
            oEvent.getSource().getBinding("items").filter([oFilter]);
          },
        
    });
});



// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/ui/model/odata/v4/ODataModel"
// ], function (Controller, JSONModel, ODataModel) {
//     "use strict";
//         let sloc;
//         let getModelData = [];
//         let VendDataArr = [];
//         let ItemDataArr = [];
//         let charteringsetModel;
//         let BidStart;
//         let voyagesetModel;
//         let oModel;
//         let oRankedVendorsModel;
//         let vendorData;
//         let ChartModel;
//         let CharterNumberModel;
//         let rankedVendorsModel;

//     return Controller.extend("com.ingenx.nauti.quotation.controller.CompareRequestForQuotation", {
//         onInit: function () {
//             // Instantiate the OData V4 model
//             var oDataModel = new ODataModel({
//                 serviceUrl: "/odata/v4/nautical-quotation/",
//                 synchronizationMode: "None"
//             });
//             this.getView().setModel(oDataModel, "odataModel");

//             // Create JSON model for ranked vendors
//             this.oRankedVendorsModel = new JSONModel();
//             this.getView().setModel(this.oRankedVendorsModel, "rankedVendorsModel");

//             // Create JSON model for Charter Number
//             this.CharterNumberModel = new JSONModel();
//             this.getView().setModel(this.CharterNumberModel, "CharterNumberModel");
//         },
        

//         calculateAndBindRankings: function (Chrnmin) {
//             debugger;
//             var oDataModel = this.getView().getModel("odataModel");
//             var sPath = `/calculateRankings?filter=Chrnmin eq '${Chrnmin}'`;
//             var oContext = oDataModel.bindContext(sPath);

//             // Execute the function import
//             oContext.execute().then(function () {
//                 var data = oContext.getBoundContext().getObject();
//                 var uniqueArray = this.removeDuplicates(data);
//                 this.oRankedVendorsModel.setData(data);
//                 this.CharterNumberModel.setData(uniqueArray);

//                 console.log("Ranked Vendors:", this.oRankedVendorsModel.getData());
//                 console.log("Unique Array:", this.CharterNumberModel.getData());
//             }.bind(this)).catch(function (oError) {
//                 console.error("Error while calculating rankings:", oError);
//             });
//         },

//         removeDuplicates: function (arr) {
//             var seen = new Set();
//             return arr.filter(item => {
//                 if (seen.has(item.Chrnmin)) {
//                     return false;
//                 } else {
//                     seen.add(item.Chrnmin);
//                     return true;
//                 }
//             });
//         },

//         charteringValueHelp: function (oEvent) {
//             var oView = this.getView();

//             if (!this._oTankInfomat) {
//                 this._oTankInfomat = sap.ui.xmlfragment(oView.getId(), "com.ingenx.nauti.quotation.fragments.CharteringNo", this);
//                 oView.addDependent(this._oTankInfomat);
//             }

//             // Refresh the binding to ensure data is reloaded
//             var oBinding = this._oTankInfomat.getBinding("items");
//             oBinding.filter([]);

//             this._oTankInfomat.open();
//         },

//         onValueHelpClose1: function (oEvent) {
//             var oSelectedItem = oEvent.getParameter("selectedItem");

//             oEvent.getSource().getBinding("items").filter([]);

//             if (!oSelectedItem) {
//                 return;
//             }
//             this.byId("charteringNo").setValue(oSelectedItem.getTitle());

//             var sloc = this.byId("charteringNo").getValue();
//             this.calculateAndBindRankings(sloc);

//             var btn = this.byId("ButtonInvite");
//             btn.setVisible(true);
//             var idVoyge = this.byId("idVoyge");
//             idVoyge.setVisible(true);
//             var compare = this.byId("_IdCompare");
//             compare.setVisible(false);
//             var invite = this.byId("_IdInvite");
//             invite.setVisible(true);
//             if (sloc) {
//                 var oVBox = this.byId("idVbox");
//                 if (oVBox) {
//                     oVBox.setVisible(true);
//                 }
//             }
//         }
//     });
// });


