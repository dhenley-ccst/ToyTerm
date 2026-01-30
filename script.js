const input = document.getElementById('command-input');
const output = document.getElementById('output');

const fortunes = [
    "Your code will compile on the first try today... probably.",
    "The aesthetic of your environment determines the quality of your output.",
    "A 'TODO' comment from 2022 is waiting for you to find it.",
    "Error 404: Fortune not found. Try looking within.",
    "Stay cozy. The bugs can wait until tomorrow.",
    "Your CSS will center perfectly on the next refresh.",
    "Great things are achieved one git commit at a time.",
    "Beware of the 'one-line fix' that touches 40 files.",
    "You are one cup of coffee away from solving that logic bug.",
    "The terminal is the only place where you truly have control.",
    "Life is too short for light-themed IDEs.",
    "A clean git history is a sign of a clear mind."
];

const commands = {
	help: (args) => {printLine("Available commands: about, clear, help, echo, whoami, date, search, fortune")},
	about: (args) => {printLine("This is a terminal emulator styled with Rose Pine Moon.")},
	echo: (args) => {printLine(args.slice(1).join(" "))},
	whoami: (args) => {printLine("Prolly an IT guy or something")},
	date: (args) => {printLine(new Date().toLocaleString())},
	sudo: (args) => {printLine("Nice try.")},
	su: (args) => {printLine("Nope.")},
	search: (args) => {window.open('https://google.com/search?q=' + args.slice(1).join('+'))},
	fortune: (args) => {
		const index = Math.floor(Math.random() * fortunes.length);
		printLine(fortunes[index]);
	}
};

input.addEventListener('keydown', (e) => {
	if(e.key === 'Enter') {
		const fullCommand = input.value.trim().toLowerCase();

		// Add command to history
		printLine(`<span class="prompt">guest@rose-pine:~$</span> ${fullCommand}`);

		const args = fullCommand.split(" ");

		if (fullCommand === 'clear') {
			output.innerHTML = '';
		} else if (commands[args[0]]) {
			commands[args[0]](args);
		} else if (fullCommand !== "") {
			printLine(`Command not found: ${fullCommand}`, "error");
		}

		input.value = '';
		window.scrollTo(0, document.body.scrollHeight);
	}
});

function printLine(text, className = "") {
	const div = document.createElement('div');
	div.className = `output-line ${className}`;
	div.innerHTML = text;
	output.appendChild(div);
}
