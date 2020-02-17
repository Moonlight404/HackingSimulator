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
var folder = [
    {"folder": "users", 
    "f" : [
        {"folder": "root"}
    ]},
    {"folder": "root",
    "f" : [
        {"folder": "videos", "f": []},
        {"folder": "imagens", "f": []},
        {"folder": "documents", "f": []}
    ]},
    
]
var alterando = false;
var logado = false;
var myaccount = {
            "ip": "192.168.1.1",
            "user": "root",
            "password": "root",
            "admin": 0,
            "bitcoin": 0.000001}

var pythonFile = [
    {
        "name": "bitcoin",
        "buyed": true,
        "descricao": "Usado pra minerar Bitcoin em pc de vítimas",
        "function": function minerarBitcoin(){
            if(file.folder === "FTP"){
            const vitima = vitimas.find(ele => ele.ip === file.f)
            if(vitima){
                console.log("Já tem minerador de bitcoin nessa vítima")
            } else{
                console.log("Vítima contaminada..")
                this.vitimas.push({
                    "ip": file.f,
                    "arquivo_rodando": "bitcoin.py"
                })

            }
        } else{
            console.log("Não estais conectado a um IP")
        } 
        }
    }
]

var vitimas = []
        
var file = {"folder": "root", "f": ""}
var sair = false
var commandSend = "";
var allIp = []
var ips = []
var procurandoSenha = false
const commands = [
    {"command": "help", "function": 
    function help(){
        console.table(commands)
    }},
    {"command": "crypto", "function": 
    function crpto(){
        console.log("  Minha conta")
        console.table(myaccount)
    }},
    {"command": "connect", "function": 
    function connect(){
        const b = commandSend.replace("connect", "");
        const ip = b.replace(" ", "");
        console.log(`Conectando à ${ip}, aguarde`)
        const sucess = true;
        if(!sucess){
            console.log("Ocorreu um erro ao conectar")
        } else{
            rl.question("O servidor precisa de uma senha: ", (answer) => {
                if(ip === myaccount.ip){
                    if(answer === myaccount.password){
                        console.log("Você não pode fazer conexão consigo mesmo")
                    } else{
                        console.log("Senha incorreta")
                    }
                } else{
                    const found = allIp.find(e => e.ip === ip)
                    const id = allIp.indexOf(found)
                    if(found){
					if(allIp[id].password === answer){
                        console.log(`Você está conectando ${ip}, aguarde alguns segundos`);
                        procurandoSenha = true
                        setTimeout(() => {
                            rl.question("Tens certeza que queres conectar?\nPor sua conta e risco\n('y or n') ", (res) => {
                                if(res === "y"){
                                    console.log(`Connected in ${ip}`)
                                    procurandoSenha = false
                                    file.folder = "FTP"
                                    file.f = ip
                                    command()
                                } else{
                                    console.log("Medroso haha")
                                    procurandoSenha = false
                                    command()
                                }
                            });
                        }, 1000);
					} else{
						console.log("Senha incorreta")
                    }
                }
                }
                command()
            });
        }
    }},
    {"command": "su", "function": 
    function su(){
        const b = commandSend.replace("su", "");
        const user = b.replace(" ", "");
        if(user === myaccount.user){
            const found = {"Mensagem": `Agora ${user} é Administrador`};
            myaccount.admin = 1;
            console.table(found);
        } else{
            const found = {"Mensagem": "Não encontramos esse usuario"};
            console.table(found);
        }
    }},
    {"command": "cd", "function": 
    function explore(){
        if(!file.f === "FTP"){
        const b = commandSend.replace("cd", "");
        const f = b.replace(" ", "");
        const found = folder.find(element => element.folder === file.folder);
        const id = folder.indexOf(found);
        const found_f = folder[id].f.find(element => element.folder === f);
        const id_f = folder[id].f.indexOf(found_f); 
        const id_b = folder.indexOf(found); 
        if(id >= 1){
            if(f === ".."){
            file.folder = folder[id - 1].folder
            file.f = "";
            }
        } else{
            if(folder[id + 1]){
                file.folder = folder[id_b + 1].folder;
            } 
            else{
                console.log(id_f)
            }
        }
    }
    }},
    {"command": "ls", "function": 
        function ls(){
            if(file.folder !== "FTP"){
            const found = folder.find(element => element.folder === file.folder);
            const id = folder.indexOf(found);
            const found_f = folder[id].f.find(element => element.folder === file.f);
            const id_f = folder[id].f.indexOf(found);
            if(id >= 1){
                console.log(`.${folder[id - 1].folder}`)
            }
            if(!found_f){
            for(let i = 0; i < folder[id].f.length; i++){
                console.log(folder[id].f[i].folder)
            }
            }
            } else{
                console.log(`Você está conectado à ${file.f}`)
            }
        }
    },
    {"command": "clear", 
    "function": function clear(){
        console.clear();
    }},
    {"command": "name", 
    "function": function name(){
        const b = commandSend.replace("name", "");
        const name = b.replace(" ", "");
        rl.question("Insira sua senha: ", (answer) => {
            if(myaccount.password === answer){
                console.log("Você alterou seu nome! :D")
                myaccount.user = name
                alterando = false
                command();
            } else{
                console.log("Senha invalida!")
                alterando = false
                command();
            }
        });
    }},
    {"command": "pass", 
    "function": function pass(){
        const b = commandSend.replace("pass", "");
        const password = b.replace(" ", "");
        rl.question("Insira sua senha atual: ", (answer) => {
            if(myaccount.password === answer){
                console.log("Você alterou sua senha! :D")
                myaccount.password = password
                alterando = false
                command();
            } else{
                console.log("Senha invalida!")
                alterando = false
                command();
            }
        });
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
    }},
    {"command": "logout", 
    "function": function logout(){
        logado = false
    }},
    {"command": "search-ip",
    "function": function createIp(){
        var b = commandSend.replace("search-ip", "");
        var total = parseInt(b.replace(" ", ""));
        for(var i = 0; i < total; i++){
            var ip = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0);
            var pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var pwdLen = 10;
            var randPassword = Array(pwdLen).fill(pwdChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
            allIp.push({
                "ip": ip,
                "password":  randPassword
            })
            ips.push({
                "ip": ip,
                "password": null
            })
            console.log(`IP[${i + 1}]:Encontrei ${ip}`)
        }
    }
    },
    {"command": "show-ip",
    "function": function showIp(){
        console.table(ips)
    }
    },
    {"command": "findpass-ip",
    "function": function findPass(){
        procurandoSenha = true
        var b = commandSend.replace("findpass-ip", "");
        var ip = b.replace(" ", "");
        const found = allIp.find(element => element.ip === ip)
        const id_f = allIp.indexOf(found)
        const found_i = ips.find(element => element.ip === ip)
        const id_i = ips.indexOf(found_i)
        if(found){
        console.log("Estamos procurando a senha desse IP")
            setTimeout(() => {
                ips[id_i].password = allIp[id_f].password
                console.log(`A senha de ${ip} é ${allIp[id_f].password}`)
                procurandoSenha = false
                command()
            }, 2000);
        } else{
            console.log(`Não temos ${ip} no nosso banco de dados`);
            procurandoSenha = false
            command()
        }
    }
    },
    {"command": "apps",
    "function": function python(){
        console.table(pythonFile)
    }},
    {"command": "python",
    "function": function python(){
        var b = commandSend.replace("function", "");
        var arquivo = b.replace(" ", "");
        const foundFilePy = pythonFile.find(e => e.name === arquivo)
        if(foundFilePy){
            foundFilePy.function()
            command();
        }
    }}

]

