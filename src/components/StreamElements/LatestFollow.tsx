import globalStore from "@store/globalStore";

const LatestFollow = () => {
  const value = globalStore.streamElements['follower-latest'].get();
  return (
    <div className="latest-follow">
      <div className="se-heading">Latest Follow:</div>
      {value && (
        <div className="latest-follow-data">
          {value.name && `${value.name}`}
        </div>
      )}
      <br />
    </div>
  );
};

export default LatestFollow;
