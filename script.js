// get the input and output elements
const commandInput = document.getElementById('command');
const output = document.querySelector('.output');
let vIgri = false;

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

    // scroll to the bottom of the terminal
    output.scrollTop = output.scrollHeight;
  }
});

function echo(text) {
  // process the command and print the output to the terminal
  const outputLine = document.createElement('div');
  outputLine.innerText = text;
  output.appendChild(outputLine);
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
    vIgri = true;
    labirintTajnica('zacetek')
  } else if (command === 'koncaj') {
    vIgri = false;
  } else if (command === 'clear') {
    clear();
  } else if (command === 'pomoc') {
    help();
  } else if (vIgri) {
    labirintTajnica(command);
  } else if (command === 'time') {
    const now = new Date();
    echo ('Trenutno smo: ' + now.toLocaleTimeString());
  } else {
    echo ('za tole pa nimam se ifa!');
  }
}


// nastavimo obliko labirinta. 0 predstavlja prehod, 1 zid, 2 zacetek in 3 konec
let labirint = [['2001', '1100', '1101'], ['0101', '0011', '0000'], ['0011', '1110', '0131']];
let lokacija = [0, 0];
let VrataPrihoda = 1

// glavna funkcija za igro - LABIRINT
function labirintTajnica (text) {
  if (text == 'zacetek') {
    navodila();
    labirintTajnica('ls');
  } else if (text.split(' ')[0] == 'cd') { 
    premakniSe (text.split(' ')[1]);
  } else if (text == 'ls') {
    poglejOkoli();
  } else {
    echo ('za tole pa se nimam ifa!')
  }
}

function navodila () {
  echo ("tole bodo navodila"); //FIXME
}

function cilj () { //FIXME
  echo ('uspelo ti je!')
}

function poglejOkoli () {
  echo ('ozrl si se okoli sebe in zagledal ...')
  for (let i = 0; i < 4; i++) {
    if (labirint[lokacija[0]][lokacija[1]][i] == '0' || labirint[lokacija[0]][lokacija[1]][i] == '3') {
      if (VrataPrihoda-1 == i) {
        echo ('- vrata st. '+(i+1)+', skozi katera pa si tudi prisel');
      } else {
        echo ("- vrata st. "+(i+1))
      }
    }
  }
}

function premakniSe (vrata) {
  vrata = parseInt(vrata);
  let pomoc = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  if (labirint[lokacija[0]][lokacija[1]][vrata-1] == '0') {
    VrataPrihoda = (vrata-3)%4;
    lokacija[0] += pomoc[vrata-1][0];
    lokacija[1] += pomoc[vrata-1][1];
  } else if (labirint[lokacija[0]][lokacija[1]][vrata-1] == '3') {
    cilj();
  } else {
    echo ("au, tole je bolelo. drugic preveri kje je zid in kje ne!");
  }
}
