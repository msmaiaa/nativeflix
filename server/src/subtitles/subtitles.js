require('dotenv').config()
const path = require("path");
const request = require('superagent');
const admZip = require('adm-zip');
const OS = require('opensubtitles-api');
const OpenSubtitles = new OS('Popcorn Time NodeJS');
const fs = require('fs-extra');
const srt2vtt = require('srt-to-vtt')
const chalk = require('chalk');

let token = '';
//opensubtitles credentials
OpenSubtitles.api.LogIn(process.env.LOGIN, process.env.PASS, 'pt-br', 'Butter V1')
.then((res)=>{
    token = res.token;
})

const renameSubs = async (dir) =>{
    const directoryPath = path.join(dir);
    return fs.readdir(directoryPath)
    .then(async (files)=>{
        let index = 1;
        for await (const file of files){
            if(file.includes(`.srt`)){
                await fs.rename(dir + file, dir + `subtitle${index}.srt`);
                await fs.createReadStream(`${dir}subtitle${index}.srt`)
                .pipe(srt2vtt())
                .pipe(fs.createWriteStream(`${dir}subtitle${index}.vtt`))
                index += 1;
            } 
        }
    })

}

const downSub = async(data, directory, index) =>{
    const downUrl = data.ZipDownloadLink;
    const subPath = `${directory}subtitle${index}.zip`
    //download the subtitle zip to the directory
    return new Promise(resolve => {
        request
        .get(downUrl)
        .on('error', function(error) {
            console.log(error);
        })
        .pipe(fs.createWriteStream(subPath))
        .on('finish', async() =>{
            //unzipping the files to the directory
            let zip = new admZip(subPath);
            zip.extractAllTo(directory,true);
            resolve();
        });
    })
}

const deleteSubs = async(directory) =>{
    const files = await fs.readdir(directory);
    for await(let f of files){
        if(f.includes('.srt') || f.includes('.vtt')){
            await fs.remove(directory + f);
        }
    }
    return;
}

const getSubtitles = async(data, directory)=>{
    try{
        const imdb_code = data.imdb_code.replace('tt', '');
        let response = {}
        
        //fetching directly from the opensubtitles api
        return OpenSubtitles.api.SearchSubtitles(token,[{'imdbid': imdb_code, 'sublanguageid': process.env.subtitlesLanguage, limit: '10'}])
        .then(async (subtitles)=>{
    
            //if server is offline or in maintenance
            if(!subtitles.data){
                if(subtitles.status == '401 Unauthorized'){
                    console.log(chalk.red('Unauthorized status from the api, maybe the credentials are wrong.'));
                    response.status = 401;
                }else{
                    response.status = 400;
                }
                return response
            }else{
                response.status = 200;
            }

            await createDir(directory)
            const promises = [];
            await deleteSubs(directory)

            for(let i = 0; i < 10; i++){
                if(subtitles.data[i]){
                    promises.push(downSub(subtitles.data[i], directory, i + 1))
                }
            }

            const subs = await Promise.all(promises);
            if(subs.length > 0){
                await renameSubs(directory);
                response.subs = subs.length;
            }else{
                response.subs = 0;
            }

            return response;
            
        })
        .catch((e)=>{
            console.log(e);
            console.error('Error on the subtitles api (maybe offline?)')
            return 400;
        })
    }
    catch(e){
        console.error(e.message);
        throw e;
    }
}

createDir = async(dir) =>{
    try{
        await fs.ensureDir(dir)
        return;
    }
    catch(e){
        console.error(e)
    }
}
exports.getSubtitles = getSubtitles;