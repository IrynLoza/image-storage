const { s3Service, localService } = require('../service');

async function search(req, res) {
    const { params: { userId }, query: { type, name, storage } } = req;

    if (!name) {
        return res.status(400).send({status: 'error', result: 'Name is required for download.'});
    }
    try {
        let stream = null;
        if (storage === 'local'){
            stream = await localService.download({ userId, type, name });
        } else if (storage === 's3'){
            stream = await s3Service.download({ userId, type, name });
        }
        return stream.pipe(res);
    } catch (error) {
        res.status(400).send({status: 'error', message: error.message });
    }
}

module.exports = search;
