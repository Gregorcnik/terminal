class Terminal {
  constructor (terminalObject) {
    // get the input and output elements
    this.terminalObject = terminalObject;
    this.commandInput = terminalObject.querySelector('#command');
    this.output = terminalObject.querySelector('.output');
    this.commandsHistory = [];
    this.cas = -1;
  }

  echo(text, attr = []) {
    // process the command and print the output to the terminal
    const outputLine = document.createElement('div');
    if (attr != []) {
      outputLine.setAttribute(attr[0], attr[1]);
    }
    outputLine.innerText = text;
    this.output.appendChild(outputLine);

    // scroll to the bottom of the terminal
    this.output.scrollTop = this.output.scrollHeight;
  }

  clear() {
    this.output.innerHTML = '';
    this.commandsHistory = [];
    this.cas = -1;
  }

  handleInput(event) {
    if (event.key === 'Enter') {
      const command = this.commandInput.value;
      this.commandInput.value = '';

      this.commandsHistory.push(command);
      this.cas = this.commandsHistory.length-1;
      console.log(this.commandsHistory);

      // print the command to the output
      this.echo('> '+command, ["user", ""]);

      // process the command and print the output to the terminal
      processCommand(command);
    } else if (event.key === "ArrowUp") {
      if (this.cas >= 0) {
        const command = this.commandInput.value;
        this.commandInput.value = this.commandsHistory[this.cas];
        this.cas--;
      }
    } else if (event.key === "ArrowDown") {
      if (this.cas < this.commandsHistory.length-1) {
        this.cas++;
        const command = this.commandInput.value;
        this.commandInput.value = this.commandsHistory[this.cas];
      }
    }
  }

  undo () {
    let c  = this.output.children;
    let i = c.length-1;
    while (i >= 0 && c[i].hasAttribute("user") === false) {
      console.log(i);
      i--;
    }
    if (i === -1) {
      return false;
    }
    for (let j = c.length-1; j >= i; j--) {
      this.output.removeChild(c[j]);
    }
    this.commandsHistory = [];
    this.cas = -1;
    return true;
  }
}


let igre = [["labirint", Labirint], ["vislice", Obesanje]];
let vTeku = "";

let terminal1 = new Terminal(document.getElementById("terminal1"));

// greet user and print instructions
terminal1.echo ('Pozdravljen! To je (beta) spletni terminal z nekaterimi tekstovnimi igicami iz kamene dobe. Za navodila napisi pomoc in kot si verjetno ze opazil tu ni nobenih sumnikov.\nVse skupaj naredil Gregor ki priporoca: spletno stran uporabljejte odgovorno, po moznosti na vecjih zaslonih');


// add event listener for enter key
terminal1.commandInput.addEventListener('keydown', function(event) {
  terminal1.handleInput(event);
}.bind(this));


function help() {
  terminal1.echo("Ce hoces zaceti igro napisi 'zacni igra' (zamenjaj igra z imenom igre)");
  terminal1.echo('Igre so:');
  for (let i = 0; i < igre.length; i++) {
    terminal1.echo('- '+igre[i][0]);
  }
}

function zacetek(igra) {
  index = igre.findIndex((object) => object[0] == igra);
  if (index == -1) {
    terminal1.echo("Igra '"+igra+"' ne obstaja!");
  } else if (vTeku != "") {
    terminal1.echo("Najprej koncaj igro '"+vTeku+"' ce hoces zaceti novo!");
  } else {
    vTeku = new igre[index][1](terminal1);
  }
}

// function to process the command and return the output
function processCommand(command) {
  if (command != "") {
    if (command.split(" ")[0] == "zacni") {
      zacetek(command.split(" ")[1]);
    } else if (command === 'koncaj') {
      vTeku = "";
    } else if (command === 'clear') {
      terminal1.clear();
    } else if (vTeku != "") {
      vTeku.tajnica(command);
    } else if (command === 'pomoc') {
      help();
    } else if (command === 'time') {
      const now = new Date();
      terminal1.echo ('Trenutno smo: ' + now.toLocaleTimeString());
    } else {
      terminal1.echo ('Za tole pa nimam se ifa!');
    }
  }
}
