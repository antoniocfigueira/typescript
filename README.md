# Projeto de Gestão de Tarefas e Utilizadores

Este repositório contém dois projetos práticos desenvolvidos em **TypeScript** e **Tailwind CSS**: 
1. **Task Manager**: Gestor de tarefas com categorias e prazos.
2. **User Manager**: Painel de administração de utilizadores com estatísticas em tempo real.

---

## Autor
António Figueira

---

## 🔗 Repositório GitHub
* **Link:** (https://github.com/antoniocfigueira/typescript)

---

## 🚀 Como Executar
Siga os passos abaixo para correr a página localmente:

1.  **Clonar o repositório:**
    ```bash
    git clone https://github.com/antoniocfigueira/typescript
    ```
2.  **Abrir a pasta do projeto:** Navegue até à pasta onde os ficheiros foram descarregados.
3.  **Executar o HTML:** * Como o projeto utiliza **Tailwind CSS via CDN** e o TypeScript compilado para **main.js**, basta abrir o ficheiro `index.html` em qualquer navegador.

---

## 💡 Principais Decisões e Justificação

Para o desenvolvimento destes projetos, foram tomadas decisões estratégicas para garantir a escalabilidade e a robustez do código:

### 1. Programação Orientada a Objetos (Classes e Interfaces)
Utilizei **Interfaces** para definir o contrato de dados (IDs, nomes, estados) e **Classes** para o comportamento dos objetos (por ex ex: o método `toggleEstado`). 
* **Justificação:** Isto garante que a estrutura de dados é consistente e permite que cada objeto saiba gerir o seu próprio estado, facilitando a manutenção do código.

### 2. Gestão de Estado com Renderização Dinâmica
O projeto utiliza uma função `render()`. Sempre que o array de dados é alterado, a função limpa o DOM e reconstrói a interface.
* **Justificação:** Esta abordagem é mais fiável do que manipulações isoladas, pois garante que a interface visual está sempre sincronizada.

### 3. Utilização de Métodos de Array de Alta Ordem
Recorri a métodos como `.filter()` (para pesquisa e remoção) e `.sort()` (para ordenação alfabética).
* **Justificação:** Estes métodos são performantes e permitem manipular informação de forma limpa.

### 4. Interface com Tailwind CSS
Optei por um design **"utility-first"** com Tailwind para criar uma interface responsiva, minimalista e com feedback visual
* **Justificação:** O uso do Tailwind permitiu focar o tempo de desenvolvimento na lógica do TypeScript, garantindo ao mesmo tempo um aspeto visual moderno.

### 5. Controlo de Propagação de Eventos
Implementação de `stopPropagation()` nos botões de ação dentro dos cartões.
* **Justificação:** Impedede que o clique num botão de "desativar" ativasse acidentalmente o clique do cartão de detalhes.