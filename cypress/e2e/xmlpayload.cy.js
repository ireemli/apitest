const xml2js = require('xml2js');
const parser = new xml2js.Parser({ explicitArray: false });

describe('Xml parsing', () => {
    const xmlPayload = "<Pet>   <id>0</id>   <Category>    <id>0</id>    <name>Dog</name>   </Category>   <name>Jimmy</name>   <photoUrls>    <photoUrl>string</photoUrl>   </photoUrls>   <tags>    <Tag>     <id>0</id>     <name>string</name>    </Tag>   </tags>   <status>available</status>  </Pet>"
    let petId = '';

    it('creating pet', () => {
        cy.request({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/pet',
            body: xmlPayload,
            headers: {
                'Content-Type': 'application/xml', // for request
                'accept': 'application/xml' // for response
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            parser.parseString(response.body, (err, result) => {
                petId = result.Pet.id;
            });
        });
    });

    it('fetching pet xml response', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/pet/' + petId,
            headers: {
                'accept': 'application/xml' // for response
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            parser.parseString(response.body, (err, result) => {
                expect(result.Pet.name).to.eq("Jimmy");
                expect(result.Pet.id).to.eq(petId); // id karşılaştırması yapılıyor
            });
        });
    });
});
