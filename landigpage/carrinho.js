let carrinho = [];

function adicionarAoCarrinho(nomeProduto, precoProduto) {
  const produto = produtos.find(p => p.nome === nomeProduto);
  if (!produto) {
    console.error("Produto não encontrado no array de produtos.");
    return;
  }
  carrinho.push({ nome: produto.nome, preco: produto.preco, imagem: produto.imagem });
  atualizarCarrinho();

  let aviso = document.getElementById("aviso-carrinho");
  if (!aviso) {
    console.error("Elemento 'aviso-carrinho' não encontrado.");
    return;
  }
  console.log("Antes de remover hidden, aviso:", aviso);

  aviso.textContent = `"${nomeProduto}" foi adicionado ao carrinho!`;
  aviso.classList.remove("hidden");
  aviso.style.display = "block"; // Força exibição para teste

  setTimeout(() => {
    aviso.style.display = "none";
}, 3000);

}


function atualizarCarrinho() {
  document.getElementById("total-items").textContent = carrinho.length;
}

function abrirCarrinho() {
  const modal = document.getElementById("modal-carrinho");
  const listaItens = document.getElementById("itens-carrinho");
  listaItens.innerHTML = ""; // Limpa a lista de itens do carrinho

  let total = 0;

  carrinho.forEach(produto => {
    const item = document.createElement("li");
    item.classList.add("flex", "items-center", "justify-between", "border-b", "py-2");
    
    const imagem = document.createElement("img");
    imagem.src = produto.imagem;
    imagem.alt = produto.nome;
    imagem.classList.add("w-12", "h-12", "rounded", "mr-2");
    
    const detalhes = document.createElement("div");
    detalhes.innerHTML = `<p class="text-sm">${produto.nome}</p>
                          <p class="text-gray-600 text-sm">R$ ${produto.preco.toFixed(2)}</p>`;
    
    item.appendChild(imagem);
    item.appendChild(detalhes);
    listaItens.appendChild(item);
    
    total += produto.preco; // Acumula o valor total
  });

  // Cria e adiciona o elemento que exibe o valor total
  const totalElemento = document.createElement("p");
  totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
  totalElemento.classList.add("font-bold", "mt-2", "text-center");
  listaItens.appendChild(totalElemento);

  // Exibe o modal do carrinho
  modal.classList.remove("hidden");
}

function fecharCarrinho() {
  document.getElementById("modal-carrinho").classList.add("hidden");
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  
  let mensagem = "Olá, gostaria de finalizar a compra dos seguintes produtos:\n\n";
  let total = 0;
  
  carrinho.forEach(produto => {
    mensagem += `- ${produto.nome} (R$ ${produto.preco.toFixed(2)})\n`;
    total += produto.preco;
  });
  
  mensagem += `\nTotal: R$ ${total.toFixed(2)}\n\n`;
  mensagem += "Quais são as formas de pagamento disponíveis?";
  
  // Codifica a mensagem para a URL
  const url = `https://wa.me/5584996667324?text=${encodeURIComponent(mensagem)}`;
  
  // Redireciona para o WhatsApp com a mensagem pré-preenchida
  window.location.href = url;
}

// Função para redirecionar para o WhatsApp para comprar um único produto
function comprarProduto(nome, preco) {
  const mensagem = `Olá, gostaria de comprar o produto ${nome} por R$ ${preco.toFixed(2)}.`;
  const url = `https://wa.me/5584996667324?text=${encodeURIComponent(mensagem)}`;
  window.location.href = url;
}
