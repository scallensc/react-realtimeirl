import flagStore from "@store/flagStore";
import globalStore from "@store/globalStore";

const Heading = () => {
  const { heading } = globalStore.get();
  const { showHeading } = flagStore.get();

  const compass = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const cardinal = compass[(((heading + 22.5) % 360) / 45) | 0];

  return (
    <div className="heading-text" style={{ display: showHeading ? '' : 'none' }}>Heading:&nbsp;
      <span className="heading-cardinal">{cardinal}&nbsp;</span>
      <span className="heading-degrees">{heading}&deg;</span>
    </div>
  )
}

export default Heading