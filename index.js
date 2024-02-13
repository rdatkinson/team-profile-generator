const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMembers = [];

function mainMenu() {
    function createManager() {
        console.log('Please build your team');
        inquirer.prompt([
            // adding prompts later
        ]).then(answers => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            teamMembers.push(manager);
            createTeam();
        });
    }

    function createTeam() {
        inquirer.prompt([
            // adding prompts later
        ]).then(selection => {
            switch (selection.teamChoice) {
                case 'Add Engineer':
                    addEngineer();
                    break;
                case 'Add Intern':
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }

    function addEngineer() {
        inquirer.prompt([
            // adding prompts later
        ]).then(answers => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            teamMembers.push(engineer);
            createTeam();
        });
    }

    function addIntern() {
        inquirer.prompt([
            // adding prompts later
        ]).then(answers => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            teamMembers.push(intern);
            createTeam();
        });
    }
}