function command(){ 
    if(!procurandoSenha){
    if(logado){
    rl.question("\x1b[40m"+"\x1b[32m"+"@"+myaccount.user+"\x1b[0m"+"/"+"\x1b[2m"+file.folder+"/"+file.f +"$ ", (answer) => {
        // TODO: Log the answer in a database
        commandSend = answer;
        if(commands.find(command => command.command === commandSend.split(" ", 1).toString())){
            const found = commands.find(command => command.command === commandSend.split(" ", 1).toString());
            const id = commands.indexOf(found)
            commands[id].function()
        } else{
            console.log(commandSend+": "+"\x1b[2m"+"não é um comando");
			command();
        }
        if(commandSend !== ""){
            commandSend = "";
			command();
        } else{
            commandSend = "";
			command();
            return false;
        }
        if(!sair){
            command();
        }
    }); 
    } else{
        console.log(`Conectando à ${myaccount.ip}`)
        var minhaSenha = "";
        for(var i = myaccount.user.length - 1; i >= 0; i--){
            minhaSenha += myaccount.user[i]
        }
        rl.question(`\x1b[0mOlá ${myaccount.user}, insira sua senha para continuar: `, (answer) => {
            if(minhaSenha === answer){
                console.log("Legal, você passou no primeiro teste")
                logado = true
                setTimeout(() => {
                    console.clear()
                    command();
                }, 1500);
            } else{
                console.log("Senha invalida..")
                setTimeout(() => {
                    console.clear()
                    command();
                }, 1000);
            }
        });
    }
}
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