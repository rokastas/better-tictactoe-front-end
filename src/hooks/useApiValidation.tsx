import { useEffect, useState } from 'react';
import { BaseResponse } from '../interfaces';

export function useApiValidation(endpoint: string, requestData: object) {
  const [status, setStatus] = useState<'INITIAL' | 'SEND_DATA' | 'SENDING_DATA' | 'DATA_SENDED' | 'ERROR_SENDING_DATA'>();
  const [data, setData] = useState<BaseResponse>();

  useEffect(() => {
    if (status === 'SEND_DATA') {
      setStatus('SENDING_DATA');
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
        .then((rawResponse) => {
          if ([200, 201].includes(rawResponse.status)) {
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
  }, [status, endpoint, requestData]);

  return { status, data, setStatus };
}
