import { Dispatch, SetStateAction, useState } from 'react';
import { useApiValidation } from '../hooks/useApiValidation';
import Form from '../components/form';

type SetStatus = Dispatch<SetStateAction<
  "INITIAL" | "SEND_DATA" | "SENDING_DATA"
  | "DATA_SENDED" | "ERROR_SENDING_DATA">>;

export function CheckName() {
  const [value, setValue] = useState<string>('');

  // Validate the name, and expose the status and data
  const { status = 'INITIAL', data, setStatus } = useApiValidation(
    'http://localhost:3001/info/validate', { name: value }
  );

  return (
    <Form status={status} data={data} setStatus={setStatus as SetStatus}>
      <h2>Inserisci il nome</h2>
      <input type="text" placeholder="Nome" className="input-field"
        value={value} onChange={(e) => {setValue(e.target.value);}}>
      </input>
      <button className="button" onClick={() => setStatus('SEND_DATA')}>
        VALIDA
      </button>
    </Form>
  );
}
