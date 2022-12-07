import FavoriteIcon from '@material-ui/icons/Favorite';
import { HealthCheckRating } from '../types';
import { assertNever } from '../utils';

const HealthStatusIcon = ({ status }: { status: HealthCheckRating }) => {
  const getColor = (): string => {
    switch (status) {
      case HealthCheckRating.Healthy:
        return 'green';
      case HealthCheckRating.LowRisk:
        return 'yellow';
      case HealthCheckRating.HighRisk:
        return 'orange';
      case HealthCheckRating.CriticalRisk:
        return 'red';
      default:
        return assertNever(status);
    }
  };
  const color = getColor();

  return <FavoriteIcon style={{ color: color }} />;
};

export default HealthStatusIcon;
