async function cadastrarMensagem() {
  const idInput = document.getElementById("id");
  const tituloInput = document.getElementById("titulo");
  const conteudoInput = document.getElementById("conteudo");
  const publicadoInput = document.getElementById("publicado");
  const qtdLikesInput = document.getElementById("qtdLikes");

  if (
    idInput instanceof HTMLInputElement &&
    tituloInput instanceof HTMLInputElement &&
    conteudoInput instanceof HTMLInputElement &&
    publicadoInput instanceof HTMLInputElement &&
    qtdLikesInput instanceof HTMLInputElement &&
    idInput.value.trim() !== "" // Verifica se o campo "id" não está vazio após remover espaços em branco
  ) {
    const id = idInput.value.trim(); // Obtém o valor do campo "id" após remover espaços em branco
    const titulo = tituloInput.value;
    const conteudo = conteudoInput.value;
    const publicado = publicadoInput.checked;
    const qtdLikes = parseInt(qtdLikesInput.value) || 0;

    let metodo;
    let url;
    if (id) {
      metodo = 'PUT';
      url = `http://localhost:3333/mensagens/${id}`;
      idInput.value = '';
    } else {
      metodo = 'POST';
      url = `http://localhost:3333/mensagens`;
    }

    try {
      const mensagem = {
        titulo,
        conteudo,
        publicado,
        qtdLikes,
      };
  
      const response = await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensagem),
      });
  
      if (response.ok) {
        alert('Mensagem cadastrada/atualizada com sucesso');
      } else {
        alert('Problema no cadastro/atualização da mensagem');
      }
    } catch (error) {
      alert('Problema no cadastro/atualização da mensagem');
    }

    cadastrarMensagem();
  }
}

