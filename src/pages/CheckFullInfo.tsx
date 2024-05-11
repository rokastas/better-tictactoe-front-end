import { useEffect, useState } from 'react';
import { BaseResponse } from '../interfaces';
import '../App.css';

export function CheckFullInfo() {
  const [status, setStatus] = useState<'INITIAL' | 'SEND_DATA' | 'SENDING_DATA' | 'DATA_SENDED' | 'ERROR_SENDING_DATA'>();
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>();
  const [maritalStatus, setMaritalStatus] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [data , setData] = useState<BaseResponse>();

  useEffect(() => {
    if(status === 'SEND_DATA') {
      setStatus('SENDING_DATA');
      fetch('http://localhost:3001/info/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nameLong: name,
          age: age,
          maritalStatus: maritalStatus,
          dateOfBirth: dateOfBirth,
        })
      })
      .then((rawResponse) => {
        if([200, 201].includes(rawResponse.status)) {
          return rawResponse.json();
        } else {
          throw new Error();
        }
      })
      .then((response: BaseResponse) => {
        setStatus('DATA_SENDED');
        setData(response);
      })
      .catch(e => {
        setStatus('ERROR_SENDING_DATA');
      })
    }
  }, [status, name, age, maritalStatus, dateOfBirth]);

  if (status === 'ERROR_SENDING_DATA') {
    return (
      <div className="form-container">
        <h1>ERRORE INVIO DATI</h1>
        <button className="button" onClick={() => setStatus('INITIAL')}>RIPROVA</button>
      </div>
    );
  }

  if(status === 'SEND_DATA' || status === 'SENDING_DATA') {
    return (
      <div className="form-container">
        <h1>INVIO IN CORSO</h1>
        <button className="button" onClick={() => setStatus('INITIAL')}>ANNULLA</button>
      </div>
    );
  }

  if(status === 'DATA_SENDED') {
    return (<div className="form-container">
        {data?.success === true && <h1>DATI INVIATI VALIDI</h1>}
        {data?.success === false && <h1>DATI INVIATI NON VALIDI</h1>}
        <button className="button" onClick={() => setStatus('INITIAL')}>INVIA UN ALTRO VALORE</button>
    </div>)
  }

  return (
    <div className="form-container">
      <h2>Inserisci il nome</h2>
      <input type="text" placeholder="Nome" className="input-field" value={name} onChange={(e) => {
        setName(e.target.value);}}>
      </input>
      <h2>Inserisci l'età</h2>
      <input type="number" placeholder="0" className="input-field" value={age} onChange={(e) => {
        setAge(Number(e.target.value));}}>
      </input>
      <h2>Seleziona lo stato civile</h2>
      <select value={maritalStatus} className="input-field" onChange={(e) => {
        setMaritalStatus(e.target.value)
      }}>
        <option value="" className="placeholder-text">Seleziona...</option>
        <option value="single">Celibe / Nubile</option>
        <option value="married">Coniugato/a</option>
        <option value="divorced">Divorziato/a</option>
        <option value="widowed">Vedovo/a</option>
      </select>
      <h2>Inserisci la data di nascita</h2>
      <input type="date" className="input-field" value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}>
      </input>
      <button className="button" onClick={() => setStatus('SEND_DATA')}>
        VALIDA
      </button>
    </div>
  );
}
