import Employee from './Employee.js';

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school; // Additional property specific to Intern
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return 'Intern'; // Overridden to return 'Intern'
    }
}

export default Intern;