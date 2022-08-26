import * as React from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import { useState } from 'react';
import api from './services/api';

function App() {

  const[inputCep, setInputCep] = useState('');
  const[dataCep, setDataCep] = useState({});

  async function handlerSearch(){
    if(inputCep === ''){
      alert("Digite um valor");
      return;
    }

    try {
      const response = await api.get(`${inputCep}/json`);
      setDataCep(response.data);
      setInputCep("");
      console.log(response.data);
    } catch {
      alert("Erro ao buscar o cep!!");
      setInputCep("");
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Buscador de CEP</h1>
      <div className="containerInput">
        <input 
        type="text" 
        placeholder="Digite se CEP..."
        value={inputCep}
        onChange={(e) => setInputCep(e.target.value)}/>
        <button className="buttonSearch" onClick={handlerSearch}>
          <FiSearch size={25} color="FFF"/>
        </button>
      </div>

    {Object.keys(dataCep).length > 0 && (
      <main className='main'>
        <h2>CEP - {dataCep.cep}</h2>
        <span>Rua {dataCep.logradouro}</span>
        {Object.keys(dataCep.complemento).length > 0 && (
          <span>Complemento: {dataCep.complemento}</span>
        )}
        <span>BAIRRO: {dataCep.bairro}</span>
        <span>{dataCep.localidade} - {dataCep.uf}</span>
       </main>
    )}
    </div>
  );
}

export default App;
