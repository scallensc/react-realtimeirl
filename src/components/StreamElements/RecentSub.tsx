import globalStore from "@store/globalStore";

interface ISubProps {
  name: string;
  amount: number;
  tier: string;
}

const tier: { [key: string]: string } = {
  '1000': 'Tier 1',
  '2000': 'Tier 2',
  '3000': 'Tier 3',
  prime: 'Prime',
  '': 'Tier 0'
};

const RecentSub = () => {
  const value = globalStore.streamElements['subscriber-recent'].get() as ISubProps[];

  return (
    <div className="recent-sub">
      <div className="se-heading">Recent Subs:</div>
      <div className="recent-sub-data">
        {value.map((sub, index) => {
          if (index < 5) {
            return (
              <div className="recent-subs" key={`SUB-${sub.name}-${index}`}>
                {sub.name && `${sub.name} - ${sub.amount} ${sub.amount > 1 ? 'months' : 'month'} - (${tier[sub.tier]})`}
              </div>
            );
          } else return null;
        })}
      </div>
      <br />
    </div>
  );
};

export default RecentSub;
