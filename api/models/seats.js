var uniqid = require('uniqid');

var seatTable = global.seatTable;
if (seatTable == null)
    seatTable = [];
var numero=global.numero;
numero=0;

class Seats {

    async save() {
        let matchingSeatId = -1;

        if(this.seatid == undefined){
            this.seatid = numero;
            numero++;
        }
        else{
            matchingSeatId = seatTable.findIndex(e => e.seatid === this.seatid)
        }

        if (matchingSeatId == -1){
            seatTable.push(this);
        }else{
            seatsList[matchingseatId] = this;
        }
        return this;
    }

    static delete() {
        seatTable = [];
        return true;
    }

    static remove(mat){
        let matchingseats = this.findMyseat(seatid);

        if(matchingseats != null){
            for (var i=0; i<seatTable.length; i++){
                if(seatTable[i].seatid == seatid){
                    seatTable[i] = null;
                }
            }

            return true;
        }else{
            return false;
        }
    }

    static async find (criterias){
        if(seatTable.length != 0){
            return seatTable;
        }else{
            return null;
        }
    }

    static findMyseat (seatid){
        let matchingseats;
        for(var i=0; i<seatTable.length; i++){
            if(seatTable[i] != null && seatTable[i].seatid == seatid) {
                matchingseats = seatTable[i];
                return matchingseats;
            }
        }
        return null;
    }

    static change(seatid, first, second, dessert) {
        for (var i = 0; i < seatTable.length; i++) {
            if (seatTable[i] != null && seatTable[i].mat == seatid) {
                seatTable[i].seatid = seatid;
            }
        }
    }
};

module.exports = Seats;
