import fs from 'fs'
import { gen } from './gen.js'

;(async () => {
  while (true) {
    let result = await gen().then((lyrics) => {
      // console.log(lyrics);
      let slug = Math.random() * 9999999
      fs.writeFile(
        './examples/example_' + slug.toString() + '.txt',
        lyrics,
        (err) => {
          if (err) {
            throw err
          }
          console.log('Saved!')
        }
      )
    })
  }
})()
