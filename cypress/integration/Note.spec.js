describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen',
        };

        cy.request('POST', 'http://localhost:3001/api/users', user);
        cy.visit('http://localhost:3000');
    });

    it('Login form is shown', function () {
        cy.contains('Login');
    });

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('Login').click();
            cy.get('#username').type('mluukkai');
            cy.get('#password').type('salainen');
            cy.get('#login-button').click();

            cy.get('.swal2-title').contains('Login');
        });

        it('fails with wrong credentials', function () {
            cy.contains('Login').click();
            cy.get('#username').type('mluukkai');
            cy.get('#password').type('wrong');
            cy.get('#login-button').click();

            cy.get('.swal2-title').contains('Oops...');
        });
    });

    describe.only('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'mluukkai', password: 'salainen' });
        });

        it('A blog can be created', function () {

            cy.contains('New Blog').click();

            cy.get('#title').type('Nuevo Blog para revista');
            cy.get('#author').type('yorest granados');
            cy.get('#url').type('https://url.com');
            cy.get('#createBlog').click();

            cy.contains('Nuevo Blog');
        });
    });
});
