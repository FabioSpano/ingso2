var uniqid = require('uniqid');


var reviewTable = global.reviewTable
if (reviewTable == null)
    reviewTable = [];

class Review {

    async save() {
        let matchingReviewId = -1;

        if(this.reviewid == undefined){
            this.reviewid = uniqid();
        }
        else{
            matchingReviewId = reviewTable.findIndex(e => e.reviewid === this.reviewid)
        }

        if (matchingReviewId == -1){
            reviewTable.push(this);
        }else{
            reviewTable[matchingReviewId] = this;
        }
        return this;
    }

    static delete() {
        reviewTable = [];
        return true;
    }

    /*static remove(reviewid){
        let matchingReviews = this.findMyReview(reviewid);
        if(matchingReviews != null){
            for (var i=0; i<reviewTable.length; i++){
                if(reviewTable[i].reviewid == reviewid){
                    reviewTable[i] = null;
                }
            }
            return true;
        }else{
            return false;
        }
    }*/

    static async find (criterias){
        if(reviewTable.length != 0){
            return reviewTable;
        }else{
            return null;
        }
    }

    static findMyReview (reviewid){
        let matchingReviews;
        for(var i=0; i<reviewTable.length; i++){
            if(reviewTable[i] != null && reviewTable[i].reviewid == reviewid) {
                matchingReviews = reviewTable[i];
                return matchingReviews;
            }
        }
        return null;
    }

    /*static change(reviewid, review) {
        for (var i = 0; i < reviewTable.length; i++) {
            if (reviewTable[i] != null && reviewTable[i].mat == reviewid) {
                reviewTable[i].reviewText = review;
                reviewTable[i].date = new Date();
            }
        }
    }*/
};

module.exports = Review;
