/* checksum : 3a8dea94f11713022ebaa43f6e15722b */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service NAUTICOMP_QUOT_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'compare quot'
entity NAUTICOMP_QUOT_SRV.xNAUTIxcomp_quot {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Chartering Req. No.'
  @sap.quickinfo : 'Charter No'
  key Chrnmin : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Voyage No'
  @sap.quickinfo : 'Voyage Number'
  Voyno : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vendor Code'
  Chrven : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vendor Name'
  Chrvenn : String(35);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Code Description'
  CodeDesc : String(50);
  @sap.label : 'Weightage'
  Wtage : Decimal(12, 3);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Score'
  Score : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Value'
  Value : String(50);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Final bid'
entity NAUTICOMP_QUOT_SRV.xNAUTIxfinalbid {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Voyage No'
  @sap.quickinfo : 'Voyage Number'
  key Voyno : String(20) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vendor'
  @sap.quickinfo : 'Account Number of Vendor or Creditor'
  key Lifnr : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Code'
  key Zcode : String(12) not null;
  @sap.display.format : 'Date'
  @sap.label : 'Bid Date'
  key Biddate : Date not null;
  @sap.label : 'Bid Time'
  key Bidtime : Time not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Chartering Req. No.'
  @sap.quickinfo : 'Charter No'
  Chrnmin : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Code Description'
  CodeDesc : String(50);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Value'
  Value : String(50);
  @sap.label : 'Revaluation'
  @sap.quickinfo : 'Revaluation amount on back-posting to a previous period'
  Cvalue : Decimal(14, 3);
  @sap.label : 'Currency'
  @sap.quickinfo : 'Currency Key'
  @sap.semantics : 'currency-code'
  Cunit : String(5);
  @sap.display.format : 'Date'
  @sap.label : 'Bidding Start Date'
  Chrqsdate : Date;
  @sap.label : 'Bidding Start Time'
  Chrqstime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Bidding End Date'
  Chrqedate : Date;
  @sap.label : 'Bidding End Time'
  Chrqetime : Time;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Done by Vendor ?'
  DoneBy : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Created by'
  Uname : String(12);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Status'
  Stat : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Type (Auto/manual)'
  Zmode : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Comments'
  Zcom : String(250);
};

