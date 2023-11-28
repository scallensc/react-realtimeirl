import Altitude from '@components/Metrics/Altitude';
import Distance from '@components/Metrics/Distance';
import Heading from '@components/Metrics/Heading'
import Heartrate from '@components/Metrics/Heartrate';
import Speed from '@components/Metrics/Speed';

import flagStore from '@store/flagStore';

import './Metrics.scss';

const OtherMetrics = () => {
  const { showMetrics } = flagStore.get();

  return (
    <div className="metrics-container" style={{ display: showMetrics ? '' : 'none' }}>
      <Heading />
      <Heartrate />
      <Altitude />
      <Speed />
      <Distance />
    </div>
  );
};

export default OtherMetrics;
