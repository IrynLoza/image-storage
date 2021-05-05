const express = require('express');
const { Joi } = require('express-validation')

const router = express.Router();

const {
    uploadController,
    searchController,
    downloadController,
} = require('../controllers');


const userIdschema = Joi.object({
    userId: Joi.string()
    .alphanum()
    .min(5)
    .max(10)
    .required()
})

const queryParamschema = Joi.object({
    type: Joi.string()
    .valid("public", "private")
    .alphanum()
    .required(),
    storage: Joi.string()
    .valid("local", "s3")
    .alphanum()
    .required(),
    name: Joi.string()
})

const validateInput = async(req, res, next) => {
    const { params, query } = req;
    try {
        await userIdschema.validateAsync(params);
        await queryParamschema.validateAsync(query);
        return next();
    } catch (error) {
        res.status(400).send({ staus: 'Error', message: error.message})
    }

}

router.post('/images/:userId/upload', validateInput, uploadController);
router.get('/images/:userId/search', validateInput, searchController);
router.get('/images/:userId/download', validateInput, downloadController);

router.use((req, res) => res.status(404).send({ message: 'Endpoint is not found' }));

module.exports = router;
