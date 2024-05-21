const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const NAUTIBTP_NAUTICAL_TRANSACTIO_SRV = await cds.connect.to("NAUTIBTP_NAUTICAL_TRANSACTIO_SRV"); 
      srv.on('READ', 'xNAUTIxCharteringHeaderItem', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query)); 
      srv.on('READ', 'xNAUTIxVEND', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query)); 
      srv.on('READ', 'xNAUTIxpurchGroup', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query)); 
      srv.on('READ', 'xNAUTIxpaymTerm', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query)); 
      srv.on('READ', 'xNAUTIxCHARTPURCHASEITEM', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query)); 
      srv.on('READ', 'xNAUTIxCHARTERING', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query)); 
      srv.on('READ', 'xNAUTIxVOYAGEHEADERTOITEM', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query));


      srv.on('CREATE', 'xNAUTIxCharteringHeaderItem', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query)); 
      srv.on('DELETE', 'xNAUTIxCharteringHeaderItem', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query)); 
      srv.on('DELETE', 'CharteringSet', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query)); 
      srv.on('READ', 'CharteringSet', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query)); 
      srv.on('UPDATE', 'CharteringSet', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query)); 






      const NAUTIMASTER_BTP_SRV = await cds.connect.to("NAUTIMASTER_BTP_SRV"); 
      srv.on('READ', 'xNAUTIxBusinessPartner1', req => NAUTIMASTER_BTP_SRV.run(req.query)); 

      const NAUTIZVOYAPPROVAL_SRV = await cds.connect.to("NAUTIZVOYAPPROVAL_SRV"); 
      srv.on('READ', 'voyapprovalSet', req => NAUTIZVOYAPPROVAL_SRV.run(req.query)); 
      srv.on('CREATE', 'voyapprovalSet', req => NAUTIZVOYAPPROVAL_SRV.run(req.query)); 

      const NAUTIZCHATAPPROVAL_SRV = await cds.connect.to("NAUTIZCHATAPPROVAL_SRV"); 
      srv.on('READ', 'chartapprSet', req => NAUTIZCHATAPPROVAL_SRV.run(req.query)); 
      srv.on('CREATE', 'chartapprSet', req => NAUTIZCHATAPPROVAL_SRV.run(req.query)); 

      const NAUTIZVOY_VALUEHELP_CDS = await cds.connect.to("NAUTIZVOY_VALUEHELP_CDS"); 
      srv.on('READ', 'xNAUTIxvoy_valuehelp', req => NAUTIZVOY_VALUEHELP_CDS.run(req.query));
      
      

}