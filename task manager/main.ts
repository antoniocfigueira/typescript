type Categoria = 'Trabalho' | 'Pessoal' | 'Estudo';

interface Tarefa {
    id: number;
    titulo: string;
    concluida: boolean;
    categoria: Categoria;
    dataConclusao?: Date;
}

class TarefaClass implements Tarefa {
    id: number;
    titulo: string;
    concluida: boolean;
    categoria: Categoria;
    dataConclusao?: Date;

    constructor(id: number, titulo: string, categoria: Categoria) {
        this.id = id;
        this.titulo = titulo;
        this.categoria = categoria;
        this.concluida = false;
    }

    // concluir tarefa
    marcarConcluida() {
        this.concluida = true;
        this.dataConclusao = new Date();
    }

    // alternar estado tarefa
    alternarEstado() {
        this.concluida = !this.concluida;
        if (this.concluida) {
            this.dataConclusao = new Date();
        } else {
            this.dataConclusao = undefined;
        }
    }
}

let listaTarefas: TarefaClass[] = [];

const divLista = document.getElementById("listaTarefas");
const countPendentes = document.getElementById("contadorPendentes");
const countTotal = document.getElementById("totalTarefas");

// render lista
function render(arrayParaExibir: TarefaClass[]) {
    if (!divLista) return;
    divLista.innerHTML = "";

    const pendentes = listaTarefas.filter(t => !t.concluida).length;
    if (countPendentes) countPendentes.innerText = pendentes.toString();
    if (countTotal) countTotal.innerText = listaTarefas.length.toString();

    arrayParaExibir.forEach(tarefa => {
        const card = document.createElement("div");
        
        card.className = "bg-white border-2 border-gray-200 p-5 relative";
        
        let estiloTitulo = "text-lg font-black text-gray-800 uppercase tracking-tighter mb-1";
        if (tarefa.concluida) {
            card.className += " bg-gray-50 opacity-60";
            estiloTitulo += " line-through text-gray-400";
        }

        const corCategoria = {
            'Trabalho': 'text-blue-600',
            'Pessoal': 'text-purple-600',
            'Estudo': 'text-green-600'
        };

        const dataFormatada = tarefa.dataConclusao 
            ? tarefa.dataConclusao.toLocaleDateString() + " " + tarefa.dataConclusao.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            : "";

        card.innerHTML = `
            <div class="text-[9px] font-bold uppercase ${corCategoria[tarefa.categoria]} mb-1">${tarefa.categoria}</div>
            <h3 class="${estiloTitulo}">${tarefa.titulo}</h3>
            <p class="text-[10px] text-gray-400 font-mono mb-4">ID: ${tarefa.id}</p>
            
            ${tarefa.concluida ? `<p class="text-[10px] text-green-600 font-bold mb-4 uppercase italic">Concluída em: ${dataFormatada}</p>` : ''}

            <div class="flex flex-wrap gap-2">
                <button class="btn-check text-[10px] border-2 border-gray-800 px-2 py-1 font-bold uppercase bg-white">
                    ${tarefa.concluida ? 'Refazer' : 'Concluir'}
                </button>
                <button class="btn-edit text-[10px] border-2 border-gray-800 px-2 py-1 font-bold uppercase bg-white">
                    Editar
                </button>
                <button class="btn-delete text-[10px] text-red-600 border-2 border-red-600 px-2 py-1 font-bold uppercase bg-white">
                    Remover
                </button>
            </div>
        `;

        const btnCheck = card.querySelector(".btn-check") as HTMLButtonElement;
        btnCheck.onclick = () => {
            tarefa.alternarEstado();
            render(listaTarefas);
        };

        const btnEdit = card.querySelector(".btn-edit") as HTMLButtonElement;
        btnEdit.onclick = () => {
            const novoTitulo = prompt("Novo título para a tarefa:", tarefa.titulo);
            if (novoTitulo !== null && novoTitulo.trim() !== "") {
                tarefa.titulo = novoTitulo;
                render(listaTarefas);
            }
        };

        const btnDelete = card.querySelector(".btn-delete") as HTMLButtonElement;
        btnDelete.onclick = () => {
            listaTarefas = listaTarefas.filter(t => t.id !== tarefa.id);
            render(listaTarefas);
        };

        divLista.appendChild(card);
    });
}

const btnAdd = document.getElementById("btnAdicionar");
const inTitulo = document.getElementById("inputTitulo") as HTMLInputElement;
const selCat = document.getElementById("selectCategoria") as HTMLSelectElement;

// criar nova tarefa
if (btnAdd) {
    btnAdd.onclick = () => {
        const titulo = inTitulo.value;
        const categoria = selCat.value as Categoria;

        if (titulo.trim() === "") {
            const erro = document.getElementById("erroTarefa");
            if (erro) erro.innerText = "ERRO: O TÍTULO NÃO PODE ESTAR VAZIO";
            return;
        }

        listaTarefas.push(new TarefaClass(Date.now(), titulo, categoria));
        inTitulo.value = "";
        const erro = document.getElementById("erroTarefa");
        if (erro) erro.innerText = "";
        render(listaTarefas);
    };
}

// filtrar
const inPesquisa = document.getElementById("inputPesquisa") as HTMLInputElement;
if (inPesquisa) {
    inPesquisa.oninput = () => {
        const termo = inPesquisa.value.toLowerCase();
        const filtradas = listaTarefas.filter(t => 
            t.titulo.toLowerCase().indexOf(termo) !== -1
        );
        render(filtradas);
    };
}

// ordenar lista
const btnSort = document.getElementById("btnOrdenar");
if (btnSort) {
    btnSort.onclick = () => {
        listaTarefas.sort((a, b) => a.titulo.localeCompare(b.titulo));
        render(listaTarefas);
    };
}

// remover concluidas
const btnLimpar = document.getElementById("btnLimparConcluidas");
if (btnLimpar) {
    btnLimpar.onclick = () => {
        listaTarefas = listaTarefas.filter(t => !t.concluida);
        render(listaTarefas);
    };
}

// tarefas iniciais
function inicializar() {
    listaTarefas.push(new TarefaClass(1, "Tarefa 1", "Estudo"));
    listaTarefas.push(new TarefaClass(2, "Tarefa 2", "Trabalho"));
    render(listaTarefas);
}

inicializar();