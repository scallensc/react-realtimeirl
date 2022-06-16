import { useContext, useEffect, useState } from 'react';
import { stateContext } from 'Contexts/StateContext';

import { Transition } from 'react-transition-group';
import { useSpring, animated } from 'react-spring';

import isEmpty from 'Functions/isEmpty';

import './Neighbourhood.scss';

const Neighbourhood = () => {
  const [state] = useContext(stateContext);

  const [show, setShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [counter, setCounter] = useState(0);
  const [pendingVisible, setPendingVisible] = useState(false);

  const springConfig = { mass: 4, tension: 400, friction: 80, velocity: 10 };
  const neighbourhoodProps = useSpring({
    config: springConfig,
    transform: show ? `translate(0px, 0px)` : `translate(0px, -100px)`,
    from: {
      transform: show ? 'translate(-100px, 0px)' : 'translate(0px, 0px)',
    },
  });

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(0);
    }
    if (!timeLeft) return;
    const interval = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft > 10) {
      setCounter(0);
    } else if (timeLeft <= 10 && timeLeft > 5) {
      setCounter(1);
    } else {
      setCounter(2);
    }
  }, [timeLeft, counter]);

  useEffect(() => {
    if (!pendingVisible) {
      if (!timeLeft && !pendingVisible) {
        setPendingVisible(true);
        setTimeLeft(15);
      }
    }
  }, [pendingVisible, timeLeft]);

  useEffect(() => {
    if (pendingVisible && !timeLeft) {
      setPendingVisible(true);
      setShow(true);
      setTimeLeft(30);
    }
  }, [pendingVisible, timeLeft]);

  useEffect(() => {
    if (pendingVisible && show && !timeLeft) {
      setPendingVisible(false);
      setShow(false);
      setTimeLeft(0);
    }
  }, [pendingVisible, show, timeLeft]);

  return (
    <Transition
      timeout={1000}
      mountOnEnter
      unmountOnExit
      in={show && !isEmpty(state.locationData)}
    >
      <animated.div
        className="neighbourhood-container"
        style={neighbourhoodProps}
      >
        <div className="neighbourhood">
          <hr />
          {state.neighbourhood || 'Locating...'}
          <hr />
        </div>
      </animated.div>
    </Transition>
  );
};

export default Neighbourhood;
