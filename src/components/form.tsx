// Form component is used in the CheckName and CheckFullInfo pages

import FormStatusMessage from "./formStatusMessage";

const Form: React.FC<any> = ({ children, status, data, setStatus }) => {
  if (status === 'ERROR_SENDING_DATA' || status === 'DATA_SENDED' || status === 'SENDING_DATA' ) {
    return <FormStatusMessage status={status} data={data} setStatus={setStatus} />;
  }

  return (
    <div className="form-container">
      {children}
    </div>
  );
};

export default Form;
