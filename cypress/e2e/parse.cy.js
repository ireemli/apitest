describe("Parsing JSON Response",()=>{
    it("Parsing simple JSON Response",()=>{
        cy.request({
            method:'GET',
            url:"https://fakestoreapi.com/products"
        })
        .then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body[0].id).to.eq(1);
            expect(response.body[0].price).to.eq(109.95);

            expect(response.body[19].id).to.eq(20);
            expect(response.body[19].price).to.eq(12.99);
        });
    });

    it.only("Parsing complex JSON Response",()=>{
        let totalprice=0;
        cy.request({
            method:'GET',
            url:"https://fakestoreapi.com/products",
            qs:{limit:5} //limiting the list
        })
        .then((response)=>{
            expect(response.status).to.eq(200);
            response.body.forEach(element => {
                totalprice+=element.price;
            });
            expect(totalprice).to.eq(899.23)//limit 5
        });
    });
});
//npx cypress run spec--cypress/e2e/parse.cy.js