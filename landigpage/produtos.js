const produtos = [
    { nome: "Lenço Umedecido", preco: 8, imagem: "imagens/lenço.jpg" },
    { nome: "Esponja Para Base", preco: 4, imagem: "imagens/produto1.jpeg" },
    { nome: "Rímel", preco: 10, imagem: "imagens/produto2.jpg" },
    { nome: "Água Micelar", preco: 12, imagem: "imagens/aguamicelar.jpg" },
    { nome: "Batom", preco: 15, imagem: "imagens/batom.png" },
    { nome: "Sabonete", preco: 15, imagem: "imagens/sabonete.jpeg" },
    { nome: "Sérum", preco: 15, imagem: "imagens/serum.jpeg" },
    { nome: "Gloss", preco: 12, imagem: "imagens/gloss.jpeg" },
    { nome: "Mascara Facial", preco: 2, imagem: "imagens/mascarafacil.jpeg" },
    { nome: "Pó Compacto", preco: 15, imagem: "imagens/po.jpeg" },
    { nome: "Lápis de Olho", preco: 12, imagem: "imagens/lapis.jpeg" },
    { nome: "Delineador", preco: 2, imagem: "imagens/delineador.jpg" }
];

// Variável para controlar quantos produtos estão sendo exibidos
let produtosExibidos = 8;

function carregarProdutos(termoBusca = "", mostrarTodos = false) {
    const listaProdutos = document.getElementById("lista-produtos");
    const botaoVerMais = document.getElementById("btn-ver-mais");

    if (!listaProdutos) {
        console.error("Elemento lista-produtos não encontrado.");
        return;
    }

    listaProdutos.innerHTML = "";

    const produtosFiltrados = termoBusca
        ? produtos.filter(produto => produto.nome.toLowerCase().includes(termoBusca.toLowerCase()))
        : produtos;

    // Define quantos produtos exibir
    const limite = mostrarTodos ? produtosFiltrados.length : produtosExibidos;

    produtosFiltrados.slice(0, limite).forEach(produto => {
        const produtoHTML = `
    <div class="bg-purple-300 p-4 rounded-lg shadow hover:scale-105 transition-transform">
        <img src="${produto.imagem}" alt="${produto.nome}" class="w-full rounded">
        <h2 class="text-lg font-bold mt-2">${produto.nome}</h2>
        <p class="text-gray-600">R$ ${produto.preco.toFixed(2)}</p>
        <div class="flex justify-center mt-3 space-x-2">
            <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-purple-800"
                onclick="comprarProduto('${produto.nome}', ${produto.preco})">
                COMPRAR
            </button>
            <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-purple-800 flex items-center gap-2"
                onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco})">
                <img src="imagens/carrinho.png" alt="Carrinho" class="w-6 h-6">+
            </button>
        </div>
    </div>
`;
        listaProdutos.innerHTML += produtoHTML;
    });

    // Se já mostrou todos os produtos, oculta o botão "Ver mais"
    if (limite >= produtosFiltrados.length) {
        botaoVerMais.classList.add("hidden");
    } else {
        botaoVerMais.classList.remove("hidden");
    }
}

// Função para exibir todos os produtos
function mostrarMaisProdutos() {
    carregarProdutos("", true);
}

// Chama os produtos ao carregar a página
window.onload = function () {
    carregarProdutos();
};

document.getElementById("search-input").addEventListener("input", function () {
    carregarProdutos(this.value);
});