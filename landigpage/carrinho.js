let carrinho = [];

function adicionarAoCarrinho(nomeProduto, precoProduto, imagemProduto) {
    const produto = { nome: nomeProduto, preco: precoProduto, imagem: imagemProduto };
    carrinho.push(produto);
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

    const totalElemento = document.createElement("p");
    totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
    totalElemento.classList.add("font-bold", "mt-4");
    listaItens.appendChild(totalElemento);

    modal.classList.remove("hidden");
    modal.classList.add("scale-100", "opacity-100");
}

function fecharCarrinho() {
    const modal = document.getElementById("modal-carrinho");
    modal.classList.add("hidden");
    modal.classList.remove("scale-100", "opacity-100");
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.");
        return;
    }

    let mensagem = "Olá, gostaria de finalizar a compra desses produtos:\n";
    
    carrinho.forEach(produto => {
        mensagem += `- ${produto.nome} (R$ ${produto.preco.toFixed(2)})\n`;
    });

    mensagem += "\nQuais são as formas de pagamento disponíveis?";
    
    let mensagemCodificada = encodeURIComponent(mensagem);
    let numeroWhatsApp = "5584996667324";
    let url = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

    window.location.href = url;
}

function WhatsAppcontado() {
    let numeroWhatsApp = "5584996667324";
    let url = `https://wa.me/${numeroWhatsApp}`;

    window.location.href = url;
}
