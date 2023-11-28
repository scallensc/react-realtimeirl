import valueFormatter from "@functions/valueFormatter";

import flagStore from "@store/flagStore"
import globalStore from "@store/globalStore"

const Altitude = () => {
  const { showAltitude, useImperial } = flagStore.get();
  const { altitude } = globalStore.get();

  const { metric, imperial } = valueFormatter('altitude', altitude['EGM96'])

  return (
    <div className="altitude-text" style={{ display: showAltitude ? '' : 'none' }}>
      Altitude: {useImperial ? imperial : metric}
    </div>
  )
}

export default Altitude