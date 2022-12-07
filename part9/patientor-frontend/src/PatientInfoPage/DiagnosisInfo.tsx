import { ReactElement } from 'react';
import { useStateValue } from '../state';

const DiagnosisInfo = ({ code }: { code: string }): ReactElement => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div>
      {code} {diagnoses[code].name}
    </div>
  );
};

export default DiagnosisInfo;
