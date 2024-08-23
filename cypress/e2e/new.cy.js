describe('API Testing', () => {
  
    it('Hardcoded JSON object', () => {
        const requestBody = {
            tourist_name: "David",
            tourist_email: "david12@gmail.com",
            tourist_location: "Paris"
        };
  
        cy.request({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            body: requestBody
        })
        .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.tourist_name).to.eq("David");
            expect(response.body.tourist_email).to.eq("david12@gmail.com");
            expect(response.body.tourist_location).to.eq("Paris");
        });
    });
    
    it('Dynamic JSON object', () => {
        const requestBody = {
            tourist_name: Math.random().toString(5).substring(2),
            tourist_email: Math.random().toString(36).substring(2) + "@gmail.com",
            tourist_location: "Paris"
        };
  
        cy.request({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            body: requestBody
        })
        .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.tourist_name).to.eq(requestBody.tourist_name);
            expect(response.body.tourist_email).to.eq(requestBody.tourist_email);
            expect(response.body.tourist_location).to.eq("Paris");;
        });
    });

    it.only('Fixture JSON object', () => {
        cy.fixture('tourist').then((data) => {
            const requestBody = data;

            cy.request({
                method: 'POST',
                url: 'https://jsonplaceholder.typicode.com/posts',
                body: requestBody
            })
            .then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body.tourist_name).to.eq(requestBody.tourist_name);
                expect(response.body.tourist_email).to.eq(requestBody.tourist_email);
                expect(response.body.tourist_location).to.eq(requestBody.tourist_location);
            });
        });
    });
});
//npx cypress run spec-- cypress/e2e/new.cy.js