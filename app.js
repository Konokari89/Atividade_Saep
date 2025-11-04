
const API_URL = 'http://127.0.0.1:8000/api/';

// Elementos DOM
const veiculosList = document.getElementById('veiculos-list');
const btnListar = document.getElementById('btn-listar');
const veiculoForm = document.getElementById('veiculo-form');
const formTitle = document.getElementById('form-title');
const btnSalvar = document.getElementById('btn-salvar');
const btnCancelar = document.getElementById('btn-cancelar');
const placaInput = document.getElementById('placa');
const marcaInput = document.getElementById('marca');
const modeloInput = document.getElementById('modelo');
const quilometragemInput = document.getElementById('quilometragem');
const veiculoIdInput = document.getElementById('veiculo-id');

// Listar veículos
async function listarVeiculos() {
    veiculosList.innerHTML = '<li>Carregando...</li>';
    try {
        const response = await fetch(API_URL + 'veiculos/');
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        const data = await response.json();
        veiculosList.innerHTML = '';
        if (data.length === 0) {
            veiculosList.innerHTML = '<li>Nenhum veículo cadastrado.</li>';
            return;
        }
        data.forEach(veiculo => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${veiculo.placa}</strong> | ${veiculo.marca} ${veiculo.modelo} | ${veiculo.quilometragem} km`
                + `<span class="veiculo-actions">
                    <button class="edit" onclick="editarVeiculo('${veiculo.placa}', '${veiculo.marca}', '${veiculo.modelo}', ${veiculo.quilometragem})">Editar</button>
                    <button onclick="deletarVeiculoFront('${veiculo.placa}')">Deletar</button>
                </span>`;
            veiculosList.appendChild(li);
        });
    } catch (error) {
        veiculosList.innerHTML = '<li>Erro ao carregar veículos.</li>';
        console.error('Erro ao listar veículos:', error);
    }
}

// Adicionar veículo
async function adicionarVeiculo(veiculo) {
    try {
        const response = await fetch(API_URL + 'veiculos/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(veiculo),
        });
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        await response.json();
        listarVeiculos();
    } catch (error) {
        alert('Erro ao adicionar veículo!');
        console.error(error);
    }
}

// Atualizar veículo
async function atualizarVeiculo(id, veiculo) {
    try {
        const response = await fetch(`${API_URL}veiculos/${id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(veiculo),
        });
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        await response.json();
        listarVeiculos();
    } catch (error) {
        alert('Erro ao atualizar veículo!');
        console.error(error);
    }
}

// Deletar veículo
async function deletarVeiculoFront(id) {
    if (!confirm('Tem certeza que deseja deletar este veículo?')) return;
    try {
        const response = await fetch(`${API_URL}veiculos/${id}/`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        listarVeiculos();
    } catch (error) {
        alert('Erro ao deletar veículo!');
        console.error(error);
    }
}

// Editar veículo (preenche o formulário)
window.editarVeiculo = function(id, marca, modelo, ano) {
    veiculoIdInput.value = id;
    placaInput.value = id;
    marcaInput.value = marca;
    modeloInput.value = modelo;
    quilometragemInput.value = ano;
    formTitle.textContent = 'Editar Veículo';
    btnCancelar.style.display = 'inline-block';
}

// Cancelar edição
btnCancelar.addEventListener('click', function() {
    veiculoForm.reset();
    veiculoIdInput.value = '';
    formTitle.textContent = 'Adicionar Veículo';
    btnCancelar.style.display = 'none';
});

// Submissão do formulário
veiculoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const veiculo = {
        placa: placaInput.value,
        marca: marcaInput.value,
        modelo: modeloInput.value,
        quilometragem: parseFloat(quilometragemInput.value)
    };
    const id = veiculoIdInput.value;
    if (id) {
        atualizarVeiculo(id, veiculo);
    } else {
        adicionarVeiculo(veiculo);
    }
    veiculoForm.reset();
    veiculoIdInput.value = '';
    formTitle.textContent = 'Adicionar Veículo';
    btnCancelar.style.display = 'none';
});

