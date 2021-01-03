const fs = require('fs');

let files = fs.readdirSync(__dirname + '/cleaned');

files.forEach( file => {
    
    let contents = fs.readFileSync(__dirname + '/cleaned/' + file).toString();

    fs.appendFileSync(__dirname + '/corpus.txt', contents);

});