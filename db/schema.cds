namespace nauticalDb;

type BidDetail {
    CodeDesc: String;
    Value: String;
    Cvalue : Integer;
    fScore : Integer;
};

type Vendors {
    vendorId : String;
    score : Integer;
    eligible : Boolean;
    Trank : String;
    Crank : String;
    bidDetails: array of BidDetail;
}

entity calculateRankings {
    Voyno: String;
    Chrnmin: String;
    Vendors : array of Vendors;
}

