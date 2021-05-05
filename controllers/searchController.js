const { s3Service, localService } = require('../service');

async function search(req, res) {    
    const { params: { userId }, query: { type, name, storage } } = req;
    try {
        let result = null;
        if (storage === 'local'){
            result = await localService.search({ userId, type, name })
        } else if (storage === 's3'){
            result = await s3Service.search({ userId, type, name });
        }
        res.status(200).send({status: 'success', result });
    } catch (error) {
        res.status(400).send({status: 'error', message: error.message });
    }
}

module.exports = search;
