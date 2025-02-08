const produtos = [
    { nome: "Lenço Umedecido", preco: 8, imagem: "imagens/lenço.jpg" },
    { nome: "Esponja Para Base", preco: 4, imagem: "imagens/produto1.jpeg" },
    { nome: "Rímel", preco: 10, imagem: "imagens/produto2.jpg" },
    { nome: "Água Micelar", preco: 12, imagem: "imagens/aguamicelar.jpg" },
    { nome: "Batom", preco: 15, imagem: "imagens/batom.png" },
    { nome: "Sabonete", preco: 15, imagem: "imagens/sabonete.jpeg" }
];
    //código responsável pelos produtos//
function carregarProdutos(termoBusca = "") {
    const listaProdutos = document.getElementById("lista-produtos");

    if (!listaProdutos) {
        console.error("Elemento lista-produtos não encontrado.");
        return;
    }  

    listaProdutos.innerHTML = "";

    const produtosFiltrados = termoBusca 
        ? produtos.filter(produto => produto.nome.toLowerCase().includes(termoBusca.toLowerCase()))
        : produtos;

        produtosFiltrados.forEach(produto => {
            const produtoHTML = `
                <div class="bg-purple-300 p-4 rounded-lg shadow hover:scale-105 transition-transform">
                 <img src="${produto.imagem}" alt="${produto.nome}" class="w-full rounded">
                 <h2 class="text-lg font-bold mt-2">${produto.nome}</h2>
                <p class="text-gray-600">R$ ${produto.preco.toFixed(2)}</p>
                <!-- Container para os botões com alinhamento central e espaçamento reduzido -->
                <div class="flex justify-center mt-3 space-x-2">
                <!-- Botão para comprar via WhatsApp (fica à esquerda) -->
                <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-pink-600"
            onclick="comprarProduto('${produto.nome}', ${produto.preco})">
            COMPRAR
                 </button>
                <!-- Botão para adicionar ao carrinho (fica à direita) -->
                <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-pink-600 flex items-center gap-2"
            onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco})">
                 <img src="imagens/carrinho.png" alt="Carrinho" class="w-6 h-6">+
             </button>
            </div>
        </div>
            `;
            listaProdutos.innerHTML += produtoHTML;
        });        
}

window.onload = function() {
    carregarProdutos();
};

document.getElementById("search-input").addEventListener("input", function() {
    carregarProdutos(this.value);
});