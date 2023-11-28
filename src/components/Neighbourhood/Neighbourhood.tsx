import { useSpring, animated } from 'react-spring';

import handleSpringProps from '@handlers/handleSpringProps';

import flagStore from '@store/flagStore';
import globalStore from '@store/globalStore';
import triggerStore from '@store/triggerStore';

import './Neighbourhood.scss';

const Neighbourhood = () => {
  const { disableAnimation } = flagStore.get();
  const { neighbourhood } = globalStore.get();
  const { show } = triggerStore.neighbourhood.get();

  const neighbourhoodProps = useSpring(handleSpringProps('neighbourhood', show))

  if (disableAnimation) {
    return (
      <div className="neighbourhood-container">
        <div className="neighbourhood"><hr />{neighbourhood || 'Locating...'}<hr /></div>
      </div>
    );
  } else {
    return (
      <animated.div className="neighbourhood-container" style={neighbourhoodProps}>
        <div className="neighbourhood"><hr />{neighbourhood || 'Locating...'}<hr /></div>
      </animated.div>
    );
  }
};

export default Neighbourhood;