describe("API testing", () => {
    let sessionToken = null;
    let username = null;
    let userId = null;

    before("creating new user", () => {
        cy.request({
            method: 'POST',
            url: 'http://security.postman-breakable.com/user',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                username: Math.random().toString(5).substring(2),
                password: "123456"
            }
        })
        .then((response) => {
            username = response.body.response.username;
            userId = response.body.response.user_id;
        });
    });

    beforeEach("user login", () => {
        cy.request({
            method: 'POST',
            url: 'http://security.postman-breakable.com/user/login',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                username: username,
                password: "123456"
            }
        })
        .then((response) => {
            sessionToken = response.body.response.session_token;
            expect(response.status).to.eq(200);
            expect(response.body.response.username).to.eq(username);
        });
    });

    it("fetch user account summary", () => {
        cy.request({
            method: 'GET',
            url: `http://security.postman-breakable.com/account/${userId}/summary`,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': sessionToken
            },
            cookies:{
                'cookieName':'myCookie'
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200); // Ensure the GET request was successful
        });
    });
});

//npx cypress run spec--cypress/e2e/headersCookies.cy.js