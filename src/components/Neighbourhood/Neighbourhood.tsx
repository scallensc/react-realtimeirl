import { useSpring, animated } from 'react-spring';

import isJapanese from '@functions/isJapanese';

import handleSpringProps from '@handlers/handleSpringProps';
import flagStore from '@store/flagStore';
import globalStore from '@store/globalStore';
import triggerStore from '@store/triggerStore';

import './Neighbourhood.scss';

const Neighbourhood = () => {
  const { disableAnimation } = flagStore.get();
  const { neighbourhood } = globalStore.get();
  const { show } = triggerStore.neighbourhood.get();

  const neighbourhoodProps = useSpring(handleSpringProps('neighbourhood', show));

  const renderWithMixedFonts = (text) => {
    return text.split(/(\s+)/).map((word, index) => {
      const style = isJapanese(word) ? { fontFamily: "'Hiragino Kaku Gothic Pro', sans-serif" } : { fontFamily: "'Blinker', sans-serif" };
      return <span key={index} style={style}>{word}</span>;
    });
  };

  const content = neighbourhood || 'Locating...';
  const styledText = renderWithMixedFonts(content);

  if (disableAnimation) {
    return (
      <div className="neighbourhood-container">
        <div className="neighbourhood"><hr />{styledText}<hr /></div>
      </div>
    );
  } else {
    return (
      <animated.div className="neighbourhood-container" style={neighbourhoodProps}>
        <div className="neighbourhood"><hr />{styledText}<hr /></div>
      </animated.div>
    );
  }
};

export default Neighbourhood;
