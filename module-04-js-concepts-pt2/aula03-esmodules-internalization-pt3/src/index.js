//  assert {type: "json"} -> required  to be able to import a json file (node v17)
import database from '../database.json' assert { type: 'json' };

import Person from './person.js';
import { save } from './repository.js';
import TerminalController from './terminalController.js';

const DEFAULT_LANG = 'pt-BR';
const STOP_TERMINAL = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
	try {
		const answer = await terminalController.question();

		if (answer === STOP_TERMINAL) {
			terminalController.closeTerminal();
			console.log('process finished');
			return;
		}

		const person = Person.generateInstanceFromText(answer);
		terminalController.updateTable(person.formatted(DEFAULT_LANG));
		await save(person);

		return mainLoop();
	} catch (error) {
		console.log('Error!!!:', error);
		return mainLoop();
	}
}

// top-level-await
await mainLoop();
