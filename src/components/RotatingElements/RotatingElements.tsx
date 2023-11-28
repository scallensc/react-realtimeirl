import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const RotatingElements = ({ elements, intervalTime = 10000 }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % elements.length);
        setVisible(true);
      }, 500); // Change element after fade out
    }, intervalTime);
    return () => clearInterval(interval);
  }, [elements.length, intervalTime]);

  const fade = useSpring({
    opacity: visible ? 1 : 0,
    config: { duration: 500 },
  });

  return (
    <div>
      <animated.div style={fade}>
        {elements[index]}
      </animated.div>
    </div>
  );
};

export default RotatingElements;
