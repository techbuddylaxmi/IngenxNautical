const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const NAUTIBTP_NAUTICAL_TRANSACTIO_SRV = await cds.connect.to("NAUTIBTP_NAUTICAL_TRANSACTIO_SRV"); 
      srv.on('READ', 'xNAUTIxCharteringHeaderItem', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query)); 
      srv.on('READ', 'CharteringSet', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query)); 
      srv.on('UPDATE', 'CharteringSet', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query)); 

      
 // Using CDS API      
 const NAUTICOMP_QUOT_SRV = await cds.connect.to("NAUTICOMP_QUOT_SRV"); 
 srv.on('READ', 'xNAUTIxfinalbid', req => NAUTICOMP_QUOT_SRV.run(req.query)); 
 srv.on('CREATE', 'xNAUTIxfinalbid', req => NAUTICOMP_QUOT_SRV.run(req.query)); 

 srv.on('READ', 'xNAUTIxitemBid', req => NAUTICOMP_QUOT_SRV.run(req.query)); 
 srv.on('READ', 'xNAUTIxvenBid', req => NAUTICOMP_QUOT_SRV.run(req.query));

}