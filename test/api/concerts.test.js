const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concert = require('../../models/concert.model');
const {
    getPrice
} = require('../../controllers/concerts.controller');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET ', () => {
    before(async () => {
        const testConOne = new Concert({
            _id: '5d9f1140f10a81216cfd4405',
            performer: 'John',
            genre: 'Pop',
            price: 100,
            day: 2,
            image: 'image.jpg'
        });
        await testConOne.save();

        const testConTwo = new Concert({
            _id: '5d9f1159f81ce8d1ef2bee48',
            performer: 'Amanda',
            genre: 'Rock',
            price: 200,
            day: 2,
            image: 'image2.jpg'
        });
        await testConTwo.save();
    });

    it('/:performer should return all performer\'s concerts', async () => {
        const res = await request(server).get('/api/concerts/performer/Amanda');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;

    });

    it('/:genre should return all concerts of this genre', async () => {
        const res = await request(server).get('/api/concerts/genre/Pop');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;

    });

    it(':price_min/:price_max should return all concerts which price is between min price and max price', async () => {
        const res = await request(server).get('/api/concerts/price/99/105');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;

    });

    it('/:day should return all concerts in this day', async () => {
        const res = await request(server).get('/api/concerts/day/2');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
    });

    after(async () => {
        await Concert.deleteMany();
    });
});