let usuarios = [
    {   "id": 1,
        "nome": "Fulvio Fanelli",
        "email": "fulvio@unoeste.br",
        "cidade": "Presidente Prudente",
        "estado": "SP"
    },
    {   
        "id": 2,
        "nome": "Fulano Fanelli",
        "email": "fulano@unoeste.br",
        "cidade": "Presidente Prudente",
        "estado": "SP"
    }
]


export default class UsuarioModel {

    listar() {
        return usuarios;
    }

    deletar(id) {
        usuarios = usuarios.filter(x => x.id != id);
    }

    gravar(usuario) {
        usuarios.push(usuario);
    }

    obter(id) {
        return usuarios.filter(x=> x.id == id);
    }

    alterar(usuario) {
        usuarios = usuarios.map((user) => {
            if(user.id == usuario.id)
                return {...usuario}

            return user;
        })
    }

    alteracaoParcial(usuario) {
        usuarios = usuarios.map(user => {
            if(user.id == usuario.id) {
                return {...user, ...usuario}
            }

            return user;
        })
    }

}