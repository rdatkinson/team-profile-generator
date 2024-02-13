import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

import Manager from "./lib/Manager.js";
import Engineer from "./lib/Engineer.js";
import Intern from "./lib/Intern.js";
import inquirer from "inquirer";
import path from "path";
import fs from "fs";
import render from "./src/page-template.js";

const teamMembers = [];

function mainMenu() {
    function createManager() {
        console.log('Please build your team');
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is the team manager's name?"
            },
            {
                type: 'input',
                name: 'id',
                message: "What is the team manager's employee ID?"
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the team manager's email address?"
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: "What is the team manager's office number?"
            }
        ]).then(answers => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            teamMembers.push(manager);
            createTeam();
        });
    }

    function createTeam() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'teamChoice',
                message: 'What would you like to do next?',
                choices: [
                    'Add an Engineer',
                    'Add an Intern',
                    'Finish building my team'
                ]
            }
        ]).then(selection => {
            switch (selection.teamChoice) { // Corrected: Added 'switch' before the case statements.
                case 'Add an Engineer':
                    addEngineer();
                    break;
                case 'Add an Intern':
                    addIntern();
                    break;
                case 'Finish building my team': // Corrected: Match the choice string exactly.
                    buildTeam();
                    break;
            }
        });
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is the engineer's name?"
            },
            {
                type: 'input',
                name: 'id',
                message: "What is the engineer's ID?"
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the engineer's email?"
            },
            {
                type: 'input',
                name: 'github',
                message: "What is the engineer's GitHub username?"
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            teamMembers.push(engineer);
            createTeam();
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is the intern's name?"
            },
            {
                type: 'input',
                name: 'id',
                message: "What is the intern's ID?"
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the intern's email?"
            },
            {
                type: 'input',
                name: 'school',
                message: "What school does the intern attend?"
            }
        ]).then(answers => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            teamMembers.push(intern);
            createTeam();
        });
    }

    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');
        console.log('Team built successfully! Check the output directory for the team.html file.');
    }

    createManager();
}

mainMenu();