// Botão de listar
btnListar.addEventListener('click', listarVeiculos);

// Usuários
const usuariosList = document.getElementById('usuarios-list');
const btnListarUsuarios = document.getElementById('btn-listar-usuarios');
const usuarioForm = document.getElementById('usuario-form');
const btnSalvarUsuario = document.getElementById('btn-salvar-usuario');
const btnCancelarUsuario = document.getElementById('btn-cancelar-usuario');
const usuarioIdInput = document.getElementById('usuario-id');
const usuarioNomeInput = document.getElementById('usuario-nome');
const usuarioCpfInput = document.getElementById('usuario-cpf');
const usuarioSenhaInput = document.getElementById('usuario-senha');
const usuarioTipoInput = document.getElementById('usuario-tipo');

async function listarUsuarios() {
    usuariosList.innerHTML = '<li>Carregando...</li>';
    try {
            const response = await fetch(API_URL + 'viagens_realizadas/');
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        const data = await response.json();
        usuariosList.innerHTML = '';
        if (data.length === 0) {
            usuariosList.innerHTML = '<li>Nenhum usuário cadastrado.</li>';
            return;
        }
        data.forEach(usuario => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${usuario.nome}</strong> | CPF: ${usuario.cpf} | Tipo: ${usuario.tipo}`
                + `<span class="veiculo-actions">
                    <button class="edit" onclick="editarUsuario(${usuario.id_usuario}, '${usuario.nome}', '${usuario.cpf}', '', '${usuario.tipo}')">Editar</button>
                    <button onclick="deletarUsuarioFront(${usuario.id_usuario})">Deletar</button>
                </span>`;
            usuariosList.appendChild(li);
        });
    } catch (error) {
        usuariosList.innerHTML = '<li>Erro ao carregar usuários.</li>';
        console.error('Erro ao listar usuários:', error);
    }
}

async function adicionarUsuario(usuario) {
    try {
        const response = await fetch(API_URL + 'usuarios/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario),
        });
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        await response.json();
        listarUsuarios();
    } catch (error) {
        alert('Erro ao adicionar usuário!');
        console.error(error);
    }
}

async function atualizarUsuario(id, usuario) {
    try {
        const response = await fetch(`${API_URL}usuarios/${id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario),
        });
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        await response.json();
        listarUsuarios();
    } catch (error) {
        alert('Erro ao atualizar usuário!');
        console.error(error);
    }
}

async function deletarUsuarioFront(id) {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return;
    try {
        const response = await fetch(`${API_URL}usuarios/${id}/`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        listarUsuarios();
    } catch (error) {
        alert('Erro ao deletar usuário!');
        console.error(error);
    }
}

window.editarUsuario = function(id, nome, cpf, senha, tipo) {
    usuarioIdInput.value = id;
    usuarioNomeInput.value = nome;
    usuarioCpfInput.value = cpf;
    usuarioSenhaInput.value = '';
    usuarioTipoInput.value = tipo;
    btnCancelarUsuario.style.display = 'inline-block';
}

btnCancelarUsuario.addEventListener('click', function() {
    usuarioForm.reset();
    usuarioIdInput.value = '';
    btnCancelarUsuario.style.display = 'none';
});

usuarioForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const usuario = {
        nome: usuarioNomeInput.value,
        cpf: usuarioCpfInput.value,
        senha: usuarioSenhaInput.value,
        tipo: usuarioTipoInput.value
    };
    const id = usuarioIdInput.value;
    if (id) {
        atualizarUsuario(id, usuario);
    } else {
        adicionarUsuario(usuario);
    }
    usuarioForm.reset();
    usuarioIdInput.value = '';
    btnCancelarUsuario.style.display = 'none';
});

btnListarUsuarios.addEventListener('click', listarUsuarios);

