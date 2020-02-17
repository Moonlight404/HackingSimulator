const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const block = (data) => {
    process.on('uncaughtException', function (err) {
        console.log('Caught exception: ' + err)
    })
    rl.on('SIGINT', () => {
        console.log(data)
        rl.pause()
    })
}

console.clear();

const folder = [
    {"folder": "Root"},
    {"folder": "users"},
    {"folder": "documents"}
]

var user = {
            "user": "Root",
            "password": "toor",
            "admin": 0}
var file = {"folder": "Root"}

var sair = false

const commands = [
    {"command": "cd", "function": 
    function explore(onde){
        console.log(onde)
    }},
    {"command": "clear", 
    "function": function clear(){
        console.clear();
    }},
    {"command": "exit", 
    "function": function exit(){
        rl.close();
        sair = true;
        console.clear();
        console.log("Finalizado com sucesso");
    }},
    {"command": "echo", 
    "function": function exit(){
        const message = commandSend.replace("echo", "");
        console.log("echo:"+ message)
    }}
]

var commandSend = "";

function command(){ 
    rl.question("\x1b[40m"+"\x1b[32m"+"@"+user.user+"\x1b[0m"+"/"+"\x1b[2m"+file.folder+"$ ", (answer) => {
        // TODO: Log the answer in a database
        commandSend = answer;
        if(commands.find(command => command.command === commandSend.split(" ", 1).toString())){
            const found = commands.find(command => command.command === commandSend.split(" ", 1).toString());
            const id = commands.indexOf(found)
            commands[id].function()
        } else{
            console.log(commandSend+": "+"\x1b[2m"+"não é um comando");
        }
        if(commandSend !== ""){
            commandSend = "";
        } else{
            commandSend = "";
            return false;
        }
        console.log("\x1b[0m");
        if(!sair){
            command();
        }
    }); 
}

function ex(){
    process.on('exit', function(code) { 
    sair = true;
    console.clear();
    console.log("Finalizado com sucesso"); 
});
}

function start(){
    command();
    ex();
}

start();
