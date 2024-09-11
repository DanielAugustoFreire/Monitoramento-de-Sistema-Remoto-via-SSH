document.addEventListener('DOMContentLoaded', function () {
    var BtnConfirmar = document.getElementById('botao');
    BtnConfirmar.addEventListener('click', conectar);
    var InputTerminal = document.getElementById('terminal').addEventListener('keydown', conectar)

    function repeatCommand(command, times) {
        return Array(times).fill(command).join(' ');
    }

    function carregar(lista_pastas, pilha) {
        let html = `<div class="me-3 mb-3 text-center">
                    <a href="#" class="text-decoration-none voltar">
                        <i class="fas fa-folder fa-2x text-warning"></i>
                        <div class="text-white mt-1">..</div>
                    </a>
                </div>`;

        let pastas_tratadas = lista_pastas.split("\n");
        let size = pastas_tratadas.length - 1; // Ele separa sempre mais Uma que na realidade nao existe

        for (let i = 0; i < size; i++) {
            let depois = pastas_tratadas[i].split(".");
            let depoisdoponto = depois[1] ?? 'folder';
            
            // Verifica se é um arquivo de texto ou uma pasta
            let icon = (depoisdoponto === 'txt') ? 'fas fa-file-alt text-white' : 'fas fa-folder text-warning';
            
            html += `<div class="me-3 mb-3 text-center">
                        <a href="#" class="text-decoration-none avancar" id="${pastas_tratadas[i]}">
                            <i class="${icon} fa-2x "></i>
                            <div class="text-white mt-1">${pastas_tratadas[i]}</div>
                        </a>
                    </div>`;
        }
        

        let Pastas_Lousas_HTML = document.getElementById(`Lousa_Pastas`);
        Pastas_Lousas_HTML.innerHTML = html;

        document.getElementById('hoster').disabled = true;
        document.getElementById('porter').disabled = true;
        document.getElementById('userer').disabled = true;
        document.getElementById('passworder').disabled = true;
        document.getElementById('commands').disabled = true;


        // Adicionando o evento de clique para "voltar"
        document.querySelector('.voltar').addEventListener('click', function (event) {
            event.preventDefault();
            conectar_voltando_n(pilha)
        });

        const elementosAvancar = document.querySelectorAll('.avancar');

        elementosAvancar.forEach(elemento => {
          elemento.addEventListener('click', function(event) {
            let id = this.id
            event.preventDefault();
            conectar_avancando_n(pilha, id);
          });
        });
    }
    
    function carregarText(retorno_data){
            let html = `<div class="me-3 mb-3 text-center">
            <a href="#" class="text-decoration-none voltar">
                <i class="fas fa-folder fa-2x text-warning"></i>
                <div class="text-white mt-1">..</div>
            </a>
            </div>`;

            html += `
            <div class="content-data text-white p-3 rounded bg-dark">
                <i class="fas fa-file-alt fa-2x text-info me-2"></i>
                ${retorno_data}
            </div>
        `;

            let Pastas_Lousas_HTML = document.getElementById(`Lousa_Pastas`);
            Pastas_Lousas_HTML.innerHTML = html;

            document.getElementById('hoster').disabled = true;
            document.getElementById('porter').disabled = true;
            document.getElementById('userer').disabled = true;
            document.getElementById('passworder').disabled = true;
            document.getElementById('commands').disabled = true;


            // Adicionando o evento de clique para "voltar"
            document.querySelector('.voltar').addEventListener('click', function (event) {
            event.preventDefault();
            conectar_voltando_n(pilha)
            });
    }

    function conectar_avancando_n(pilha, id){
        let depois = id.split(".");
        let commands
        let pi


        if(depois[1]){
            commands = `cat ${id}`;
        }else{
            pi = pilha + 1;
            commands = `cd ${id};`
            commands += "ls"
        }

        debugger
        let formDataObj = {
            hoster: document.getElementById("hoster").value,
            porter: document.getElementById("porter").value,
            userer: document.getElementById("userer").value,
            passworder: document.getElementById("passworder").value,
            commands: commands,
            pilha: pi
        };

        fetch("/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        })
        .then(response => {
            if (!response.ok) {
                switch (response.status) {
                    case 400:
                        throw new Error("Parâmetros preenchidos incorretamente.");
                    case 500:
                        throw new Error("Erro interno do servidor.");
                    default:
                        throw new Error(`Erro inesperado: ${response.status}`);
                }
            }
            return response.json();
        })
        .then(res => {
            debugger
            if (res && res.retorno && res.retorno.data) {
                const data = res.retorno.data;
                if(res.isText){
                    carregarText(data)
                }else{
                    carregar(data, res.pilha);
                }
            } else {
                throw new Error("A estrutura da resposta não está conforme o esperado.");
            }
        })
        .catch(error => {
            console.error("Erro ao enviar formulário:", error);
            alert(error.message);
        });
    }

    function conectar_voltando_n(pilha) {
        debugger
        let pi = pilha
        let commands = repeatCommand('cd .. ;', pilha);
        commands += " ls"

        if(pi >= 3){
            pi = 3;
        }else{
            pi += 1;
        }
        
        let formDataObj = {
            hoster: document.getElementById("hoster").value,
            porter: document.getElementById("porter").value,
            userer: document.getElementById("userer").value,
            passworder: document.getElementById("passworder").value,
            commands: commands,
            pilha: pi
        };

        fetch("/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        })
        .then(response => {
            if (!response.ok) {
                switch (response.status) {
                    case 400:
                        throw new Error("Parâmetros preenchidos incorretamente.");
                    case 500:
                        throw new Error("Erro interno do servidor.");
                    default:
                        throw new Error(`Erro inesperado: ${response.status}`);
                }
            }
            return response.json();
        })
        .then(res => {
            if (res && res.retorno && res.retorno.data) {
                const data = res.retorno.data;
                carregar(data, res.pilha);
            } else {
                throw new Error("A estrutura da resposta não está conforme o esperado.");
            }
        })
        .catch(error => {
            console.error("Erro ao enviar formulário:", error);
            alert(error.message);
        });
    }

    function conectar() {
        
        let formDataObj = {
            hoster: document.getElementById("hoster").value,
            porter: document.getElementById("porter").value,
            userer: document.getElementById("userer").value,
            passworder: document.getElementById("passworder").value,
            commands: document.getElementById("commands").value,
            pilha: 1
        };

        fetch("/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        })
        .then(response => {
            if (!response.ok) {
                switch (response.status) {
                    case 400:
                        throw new Error("Parâmetros preenchidos incorretamente.");
                    case 500:
                        throw new Error("Erro interno do servidor.");
                    default:
                        throw new Error(`Erro inesperado: ${response.status}`);
                }
            }
            return response.json();
        })
        .then(res => {
            if (res && res.retorno && res.retorno.data) {
                const data = res.retorno.data;
                carregar(data, res.pilha);
            } else {
                throw new Error("A estrutura da resposta não está conforme o esperado.");
            }
        })
        .catch(error => {
            console.error("Erro ao enviar formulário:", error);
            alert(error.message);
        });
    }
});
