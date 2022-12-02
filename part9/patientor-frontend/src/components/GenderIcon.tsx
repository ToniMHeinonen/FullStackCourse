import { ReactElement } from 'react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const GenderIcon = ({ gender }: { gender: string }): ReactElement | null => {
  let icon: ReactElement | null = null;

  if (gender === 'male') icon = <MaleIcon />;
  else if (gender === 'female') icon = <FemaleIcon />;

  return icon;
};

export default GenderIcon;
