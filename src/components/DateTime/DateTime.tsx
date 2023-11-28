import { ReactFitty } from 'react-fitty';

import './DateTime.scss';
import globalStore from '@store/globalStore';

const DateTime = () => {
  const dateTime = globalStore.get().dateTime;
  return (
    <div className="time-container">
      <ReactFitty className="time">{dateTime}</ReactFitty>
    </div>
  );
};

export default DateTime;
