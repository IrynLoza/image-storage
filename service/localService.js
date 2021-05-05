const path = require('path');
const appDir = path.dirname(require.main.filename);
const fs = require('fs');

const upload = async ({ type, userId, name, data }) => {
    const pathToDir = `${appDir}/storage/${userId}${type ? `/${type}`: ""}`;
    if (!fs.existsSync(pathToDir)) {
        await fs.promises.mkdir(pathToDir, { recursive: true });
      }
      const result = await fs.promises.writeFile(`${pathToDir}/${name}`, data);
      return result;
}

const download = async ({ type, userId, name }) => {
    const pathToDir = `${appDir}/storage/${userId}${type ? `/${type}`: ""}`;
    try {
        await fs.promises.access(`${pathToDir}/${name}`);
        return fs.createReadStream(`${pathToDir}/${name}`);
    } catch (error) {
        throw new Error(`File isn't exist`);
    }
}


const search = async({ userId, name, type }) => {
    const pathToDir = `${appDir}/storage/${userId}${type ? `/${type}`: ""}`;  
    const result = await fs.promises.readdir(pathToDir);
    const images = result.map(image => {
        return {
            permission: type,
            name: image
        }
    });
    return {
        count: images.length,
        images: name ? images.filter(image => image.name === name) : images,
    };
}


module.exports = {
    upload,
    search,
    download
}