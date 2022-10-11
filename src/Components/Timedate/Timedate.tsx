import { stateContext } from 'Contexts/StateContext';
import { useContext } from 'react';

import './Timedate.scss';

const Timedate = () => {
  const [state] = useContext(stateContext);
  return (
    <div className="time-container">
      {[...state.datetime].map((char, i) =>
        char === ':' ? (
          char
        ) : (
          <div className={`time ${i}`} key={i}>
            {char}
          </div>
        )
      )}
    </div>
  );
};

export default Timedate;
