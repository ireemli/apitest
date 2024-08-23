describe('template spec', () => {
  it('GET Call', () => {
    cy.request('https://pokeapi.co/api/v2/berry')
    .its('status')
    .should('equal',200)
  })

  it('POST Call', () => {
    cy.request({
      method:'POST',
      url: 'https://jsonplaceholder.typicode.com/posts',
      body:{
        title: "test post",
        body: "this is test call",
        userId:1
      }
    })
    .its('status')
    .should('equal',201)
  })

  it('PUT Call', () => {
    cy.request({
      method:'PUT',
      url: 'https://jsonplaceholder.typicode.com/posts/3',
      body:{
        title: "UPDATED test post",
        body: "this is test put call",
        userId:1,
        id:1
      }
    })
    .its('status')
    .should('equal',200)
  })
  it('DELETE Call', () => {
    cy.request({
      method:'DELETE',
      url: 'https://jsonplaceholder.typicode.com/posts/3',
    })
    .its('status')
    .should('equal',200)
  })

});
