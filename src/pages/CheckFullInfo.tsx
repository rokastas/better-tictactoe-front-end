import { useEffect, useState } from 'react';
import { BaseResponse } from '../interfaces';

export function CheckFullInfo() {
  const [status, setStatus] = useState<'INITIAL' | 'SEND_DATA' | 'SENDING_DATA' | 'DATA_SENDED' | 'ERROR_SENDING_DATA'>();
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
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
      <div>
        <h1>ERRORE INVIO DATI</h1>
        <button onClick={() => setStatus('INITIAL')}>RIPROVA</button>
      </div>
    );
  }

  if(status === 'SEND_DATA' || status === 'SENDING_DATA') {
    return (
      <div>
        <h1>INVIO IN CORSO</h1>
        <button onClick={() => setStatus('INITIAL')}>ANNULLA</button>
      </div>
    );
  }

  if(status === 'DATA_SENDED') {
    return (<div>
        {data?.success === true && <h1>DATI INVIATI VALIDI</h1>}
        {data?.success === false && <h1>DATI INVIATI NON VALIDI</h1>}
        <button onClick={() => setStatus('INITIAL')}>INVIA UN ALTRO VALORE</button>
    </div>)
  }

  return (
    <div>
      <h2>INSERISCI IL NOME</h2>
      <input type="text" value={name} onChange={(e) => {
        setName(e.target.value);
      }}></input>
      <h2>INSERISCI L'ETÀ</h2>
      <input type="number" value={age} onChange={(e) => {
        setAge(Number(e.target.value));
      }}></input>
      <h2>SELEZIONA LO STATO CIVILE</h2>
      <select value={maritalStatus} onChange={(e) => {
        setMaritalStatus(e.target.value)
      }}>
        <option value="">Seleziona...</option>
        <option value="single">Celibe / Nubile</option>
        <option value="married">Coniugato/a</option>
        <option value="divorced">Divorziato/a</option>
        <option value="widowed">Vedovo/a</option>
      </select>
      <h2>INSERISCI LA DATA DI NASCITA</h2>
      <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}></input>
      <button onClick={() => setStatus('SEND_DATA')}>VALIDA</button>
    </div>
  );
}
