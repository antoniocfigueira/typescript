var _a;
var UtilizadorClass = /** @class */ (function () {
    function UtilizadorClass(id, nome, email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.ativo = true;
    }
    UtilizadorClass.prototype.toggleEstado = function () {
        this.ativo = !this.ativo;
    };
    return UtilizadorClass;
}());
var lista = [];
// htmlID
var divContentor = document.getElementById("contentor");
var spAtivos = document.getElementById("ativos");
var spInativos = document.getElementById("inativos");
var spTotal = document.getElementById("totalUsers");
var spPercent = document.getElementById("percentagemAtivos");
var divDetalhes = document.getElementById("detalhesConteudo");
// stats
function atualizarEstatisticas() {
    var total = lista.length;
    var ativos = 0;
    for (var i = 0; i < total; i++) {
        if (lista[i].ativo)
            ativos++;
    }
    var inativos = total - ativos;
    var percentagem = total > 0 ? Math.round((ativos / total) * 100) : 0;
    if (spTotal)
        spTotal.innerText = total.toString();
    if (spAtivos)
        spAtivos.innerText = ativos.toString();
    if (spInativos)
        spInativos.innerText = inativos.toString();
    if (spPercent)
        spPercent.innerText = percentagem + "%";
}
function mostrarDetalhes(u) {
    if (!divDetalhes)
        return;
    divDetalhes.innerHTML = "\n        <div class=\"not-italic\">\n            <p class=\"mb-2\"><span class=\"font-bold uppercase text-[10px] text-gray-400\">UID:</span><br>".concat(u.id, "</p>\n            <p class=\"mb-2\"><span class=\"font-bold uppercase text-[10px] text-gray-400\">Nome:</span><br>").concat(u.nome, "</p>\n            <p class=\"mb-2\"><span class=\"font-bold uppercase text-[10px] text-gray-400\">Email:</span><br>").concat(u.email, "</p>\n            <p class=\"mb-2\"><span class=\"font-bold uppercase text-[10px] text-gray-400\">Estado:</span><br>").concat(u.ativo ? 'Ativo' : 'Inativo', "</p>\n        </div>\n    ");
}
function render(array) {
    if (!divContentor)
        return;
    divContentor.innerHTML = "";
    atualizarEstatisticas();
    var _loop_1 = function (i) {
        var u = array[i];
        var card = document.createElement("div");
        card.className = "bg-white border-2 border-gray-200 p-5 relative cursor-pointer";
        if (!u.ativo)
            card.className += " opacity-60 bg-gray-100 border-dashed";
        var estadoCor = u.ativo ? "bg-green-600" : "bg-red-600";
        var txtCor = u.ativo ? "text-green-600" : "text-red-600";
        card.innerHTML = "\n            <div class=\"absolute top-0 right-0 w-3 h-full ".concat(estadoCor, "\"></div>\n            <p class=\"text-[9px] font-mono text-gray-400 mb-1\">ID: ").concat(u.id, "</p>\n            <h3 class=\"text-lg font-black text-gray-800 leading-tight uppercase tracking-tighter\">").concat(u.nome, "</h3>\n            <p class=\"text-sm text-gray-500 mb-4 font-mono\">").concat(u.email, "</p>\n            <div class=\"flex gap-2\">\n                <button class=\"btn-toggle text-[10px] border-2 border-gray-800 px-3 py-1 font-bold uppercase bg-white\">\n                    ").concat(u.ativo ? 'Desativar' : 'Ativar', "\n                </button>\n                <button class=\"btn-delete text-[10px] text-red-600 border-2 border-red-600 px-3 py-1 font-bold uppercase bg-white\">\n                    Apagar\n                </button>\n            </div>\n        ");
        // mostrar detalhes
        card.onclick = function (e) {
            var alvo = e.target;
            if (alvo.tagName !== 'BUTTON') {
                mostrarDetalhes(u);
            }
        };
        // alternar estado ativo/inativo
        var btnToggle = card.querySelector(".btn-toggle");
        btnToggle.onclick = function (e) {
            e.stopPropagation();
            u.toggleEstado();
            render(array);
        };
        // remover / compare
        var btnDelete = card.querySelector(".btn-delete");
        btnDelete.onclick = function (e) {
            e.stopPropagation();
            lista = lista.filter(function (item) { return item.id !== u.id; });
            render(lista);
        };
        divContentor.appendChild(card);
    };
    for (var i = 0; i < array.length; i++) {
        _loop_1(i);
    }
}
// DADOSINICIAIS
function carregarDadosIniciais() {
    var fakeData = [
        { id: 1, nome: "User 1", email: "user1@mail.pt" },
        { id: 2, nome: "User 2", email: "user2@mail.pt" },
        { id: 3, nome: "User 3", email: "user3@mail.pt" }
    ];
    for (var i = 0; i < fakeData.length; i++) {
        var d = fakeData[i];
        lista.push(new UtilizadorClass(d.id, d.nome, d.email));
    }
}
var inNome = document.getElementById("nome");
var inEmail = document.getElementById("email");
var btnAdd = document.getElementById("btnAdicionar");
var divErro = document.getElementById("erro");
// Validação
if (btnAdd) {
    btnAdd.onclick = function () {
        var n = inNome.value;
        var e = inEmail.value;
        if (n === "" || e.indexOf("@") === -1) {
            if (divErro)
                divErro.innerText = "ERRO: DADOS INVÁLIDOS";
        }
        else {
            if (divErro)
                divErro.innerText = "";
            lista.push(new UtilizadorClass(Date.now(), n, e));
            inNome.value = "";
            inEmail.value = "";
            render(lista);
        }
    };
}
// Pesquisa
(_a = document.getElementById("pesquisa")) === null || _a === void 0 ? void 0 : _a.addEventListener("input", function (e) {
    var txt = e.target.value.toLowerCase();
    render(lista.filter(function (u) { return u.nome.toLowerCase().indexOf(txt) !== -1; }));
});
// Filtros
document.getElementById("btnFiltrar").onclick = function () { return render(lista.filter(function (u) { return u.ativo; })); };
document.getElementById("btnTodos").onclick = function () { return render(lista); };
document.getElementById("btnOrdenar").onclick = function () {
    lista.sort(function (a, b) { return a.nome.localeCompare(b.nome); });
    render(lista);
};
carregarDadosIniciais();
render(lista);
