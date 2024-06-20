const btnAdicionarTarefa = document.querySelector('.app__button--add-task');//botao adicionar tarefa
const formAdicionarTarefa = document.querySelector('.app__form-add-task');//formulário tarefa
const textArea = document.querySelector('.app__form-textarea');// textArea para digitar tarefa
const ulTarefas = document.querySelector('.app__section-task-list') // ul da lista de tarefas
const btnCancelar = document.querySelector('.app__form-footer__button--cancel'); // botao cancelar adicionar tarefa
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');

const listaDeTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];//lista para armazenar tarefas atraves do 'formAdicionarTarefa'

let tarefaSelecionada = null;

//funcao para cancelar tarefa
function cancelarTarefa() {
    textArea.value = ''
    formAdicionarTarefa.classList.toggle('hidden');
}
btnCancelar.addEventListener('click', cancelarTarefa)

// funcao para atualizar tarefas
function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas)) //localStorage: armazenamento local - dentro da localStorage só se armazena strings - 'tarefas'chave de acesso para o valor, JSON.stringify(listaDeTarefas) > converte o objeto em uma string e depois transformar a string em objeto
}

//função para adicionar tarefa
function criarElementoTarefa(tarefa) {
    const li = document.createElement('li'); //crio um elemento li
    li.classList.add('app__section-task-list-item')//defino uma classe para meu elemento li

    const svg = document.createElement('svg'); //crio um elemento svg
    svg.innerHTML = `
    
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg> 
        ` // defino o conteudo do meu elemento svg

    const paragrafo = document.createElement('p'); //crio um elemento paragrafo
    paragrafo.textContent = tarefa.descricao;// defino o conteudo do meu elemento paragrafo
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button'); //crio um elemento botao
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        const novaDescricao = prompt('Qual o nome de sua nova tarefa?');
        if (novaDescricao.trim() !== '') {
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            return atualizarTarefas();
        } else {
            alert('Adicione uma nova descrição');
        }
    }
    const imagemBotao = document.createElement('img'); //crio uma imagem para o botao
    imagemBotao.setAttribute('src', '/imagens/edit.png'); // defino o atributo e o valor do atributo
    botao.append(imagemBotao); // coloca dentro do botao a imagem


    li.append(svg) // coloca dentro da li o svg
    li.append(paragrafo); // coloca dentro da li o paragrafo
    li.append(botao); // coloca dentro da li o botao

    li.onclick = () => { //mudar o paragrafo da tarefa em andamento
        document.querySelectorAll('.app__section-task-list-item-active').forEach(elemento => {
            elemento.classList.remove('app__section-task-list-item-active')
        });
        if (tarefaSelecionada == tarefa) {
            paragrafoDescricaoTarefa.textContent = ''
            tarefaSelecionada = null;
            return
        }
        tarefaSelecionada = tarefa;
        paragrafoDescricaoTarefa.textContent = tarefa.descricao

        li.classList.add('app__section-task-list-item-active')
    }

    return li
}

//exibir o formulário para adicionar tarefas:
btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden'); // se tem a classe hidden, ela será removida, se não tem, será adicionada
})

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();//prevenir o comportamento padrao do 'submit'
    const tarefa = {
        descricao: textArea.value
    }
    listaDeTarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);

    atualizarTarefas()

    textArea.value = ''; //limpa o campo de texto
    formAdicionarTarefa.classList.add('hidden'); // quando a tarefa for adicionada na lista o campo do formulario ficara 'hidden'
})

listaDeTarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa);
});