interface Utilizador {
    id: number;
    nome: string;
    email: string;
    ativo: boolean;
}

class UtilizadorClass implements Utilizador {
    id: number;
    nome: string;
    email: string;
    ativo: boolean;

    constructor(id: number, nome: string, email: string) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.ativo = true;
    }

    toggleEstado() {
        this.ativo = !this.ativo;
    }
}

let lista: UtilizadorClass[] = [];

// htmlID
const divContentor = document.getElementById("contentor");
const spAtivos = document.getElementById("ativos");
const spInativos = document.getElementById("inativos");
const spTotal = document.getElementById("totalUsers");
const spPercent = document.getElementById("percentagemAtivos");
const divDetalhes = document.getElementById("detalhesConteudo");

// stats
function atualizarEstatisticas() {
    const total = lista.length;
    let ativos = 0;
    for (let i = 0; i < total; i++) {
        if (lista[i].ativo) ativos++;
    }
    const inativos = total - ativos;
    const percentagem = total > 0 ? Math.round((ativos / total) * 100) : 0;

    if (spTotal) spTotal.innerText = total.toString();
    if (spAtivos) spAtivos.innerText = ativos.toString();
    if (spInativos) spInativos.innerText = inativos.toString();
    if (spPercent) spPercent.innerText = percentagem + "%";
}

function mostrarDetalhes(u: UtilizadorClass) {
    if (!divDetalhes) return;
    divDetalhes.innerHTML = `
        <div class="not-italic">
            <p class="mb-2"><span class="font-bold uppercase text-[10px] text-gray-400">UID:</span><br>${u.id}</p>
            <p class="mb-2"><span class="font-bold uppercase text-[10px] text-gray-400">Nome:</span><br>${u.nome}</p>
            <p class="mb-2"><span class="font-bold uppercase text-[10px] text-gray-400">Email:</span><br>${u.email}</p>
            <p class="mb-2"><span class="font-bold uppercase text-[10px] text-gray-400">Estado:</span><br>${u.ativo ? 'Ativo' : 'Inativo'}</p>
        </div>
    `;
}

function render(array: UtilizadorClass[]) {
    if (!divContentor) return;
    divContentor.innerHTML = "";
    atualizarEstatisticas();

    for (let i = 0; i < array.length; i++) {
        const u = array[i];
        const card = document.createElement("div");
        
        card.className = "bg-white border-2 border-gray-200 p-5 relative cursor-pointer";
        if (!u.ativo) card.className += " opacity-60 bg-gray-100 border-dashed";

        const estadoCor = u.ativo ? "bg-green-600" : "bg-red-600";
        const txtCor = u.ativo ? "text-green-600" : "text-red-600";

        card.innerHTML = `
            <div class="absolute top-0 right-0 w-3 h-full ${estadoCor}"></div>
            <p class="text-[9px] font-mono text-gray-400 mb-1">ID: ${u.id}</p>
            <h3 class="text-lg font-black text-gray-800 leading-tight uppercase tracking-tighter">${u.nome}</h3>
            <p class="text-sm text-gray-500 mb-4 font-mono">${u.email}</p>
            <div class="flex gap-2">
                <button class="btn-toggle text-[10px] border-2 border-gray-800 px-3 py-1 font-bold uppercase bg-white">
                    ${u.ativo ? 'Desativar' : 'Ativar'}
                </button>
                <button class="btn-delete text-[10px] text-red-600 border-2 border-red-600 px-3 py-1 font-bold uppercase bg-white">
                    Apagar
                </button>
            </div>
        `;

        // mostrar detalhes
        card.onclick = (e) => {
            const alvo = e.target as HTMLElement;
            if (alvo.tagName !== 'BUTTON') {
                mostrarDetalhes(u);
            }
        };

        // alternar estado ativo/inativo
        const btnToggle = card.querySelector(".btn-toggle") as HTMLButtonElement;
        btnToggle.onclick = (e) => {
            e.stopPropagation();
            u.toggleEstado();
            render(array);
        };

        // remover / compare
        const btnDelete = card.querySelector(".btn-delete") as HTMLButtonElement;
        btnDelete.onclick = (e) => {
            e.stopPropagation();
            lista = lista.filter(item => item.id !== u.id);
            render(lista);
        };

        divContentor.appendChild(card);
    }
}

// DADOSINICIAIS
function carregarDadosIniciais() {
    const fakeData = [
        { id: 001, nome: "User 1", email: "user1@mail.pt" },
        { id: 002, nome: "User 2", email: "user2@mail.pt" },
        { id: 003, nome: "User 3", email: "user3@mail.pt" }
    ];

    for (let i = 0; i < fakeData.length; i++) {
        const d = fakeData[i];
        lista.push(new UtilizadorClass(d.id, d.nome, d.email));
    }
}

const inNome = document.getElementById("nome") as HTMLInputElement;
const inEmail = document.getElementById("email") as HTMLInputElement;
const btnAdd = document.getElementById("btnAdicionar");
const divErro = document.getElementById("erro");

// Validação
if (btnAdd) {
    btnAdd.onclick = () => {
        const n = inNome.value;
        const e = inEmail.value;
        if (n === "" || e.indexOf("@") === -1) {
            if (divErro) divErro.innerText = "ERRO: DADOS INVÁLIDOS";
        } else {
            if (divErro) divErro.innerText = "";
            lista.push(new UtilizadorClass(Date.now(), n, e));
            inNome.value = ""; inEmail.value = "";
            render(lista);
        }
    };
}

// Pesquisa
document.getElementById("pesquisa")?.addEventListener("input", (e) => {
    const txt = (e.target as HTMLInputElement).value.toLowerCase();
    render(lista.filter(u => u.nome.toLowerCase().indexOf(txt) !== -1));
});

// Filtros
document.getElementById("btnFiltrar")!.onclick = () => render(lista.filter(u => u.ativo));
document.getElementById("btnTodos")!.onclick = () => render(lista);
document.getElementById("btnOrdenar")!.onclick = () => {
    lista.sort((a, b) => a.nome.localeCompare(b.nome));
    render(lista);
};

carregarDadosIniciais();
render(lista);