import LatestCheer from './LatestCheer';
import LatestFollow from './LatestFollow';
import LatestSub from './LatestSub';
import LatestTip from './LatestTip';

import RecentCheer from './RecentCheer';
import RecentFollow from './RecentFollow';
import RecentSub from './RecentSub';
import RecentTip from './RecentTip';

import RotatingElements from '@components/RotatingElements';

import './StreamElements.scss';

const StreamElements = () => {
  const latestSubTip = [<LatestSub />, <LatestTip />];
  const latestFollowCheer = [<LatestFollow />, <LatestCheer />];
  const recentSubTip = [<RecentSub />, <RecentTip />];
  const recentFollowCheer = [<RecentFollow />, <RecentCheer />];

  return (
    <div className="streamelements-container">
      <RotatingElements elements={latestSubTip} />
      <RotatingElements elements={latestFollowCheer} />
      <RotatingElements elements={recentSubTip} />
      <RotatingElements elements={recentFollowCheer} />
    </div>
  );
};

export default StreamElements;
