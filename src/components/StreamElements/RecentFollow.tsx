import globalStore from "@store/globalStore";

interface IFollowProps {
  name: string;
}

const RecentFollow = () => {
  const value = globalStore.streamElements['follower-recent'].get();

  return (
    <div className="recent-follow">
      <div className="se-heading">Recent Followers:</div>
      <div className="recent-follow-data">
        {value.map(
          (follow: IFollowProps, index: number) => {
            if (index > 0 && index <= 4) {
              return (
                <div className="recent-follows" key={`FOLLOW-${follow['name']}-${index}`}>
                  {follow['name'] && follow['name']}
                </div>
              );
            } else return null;
          }
        )}
      </div>
    </div>
  );
};

export default RecentFollow;
