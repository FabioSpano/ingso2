var uniqid = require('uniqid');

var mealTable = global.mealTable
if (mealTable == null)
    mealTable = [];

class Meal {

    async save() {
        let matchingMealId = -1;

        if(this.mealid == undefined){
            this.mealid = uniqid();
        }
        else{
            matchingMealId = mealTable.findIndex(e => e.mealid === this.mealid)
        }

        if (matchingMealId == -1){
            mealTable.push(this);
        }else{
            mealTable[matchingMealId] = this;
        }
        return this;
    }

    static delete() {
        mealTable = [];
        return true;
    }

    static remove(mat){
        let matchingMeals = this.findMyMeal(mealid);

        if(matchingMeals != null){
            for (var i=0; i<mealTable.length; i++){
                if(mealTable[i].mealid == mealid){
                    mealTable[i] = null;
                }
            }

            return true;
        }else{
            return false;
        }
    }

    static async find (criterias){
        if(mealTable.length != 0){
            return mealTable;
        }else{
            return null;
        }
    }

    static findMyMeal (mealid){
        let matchingMeals;
        for(var i=0; i<mealTable.length; i++){
            if(mealTable[i] != null && mealTable[i].mealid == mealid) {
                matchingMeals = mealTable[i];
                return matchingMeals;
            }
        }
        return null;
    }

    static change(mealid, first, second, dessert) {
        for (var i = 0; i < mealTable.length; i++) {
            if (mealTable[i] != null && mealTable[i].mat == mealid) {
                mealTable[i].mealid = mealid;
                mealTable[i].first = first;
                mealTable[i].second = second;
                mealTable[i].dessert = dessert;
                mealTable[i].date = date;
            }
        }
    }
};

module.exports = Meal;
