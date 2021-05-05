/* eslint-disable no-undef */
const fs = require('fs');
const app = require('../server');
const supertest = require('supertest');

const request = supertest(app);


describe('Required fields validation', ()=> {
    it('Should return error if user isn\'t valid', async () => {
        const userId = 'aac';
        const type = 'public';
        const storage = 'local';
        const endpoint = `/images/${userId}/upload?type=${type}&storage=${storage}`;
        const response = await request.post(endpoint);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('"userId" length must be at least 5 characters long');
    });
    it('Should return error if type isn\'t valid', async () => {
        const userId = '55bca1';
        const type = 'random';
        const storage = 'local';
        const endpoint = `/images/${userId}/upload?type=${type}&storage=${storage}`;
        const response = await request.post(endpoint);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('"type" must be one of [public, private]');
    });
    it('Should return error if storage isn\'t valid', async () => {
        const userId = '55bca1';
        const type = 'public';
        const storage = 's4';
        const endpoint = `/images/${userId}/upload?type=${type}&storage=${storage}`;
        const response = await request.post(endpoint);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('"storage" must be one of [local, s3]');
    });
})

describe('POST: `/images/${userId}/upload`', () => {
    it('Should upload file if all data correct', async () => {
        const userId = '55bca1';
        const type = 'public';
        const storage = 'local';
        const endpoint = `/images/${userId}/upload?type=${type}&storage=${storage}`;
       
        const image = await fs.promises.readFile(`${__dirname}/mock/sky.jpeg`);
    
        const response = await request.post(endpoint).attach('image1', image, 'sky.jpeg');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('1 files were upload to file storage');
    });
})

describe('GET: `/images/${userId}/search`', () => {
    it('Should return files if all data correct', async () => {
        const userId = '55bca1';
        const type = 'public';
        const storage = 'local';
        const endpoint = `/images/${userId}/search?type=${type}&storage=${storage}`;
        const response = await request.get(endpoint);
        expect(response.status).toBe(200);
        expect(response.body.result.count).toBe(1);
    });
})

describe('GET: `/images/${userId}/download`', () => {
    it('Should return files if all data correct', async () => {
        const userId = '55bca1';
        const type = 'public';
        const storage = 'local';
        const endpoint = `/images/${userId}/download?type=${type}&storage=${storage}&name=sky.jpeg`;
        const response = await request.get(endpoint);
        expect(response.status).toBe(200);
    });
})
