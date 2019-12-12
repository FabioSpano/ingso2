var uniqid = require('uniqid');

var usersTable = global.usersTable
if (usersTable == null)
    usersTable = [];

class User {

    async save(matid) {
        let matchingUserMat = -1;

        if(this.mat == undefined){
            this.mat = matid;
        }
        else{
            matchingUserMat = usersTable.findIndex(e => e.mat === this.mat)
        }

        if (matchingUserMat == -1){
            usersTable.push(this);
        }else{
            usersTable[matchingUserMat] = this;
        }
        return this;
    }

    static delete() {
        usersTable = [];
        return true;
    }

    static remove(mat){
        let matchingUsers = this.findByMatricola(mat);

        if(matchingUsers != null){
            for (var i=0; i<usersTable.length; i++){
                if(usersTable[i].mat == mat){
                    usersTable[i] = null;
                }
            }

            return true;
        }else{
            return false;
        }
    }

    static async find (criterias){
        if(usersTable.length != 0){
            return usersTable;
        }else{
            return null;
        }
    }

    static findByMatricola (mat){
        let matchingUsers;
        for(var i=0; i<usersTable.length; i++){
            if(usersTable[i] != null && usersTable[i].mat == mat) {
                matchingUsers = usersTable[i];
                return matchingUsers;
            }
        }
        return null;
    }

    static change(mat, email) {
        for (var i = 0; i < usersTable.length; i++) {
            if (usersTable[i] != null && usersTable[i].mat == mat) {
                usersTable[i].mat = mat;
                usersTable[i].email = email;
            }
        }
    }
};

module.exports = User;