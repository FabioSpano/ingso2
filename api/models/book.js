var uniqid = require('uniqid');

var bookTable = global.bookTable
if (bookTable == null)
    bookTable = [];

class Book {

    async save() {
        let matchingBookID = -1;

        if(this.id == undefined){
            this.id = uniqid();
        }
        else{
            matchingBookID = bookTable.findIndex(e => e.id === this.id)
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

        if(matchingBookings != null){
            for (var i=0; i<bookTable.length; i++){
                if(bookTable[i] == matchingBookings){
                    bookTable[i] = null;
                }
            }

            return true;
        }else{
            return false;
        }
    }

    static findByID(id){
        for (var i=0; i<bookTable.length; i++){
            if(bookTable[i].id == id){
                return bookTable[i];
            }
        }
        return null;
    }

    static async find (criterias){
        if(bookTable.length != 0){
            return bookTable;
        }else{
            return null;
        }
    }

    static findBySeat (seatid){
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

    static findByUser (usermat){
        var bookfound = [];
        for(var i=0; i<bookTable.length; i++){
            if(bookTable[i] != null && bookTable[i].user == usermat){
                bookfound.push(bookTable[i]);
            }
        }
        return bookfound;
    }

    static change(BookID, seatid) {
        var before = -1;
        for (var i = 0; i < bookTable.length; i++) {
            if (bookTable[i] != null && bookTable[i].id == BookID) {
                before = bookTable[i].seatid;
                bookTable[i].seatid = seatid;
                return before;
            }
        }
        return before;
    }
};

module.exports = Book;