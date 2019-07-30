// this is a utility script
// to clean source lyric files
// by removing all unneeded
// [Verse] or [Chorus] tags

const fs = require('fs');

let files = fs.readdirSync(__dirname + '/source');

files.forEach( file => {
    
    let contents = fs.readFileSync(__dirname + '/source/' + file)
                    .toString()
                    .split('\n')
                    .filter(
                        (line)=>{
                            return !line.match(/\[(.*)\]/g);
                        }
                    )
                    .join('\n');

    fs.writeFileSync(__dirname + '/cleaned/' + file, contents);

});