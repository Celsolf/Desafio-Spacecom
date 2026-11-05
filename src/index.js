const fs = require('fs');

const pessoas = [];
const grupos = new Map();
const encontros = [];

function agrupador(grupos,pessoas) {
  for (let i = 0; i < pessoas.length; i++) {
  if(!grupos.has(pessoas[i].timestamp)){
    grupos.set(pessoas[i].timestamp, []);
  }
  grupos.get(pessoas[i].timestamp).push(pessoas[i]);
}
}

function calculos(grupos){

  grupos.forEach(function(value) {

    for (let i = 0; i < value.length - 1; i++) {
      for (let j = i + 1; j < value.length; j++) {
const ladelta = (value[j].latitude-value[i].latitude)* Math.PI / 180;
const lodelta = (value[j].longitude-value[i].longitude)* Math.PI / 180;
const a = Math.pow(Math.sin(ladelta/2), 2) + Math.cos(value[i].latitude* Math.PI / 180) * Math.cos(value[j].latitude* Math.PI / 180) * Math.pow(Math.sin(lodelta/2), 2)
const d = 2 * 6371000 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

if (d < 20) {
   const encontro ={
    tipo: "generico",
    monitoradosEncontro: [
      value[i].id,
      value[j].id
    ],
    timestamp: value[i].timestamp,
    posicoes: {
      [value[i].id]: {
        lat: value[i].latitude,
        lon: value[i].longitude
      },
      [value[j].id]: {
        lat: value[j].latitude,
        lon: value[j].longitude  
      }
    },
    distanciaMetros: d
  }
  if (value[i].faccao !== null && value[j].faccao !== null) {
    if (value[i].faccao === value[j].faccao) {
      encontro.tipo = "faccao";
    }
  } if ((value[i].medidaProtetiva && value[i].idsRestricaoMedida === value[j].id)||(value[j].medidaProtetiva && value[j].idsRestricaoMedida === value[i].id)) {
      encontro.tipo = "protetiva";
  }

  encontros.push(encontro);
}
}}}
)}

function escritor(encontros) {
  const json = JSON.stringify(encontros, null, 2);
  fs.writeFileSync('encontros7.json', json);}

function processarLinha(linha) {

       if (!linha.trim()) return;

      const campos = linha.split(";");
      const pessoa = {
        id: Number(campos[0]),
        faccao: Number(campos[1]),
        timestamp: campos[2].replace(/['"]/g, ''),
        latitude: parseFloat(campos[3]),
        longitude: parseFloat(campos[4]),
        medidaProtetiva: campos[5],
        idsRestricaoMedida: Number(campos[6].replace(/['"]/g, ''))
    };
      if (!pessoa.faccao) {
        pessoa.faccao = null; 
  }
      if (pessoa.idsRestricaoMedida == 0) {
        pessoa.idsRestricaoMedida = null; 
  }
    let boolean = (pessoa.medidaProtetiva === "true" )
    pessoa.medidaProtetiva = boolean;
    pessoas.push(pessoa);

}

function main(){ 
  
    const data = fs.createReadStream('./datasets/dataset7.txt', {encoding: 'utf8'});
    let primeiraLinha = true;

    let resto = '';
    data.on('data', (chunk) => {
    const linhas = (resto + chunk).split(/\r?\n/);

    resto = linhas.pop();

    for (const linha of linhas) {
          if (primeiraLinha) {
        primeiraLinha = false;
        continue;
    }
        processarLinha(linha);
    }
});

data.on('end', () => {
    if (resto.trim() && !primeiraLinha) {
        processarLinha(resto);
    }

    agrupador(grupos, pessoas);
    calculos(grupos);
    escritor(encontros);
});

data.on('error', (err) => {
    console.error(err);
});
}

main();