// Manutenções
const manutencoesList = document.getElementById('manutencoes-list');
const btnListarManutencoes = document.getElementById('btn-listar-manutencoes');
const manutencaoForm = document.getElementById('manutencao-form');
const btnSalvarManutencao = document.getElementById('btn-salvar-manutencao');
const btnCancelarManutencao = document.getElementById('btn-cancelar-manutencao');
const manutencaoIdInput = document.getElementById('manutencao-id');
const manutencaoTipoInput = document.getElementById('manutencao-tipo');
const manutencaoCustoInput = document.getElementById('manutencao-custo');
const manutencaoDiaHoraInput = document.getElementById('manutencao-dia_hora');

async function listarManutencoes() {
    manutencoesList.innerHTML = '<li>Carregando...</li>';
    try {
        const response = await fetch(API_URL + 'manutencoes/');
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        const data = await response.json();
        manutencoesList.innerHTML = '';
        if (data.length === 0) {
            manutencoesList.innerHTML = '<li>Nenhuma manutenção cadastrada.</li>';
            return;
        }
        data.forEach(manutencao => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${manutencao.tipo}</strong> | Custo: R$${manutencao.custo} | Data/Hora: ${manutencao.dia_hora}`
                + `<span class="veiculo-actions">
                    <button class="edit" onclick="editarManutencao(${manutencao.id_manutencao}, '${manutencao.tipo}', ${manutencao.custo}, '${manutencao.dia_hora}')">Editar</button>
                    <button onclick="deletarManutencaoFront(${manutencao.id_manutencao})">Deletar</button>
                </span>`;
            manutencoesList.appendChild(li);
        });
    } catch (error) {
        manutencoesList.innerHTML = '<li>Erro ao carregar manutenções.</li>';
        console.error('Erro ao listar manutenções:', error);
    }
}

async function adicionarManutencao(manutencao) {
    try {
        const response = await fetch(API_URL + 'manutencoes/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(manutencao),
        });
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        await response.json();
        listarManutencoes();
    } catch (error) {
        alert('Erro ao adicionar manutenção!');
        console.error(error);
    }
}

async function atualizarManutencao(id, manutencao) {
    try {
        const response = await fetch(`${API_URL}manutencoes/${id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(manutencao),
        });
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        await response.json();
        listarManutencoes();
    } catch (error) {
        alert('Erro ao atualizar manutenção!');
        console.error(error);
    }
}

async function deletarManutencaoFront(id) {
    if (!confirm('Tem certeza que deseja deletar esta manutenção?')) return;
    try {
        const response = await fetch(`${API_URL}manutencoes/${id}/`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        listarManutencoes();
    } catch (error) {
        alert('Erro ao deletar manutenção!');
        console.error(error);
    }
}

window.editarManutencao = function(id, tipo, custo, dia_hora) {
    manutencaoIdInput.value = id;
    manutencaoTipoInput.value = tipo;
    manutencaoCustoInput.value = custo;
    manutencaoDiaHoraInput.value = dia_hora.replace(' ', 'T');
    btnCancelarManutencao.style.display = 'inline-block';
}

btnCancelarManutencao.addEventListener('click', function() {
    manutencaoForm.reset();
    manutencaoIdInput.value = '';
    btnCancelarManutencao.style.display = 'none';
});

manutencaoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const manutencao = {
        tipo: manutencaoTipoInput.value,
        custo: parseFloat(manutencaoCustoInput.value),
        dia_hora: manutencaoDiaHoraInput.value.replace('T', ' ')
    };
    const id = manutencaoIdInput.value;
    if (id) {
        atualizarManutencao(id, manutencao);
    } else {
        adicionarManutencao(manutencao);
    }
    manutencaoForm.reset();
    manutencaoIdInput.value = '';
    btnCancelarManutencao.style.display = 'none';
});

btnListarManutencoes.addEventListener('click', listarManutencoes);

// Viagens Realizadas
const viagensList = document.getElementById('viagens-list');
const btnListarViagens = document.getElementById('btn-listar-viagens');
const viagemForm = document.getElementById('viagem-form');
const viagemDataHoraInput = document.getElementById('viagem-data_hora');
const viagemOrigemInput = document.getElementById('viagem-origem');
const viagemDestinoInput = document.getElementById('viagem-destino');
const viagemPlacaInput = document.getElementById('viagem-placa');
const viagemIdUsuarioInput = document.getElementById('viagem-id_usuario');

