// describe('Appointments', () => {
//   it('should book an interview', () => {

//     cy.request("GET", "/api/debug/reset");

//     cy.visit('/');

//     cy.contains("Monday");
//     cy.get("[alt=Add]")
//       .first()
//       .click();
//     cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
//     cy.get("[alt='Sylvia Palmer']").click();
//     cy.contains("Save").click();
//     // Verify that the appointment was saved
//     cy.contains(".appointment__card--show", "Lydia Miller-Jones");
//     cy.contains(".appointment__card--show", "Sylvia Palmer");
//   })
// })

// Refactored code
describe("Appointments", () => {
  beforeEach(() => {
   cy.request("GET", "/api/debug/reset");
 
   cy.visit("/");
 
   cy.contains("Monday");
  });
 
  it("should book an interview", () => {
   cy.get("[alt=Add]")
    .first()
    .click();
 
   cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
   cy.get('[alt="Sylvia Palmer"]').click();
 
   cy.contains("Save").click();
 
   cy.contains(".appointment__card--show", "Lydia Miller-Jones");
   cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  // Edit an interview
  it("should edit an interview", () => {
    cy.get("[alt=Add]")
    .first()
    .click();
 
   cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
   cy.get('[alt="Tori Malcolm"]').click();
 
   cy.contains("Save").click();
 
   cy.contains(".appointment__card--show", "Lydia Miller-Jones");
   cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  // Cancel an interview
  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
    .first()
    .click({ force: true });
 
   cy.contains("Confirm").click();
 
   cy.contains("Deleting").should("exist");
   cy.contains("Deleting").should("not.exist");
   
   cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  })
 });