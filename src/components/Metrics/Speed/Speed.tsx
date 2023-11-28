import flagStore from "@store/flagStore"
import globalStore from "@store/globalStore"

import valueFormatter from "@functions/valueFormatter";

const Speed = () => {
  const { showSpeed, useImperial } = flagStore.get();
  const { speed } = globalStore.get();
  const { metric, imperial } = valueFormatter('speed', speed)
  return (
    <div className="speed-text" style={{ display: showSpeed ? '' : 'none' }}>
      Speed: {useImperial ? imperial : metric}
    </div>
  )
}

export default Speed