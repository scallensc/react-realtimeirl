import globalStore from "@store/globalStore";

const LatestTip = () => {
  const value = globalStore.streamElements['tip-latest'].get();

  return (
    <div className="latest-tip">
      {value && (
        <>
          <div className="se-heading">Latest Tip:</div>
          <div className="latest-tip-data">
            {value.name && `${value.name} - $${value.amount.toFixed(2)} `}
          </div>
        </>
      )}
      <br />
    </div>
  );
};

export default LatestTip;
