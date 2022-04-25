import Draftlog from 'draftlog';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import readline from 'readline';

//  assert {type: "json"} -> required  to be able to import a json file (node v17)
import database from '../database.json' assert { type: 'json' };
import Person from './person.js';

// "replace" the default console
Draftlog(console).addLineListener(process.stdin);

const DEFAULT_LANG = 'pt-BR';

const options = {
	leftPad: 2,
	columns: [
		{ field: 'id', name: chalk.cyan('ID') },
		{ field: 'vehicles', name: chalk.cyan('Vehicles') },
		{ field: 'kmTraveled', name: chalk.cyan('Km Traveled') },
		{ field: 'from', name: chalk.cyan('From') },
		{ field: 'to', name: chalk.cyan('To') },
	],
};

const table = chalkTable(
	options,
	database.map((item) => new Person(item).formatted(DEFAULT_LANG))
);
const print = console.draft(table);

// readline -> interact with the terminal
// options defined that data is retrieved from the terminal, and the output is sent to the terminal as well
const terminal = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

terminal.question('What is your name?', (msg) => {
	console.log('msg', msg.toString());
});
