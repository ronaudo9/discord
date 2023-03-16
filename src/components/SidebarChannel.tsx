import { DocumentData } from 'firebase/firestore';
import React from 'react'
import "./SidebarChannel.scss";

type Prorps = {
  id: string;
  channel: DocumentData;
}
const SidebarChannel = (props: Prorps) => {
  const {id,channel} = props;
  return (
    <div className="sidebarChannel">
      <h4>
        <span className="sidebarChannelHash">#</span>
        {channel.channel.channelName}
      </h4>
    </div>
  )
}

export default SidebarChannel
