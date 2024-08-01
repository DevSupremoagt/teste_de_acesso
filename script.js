let cart = {};

// Função para adicionar produtos ao carrinho
function addToList(product) {
    if (cart[product]) {
        cart[product]++;
    } else {
        cart[product] = 1;
    }
    updateCart();
    alert(`${product} adicionado ao carrinho!`);
}

// Função para atualizar a exibição do carrinho
function updateCart() {
    const cartElement = document.getElementById('cart');
   // cartElement.innerHTML = ''; // Limpa o carrinho

    for (const product in cart) {
        if (cart.hasOwnProperty(product)) {
            const li = document.createElement('li');
            li.textContent = `${product} - ${cart[product]} `;
            cartElement.appendChild(li);
        }
    }
}

// Função para gerar e baixar o arquivo TXT com os itens do carrinho
document.getElementById('generateTxtButton').addEventListener('click', function() {
    if (Object.keys(cart).length === 0) {
        alert('O carrinho está vazio.');
        return;
    }

    let txtContent = 'Itens no carrinho:\n\n';
    for (const product in cart) {
        if (cart.hasOwnProperty(product)) {
            txtContent += `${product} - ${cart[product]} \n`;
        }
    }

    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'carrinho.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Função para enviar a lista pelo WhatsApp
document.getElementById('sendButton').addEventListener('click', function() {
    if (Object.keys(cart).length === 0) {
        alert('O carrinho está vazio.');
        return;
    }

    let message = 'Itens selecionados:\n';
    for (const product in cart) {
        if (cart.hasOwnProperty(product)) {
            message += `${product} - ${cart[product]} \n`;
        }
    }

    let encodedMessage = encodeURIComponent(message);
    let url = `https://wa.me/${5583993535222}?text=${encodedMessage}`;
    window.open(url, '_blank');
});
