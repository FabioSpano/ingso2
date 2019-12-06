const Telegraf = require('telegraf');
const fetch = require("node-fetch");
const https = require('https');

const bot = new Telegraf("1045755438:AAEVL0yA59s0j1CBNhurnG2b82dBNzofUD0");


bot.start((message) => {
    console.log('started:', message.from.id)
    return message.reply('Mensa Povo1! Grazie a questo bot puoi conoscere il menù di oggi, visualizzare i posti liberi in mensa, prenotarli e scrivere review riguardanti i pasti! Digita \n/help per sapere i comandi disponibili.');
});

bot.hears('/help', message => {
	return message.reply("I comandi disponibili sono: \n/help \n/start \n/meals \n/seats");
});

bot.hears('/meals', message => {
    var date = new Date();

    var stringDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    console.log(stringDate);


    var url = "https://bookmealunitn.herokuapp.com/meals/" + stringDate;

    https
    .get(url, resp => {
        var data = '';

        // We receive the response data in a stream, so here
        // we specify what to do with each chunk we receive
        resp.on('data', chunk => {
            data += chunk;
        });

        // We specify what to do when we finish receiving the
        // stream of data.
        resp.on('end', () => {
            let JSONData = JSON.parse(data);
            let queryData = JSONData[0][0];
            /*let valueSearched = queryData.query.search;
            for(let i=0;i<5;i++){
                console.log(valueSearched[i].title);
            }*/
            message.reply("Pasto del " + queryData["date"] + ":\n Primo: " + queryData["first"] + "\n Secondo: " + queryData["second"] + "\n Dessert: " + queryData["dessert"]);
            //}
        }); // We receive the content as "text" and print it
    })
    .on('error', err => console.log('Error: ' + err.message));
});

bot.hears('/seats', message => {
    var url = "https://bookmealunitn.herokuapp.com/seats";

    https
    .get(url, resp => {
        var data = '';

        // We receive the response data in a stream, so here
        // we specify what to do with each chunk we receive
        resp.on('data', chunk => {
            data += chunk;
        });

        // We specify what to do when we finish receiving the
        // stream of data.
        resp.on('end', () => {
            let JSONData = JSON.parse(data);
            let queryData = JSONData[0];
            /*let valueSearched = queryData.query.search;
            for(let i=0;i<5;i++){
                console.log(valueSearched[i].title);
            }*/
            var stringData = 'Lista dei posti:\n';
            for(q of queryData){
                stringData += q["seatid"] + " is booked: " + q["booked"] + "\n";
            }
            message.reply(stringData);
            //}
        }); // We receive the content as "text" and print it
    })
    .on('error', err => console.log('Error: ' + err.message));

});

bot.startPolling();