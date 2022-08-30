const fs = require("fs");
const csv = require('csvtojson');
const {parser} = require('json2csv');

(async ()=> {
const ciudades = await csv().fromFile("ciudadesLaficat.csv");
})