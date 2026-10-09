let rubrica = {
    contatti: [
        { nome: 'Nicola', telefono: '3331111111' },
        { nome: 'Lorenzo', telefono: '3332222222' },
        { nome: 'Paola', telefono: '3333333333' },
        { nome: 'Jenny', telefono: '3334444444' }
    ],

    aggiungiContatto: function (nome, telefono) {
        this.contatti.push({ nome: nome, telefono: telefono });
    },

    eliminaContatto: function (indice) {
        this.contatti.splice(indice, 1);
    },

    modificaContatto: function (indice, nome, telefono) {
        this.contatti[indice].nome = nome;
        this.contatti[indice].telefono = telefono;
    }
};

let formContatto = document.querySelector('#formContatto');
let inputNome = document.querySelector('#nome');
let inputTelefono = document.querySelector('#telefono');
let btnSalva = document.querySelector('#btnSalva');
let btnMostra = document.querySelector('#btnMostra');
let contenitoreTabella = document.querySelector('#contenitoreTabella');
let corpoTabella = document.querySelector('#corpoTabella');

let indiceInModifica = null;

function mostraContatti() {
    corpoTabella.innerHTML = '';

    rubrica.contatti.forEach((contatto, indice) => {
        let riga = document.createElement('tr');

        let cellaNome = document.createElement('td');
        cellaNome.textContent = contatto.nome;

        let cellaTelefono = document.createElement('td');
        cellaTelefono.textContent = contatto.telefono;

        let cellaAzioni = document.createElement('td');

        let btnModifica = document.createElement('button');
        btnModifica.type = 'button';
        btnModifica.textContent = 'Modifica';
        btnModifica.addEventListener('click', () => {
            inputNome.value = contatto.nome;
            inputTelefono.value = contatto.telefono;
            indiceInModifica = indice;
            btnSalva.textContent = 'Salva modifiche';
            inputNome.focus();
        });

        let btnElimina = document.createElement('button');
        btnElimina.type = 'button';
        btnElimina.textContent = 'Elimina';
        btnElimina.addEventListener('click', () => {
            rubrica.eliminaContatto(indice);
            annullaModifica();
            mostraContatti();
        });

        cellaAzioni.appendChild(btnModifica);
        cellaAzioni.appendChild(btnElimina);

        riga.appendChild(cellaNome);
        riga.appendChild(cellaTelefono);
        riga.appendChild(cellaAzioni);

        corpoTabella.appendChild(riga);
    });
}

function annullaModifica() {
    indiceInModifica = null;
    btnSalva.textContent = 'Aggiungi contatto';
    inputNome.value = '';
    inputTelefono.value = '';
}

formContatto.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let nome = inputNome.value.trim();
    let telefono = inputTelefono.value.trim();

    if (nome === '' || telefono === '') {
        alert('Inserisci sia il nome sia il telefono.');
        return;
    }

    if (indiceInModifica === null) {
        rubrica.aggiungiContatto(nome, telefono);
    } else {
        rubrica.modificaContatto(indiceInModifica, nome, telefono);
    }

    annullaModifica();
    mostraContatti();
});

btnMostra.addEventListener('click', () => {
    let nascosto = contenitoreTabella.classList.toggle('nascosto');

    btnMostra.textContent = nascosto ? 'Mostra contatti' : 'Nascondi contatti';
    btnMostra.setAttribute('aria-expanded', !nascosto);
});

mostraContatti();
