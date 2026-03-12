import fs from 'fs'
import request from 'request'

const download = async (url, path, callback) => {
    return new Promise((resolve, reject) => {    
        request.head(url, (err, res, body) => {
            request(url)
                .pipe(fs.createWriteStream(path))
                .on('close', ( obj )=>{

                    resolve( obj )
                })
        })
    });
}

export { download }