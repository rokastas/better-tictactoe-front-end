import { BaseResponse } from '../interfaces';

interface FormStatusMessageProps {
  status: 'INITIAL' | 'SEND_DATA' | 'SENDING_DATA' | 'DATA_SENDED' | 'ERROR_SENDING_DATA';
  data?: BaseResponse | null;
  setStatus: React.Dispatch<React.SetStateAction<'INITIAL' | 'SEND_DATA' | 'SENDING_DATA' | 'DATA_SENDED' | 'ERROR_SENDING_DATA'>>;
}

function FormStatusMessage({ status, data, setStatus }: FormStatusMessageProps) {
  if (status === 'ERROR_SENDING_DATA') {
    return (
      <div className="form-container">
        <h1>ERRORE INVIO DATI</h1>
        <button className="button" onClick={() => setStatus('INITIAL')}>RIPROVA</button>
      </div>
    );
  }

  if (status === 'SEND_DATA' || status === 'SENDING_DATA') {
    return (
      <div className="form-container">
        <h1>INVIO IN CORSO</h1>
        <button className="button" onClick={() => setStatus('INITIAL')}>ANNULLA</button>
      </div>
    );
  }

  if (status === 'DATA_SENDED') {
    return (
      <div className="form-container">
        {data?.success === true && <h1>DATI INVIATI VALIDI</h1>}
        {data?.success === false && <h1>DATI INVIATI NON VALIDI</h1>}
        <button className="button" onClick={() => setStatus('INITIAL')}>INVIA UN ALTRO VALORE</button>
      </div>
    );
  }

  return null;
}

export default FormStatusMessage;
