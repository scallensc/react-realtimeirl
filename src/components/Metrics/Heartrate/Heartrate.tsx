import flagStore from "@store/flagStore"
import globalStore from "@store/globalStore"

const Heartrate = () => {
  const { showHeartrate } = flagStore.get();
  const { heartrate } = globalStore.get();
  return (
    <div className="heart-text" style={{ display: showHeartrate ? '' : 'none' }}>{heartrate === 0 ? `Heartrate: ${heartrate} bpm` : ''}</div>
  )
}

export default Heartrate
