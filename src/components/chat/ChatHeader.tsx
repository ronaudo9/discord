import React, {  useEffect, useState } from 'react'
import "./ChatHeader.scss"
import NotificationsIcon from '@mui/icons-material/Notifications';
import PushPinIcon from '@mui/icons-material/PushPin';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import HelpIcon from '@mui/icons-material/Help';
import { collection, DocumentData, onSnapshot, Query, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useCollection from '../../hooks/useCollection';
import { setChannelInfo } from '../../features/channelSlice';


type Props = {
  channelName: string|null;
}

const ChatHeader = (props: Props) => {
  const { channelName } = props;
  const { documents: channels } = useCollection("channels");
  // console.log(channels)
  const [inputSerch, setInputSerch] = useState<string>('');
  const dispatch = useAppDispatch();


  const Search = (e:React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    setInputSerch(value)

    const searchData = channels.filter((channels:DocumentData) => {
      return (
        channels.channel.channelName.match(value)
      );
    });

    let Data = searchData[0];
    if (Data) {
    dispatch(
      setChannelInfo({
        channelId: Data.id,
        channelName: Data.channel.channelName,
      })
      )
  }
  console.log(Data.channel.channelName)
  }

  // }
  // const user = useAppSelector((state) => state.user.user);
  // const searchData = user?.filter((item: any) => {
  //   return (
  //      user?.displayName.match(inputSerch)
  //   );
  // });
  return (
    <div className="chatHeader">
      <div className="chatHeaderLeft">
        {channelName?(
        <h3>
          <span className="chatHeaderHash">#</span>
          { channelName }
        </h3>
        ):(
          <h3>
          <span className="chatHeaderHash">#</span>
          {/* Please select a channel. */}
          チャンネルを選択してください
        </h3>
        )
        }
      </div>
      <div className="chatheaderRight">
        <NotificationsIcon />
        <PushPinIcon />
        <PeopleAltIcon />
        <div className = "chatHeaderSearch">
          <input type="text"
                 placeholder="チャンネル検索"
                 onChange={Search}
                value={inputSerch}
                />
          <SearchIcon/>
        </div>
        <SendIcon/>
        <HelpIcon/>
      </div>
    </div>
  )
}

export default ChatHeader
