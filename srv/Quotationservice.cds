using NAUTIBTP_NAUTICAL_TRANSACTIO_SRV from './external/NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.cds';
using NAUTICOMP_QUOT_SRV from './external/NAUTICOMP_QUOT_SRV.cds';


service NauticalQuotationService{

     entity xNAUTIxCharteringHeaderItem as projection on NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.xNAUTIxCharteringHeaderItem
    {        key Chrnmin, Chrnmex, Chrcdate, Chrctime, Chrqsdate, Chrqstime, Chrqedate, Chrqetime, Chrqdate, Chrporg, Chrporgn, Chrpgrp, Chrpgrpn, Chrexcr, Chrpayt, Chrpaytxt, Chrinco, Chrincodis, Chrincol, Cimater, Cimatdes, Ciqty, Ciuom, Voyno, Voynm, Chrven, Chrvenn, Ciprec, Zdelete, RefChrnmin ,tovendor,tocharteringasso     }    
;
entity CharteringSet as projection on NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.CharteringSet
    {        Zdelete, Chrcdate, Chrqsdate, Chrqedate, Chrqdate, Chrexcr, Ciqty, key Chrnmin, Chrnmex, Chrporg, Chrporgn, Chrpgrp, Chrpgrpn, Chrpayt, Chrpaytxt, Chrinco, Chrincodis, Chrincol, Cimater, Cimatdes, Ciuom, Voyno, Voynm, Chrven, Chrvenn, Ciprec, RefChrnmin, Chrctime, Chrqstime, Chrqetime     }    
;


    entity xNAUTIxfinalbid as projection on NAUTICOMP_QUOT_SRV.xNAUTIxfinalbid
    {        key Voyno, key Lifnr, key Zcode, key Biddate, key Bidtime, Chrnmin, CodeDesc, Value, Cvalue, Cunit, Chrqsdate, Chrqstime, Chrqedate, Chrqetime, DoneBy, Uname, Stat, Zmode, Zcom     }    
;

    entity xNAUTIxitemBid as projection on NAUTICOMP_QUOT_SRV.xNAUTIxitemBid
    {        key Voyno, key Zcode, key Value, key Cvalue, Cunit, CodeDesc, RevBid, Good, Mand, Must, Zmin, Zmax     }    
;

    entity xNAUTIxvenBid as projection on NAUTICOMP_QUOT_SRV.xNAUTIxvenBid
    {        key Voyno, key Lifnr, key Zcode, Value, Cvalue, Cunit, Chrnmin, CodeDesc, Biddate, Bidtime, Zcom     }    
;




}