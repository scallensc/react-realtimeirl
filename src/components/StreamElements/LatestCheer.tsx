import globalStore from "@store/globalStore";

const LatestCheer = () => {
  const value = globalStore.streamElements['cheer-latest'].get();

  return (
    <div className="latest-cheer">
      {value && (
        <>
          <div className="se-heading">Latest Cheer:</div>
          <div className="latest-cheer-data">
            {value.name && `${value.name} - ${value.amount} bits`}
          </div>
        </>
      )}
      <br />
    </div>
  );
};

export default LatestCheer;
