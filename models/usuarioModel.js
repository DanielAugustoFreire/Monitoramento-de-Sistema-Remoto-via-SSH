export default class UsuarioModel {
    #id;
    #nome;
    #email;
    #senha;

    constructor(id, nome, email, senha) {
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
    }

    get id() { return this.#id; }get nome() { return this.#nome; }get email() { return this.#email; }get senha() { return this.#senha; }
    set id(id) { this.#id = id; }set nome(nome) { this.#nome = nome; }set email(email) { this.#email = email; }set senha(senha) { this.#senha = senha; }

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