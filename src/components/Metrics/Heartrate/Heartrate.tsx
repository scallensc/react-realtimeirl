import flagStore from "@store/flagStore"
import globalStore from "@store/globalStore"

const Heartrate = () => {
  const { showHeartrate } = flagStore.get();
  const { heartRate } = globalStore.get();
  return (
    <div className="heart-text" style={{ display: showHeartrate ? '' : 'none' }}>{heartRate === 0 ? `Heartrate: ${heartRate} bpm` : ''}</div>
  )
}

export default Heartrate
