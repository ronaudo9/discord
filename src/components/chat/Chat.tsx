import "./Chat.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ChatMessage from "./ChatMessage";
import { useAppSelector } from "../../app/hooks";
import ChatHeader from "./ChatHeader";
import { useState } from "react";
import {
  collection,
  DocumentData,
  CollectionReference,
  addDoc,
  serverTimestamp,
  DocumentReference,
} from "firebase/firestore";
import { db } from "../../firebase";
import useSubCollection from "../../hooks/useSubCollection";

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");

  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);
  //分割代入でsubDocuments内の値をmessagesに代入している
  const { subDocuments: messages } = useSubCollection("channels", "messages");

  // useEffect(() => {"
  //   let collectionRef = collection(
  //     db,
  //     "channels",
  //     String(channelId),
  //     "messages"
  //   );
  //   //collectionRefOrderByで投稿順に並び替え
  //   const collectionRefOrderBy = query(
  //     collectionRef,
  //     //昇順はdesc、降順はasc
  //     orderBy("timestamp", "asc")
  //   );

  //   onSnapshot(collectionRefOrderBy, (snapshot) => {
  //     let results: Messages[] = [];
  //     snapshot.docs.forEach((doc) => {
  //       results.push({
  //         timestamp: doc.data().timestamp,
  //         message: doc.data().message,
  //         user: doc.data().user,
  //       });
  //     });
  //     setMessages(results);
  //   });
  // }, [channelId]);

  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    //1.db内の2.channelsコレクションの3.channelsIdが一致したchannelsコレクションの中にある3.messagesコレクションを指定
    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      "channels",
      String(channelId),
      "messages"
    );
    const docRef: DocumentReference<DocumentData> = await addDoc(
      collectionRef,
      {
        message: inputText,
        timestamp: serverTimestamp(),
        user: user,
      }
    );
    // console.log(docRef);
    //送信ボタンを押すと空になる処理
    setInputText("");
  };

  // console.log(inputText);
  return (
    <div className="chat">
      {/* chatHeader */}
      <ChatHeader channelName={channelName} />
      {/* chatMessage */}
      <div className="chatMassage">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
          />
        ))}

        {/* <ChatMessage />
        <ChatMessage />
        <ChatMessage /> */}
      </div>
      {/* chatInput */}
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input
            type="text"
            placeholder="メッセージを送信"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            value={inputText}
          />
          <button
            type="submit"
            className="chatInputButton"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              sendMessage(e)
            }
          >
            送信
          </button>
        </form>
        <div className="chatInputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