async function listarViagens() {
    viagensList.innerHTML = '<li>Carregando...</li>';
    try {
        const response = await fetch(API_URL + 'viagens_realizadas/');
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        const data = await response.json();
        viagensList.innerHTML = '';
        if (data.length === 0) {
            viagensList.innerHTML = '<li>Nenhuma viagem cadastrada.</li>';
            return;
        }
        data.forEach(viagem => {
            const li = document.createElement('li');
            li.innerHTML = `Data/Hora: ${viagem.data_hora} | Origem: ${viagem.origem} | Destino: ${viagem.destino} | Placa: ${viagem.placa} | Usuário: ${viagem.id_usuario}`;
            viagensList.appendChild(li);
        });
    } catch (error) {
        viagensList.innerHTML = '<li>Erro ao carregar viagens.</li>';
        console.error('Erro ao listar viagens:', error);
    }
}

async function adicionarViagem(viagem) {
    try {
            const response = await fetch(API_URL + 'viagens_realizadas/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(viagem),
        });
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        await response.json();
        listarViagens();
    } catch (error) {
        alert('Erro ao adicionar viagem!');
        console.error(error);
    }
}

viagemForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const viagem = {
        data_hora: viagemDataHoraInput.value.replace('T', ' '),
        origem: viagemOrigemInput.value,
        destino: viagemDestinoInput.value,
        placa: viagemPlacaInput.value,
        id_usuario: parseInt(viagemIdUsuarioInput.value)
    };
    adicionarViagem(viagem);
    viagemForm.reset();
});

btnListarViagens.addEventListener('click', listarViagens);

// Manutenções Realizadas
const manutencoesRealizadasList = document.getElementById('manutencoes-realizadas-list');
const btnListarManutencoesRealizadas = document.getElementById('btn-listar-manutencoes-realizadas');
const manutencaoRealizadaForm = document.getElementById('manutencao-realizada-form');
const manutencaoRealizadaPlacaInput = document.getElementById('manutencao-realizada-placa');
const manutencaoRealizadaIdManutencaoInput = document.getElementById('manutencao-realizada-id_manutencao');

async function listarManutencoesRealizadas() {
    manutencoesRealizadasList.innerHTML = '<li>Carregando...</li>';
    try {
        const response = await fetch(API_URL + 'manutencoes_realizadas/');
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        const data = await response.json();
        manutencoesRealizadasList.innerHTML = '';
        if (data.length === 0) {
            manutencoesRealizadasList.innerHTML = '<li>Nenhuma manutenção realizada cadastrada.</li>';
            return;
        }
        data.forEach(mr => {
            const li = document.createElement('li');
            li.innerHTML = `Placa: ${mr.placa} | ID Manutenção: ${mr.id_manutencao}`;
            manutencoesRealizadasList.appendChild(li);
        });
    } catch (error) {
        manutencoesRealizadasList.innerHTML = '<li>Erro ao carregar manutenções realizadas.</li>';
        console.error('Erro ao listar manutenções realizadas:', error);
    }
}

async function adicionarManutencaoRealizada(mr) {
    try {
        const response = await fetch(API_URL + 'manutencoes_realizadas/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mr),
        });
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        await response.json();
        listarManutencoesRealizadas();
    } catch (error) {
        alert('Erro ao adicionar manutenção realizada!');
        console.error(error);
    }
}

manutencaoRealizadaForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mr = {
        placa: manutencaoRealizadaPlacaInput.value,
        id_manutencao: parseInt(manutencaoRealizadaIdManutencaoInput.value)
    };
    adicionarManutencaoRealizada(mr);
    manutencaoRealizadaForm.reset();
});

btnListarManutencoesRealizadas.addEventListener('click', listarManutencoesRealizadas);

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    listarVeiculos();
    listarUsuarios();
    listarManutencoes();
    listarViagens();
    listarManutencoesRealizadas();
});