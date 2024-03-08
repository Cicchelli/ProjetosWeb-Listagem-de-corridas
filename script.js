// Função para obter as corridas
async function obterCorridas() {
    // Aqui você deve implementar a lógica para obter as corridas dos sites mencionados
    // Por enquanto, vamos usar um exemplo estático
    return [
      { nome: "Corrida 1", link: "https://www.corrida1.com", data: "2024-03-15", distancia: "5km", tipo: "Rua", local: "Pouso Alegre", valor: "50,00" },
      { nome: "Corrida 2", link: "https://www.corrida2.com", data: "2024-03-20", distancia: "10km", tipo: "Trail", local: "Pouso Alegre", valor: "60,00" },
      { nome: "Corrida 3", link: "https://www.corrida3.com", data: "2024-04-05", distancia: "21km", tipo: "Rua", local: "Camanducaia", valor: "70,00" },
      { nome: "Corrida 4", link: "https://www.corrida4.com", data: "2024-04-10", distancia: "42km", tipo: "Trail", local: "Itajubá", valor: "80,00" }
    ];
  }
  
  // Função para exibir as corridas na página
  function mostrarCorridas(corridas) {
    const corridasDiv = document.getElementById('corridas');
    corridasDiv.innerHTML = '';
  
    corridas.forEach(corrida => {
      const corridaHTML = `
        <div class="corrida">
          <h2><a href="${corrida.link}">${corrida.nome}</a></h2>
          <p><strong>Data:</strong> ${corrida.data}</p>
          <p><strong>Distância:</strong> ${corrida.distancia}</p>
          <p><strong>Tipo:</strong> ${corrida.tipo}</p>
          <p><strong>Local:</strong> ${corrida.local}</p>
          <p><strong>Valor da Inscrição:</strong> R$ ${corrida.valor}</p>
        </div>
      `;
      corridasDiv.innerHTML += corridaHTML;
    });
  }
  
  // Função para filtrar as corridas
  async function filtrarCorridas() {
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    const distancia = document.getElementById('distancia').value;
    const tipo = document.getElementById('tipo').value;
    const local = document.getElementById('local').value;
  
    // Obter todas as corridas
    let corridas = await obterCorridas();
  
    // Aplicar filtros
    if (dataInicio && dataFim) {
      corridas = corridas.filter(corrida => corrida.data >= dataInicio && corrida.data <= dataFim);
    }
    if (distancia) {
      corridas = corridas.filter(corrida => corrida.distancia === distancia);
    }
    if (tipo) {
      corridas = corridas.filter(corrida => corrida.tipo === tipo);
    }
    if (local) {
      corridas = corridas.filter(corrida => corrida.local.toLowerCase().includes(local.toLowerCase()));
    }
  
    mostrarCorridas(corridas);
  }
  
  // Mostrar todas as corridas inicialmente
  filtrarCorridas();
  