const input = document.getElementById('command-input');
const output = document.getElementById('output');

const commands = {
	help: (args) => {printLine("Available commands: about, clear, help, echo, whoami, date, search")},
	about: (args) => {printLine("This is a terminal emulator styled with Rose Pine Moon.")},
	echo: (args) => {printLine(args.slice(1).join(" "))},
	whoami: (args) => {printLine("Prolly an IT guy or something")},
	date: (args) => {printLine(new Date().toLocaleString())},
	sudo: (args) => {printLine("Nice try.")},
	search: (args) => {window.open('https://google.com/search?q=' + args.slice(1).join('+'))}
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
