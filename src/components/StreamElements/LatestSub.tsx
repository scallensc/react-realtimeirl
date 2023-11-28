import globalStore from "@store/globalStore";

const tier: { [key: string]: string } = {
  '1000': 'Tier 1',
  '2000': 'Tier 2',
  '3000': 'Tier 3',
  prime: 'Prime',
  '': 'Tier 0'
};

const LatestSub = () => {
  const value = globalStore.streamElements['subscriber-latest'].get();
  return (
    <div className="latest-sub">
      <div className="se-heading">Latest Sub:</div>
      {value && (
        <div className="latest-sub-data">
          {value.name && `${value.name} - ${value.amount} ${value.amount > 1 ? 'months' : 'month'} - (${tier[value['tier']]})`}
        </div>
      )}
      <br />
    </div>
  );
};

export default LatestSub;
