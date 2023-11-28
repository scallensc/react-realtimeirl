import valueFormatter from "@functions/valueFormatter";

import flagStore from "@store/flagStore"
import globalStore from "@store/globalStore"

const Distance = () => {
  const { showDistance, useImperial } = flagStore.get();
  const { totalDistance } = globalStore.get();

  const { metric, imperial } = valueFormatter('distance', totalDistance)

  return (
    <div className="distance-text" style={{ display: showDistance ? '' : 'none' }}>
      Distance: {useImperial ? imperial : metric}
    </div>
  )
}

export default Distance