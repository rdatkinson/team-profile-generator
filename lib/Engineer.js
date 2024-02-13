const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email); // Call the parent class constructor
        this.github = github; // Additional property specific to Engineer
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return 'Engineer'; // Overridden to return 'Engineer'
    }
}

module.exports = Engineer;