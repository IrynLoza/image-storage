const { s3Service, localService } = require('../service');

async function upload(req, res) {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({status: 'error', message: 'No files were uploaded.'});
    }
 
    const { files, params: { userId }, query: { type, storage } } = req;
    const keysArray = Object.keys(files);
    const fileSizeLimit = 1;
    keysArray.forEach(key => {
        const totalSizeMB = files[key].size / Math.pow(1024,2);
        if(totalSizeMB > fileSizeLimit){
            return res.status(400).send({status: 'error', message: `File: is to big`, file: `${files[key].name}`});
        }

    })
    const promises = [];

    if(storage === 'local'){
        keysArray.forEach((key)=>{
            const { name, data, mimetype, encoding } = files[key];
            promises.push(localService.upload({ type, userId, name, data, encoding, mimetype }));
        });

    } else if(storage === 's3') {
        keysArray.forEach((key)=>{
            const { name, data, mimetype, encoding } = files[key];
            promises.push(s3Service.upload({ type, userId, name, data, encoding, mimetype }));
        });
    }
    try {
        await Promise.all(promises);
        res.status(200).send({status: 'success', message: `${keysArray.length} files were upload to file storage`});
    } catch (error) {
        res.status(400).send({status: 'error', message: error.message });
    }

}

module.exports = upload;