describe("API Testing",()=>{

    it.only ("Passing Query parameters",()=>{
        cy.request({
            method:'GET',
            url:'https://randomuser.me/api',
            qs:{nat: 'CA'}
        })
        .then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.results[0].nat).to.eq('CA');
            //expect(response.body.results[0]).have.property('gender',"male");   //something like that but this API is random
            //expect(response.body.results[0].location[1]).have.property('city',"Albury");  //something like that but this API is random
 
        })
    })
});