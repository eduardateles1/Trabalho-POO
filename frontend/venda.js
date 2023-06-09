async function consultaProdutos() {
  try {
    const response = await fetch('http://localhost:3333/produtos');
    const produtos = await response.json();

    let options = '';
    produtos.forEach((produto) => {
      options += `<option value="${produto.id}">${produto.nome}</option>`;
    });

    const idSelecionado = document.getElementById('idSelecionado');
    if (idSelecionado instanceof HTMLSelectElement) {
      idSelecionado.innerHTML = options;
    }
  } catch (error) {
    alert('Erro ao consultar produtos');
  }
}
async function recuperaQtde() {
  const idSelecionadoElement = document.getElementById("idSelecionado");
  if (idSelecionadoElement instanceof HTMLSelectElement) {
    const idSelecionado = idSelecionadoElement.value;
    const mensagem = await fetch(`http://localhost:3333/mensagem/${idSelecionado}`)
      .then(resp => {
        return resp.json();
      })
      .catch(error => {
        alert('Problema na consulta');
      });

    const disponivelElement = document.getElementById("disponivel");
    if (disponivelElement) {
      disponivelElement.innerHTML = mensagem.likes;
    }
  }
}

async function vender() {
  const idSelecionadoElement = document.getElementById("idSelecionado");
  const quantityElement = document.getElementById("quantity");

  if (idSelecionadoElement instanceof HTMLSelectElement && quantityElement instanceof HTMLInputElement) {
    const id = idSelecionadoElement.value;
    const quantity = Number(quantityElement.value);
    const envia = { id, quantity };

    const resp = await fetch('http://localhost:3333/mensagem/venda', {
      method: 'PATCH',
      body: JSON.stringify(envia),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then(resp => {
        return resp.json();
      });

    alert(resp.status);
  }
}
