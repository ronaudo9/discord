export interface InitialUserState{
  user: null | {
    uid: string;//ユーザーのid
    photo: string;
    email: string;
    displayName: string;
  }
}
