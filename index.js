  const readline = require('readline');
  const generator = require('creditcard-generator')
  const fs = require('fs');
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });

	function save(){
		let myacc = myaccount
		let mov = movimentos
		let viti = vitimas
		let cred = creditcards
		let alli = allIp
        let ip = ips
        let pc = myComputer

      
		let saveGame = [
					{"myaccount": myacc},
					{"movimentos": mov},
					{"vitimas": viti},
					{"creditcards": cred},
					{"allip": alli},
                    {"ip": ip},
                    {"ram": myComputer[0]},
                    {"hd": myComputer[1]},
                    {"internet": myComputer[2]}
		]
		let json = JSON.stringify(saveGame)
		fs.writeFile("./save.json", JSON.stringify(json, null, 4), (err) => {
			if (err) {
					console.error(err);
					return;
			};
	});
	}

	function game(){
			save()
	}

	setInterval(() => {
		game()
	}, 1000);

	function load(){
        try {
		let save = fs.readFileSync('./save.json');
		let saveGame = JSON.parse(save)
		let game = JSON.parse(saveGame)
		if(game.length >= 6){
		myaccount = game[0].myaccount
		movimentos = game[1].movimentos
		vitimas = game[2].vitimas
		creditcards = game[3].creditcards
		allIp = game[4].allip
        ips = game[5].ip
        myComputer[0].ram = game[6].ram.ram
        myComputer[1].hd = game[7].hd.hd
        myComputer[2].internet = game[8].internet.internet
        }
        }
        catch (error) {
            save()
        }
    }

  const block = (data) => {
      process.on('uncaughtException', function(err) {
          console.log('Caught exception: ' + err)
      })
      rl.on('SIGINT', () => {
          console.log(data)
          rl.pause()
      })
  }
  console.clear();
  var folder = [{
          "folder": "users",
          "f": [{
              "folder": "root"
          }]
      }, {
          "folder": "root",
          "f": [{
              "folder": "videos",
              "f": []
          }, {
              "folder": "imagens",
              "f": []
          }, {
              "folder": "documents",
              "f": []
          }]
      },

  ]
  var alterando = false;
  var logado = false;
  var myaccount = {
      "ip": "192.168.1.1",
      "user": "root",
      "password": "toor",
      "admin": 0,
      "bitcoin": 0.000001
  }

	var minerar = null
	var minerarCoin = 0.000000

	function minerarBitcoin(){
		setTimeout(() => {
			for(var i = 0; i < vitimas.length; i++){
				if(vitimas[i].arquivo_rodando === "bitcoin.py"){
					var minerar = setInterval(() => {
						myaccount.bitcoin += 0.000001
						var n =	myaccount.bitcoin
						var x = n.toFixed(7)
						myaccount.bitcoin = parseFloat(x)
				}, 5400);
				}
			}
		}, 2000);
	}

  var pythonFile = [
  {
      "name": "bitcoin",
      "buyed": true,
      "descricao": "minerar Bitcoin em vítimas",
      "function": function minerarBitcoin() {
          if (file.folder === "FTP") {
              const vitima = vitimas.find(ele => ele.ip === file.f)
              if (vitima) {
                  console.log("Já tem minerador de bitcoin nessa vítima")
              } else {
                  console.log("Vítima contaminada..")
                  vitimas.push({
                      "ip": file.f,
                      "arquivo_rodando": "bitcoin.py"
                  })
                  file.folder = "root"
                  file.f = ""
                  var minerar = setInterval(() => {
											myaccount.bitcoin += 0.000001
											var n =	myaccount.bitcoin
											var x = n.toFixed(7)
											myaccount.bitcoin = parseFloat(x)
                  }, 5400);
            }
        } else {
            console.log("Não estais conectado a um IP")
        }
    }
},
{
    "name": "creditcard",
    "buyed": true,
    "descricao": "Get credit card",
    "function": function creditCardBuy(){
        console.log("Estamos verificando seu saldo")
        procurandoSenha = true
    	setTimeout(() => {
            if(myaccount.bitcoin >= 0.000010){
			const bandeiras = ["Amex","VISA", "Mastercard"]
			const qual = Math.floor(Math.random() * bandeiras.length) + 0
            const number = generator.GenCC(bandeiras[qual], 1).toString()
            const month = Math.floor(Math.random() * 12) + 1
            const year = Math.floor(Math.random() * 30) + 21
            const sort = Math.floor(Math.random() * 5) + 0
            var saldo = 0;
            if(sort === 5){
                saldo = Math.floor(Math.random() * 4000) + 21
            } else if(sort === 4){
                saldo = Math.floor(Math.random() * 400) + 21
            } else if(sort <= 3){
                saldo = Math.floor(Math.random() * 250) + 90
            }
            creditcards.push({
                "number": number,
                "month": month,
				"year": year,
                "bandeira": bandeiras[qual],
                "saldo": saldo
            })
						console.log("Verifique seus cartões clonados")
						myaccount.bitcoin -= 0.000010
						movimentos.push({
							"produto": "Credit Card",
							"valor": 0.000010,
                            "moeda": "bitcoin"
						})
            } else{
                console.log("Você precisa de 0.000010 de bitcoin pra comprar")
            }
            procurandoSenha = false
            command()
          }, 1200);
	  }
  },
  {
    "name": "store",
    "buyed": true,
    "descricao": "Store",
    "function": function store(){
        var compraID = 0
        console.log("Bem vindo ao Store\nAqui você comprara componentes para seu computador")
        console.table(stores)
        console.log(`Escolha uma opção que queiras comprar`)
        procurandoSenha = true
        try {
        rl.question("index: ", (answer) => {
            const cards = commands.find(command => command.command === "creditcards")
            compraID = answer
            if(creditcards.length > 0){
                procurandoSenha = false
                console.table(cards.function())
                rl.question("index do cartão: ", (card) => {
                    if(card){
                    try {
                    const cc = creditcards[card]
                    if(cc.saldo >= stores[compraID].price){
                        creditcards[card].saldo -= stores[compraID].price
                        console.log(`Você comprou ${stores[compraID].name}`)
                        procurandoSenha = false
                        myComputer[0].ram += 4
                        movimentos.push({
							"produto": `${stores[compraID].name} - Amazon`,
							"valor": stores[compraID].price,
                            "moeda": "dollar"
						})
                        command()
                        
                    } else{
                        console.log("Este cartão não tem saldo suficiente")
                        procurandoSenha = false
                        command()
                    }
                    } catch (error) {
                        console.log("Ocorreu algum erro")
                        procurandoSenha = false
                        command()
                    }
                    }
                });
            } else{
                procurandoSenha = false
                command()
            }
        });
    } catch (error) {
        console.log("Ocorreu algum erro")
        procurandoSenha = false
        command()
    }

    }
  }
  ]

  var vitimas = []
  
  const stores = [
      {"name": "Memoria ram 4GB", "price": 100}
  ]

  var myComputer = [
      {"ram": 2},
      {"hd": 200},
      {"internet": 5}
]

  var file = {
      "folder": "root",
      "f": ""
  }
	var creditcards = []
	var movimentos = []
  var sair = false
  var commandSend = "";
  var allIp = []
  var ips = []
  var procurandoSenha = false
  const commands = [{
          "command": "help",
          "function": function help() {
              for(let i = 0; i < commands.length; i++){
                console.log(`${commands[i].command}`)
             }
          }
      }, {
          "command": "crypto",
          "function": function crpto() {
              console.log("  Minha conta")
              console.table(myaccount)
          }
      },
      {"command": "pc_info",
        "function": function pc(){
            console.log("Informações do seu PC\n")
            console.log(`Memoria RAM:${myComputer[0].ram}GB\nHD: ${myComputer[1].hd}GB\nInternet:${myComputer[2].internet}GB`)
        }
        },
	  {
          "command": "creditcards",
          "function": function crpto() {
						if(creditcards.length > 0){
							for(let i = 0; i < creditcards.length; i++){
                                console.log(`Index:${creditcards.indexOf(creditcards[i])} => ${creditcards[i].number}|${creditcards[i].month}|${creditcards[i].year}|$${creditcards[i].saldo}`)
                            }
						} else{
							console.log("Não tens nenhum cartão de crédito")
						}
          }
			},
			{
				"command": "movimento",
				"function": function movimento() {
					if(movimentos.length > 0){
						for(let i = 0; i < movimentos.length; i++){
                            console.log(`Extrato:\n${movimentos[i].produto}:${movimentos[i].valor} => ${movimentos[i].moeda}`)
                        }
					} else{
						console.log("Não fizesse nenhuma compra")
					}
				}
		},
	  {
          "command": "connect",
          "function": function connect() {
		    if(myaccount.admin === 1){
                const b = commandSend.replace("connect", "");
                const ip = b.replace(" ", "");
                if (ips.find(i => i.ip === ip)) {
                    console.log(`Conectando à ${ip}, aguarde`)
                    const sucess = true;
                    if (!sucess) {
                        console.log("Ocorreu um erro ao conectar")
                    } else {
                        rl.question("O servidor precisa de uma senha: ", (answer) => {
                            if (ip === myaccount.ip) {
                                if (answer === myaccount.password) {
                                    console.log("Você não pode fazer conexão consigo mesmo")
                                } else {
                                    console.log("Senha incorreta")
                                }
                            } else {
                                const found = allIp.find(e => e.ip === ip)
                                const id = allIp.indexOf(found)
                                if (found) {
                                    if (allIp[id].password === answer) {
                                        console.log(`Você está conectando ${ip}, aguarde alguns segundos`);
                                        procurandoSenha = true
                                        setTimeout(() => {
                                            rl.question("Tens certeza que queres conectar?\nPor sua conta e risco\n('y or n') ", (res) => {
                                                if (res === "y") {
                                                    console.log(`Connected in ${ip}`)
                                                    procurandoSenha = false
                                                    file.folder = "FTP"
                                                    file.f = ip
                                                    command()
                                                } else {
                                                    console.log("Medroso haha")
                                                    procurandoSenha = false
                                                    command()
                                                }
                                            });
                                        }, 1000);
                                    } else {
                                        console.log("Senha incorreta")
                                    }
                                }
                            }
                            command()
                        });
                    }
                } else {
                    console.log("Este IP não está registrado no nossa database");
                }
            } else{
                console.log("Seu usuario não term permissão pra isso")
                command()
            }
            }
        }, {
            "command": "su",
            "function": function su() {
                const b = commandSend.replace("su", "");
                const user = b.replace(" ", "");
                if (user === myaccount.user) {
                    if(myaccount.admin === 0){
                    const found = {
                        "Mensagem": `Agora ${user} é Administrador`
                    };
                    myaccount.admin = 1;
                    console.log(found.Mensagem);
                    } else{
                        const found = {
                            "Mensagem": `O ${user} já é Administrador`
                        };
                        console.log(found.Mensagem);
                    }
                } else {
                    const found = {
                        "Mensagem": "Não encontramos esse usuario"
                    };
                    console.log(found.Mensagem);
                }
            }
        }, {
            "command": "cd",
            "function": function explore() {
                if (!file.f === "FTP") {
                    const b = commandSend.replace("cd", "");
                    const f = b.replace(" ", "");
                    const found = folder.find(element => element.folder === file.folder);
                    const id = folder.indexOf(found);
                    const found_f = folder[id].f.find(element => element.folder === f);
                    const id_f = folder[id].f.indexOf(found_f);
                    const id_b = folder.indexOf(found);
                    if (id >= 1) {
                        if (f === "..") {
                            file.folder = folder[id - 1].folder
                            file.f = "";
                        }
                    } else {
                        if (folder[id + 1]) {
                            file.folder = folder[id_b + 1].folder;
                        } else {
                            console.log(id_f)
                        }
                    }
                }
            }
        }, {
            "command": "ls",
            "function": function ls() {
                if (file.folder !== "FTP") {
                    const found = folder.find(element => element.folder === file.folder);
                    const id = folder.indexOf(found);
                    const found_f = folder[id].f.find(element => element.folder === file.f);
                    const id_f = folder[id].f.indexOf(found);
                    if (id >= 1) {
                        console.log(`.${folder[id - 1].folder}`)
                    }
                    if (!found_f) {
                        for (let i = 0; i < folder[id].f.length; i++) {
                            console.log(folder[id].f[i].folder)
                        }
                    }
                } else {
                    console.log(`Você está conectado à ${file.f}`)
                }
            }
        }, {
            "command": "clear",
            "function": function clear() {
                console.clear();
            }
        }, {
            "command": "name",
            "function": function name() {
                const b = commandSend.replace("name", "");
                const name = b.replace(" ", "");
                rl.question("Insira sua senha: ", (answer) => {
                    if (myaccount.password === answer) {
                        console.log("Você alterou seu nome! :D")
                        myaccount.user = name
                        alterando = false
                        command();
                    } else {
                        console.log("Senha invalida!")
                        alterando = false
                        command();
                    }
                });
            }
        }, {
            "command": "pass",
            "function": function pass() {
                const b = commandSend.replace("pass", "");
                const password = b.replace(" ", "");
                rl.question("Insira sua senha atual: ", (answer) => {
                    if (myaccount.password === answer) {
                        console.log("Você alterou sua senha! :D")
                        myaccount.password = password
                        alterando = false
                        command();
                    } else {
                        console.log("Senha invalida!")
                        alterando = false
                        command();
                    }
                });
            }
        }, {
            "command": "exit",
            "function": function exit() {
                rl.close();
                sair = true;
                console.clear();
                console.log("Finalizado com sucesso");
            }
        }, {
            "command": "echo",
            "function": function exit() {
                const message = commandSend.replace("echo", "");
                console.log("echo:" + message)
            }
        }, {
            "command": "logout",
            "function": function logout() {
                logado = false
            }
        }, {
            "command": "search-ip",
            "function": function createIp() {
                var b = commandSend.replace("search-ip", "");
                var total = parseInt(b.replace(" ", ""));
                for (var i = 0; i < total; i++) {
                    var ip = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0);
                    var pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                    var pwdLen = 10;
                    var randPassword = Array(pwdLen).fill(pwdChars).map(function(x) {
                        return x[Math.floor(Math.random() * x.length)]
                    }).join('');
                    allIp.push({
                        "ip": ip,
                        "password": randPassword
                    })
                    ips.push({
                        "ip": ip,
                        "password": null
                    })
                    console.log(`IP[${i + 1}]:Encontrei ${ip}`)
                }
            }
        }, {
            "command": "show-ip",
            "function": function showIp() {
                            if(ips.length > 0){
                                for(var i = 0; i < ips.length; i++){
                                    console.log(`IP:${ips[i].ip}| Password:${ips[i].password}`)
                                }
                            } else{
                                console.log("Não tens nenhum IP registrado")
                            }
            }
        }, {
            "command": "findpass-ip",
            "function": function findPass() {
                procurandoSenha = true
                var b = commandSend.replace("findpass-ip", "");
                var ip = b.replace(" ", "");
                const found = allIp.find(element => element.ip === ip)
                const id_f = allIp.indexOf(found)
                const found_i = ips.find(element => element.ip === ip)
                const id_i = ips.indexOf(found_i)
                if (found) {
                    console.log("Estamos procurando a senha desse IP")
                    setTimeout(() => {
                        ips[id_i].password = allIp[id_f].password
                        console.log(`A senha de ${ip} é ${allIp[id_f].password}`)
                        procurandoSenha = false
                        command()
                    }, 2000);
                } else {
                    console.log(`Não temos ${ip} no nosso banco de dados`);
                    procurandoSenha = false
                    command()
                }
            }
        }, {
            "command": "apps",
            "function": function apps() {
                for(var i = 0; i < pythonFile.length; i++){
                    console.log(`${pythonFile[i].name} -> ${pythonFile[i].descricao}`)
                }
            }
        }, {
            "command": "python",
            "function": function vitimas() {
                var b = commandSend.replace("python", "");
                var arquivo = b.replace(" ", "");
                const foundFilePy = pythonFile.find(e => e.name === arquivo)
                if (foundFilePy) {
                    foundFilePy.function()
                    command();
                }
            }
        }, {
            "command": "vitimas",
            "function": function python() {
                            if(vitimas.length > 0){
                                console.log(`${vitimas[i].ip} - Rodando => ${vitimas[i].arquivo_rodando}`)
                            } else{
                                console.log("Não tens nenhuma vitimas")
                            }
            }
        }

    ]

    function command() {
        if (!procurandoSenha) {
            if (logado) {
                rl.question("\x1b[40m" + "\x1b[32m" + "@" + myaccount.user + "\x1b[0m" + "/" + "\x1b[2m" + file.folder + "/" + file.f + "$ ", (answer) => {
                    // TODO: Log the answer in a database
                    commandSend = answer;
                    if (commands.find(command => command.command === commandSend.split(" ", 1).toString())) {
                        const found = commands.find(command => command.command === commandSend.split(" ", 1).toString());
                        const id = commands.indexOf(found)
                        commands[id].function()
                    } else {
                        console.log(commandSend + ": " + "\x1b[2m" + "não é um comando");
                        command();
                    }
                    if (commandSend !== "") {
                        commandSend = "";
                        command();
                    } else {
                        commandSend = "";
                        command();
                        return false;
                    }
                    if (!sair) {
                        command();
                    }
                });
            } else {
                rl.question(`\x1b[0mOlá ${myaccount.user}, insira sua senha para continuar: `, (answer) => {
                    if (myaccount.password === answer) {
                        console.log("Legal, você passou no primeiro teste")
                        logado = true
                        setTimeout(() => {
                            console.clear()
                            command();
                        }, 1500);
                    } else {
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

    function ex() {
        process.on('exit', function(code) {
            sair = true;
            console.clear();
            console.log("Finalizado com sucesso");
        });
    }

    function start() {
        command();
        ex();
    }

	load()
	start();
	minerarBitcoin()