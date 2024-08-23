document.addEventListener('DOMContentLoaded', function () {
    var BtnConfirmar = document.getElementById('botao');
    BtnConfirmar.addEventListener('click', conectar);

    function conectar() {
        debugger;
        // Criação do objeto com os dados do formulário
        let formDataObj = {
            hoster: document.getElementById("hoster").value,
            porter: document.getElementById("porter").value,
            userer: document.getElementById("userer").value,
            passworder: document.getElementById("passworder").value,
            commands: document.getElementById("commands").value
        };
    
        fetch("/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(formDataObj) // Converte o objeto para uma string JSON
        })
        .then(response => {
            debugger;
            if (!response.ok) {
                // Se a resposta não for OK, trata o erro
                switch (response.status) {
                    case 400:
                        throw new Error("Parâmetros preenchidos incorretamente.");
                    case 500:
                        throw new Error("Erro interno do servidor.");
                    default:
                        throw new Error(`Erro inesperado: ${response.status}`);
                }
            }
            // Converte a resposta para JSON e retorna
            return response.json();
        })
        .then(res => {
            debugger;
            // Exibe a resposta ou faz algo com ela
            alert(res.data ? `Pastas recebidas: ${res.data}` : "Nenhuma pasta retornada.");
        
            // Redireciona para a página de sucesso
            window.location.href = '/sucesso';
        })
        .catch(error => {
            // Trata erros de resposta e outras exceções
            console.error("Erro ao enviar formulário:", error);
            alert(error.message); // Exibe um alerta com a mensagem de erro
        });
        
    }
    
});
