const fs = require('fs');
const ndjson = require('ndjson');
const fuzzy = require('fuzzyset.js');
const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

//LOCAL FILE SEARCH ONLY, use QuickDraw Components API for faster runtime.

let all_drawings = {}
let files = fs.readFileSync('categories.txt').toString().split("\n");
// const files = fs.readdirSync('./drawings').map(s => s.replace('.ndjson', ''));
// let strings = FuzzySet(files);

app.get('/:objectId', (request, response) => {
    // function sendRandomIndex(arr, score){
    //     let index = Math.floor(Math.random()* arr.length);
    //     let recognized = arr[index].recognized;
    //     while (!recognized){
    //         index += 1;
    //         recognized = arr[index].recognized;
    //     }
    //     response.send(arr[index]);
    // }function read(file, callback) {
    let filename = request.params["objectId"].replace('_', ' ');
    let fileSet = FuzzySet(files);
    let matches = fileSet.get(filename, filename, 0.5);
    let best = matches[0][1];
    let score = matches[0][0];
    response.send({result: best});
    // if (files.indexOf(filename) == -1) {
    //     response.send(null);
    // }
    // else if(filename in all_drawings) {
    //     let drawings = all_drawings[filename];
    //     sendRandomIndex(drawings, bestMatch, );
    // }
    // else {
    //     let drawings = [];
    //     const stream = fs.createReadStream("drawings/" + filename + ".ndjson")
    //       .pipe(ndjson.parse())
    //       .on('data', function(obj) {
    //         if(drawings.length < 1000){
    //             drawings.push(obj);
    //         }
    //     }).on('end', () => {
    //         // console.log(drawings.length);
    //         all_drawings[filename] = drawings;
    //         sendRandomIndex(drawings);
    //     });
    // }

});

app.use(express.static('public'));;
