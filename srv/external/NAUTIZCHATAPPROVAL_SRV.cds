/* checksum : 607c5cc1e5314255b98b3c56e502c851 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.supported.formats : 'atom json xlsx'
service NAUTIZCHATAPPROVAL_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity NAUTIZCHATAPPROVAL_SRV.chartapprSet {
  @sap.unicode : 'false'
  @sap.label : 'Chartering Approval'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Creqno : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Chartering Req. No.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Chrnmin : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Approver Level'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Zlevel : String(2) not null;
  @sap.unicode : 'false'
  @sap.label : 'User Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Uname : String(12) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Zdate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Time'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Ztime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Comments'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Zcomm : String(250) not null;
  @sap.unicode : 'false'
  @sap.label : 'Action Taken'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Zaction : String(4) not null;
};

