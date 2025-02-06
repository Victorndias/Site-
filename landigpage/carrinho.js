let carrinho = [];

//código responsável pelo funcionamento do carrinho//
function adicionarAoCarrinho(nomeProduto, precoProduto) {
    const produto = produtos.find(p => p.nome === nomeProduto);

    if (!produto) {
        console.error("Produto não encontrado no array de produtos.");
        return;
    }

    carrinho.push({ nome: produto.nome, preco: produto.preco, imagem: produto.imagem });
    atualizarCarrinho();
}

function atualizarCarrinho() {
    document.getElementById("total-items").textContent = carrinho.length;
}

function abrirCarrinho() {
    const modal = document.getElementById("modal-carrinho");
    const listaItens = document.getElementById("itens-carrinho");
    listaItens.innerHTML = "";

    let total = 0;

    carrinho.forEach(produto => {
        const item = document.createElement("li");
        item.classList.add("flex", "items-center", "justify-between", "border-b", "py-2");

        const imagem = document.createElement("img");
        imagem.src = produto.imagem;
        imagem.alt = produto.nome;
        imagem.classList.add("w-12", "h-12", "rounded", "mr-2");

        const detalhes = document.createElement("div");
        detalhes.innerHTML = `<p class="text-sm">${produto.nome}</p><p class="text-gray-600 text-sm">R$ ${produto.preco.toFixed(2)}</p>`;

        item.appendChild(imagem);
        item.appendChild(detalhes);
        listaItens.appendChild(item);
        total += produto.preco;
    });

    modal.classList.remove("hidden");
}

function fecharCarrinho() {
    document.getElementById("modal-carrinho").classList.add("hidden");
}

function finalizarCompra() {
    alert("Compra finalizada com sucesso!");
    carrinho = [];
    atualizarCarrinho();
    fecharCarrinho();
}
