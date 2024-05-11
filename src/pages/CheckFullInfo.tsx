import { Dispatch, SetStateAction, useState } from 'react';
import { useApiValidation } from '../hooks/useApiValidation';
import FormStatusMessage from '../components/formStatusMessage';
import '../App.css';

type SetStatus = Dispatch<SetStateAction<
  "INITIAL" | "SEND_DATA" | "SENDING_DATA"
  | "DATA_SENDED" | "ERROR_SENDING_DATA">>;

export function CheckFullInfo() {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>();
  const [maritalStatus, setMaritalStatus] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');

  // Validate the name, and expose the status and data
  const { status = 'INITIAL', data, setStatus } = useApiValidation(
    'http://localhost:3001/info/validate', { nameLong: name, age, maritalStatus, dateOfBirth }
  );

  if (status === 'ERROR_SENDING_DATA' || status === 'DATA_SENDED' || status === 'SENDING_DATA' ) {
    return <FormStatusMessage status={status} data={data} setStatus={setStatus as SetStatus} />;
  } else {
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
}
