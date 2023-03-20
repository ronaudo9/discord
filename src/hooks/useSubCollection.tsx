import {
  onSnapshot,
  collection,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { db } from "../firebase";

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const useSubCollection = (
  collectionName: string,
  subCollectionName: string
) => {
  const [subDocuments, setSubDocuments] = useState<Messages[]>([]);
  const channelId = useAppSelector((state) => state.channel.channelId);

  useEffect(() => {
    let collectionRef = collection(
      db,
      collectionName,
      String(channelId),
      subCollectionName
    );
    //collectionRefOrderByで投稿順に並び替え
    const collectionRefOrderBy = query(
      collectionRef,
      //昇順はdesc、降順はasc
      orderBy("timestamp", "asc")
    );

    onSnapshot(collectionRefOrderBy, (snapshot) => {
      let results: Messages[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setSubDocuments(results);
    });
  }, [channelId]);
  return { subDocuments };
};

export default useSubCollection;
