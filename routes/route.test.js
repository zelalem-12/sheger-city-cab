const app = require('../app')
const request = require('supertest')(app);


it('Gets the endpoint', async () => {
    //Sending Get Request to the / endpoint
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Express');
});