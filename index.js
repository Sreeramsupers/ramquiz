#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';

let playerName;

// Sleep triggers the animation and stops executing after 2s
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// Welcome Screen
async function welcome() {
	const rainbowTitle = chalkAnimation.rainbow('Welcome to the Ultimate Quiz of Ram or UQR');

	await sleep();
	rainbowTitle.stop();

	console.log(`
    ${chalk.cyanBright('HOW TO PLAY')}
   
    Iam triggering a nanochip in your computer to break it down into pieces.

    If you love your computer get all answers right ✅
    
    `);
}

// Asks for the Player Name
async function askName() {
	const answers = await inquirer.prompt({
		name: 'player_name',
		type: 'input',
		message: 'Hi, Your name here',
		default() {
			return 'Player';
		},
	});

	playerName = answers.player_name;
}

// Q1
async function question1() {
	const answers = await inquirer.prompt({
		name: 'question_1',
		type: 'list',
		message: `The ${chalk.green('Green')} pigment present in the plant is called\n`,
		choices: ['Nitric Acid', 'Citric Acid', 'Chlorophyll', 'Mercury'],
	});
	return handleAnswer(answers.question_1 == 'Chlorophyll');
}
// Q2
async function question2() {
	const answers = await inquirer.prompt({
		name: 'question_2',
		type: 'list',
		message: `Who invented the letter 0?\n`,
		choices: ['Valmiki', 'Alexander Grahambell', 'Pythagoras', 'Aryabhatta'],
	});
	return handleAnswer(answers.question_2 == 'Aryabhatta');
}
// Q3
async function question3() {
	const answers = await inquirer.prompt({
		name: 'question_3',
		type: 'list',
		message: `In which country did the chess originate?\n`,
		choices: ['Germany', 'India', 'Russia', 'Britan'],
	});
	return handleAnswer(answers.question_3 == 'India');
}

// Q4
async function question4() {
	const answers = await inquirer.prompt({
		name: 'question_4',
		type: 'list',
		message: `How many degrees are there in a circle?\n`,
		choices: ['90', '180', '360', '640'],
	});
	return handleAnswer(answers.question_4 == '360');
}
// Q5
async function question5() {
	const answers = await inquirer.prompt({
		name: 'question_5',
		type: 'list',
		message: `How many seconds are there in an hour?\n`,
		choices: ['60', '120', '3600', '6400'],
	});
	return handleAnswer(answers.question_5 == '3600');
}
// Q6
async function question6() {
	const answers = await inquirer.prompt({
		name: 'question_6',
		type: 'list',
		message: ` Who is known as ‘Human Computer’?\n`,
		choices: ['Charles Babbage', 'Pythogaras', 'Shakuntala Devi', 'Marie Curie'],
	});
	return handleAnswer(answers.question_6 == 'Shakuntala Devi');
}
// Q7
async function question7() {
	const answers = await inquirer.prompt({
		name: 'question_7',
		type: 'list',
		message: `Is zero a positive or a negative number?\n`,
		choices: ['positive +', 'Negative -', 'None of the above'],
	});
	return handleAnswer(answers.question_7 == 'None of the above');
}

// HandleAnswer check the answer is ✅ or ❌
async function handleAnswer(isCorrect) {
	const spinner = createSpinner('Checking Answer...').start();
	await sleep();

	if (isCorrect) {
		spinner.success({ text: `Nice work ${playerName}. That's the right one \n` });
	} else {
		spinner.error({
			text: `☠☠ Game over ${playerName}! I think you hate your computer! Exactly after 30s Iam triggering the nanochip. \n`,
		});
		process.exit(1);
	}
}

// Reirect to winner page if you get all answers ✅
async function winner() {
	console.clear();
	const msg = `Congrats ${playerName} !\n You impressed me`;

	figlet(msg, (err, data) => {
		console.log(gradient.pastel.multiline(data));
	});
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
await winner();
