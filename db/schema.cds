namespace nauticalDb;

type BidDetail {
    CodeDesc: String;
    Value: String;
    fScore : Integer;
};

type Vendors {
    vendorId : String;
    score : Integer;
    eligible : Boolean;
    rank : String;
    bidDetails: array of BidDetail;
}

entity calculateRankings {
    Voyno: String;
    Chrnmin: String;
    Vendors : array of Vendors;
}

