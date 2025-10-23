import flagStore from "@store/flagStore"
import globalStore from "@store/globalStore"

const Heartrate = () => {
  const { heartRate } = globalStore.get();
  const { showHeartrate } = flagStore.get();
  return (
    <div className="heart-text" style={{ display: showHeartrate ? '' : 'none' }}>{`Heartrate: ${heartRate} bpm`}</div>
  )
}

export default Heartrate
