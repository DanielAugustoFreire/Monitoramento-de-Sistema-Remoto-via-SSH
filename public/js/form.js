document.addEventListener('DOMContentLoaded', function () {
    var BtnConfirmar = document.getElementById('botao');
    BtnConfirmar.addEventListener('click', conectar);

    function repeatCommand(command, times) {
        return Array(times).fill(command).join(' ');
    }

    function carregarPastas(lista_pastas, pilha) {
        let html = `<div class="me-3 mb-3 text-center">
                    <a href="#" class="text-decoration-none voltar">
                        <i class="fas fa-folder fa-2x text-warning"></i>
                        <div class="text-white mt-1">..</div>
                    </a>
                </div>`;

        let pastas_tratadas = lista_pastas.split("\n");
        let size = pastas_tratadas.length - 1; // Ele separa sempre mais Uma que na realidade nao existe

        for (let i = 0; i < size; i++) {
            html += `<div class="me-3 mb-3 text-center">
                    <a href="#" class="text-decoration-none avancar" id="${pastas_tratadas[i]}">
                        <i class="fas fa-folder fa-2x text-warning"></i>
                        <div class="text-white mt-1">${pastas_tratadas[i]}</div>
                    </a>
                </div>`;
        }

        let Pastas_Lousas_HTML = document.getElementById(`Lousa_Pastas`);
        Pastas_Lousas_HTML.innerHTML = html;

        // Adicionando o evento de clique para "voltar"
        document.querySelector('.voltar').addEventListener('click', function (event) {
            event.preventDefault();
            conectar_voltando_n(pilha)
        });
    }

    function conectar_voltando_n(pilha) {
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
            if (res && res.pastas && res.pastas.data) {
                const data = res.pastas.data;
                carregarPastas(data, res.pilha);
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
            if (res && res.pastas && res.pastas.data) {
                const data = res.pastas.data;
                carregarPastas(data, res.pilha);
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
