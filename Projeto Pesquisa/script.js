function searchWikipedia() {
    const query = document.getElementById('query').value;
    const url = `https://pt.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${encodeURIComponent(query)}`;
  
    fetch(url) // comentario: fetch(url): Envia uma requisição HTTP para a URL especificada e retorna uma Promise que se resolve com a resposta.
      .then(response => response.json()) // comentario then(response => response.json()): Converte a resposta da API para JSON.
      .then(data => {    //then(data => {: Passa os dados JSON para a função de callback.
        const resultsDiv = document.getElementById('results'); //  comentario: Obtém o elemento div com o ID results, onde os resultados serão exibidos.
        resultsDiv.innerHTML = ''; // '';: Limpa qualquer conteúdo anterior dentro do div de resultados.

        data.query.search.forEach(result => { 
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';

            const title = document.createElement('h3');
            title.innerText = result.title;
  
            const snippet = document.createElement('p');
            snippet.innerHTML = result.snippet + '...';

            const link = document.createElement('a');
            link.href = `https://pt.wikipedia.org/wiki/${encodeURIComponent(result.title)}`;
            link.target = '_blank';
            link.innerText = 'Leia mais';
  
            resultDiv.appendChild(title);
            resultDiv.appendChild(snippet);
            resultDiv.appendChild(link);
  
            resultsDiv.appendChild(resultDiv);
        });
      })
      .catch(error => console.error('Erro ao buscar na Wikipedia:', error));
  }
  