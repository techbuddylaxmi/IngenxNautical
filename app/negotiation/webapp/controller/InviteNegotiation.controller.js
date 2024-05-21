sap.ui.define(
          [
              "sap/ui/core/mvc/Controller",
              "sap/ui/model/Filter",
              "sap/ui/model/FilterOperator",
              "sap/ui/model/json/JSONModel",
              'sap/ui/core/Fragment',
              'sap/m/MessageBox'
          ],
          function(BaseController,Filter,FilterOperator,JSONModel,Fragment,MessageBox) {
            "use strict";
            let sloc;
            let getModelData = [];
            let dataArray = [];
            let charteringsetModel;
        
            return BaseController.extend("negotiation.controller.InviteNegotiation", {
              onInit: function() {
                var that = this;
 
                charteringsetModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(charteringsetModel, "charteringsetModel");
         
                let oModel1 = this.getOwnerComponent().getModel();
                let oBindList = oModel1.bindList("/CharteringSet");
         
                oBindList.requestContexts(0,Infinity).then(function (aContexts) {
                  // dataArray = [];
                  aContexts.forEach(function (oContext) {
                    dataArray.push(oContext.getObject());
                  });
                  // console.log("CharteringSet ",dataArray);
                  // CharteringSet.setData(dataArray);
                }).catch(function (error) {
                  console.error("Error fetching Chartering no items:", error);
                });
                 
              },
      
              charteringValueHelp: function (oEvent) {
                // var newValue = oEvent?.oSource?.mProperties?.value                
                // console.log("New value entered in charteringNo input field:", newValue);
                var oView = this.getView();
                
        // var oCharteringNoInput = this.getView().byId("charteringNo")  
        // var ChrnminValue = oCharteringNoInput ? oCharteringNoInput.getValue() : null;      
        
        // console.log("ChrnminValue",oCharteringNoInput);
        // console.log("ChrnminValue",ChrnminValue);

        // console.log("CharteringSet",dataArray);
        
                if (!this._oTankInfomat) {
                  this._oTankInfomat = sap.ui.xmlfragment(oView.getId(), "negotiation.fragments.CharteringNo", this);
                  oView.addDependent(this._oTankInfomat);
      
                }
                
                this._oTankInfomat.open();
        
              },
             
      //   charteringValueHelp: function () {
      //     var oView = this.getView();
          
      //     // Retrieve the input field
      //     var oCharteringNoInput = oView.byId("charteringNo");
          
      //     // Check if the input field was found
      //     if (!oCharteringNoInput) {
      //         console.error("Input field with ID 'charteringNo' not found.");
      //         return;
      //     }
          
      //     // Log the input field object
      //     console.log("CharteringNo Input Field:", oCharteringNoInput);
          
      //     // Retrieve and log the value from the input field
      //     var ChrnminValue = oCharteringNoInput.getValue();
      //     console.log("ChrnminValue:", ChrnminValue);
      
      //     // Check if dataArray is defined and log it
      //     if (typeof dataArray !== 'undefined') {
      //         console.log("CharteringSet:", dataArray);
      //     } else {
      //         console.log("CharteringSet is not defined");
      //     }
      
      //     // Check if the fragment already exists, if not, create it
      //     if (!this._oTankInfomat) {
      //         this._oTankInfomat = sap.ui.xmlfragment(oView.getId(), "negotiation.fragments.CharteringNo", this);
      //         oView.addDependent(this._oTankInfomat);
      //     }
      
      //     // Open the fragment
      //     this._oTankInfomat.open();
      // }
      
        onValueHelpClose1: function (oEvent) {
         
      
                var oSelectedItem = oEvent.getParameter("selectedItem");
        
                oEvent.getSource().getBinding("items").filter([]);
        
                if (!oSelectedItem) {
                  return;
                }
                this.byId("charteringNo").setValue(oSelectedItem.getTitle());
                var loc = this.getView().byId("charteringNo")
                sloc = loc.getValue();
                console.log("sloc",sloc);
                // console.log("Final Value", loc);
                // console.log("CharteringSet",dataArray);
                var filterChrValueData=dataArray.filter(obj=>obj.Chrnmin==sloc)
                // console.log("filterChrValueData",filterChrValueData);
                charteringsetModel.setData(filterChrValueData)

                console.log("charteringsetModel",this.getView().getModel("charteringsetModel")?.oData);
                // var ChrModel=this.getModel()
                
                var btnIn = this.getView().byId("ButtonInvite");
                btnIn.setVisible(true);
      
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

              onSubmitInvite: function () {
                if (!this._oDialog) {
                    this._oDialog = sap.ui.xmlfragment("negotiation.fragments.SubmitInvite", this);
                    this.getView().addDependent(this._oDialog);
                }
            
                // Initialize model data
                var oModel = new sap.ui.model.json.JSONModel({
                    BiddingStartDate: null,
                    BiddingEndDate: null,
                    BiddingStartTime: null,
                    BiddingEndTime: null,
                    CQV: "",
                    Unit: "",
                    Mode: "Mode1" // Set default mode if needed
                });
                this._oDialog.setModel(oModel, "addBiddingModel");
            
                this._oDialog.open();
            },
            
            onSave: function () {
                var oModel = this._oDialog.getModel("addBiddingModel");
                var oData = oModel.getData();
            
                // Retrieve data from the model
                var BiddingStartDate = oData.BiddingStartDate;
                var BiddingEndDate = oData.BiddingEndDate;
                var BiddingStartTime = oData.BiddingStartTime;
                var BiddingEndTime = oData.BiddingEndTime;
                var CQV = oData.CQV;
                var Unit = oData.Unit;
                var Mode = oData.Mode;
            
                // Close the dialog
                this._oDialog.close();
            
                // Do whatever you want with the data
                console.log("Bidding Start Date:", BiddingStartDate);
                console.log("Bidding End Date:", BiddingEndDate);
                console.log("Bidding Start Time:", BiddingStartTime);
                console.log("Bidding End Time:", BiddingEndTime);
                console.log("Controller Quoted Value:", CQV);
                console.log("Unit:", Unit);
                console.log("Mode of Bidding:", Mode);
                MessageBox.success("Vendor invite successfully");
            },
            
            onCancel: function () {
                this._oDialog.close();
            },
            

            onNavigateDetails: function() {
              var oView = this.getView();
              if (!this._oDialog1) {
                  this._oDialog1 = sap.ui.xmlfragment("negotiation.fragments.InviteNegoDetails", this);
                  oView.addDependent(this._oDialog1);
          
                  // Set the model to the fragment
          //         this._oDialog1.setModel(this.getView().getModel("charteringsetModel")?.oData);
          // console.log("charteringsetModel",this.getView().getModel("charteringsetModel")?.oData);
          //         // Bind the data to the controls within the fragment
                  // var oForm = this._oDialog1.getContent()[0].getContent()[0]; // Assuming the form is the first control
                  // if (oForm) {
                  //     oForm.bindElement("/"); // Assuming the root path of the model is correct
                  // }
              }
              this._oDialog1.open();
          },
          

        //   onNavigateDetails:function () {
        //     var oView = this.getView();
        //     if (!this._oDialog1) {
        //         this._oDialog1 = sap.ui.xmlfragment("negotiation.fragments.InviteNegoDetails", this);
        //         oView.addDependent(this._oDialog1);
        //     }
        //     this._oDialog1.open();
        // },
        oncancell: function () {
          this._oDialog1.close();
      },
             
            });
          }
        );

  