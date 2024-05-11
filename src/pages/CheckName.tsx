import { Dispatch, SetStateAction, useState } from 'react';
import { useApiValidation } from '../hooks/useApiValidation';
import FormStatusMessage from '../components/formStatusMessage';
import '../App.css';

type SetStatus = Dispatch<SetStateAction<
  "INITIAL" | "SEND_DATA" | "SENDING_DATA"
  | "DATA_SENDED" | "ERROR_SENDING_DATA">>;

export function CheckName() {
  const [value, setValue] = useState<string>('');

  // Validate the name, and expose the status and data
  const { status = 'INITIAL', data, setStatus } = useApiValidation(
    'http://localhost:3001/info/validate', { name: value }
  );

  if (status === 'ERROR_SENDING_DATA' || status === 'DATA_SENDED' || status === 'SENDING_DATA' ) {
    return <FormStatusMessage status={status} data={data} setStatus={setStatus as SetStatus} />;
  } else {
    return (
      <div className="form-container">
        <h2>Inserisci il nome</h2>
        <input type="text" placeholder="Nome" className="input-field"
          value={value} onChange={(e) => {setValue(e.target.value);}}>
        </input>
        <button className="button" onClick={() => setStatus('SEND_DATA')}>
          VALIDA
        </button>
      </div>
    );
  }
}
