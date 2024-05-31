const cds = require('@sap/cds');

module.exports = async (srv) => {
    const NAUTICOMP_QUOT_SRV = await cds.connect.to("NAUTICOMP_QUOT_SRV");
    const NAUTIBTP_NAUTICAL_TRANSACTIO_SRV = await cds.connect.to("NAUTIBTP_NAUTICAL_TRANSACTIO_SRV");

    srv.on('READ', 'xNAUTIxCharteringHeaderItem', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query));
    srv.on('READ', 'CharteringSet', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query));
    srv.on('UPDATE', 'CharteringSet', req => NAUTIBTP_NAUTICAL_TRANSACTIO_SRV.run(req.query));

    srv.on('READ', 'xNAUTIxfinalbid', req => NAUTICOMP_QUOT_SRV.run(req.query));
    srv.on('CREATE', 'xNAUTIxfinalbid', req => NAUTICOMP_QUOT_SRV.run(req.query));
    srv.on('READ', 'xNAUTIxitemBid', req => NAUTICOMP_QUOT_SRV.run(req.query));
    srv.on('READ', 'xNAUTIxvenBid', req => NAUTICOMP_QUOT_SRV.run(req.query));

    srv.on('READ', 'calculateRankings', async (req) => {
        console.log("values", req._queryOptions.$filter);
        
        let Chrnmin = req._queryOptions.$filter.split(' ')[2];
        Chrnmin = Chrnmin.replace(/'/g, '');

        const charminData = await NAUTICOMP_QUOT_SRV.run(SELECT.from('xNAUTIxvenBid').where({ Chrnmin }));
        let Voyno = charminData[0].Voyno;

        const voyageData = await NAUTICOMP_QUOT_SRV.run(SELECT.from('xNAUTIxitemBid').where({ Voyno }));

        const rankedVendors = calculateAndRank(voyageData, charminData);
        console.log("rankedVendors", rankedVendors);

        return rankedVendors;
    });

    function calculateAndRank(voyageData, charminData) {
        const vendorScores = calculateScores(voyageData, charminData);
        const rankedVendors = rankVendors(vendorScores, charminData);
        const rankedWithCommercial = calculateCommercialRank(rankedVendors);

        const groupedRankedVendors = groupedByVoynoAndChrnmin(rankedWithCommercial);

        return groupedRankedVendors;
    }

    function calculateScores(voyageData, charminData) {
        const vendorScores = {};

        charminData.forEach(vendor => {
            if (!vendorScores[vendor.Lifnr]) {
                vendorScores[vendor.Lifnr] = {
                    Voyno: vendor.Voyno,
                    Chrnmin: vendor.Chrnmin,
                    score: 0,
                    eligible: true,
                    Cvalue: vendor.Cvalue,
                    bidDetails: []
                };
            }

            const expected = voyageData.find(v => v.Zcode === vendor.Zcode && v.Voyno === vendor.Voyno);
            if (expected) {
                let fScore;
                if ((expected.Mand === "X" || expected.Must === "X") && expected.Value !== vendor.Value) {
                    vendorScores[vendor.Lifnr].eligible = false;
                    fScore = 0;
                } else {
                    const score = expected.Value === vendor.Value ? parseInt(expected.Zmax) : parseInt(expected.Zmin);
                    vendorScores[vendor.Lifnr].score += score;
                    fScore = score;
                }
                vendorScores[vendor.Lifnr].bidDetails.push({
                    CodeDesc: expected.CodeDesc,
                    Value: vendor.Value,
                    Cvalue: vendor.Cvalue,
                    fScore: fScore
                });
            }
        });

        return vendorScores;
    }

    function rankVendors(vendorScores, charminData) {
        const rankedVendors = Object.keys(vendorScores)
            .map(vendor => ({
                vendorId: vendor,
                Voyno: vendorScores[vendor].Voyno,
                Chrnmin: vendorScores[vendor].Chrnmin,
                score: vendorScores[vendor].score,
                eligible: vendorScores[vendor].eligible,
                Cvalue: vendorScores[vendor].Cvalue,
                bidDetails: vendorScores[vendor].bidDetails
            }))
            .sort((a, b) => b.score - a.score);

        let rankCounter = {};
        rankedVendors.forEach(vendor => {
            const key = `${vendor.Voyno}-${vendor.Chrnmin}`;
            if (!rankCounter[key]) {
                rankCounter[key] = 1;
            }
            vendor.Trank = `T${rankCounter[key]++}`;
        });

        return rankedVendors;
    }

    function calculateCommercialRank(rankedVendors) {
        const groupedByChrnmin = rankedVendors.reduce((acc, vendor) => {
            if (!acc[vendor.Chrnmin]) {
                acc[vendor.Chrnmin] = [];
            }
            acc[vendor.Chrnmin].push(vendor);
            return acc;
        }, {});

        Object.keys(groupedByChrnmin).forEach(key => {
            groupedByChrnmin[key].sort((a, b) => a.Cvalue - b.Cvalue);

            groupedByChrnmin[key].forEach((vendor, index) => {
                vendor.Crank = `C${index + 1}`;
            });
        });

        return rankedVendors;
    }

    function groupedByVoynoAndChrnmin(rankedVendors) {
        const grouped = {};

        rankedVendors.forEach(vendor => {
            const key = `${vendor.Voyno}-${vendor.Chrnmin}`;
            if (!grouped[key]) {
                grouped[key] = {
                    Voyno: vendor.Voyno,
                    Chrnmin: vendor.Chrnmin,
                    Vendors: []
                };
            }
            grouped[key].Vendors.push({
                vendorId: vendor.vendorId,
                score: vendor.score,
                eligible: vendor.eligible,
                Trank: vendor.Trank,
                Crank: vendor.Crank,
                bidDetails: vendor.bidDetails
            });
        });

        return Object.values(grouped);
    }
};
