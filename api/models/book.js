var uniqid = require('uniqid');

var bookTable = global.bookTable
if (bookTable == null)
    bookTable = [];

class Book {

    async save() {
        let matchingBookID = -1;

        if(this.mat == undefined){
            this.mat = uniqid();
        }
        else{
            matchingBookID = bookTable.findIndex(e => e.mat === this.mat)
        }

        if (matchingBookID == -1){
            bookTable.push(this);
        }else{
            bookTable[matchingBookID] = this;
        }
        return this;
    }

    static delete() {
        bookTable = [];
        return true;
    }

    static remove(BookID){
        let matchingBookings = this.findByID(BookID);

        if(matchingID != null){
            for (var i=0; i<bookTable.length; i++){
                if(bookTable[i].mat == mat){
                    bookTable[i] = null;
                }
            }

            return true;
        }else{
            return false;
        }
    }

    static async find (criterias){
        if(bookTable.length != 0){
            return bookTable;
        }else{
            return null;
        }
    }

    static findBySeat (seatid){
        let matchingID;
        var TodaysDate = new Date();
        for(var i=0; i<bookTable.length; i++){
            if(bookTable[i] != null && bookTable[i].seatid == seatid) {
                if (bookTable[i].date == TodaysDate){
                    return false;
                }
            }
        }
        return true;
    }

    static change(BookID,date) {
        for (var i = 0; i < bookTable.length; i++) {
            if (bookTable[i] != null && bookTable[i].BookID == BookID) {
                bookTable[i].BookID = BookID;
                bookTable[i].Date = date;
            }
        }
    }
};

module.exports = Book;