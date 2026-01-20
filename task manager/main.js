var TarefaClass = /** @class */ (function () {
    function TarefaClass(id, titulo, categoria) {
        this.id = id;
        this.titulo = titulo;
        this.categoria = categoria;
        this.concluida = false;
    }
    TarefaClass.prototype.marcarConcluida = function () {
        this.concluida = true;
        this.dataConclusao = new Date();
    };
    TarefaClass.prototype.alternarEstado = function () {
        this.concluida = !this.concluida;
        if (this.concluida) {
            this.dataConclusao = new Date();
        }
        else {
            this.dataConclusao = undefined;
        }
    };
    return TarefaClass;
}());
var listaTarefas = [];
var divLista = document.getElementById("listaTarefas");
var countPendentes = document.getElementById("contadorPendentes");
var countTotal = document.getElementById("totalTarefas");
function render(arrayParaExibir) {
    if (!divLista)
        return;
    divLista.innerHTML = "";
    var pendentes = listaTarefas.filter(function (t) { return !t.concluida; }).length;
    if (countPendentes)
        countPendentes.innerText = pendentes.toString();
    if (countTotal)
        countTotal.innerText = listaTarefas.length.toString();
    arrayParaExibir.forEach(function (tarefa) {
        var card = document.createElement("div");
        card.className = "bg-white border-2 border-gray-200 p-5 relative";
        var estiloTitulo = "text-lg font-black text-gray-800 uppercase tracking-tighter mb-1";
        if (tarefa.concluida) {
            card.className += " bg-gray-50 opacity-60";
            estiloTitulo += " line-through text-gray-400";
        }
        var corCategoria = {
            'Trabalho': 'text-blue-600',
            'Pessoal': 'text-purple-600',
            'Estudo': 'text-green-600'
        };
        var dataFormatada = tarefa.dataConclusao
            ? tarefa.dataConclusao.toLocaleDateString() + " " + tarefa.dataConclusao.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : "";
        card.innerHTML = "\n            <div class=\"text-[9px] font-bold uppercase ".concat(corCategoria[tarefa.categoria], " mb-1\">").concat(tarefa.categoria, "</div>\n            <h3 class=\"").concat(estiloTitulo, "\">").concat(tarefa.titulo, "</h3>\n            <p class=\"text-[10px] text-gray-400 font-mono mb-4\">ID: ").concat(tarefa.id, "</p>\n            \n            ").concat(tarefa.concluida ? "<p class=\"text-[10px] text-green-600 font-bold mb-4 uppercase italic\">Conclu\u00EDda em: ".concat(dataFormatada, "</p>") : '', "\n\n            <div class=\"flex flex-wrap gap-2\">\n                <button class=\"btn-check text-[10px] border-2 border-gray-800 px-2 py-1 font-bold uppercase bg-white\">\n                    ").concat(tarefa.concluida ? 'Refazer' : 'Concluir', "\n                </button>\n                <button class=\"btn-edit text-[10px] border-2 border-gray-800 px-2 py-1 font-bold uppercase bg-white\">\n                    Editar\n                </button>\n                <button class=\"btn-delete text-[10px] text-red-600 border-2 border-red-600 px-2 py-1 font-bold uppercase bg-white\">\n                    Remover\n                </button>\n            </div>\n        ");
        var btnCheck = card.querySelector(".btn-check");
        btnCheck.onclick = function () {
            tarefa.alternarEstado();
            render(listaTarefas);
        };
        var btnEdit = card.querySelector(".btn-edit");
        btnEdit.onclick = function () {
            var novoTitulo = prompt("Novo título para a tarefa:", tarefa.titulo);
            if (novoTitulo !== null && novoTitulo.trim() !== "") {
                tarefa.titulo = novoTitulo;
                render(listaTarefas);
            }
        };
        var btnDelete = card.querySelector(".btn-delete");
        btnDelete.onclick = function () {
            listaTarefas = listaTarefas.filter(function (t) { return t.id !== tarefa.id; });
            render(listaTarefas);
        };
        divLista.appendChild(card);
    });
}
var btnAdd = document.getElementById("btnAdicionar");
var inTitulo = document.getElementById("inputTitulo");
var selCat = document.getElementById("selectCategoria");
if (btnAdd) {
    btnAdd.onclick = function () {
        var titulo = inTitulo.value;
        var categoria = selCat.value;
        if (titulo.trim() === "") {
            var erro_1 = document.getElementById("erroTarefa");
            if (erro_1)
                erro_1.innerText = "ERRO: O TÍTULO NÃO PODE ESTAR VAZIO";
            return;
        }
        listaTarefas.push(new TarefaClass(Date.now(), titulo, categoria));
        inTitulo.value = "";
        var erro = document.getElementById("erroTarefa");
        if (erro)
            erro.innerText = "";
        render(listaTarefas);
    };
}
var inPesquisa = document.getElementById("inputPesquisa");
if (inPesquisa) {
    inPesquisa.oninput = function () {
        var termo = inPesquisa.value.toLowerCase();
        var filtradas = listaTarefas.filter(function (t) {
            return t.titulo.toLowerCase().indexOf(termo) !== -1;
        });
        render(filtradas);
    };
}
var btnSort = document.getElementById("btnOrdenar");
if (btnSort) {
    btnSort.onclick = function () {
        listaTarefas.sort(function (a, b) { return a.titulo.localeCompare(b.titulo); });
        render(listaTarefas);
    };
}
var btnLimpar = document.getElementById("btnLimparConcluidas");
if (btnLimpar) {
    btnLimpar.onclick = function () {
        listaTarefas = listaTarefas.filter(function (t) { return !t.concluida; });
        render(listaTarefas);
    };
}
function inicializar() {
    listaTarefas.push(new TarefaClass(1, "Tarefa 1", "Estudo"));
    listaTarefas.push(new TarefaClass(2, "Tarefa 2", "Trabalho"));
    render(listaTarefas);
}
inicializar();
