describe('test2:coursecreation', () => {
  it('works', () => {
    // from your src/components/MyComponent.cy.ts
    cy.visit('http://localhost:5173')

    //locate and click on instructor button
    cy.get('#root > div > div.MuiBox-root.css-1u8hw88 > div.MuiGrid-root.MuiGrid-container.css-rj7t1s-MuiGrid-root > button:nth-child(1)').click();

    //locate and click on create course button on the homepage
    cy.get('#root > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.css-1yq88t0-MuiGrid-root > div.MuiBox-root.css-1823su0 > ul > li:nth-child(1) > div > div.MuiListItemText-root.css-1pag7rb-MuiListItemText-root').click();

    //enter course details
    cy.get('#course-name-field').type('CSC316-002');
    cy.get('#course-description').clear().type('Data Structures and Algorithms');
    cy.get('#start-date-field').click().type('01/08/2024');
    cy.get('#end-date-field').click().type('04/30/2024');

    //click on create course 
    // cy.get('#create-course-button').click();
  })

})
