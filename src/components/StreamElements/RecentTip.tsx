import globalStore from "@store/globalStore";

interface ITipProps {
  amount: number;
  name: string;
}

const RecentTip = () => {
  const value: ITipProps[] = globalStore.streamElements['tip-recent'].get();
  return (
    <div className="recent-tip">
      {value && (
        <>
          <div className="se-heading">Recent Tips:</div>
          <div className="recent-tip-data">
            {value.map(
              (tip: ITipProps, index: number) => {
                if (index > 0 && index <= 4) {
                  return (
                    <div key={index}>
                      {tip.name && `${tip.name} - $${tip.amount.toFixed(2)} `}
                    </div>
                  );
                } else return null;
              }
            )}
          </div>
        </>
      )}
      <br />
    </div>
  );
};

export default RecentTip;
