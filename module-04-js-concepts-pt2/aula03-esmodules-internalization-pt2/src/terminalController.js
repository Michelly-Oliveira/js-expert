import Draftlog from 'draftlog';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import readline from 'readline';

import Person from './person.js';

export default class TerminalController {
	constructor() {
		this.print = {};
		this.data = {};
		this.terminal = {};
	}

	initializeTerminal(database, language) {
		// "replace" the default console
		Draftlog(console).addLineListener(process.stdin);

		// readline -> interact with the terminal
		// options defined that data is retrieved from the terminal, and the output is sent to the terminal as well
		this.terminal = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		this.initializeTable(database, language);
	}

	initializeTable(database, language) {
		const data = database.map((item) => new Person(item).formatted(language));
		const table = chalkTable(this.getTableOptions(), data);

		this.print = console.draft(table);
		this.data = data;
	}

	question(msg = '') {
		return new Promise((resolve) => this.terminal.question(msg, resolve));
	}

	closeTerminal() {
		this.terminal.close();
	}

	getTableOptions() {
		return {
			leftPad: 2,
			columns: [
				{ field: 'id', name: chalk.cyan('ID') },
				{ field: 'vehicles', name: chalk.cyan('Vehicles') },
				{ field: 'kmTraveled', name: chalk.cyan('Km Traveled') },
				{ field: 'from', name: chalk.cyan('From') },
				{ field: 'to', name: chalk.cyan('To') },
			],
		};
	}
}
