import { useSpring, animated } from 'react-spring';

import RotatingElements from '@components/RotatingElements';
import StreamElements from '@components/StreamElements';
import Weather from '@components/Weather';

import flagStore from '@store/flagStore';
import triggerStore from '@store/triggerStore';

import './Rotator.scss';
import handleSpringProps from '@handlers/handleSpringProps';

const Rotator = () => {
  const { disableAnimation, streamElementsSubscribed } = flagStore.get()
  const { show } = triggerStore.rotator.get()

  const rotatorProps = useSpring(handleSpringProps('rotator', show))

  const components = [<Weather />, <StreamElements />]

  if (disableAnimation) {
    return (
      <div className='rotator-container'>
        {streamElementsSubscribed
          ? <RotatingElements elements={components} intervalTime={60000} />
          : <Weather />
        }
      </div>
    )
  } else return (
    <animated.div className='rotator-container' style={rotatorProps}>
      {streamElementsSubscribed
        ? <RotatingElements elements={components} intervalTime={60000} />
        : <Weather />
      }
    </animated.div>
  );
};

export default Rotator;
