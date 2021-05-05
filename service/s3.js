const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const access = {
    private: 'private',
    public: 'public-read'
}
// eslint-disable-next-line no-undef
const Bucket = process.env.BUCKET_NAME;

const upload = async ({ type, userId, name, data, mimetype }) => {
    const response = await s3.putObject({
        Bucket,
        Key: `${userId}/${name}`,
        Body: data,
        ContentEncoding: 'base64',
        ContentType: mimetype,
        ACL: access[type]
    }).promise();
    return response;
}

const download = async ({ userId, name }) => {
    var stream = await s3.getObject({
        Bucket,
        Key: `${userId}/${name}`,
    }).createReadStream();
    return stream;
}

const search = async({ userId, name, type }) => {
    const { KeyCount, Contents } = await s3.listObjectsV2({
        Bucket,
        Prefix: `${userId}/${name ? name : ''}`
    }).promise();

    // to utils
    const normalizeName = (name) => {
        return name.split('/')[1];
    }
    const normalizeUrl = (name) => {
        return `https://shopify-storage.s3-us-west-1.amazonaws.com/${name}`
    }

    const getPermission = async ({ Grants }) => {
        for(let i=0; i<Grants.length; i++){
            if(Grants[i].Permission === 'READ'){
                return 'public';
            }
        }
        return 'private';
    }

    const result = KeyCount ? await Contents.reduce(async (acc, { Key }) => {
        const result = await acc; 
        const alc = await s3.getObjectAcl({ Bucket, Key }).promise();
        const permission = await getPermission(alc);
        result.push({ 
            permission,
            name: normalizeName(Key),
            url: normalizeUrl(Key),
        })

        return [...result];
    }, []) : [];

    const images = type ? result.filter(image => image.permission === type) : result;
    return {
        count: images.length,
        images,
        
    };
}

module.exports = {
    upload,
    search,
    download
}