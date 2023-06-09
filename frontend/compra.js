async function consultaMensagens() {
  try {
    const response = await fetch('http://localhost:3333/mensagens');
    const mensagens = await response.json();

    let options = '';
    mensagens.forEach((mensagem) => {
      options += `<option value="${mensagem.id}">${mensagem.titulo}</option>`;
    });

    const idSelecionado = document.getElementById('idSelecionado');
    if (idSelecionado instanceof HTMLSelectElement) {
      idSelecionado.innerHTML = options;
    }
  } catch (error) {
    alert('Erro ao consultar mensagens');
  }
}

async function aumentarLikes() {
  const idSelecionado = document.getElementById('idSelecionado');
  const quantityInput = document.getElementById('quantity');

  if (!(idSelecionado instanceof HTMLSelectElement) || !(quantityInput instanceof HTMLInputElement)) {
    alert('Erro: Elementos não encontrados');
    return;
  }

  const id = idSelecionado.value;
  const quantity = Number(quantityInput.value);
  const body = { id, quantity };

  const response = await fetch('http://localhost:3333/mensagem/likes', {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  const mensagemAtualizada = await response.json();

  if (response.ok) {
    alert(`Likes atualizados com sucesso. A nova quantidade é ${mensagemAtualizada.qtdLikes}`);
  } else {
    alert('Erro ao atualizar os likes');
  }
}
