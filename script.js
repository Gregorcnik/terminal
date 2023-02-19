// get the input and output elements
const commandInput = document.getElementById('command');
const output = document.querySelector('.output');
let vLabirintu = false;

// greet user and print instructions
echo ('pozdravljen v labirintu. to je (beta) igra v spletnem terminalu. ca igre se nisi igral ali pa si samo pozabil kako uporabljati tole zadevo napisi pomoc. za zacetek igre napisi zacni, ko pa bos igro hotel koncati napisi koncaj. veselo izgubljanje v labirintu!');


// add event listener for enter key
commandInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const command = commandInput.value;
    commandInput.value = '';

    // print the command to the output
    echo('> '+command);

    // process the command and print the output to the terminal
    processCommand(command);
  }
});

function echo(text) {
  // process the command and print the output to the terminal
  const outputLine = document.createElement('div');
  outputLine.innerText = text;
  output.appendChild(outputLine);

  // scroll to the bottom of the terminal
  output.scrollTop = output.scrollHeight;
}

function clear() {
  output.innerHTML = '';
}

function help() {
  echo('zivijo! trenutno se nahajas na spletni strani z labirintom. navodila se niso narejena! (ups, tudi labirint se ni)') //FIXME
}

// function to process the command and return the output
function processCommand(command) {
  if (command === 'zacni') {
    vLabirintu = true;
    labirintTajnica('zacetek')
  } else if (command === 'koncaj') {
    vLabirintu = false;
  } else if (command === 'clear') {
    clear();
  } else if (command === 'pomoc') {
    help();
  } else if (vLabirintu) {
    labirintTajnica(command);
  } else if (command === 'time') {
    const now = new Date();
    echo ('Trenutno smo: ' + now.toLocaleTimeString());
  } else {
    echo ('za tole pa nimam se ifa!');
  }
}
