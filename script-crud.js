const form = document.querySelector('.js-form');
const nameInput = document.querySelector('#name');
const dataInput = document.querySelector('#birth-date');
const bt = document.querySelector('.form__button');
const ulPessoas = document.querySelector('.listaPessoas')

let pessoas = JSON.parse(localStorage.getItem('pessoas')) || []
function atualizarPessoa() {
    let novaPessoa = dadosDaPessoa();
    pessoas.push(novaPessoa);
    localStorage.setItem('pessoas', JSON.stringify(pessoas))
    criarElemento(pessoas);
}

function atualizarTabela(){
    criarElemento(pessoas);
}

atualizarTabela();

function criarElemento(pessoas) {
    ulPessoas.innerHTML = ""; // Limpa a lista antes de adicionar os novos elementos

    pessoas.forEach((pessoa, index) => { // Captura o índice de cada pessoa
        const li = document.createElement('li'); // Cria um <li> para cada pessoa
        li.classList.add('lista')
        // <table border="1">
            //     <tr>
            //         <th>Nome</th>
            //         <th>Data de Nascimento</th>
            //     </tr>
            //     <tr>
            //         <td>${pessoa.nome}</td>
            //         <td>${pessoa.data}</td>
            //     </tr>
            // </table> 
        li.innerHTML = `
        
              <tr>
                    <h3>Nome: </h3>
                    <p>${pessoa.nome}</p>
                    </tr>
                    <tr>
                    <h3>Data de Nascimento: </h3>
                    <p>${pessoa.data}</p>
                </tr>
        `;

        const btEditar = document.createElement('button');
        const btDel = document.createElement('button');
        btEditar.innerText = "Editar Dados";
        btEditar.classList.add('btEditar','padrao');
        btDel.innerText = "Excluir";
        btDel.classList.add('btDel','padrao');

        btEditar.addEventListener('click', () => {
            const novoNome = prompt('Digite o novo nome:', pessoa.nome);
            const novaData = prompt('Digite a nova data:', pessoa.data);

            if (novoNome && novaData) { 
                // Atualiza o nome e a data no array usando o índice correto
                pessoas[index].nome = novoNome;
                pessoas[index].data = novaData;

                // Atualiza no localStorage
                localStorage.setItem('pessoas', JSON.stringify(pessoas));

                // Recria a lista atualizada
                criarElemento(pessoas);
            }
        });

        btDel.addEventListener('click', ()=> {
            pessoas.splice(index,1);
            localStorage.setItem('pessoas', JSON.stringify(pessoas));
            criarElemento(pessoas);
        })  

        li.appendChild(btEditar);
        li.appendChild(btDel);
        li.style.marginBottom = "10px";
        ulPessoas.appendChild(li);
    });
}

function dadosDaPessoa() {
    return {
        nome: nameInput.value,
        data: dataFormatada(dataInput.value)
    };
}

function atualizarCampos(){
    nameInput.value = ""
    dataInput.value = ""
}

function dataFormatada(d){
  
        const partes = d.split('-'); // Divide "YYYY-MM-DD" em ["YYYY", "MM", "DD"]
        const dataNova = new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2]));
        return dataNova.toLocaleDateString('pt-BR');
    }
    



bt.addEventListener('click', (event) => {
    event.preventDefault();
    if (nameInput.checkValidity()) {
        atualizarPessoa();
    } else {
        nameInput.reportValidity(); // Mostra a mensagem de erro
    }
    atualizarCampos();
}
)


nameInput.addEventListener('input', () => {
    const nome = nameInput.value;

    if (nome.length <= 3) {
        nameInput.setCustomValidity('O nome deve ter mais de 3 letras.');
    } else if (nome.length >= 120) {
        nameInput.setCustomValidity('O nome deve ter menos de 120 caracteres')
    } else if (nameInput.value != nameInput.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')) {
        nameInput.setCustomValidity('O nome deve conter apesas letra')

    }
    else {
        nameInput.setCustomValidity('');
    }

    nameInput.reportValidity();
});

// pessoas.forEach((pessoas) => {
//     console.log(`Nome: ${pessoas.nome}`)
//     console.log(`Data: ${pessoas.data}`)
//     console.log(" ")
    
// });