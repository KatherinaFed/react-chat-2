import React, { ReactNode, createContext, useContext, useReducer } from 'react';
import { AuthContext } from './AuthContext';

interface AuthProps {
  children?: ReactNode;
}

interface ActionId {
  type: 'CHANGE_USER';
  payload: UserInfo;
}

export interface UserInfo {
  displayName: string;
  photoURL: string | null;
  uid: string;
}

const INITIAL_STATE = {
  chatID: 'null',
  user: {} as UserInfo,
};

export const ChatContext = createContext<{
  data: typeof INITIAL_STATE;
  dispatch: React.Dispatch<ActionId>;
}>({ data: INITIAL_STATE, dispatch: () => null });

export const ChatProvider = ({ children }: AuthProps) => {
  const { currentUser } = useContext(AuthContext);

  const chatReducer = (state: any, action: ActionId) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatID:
            currentUser && currentUser?.uid > action.payload?.uid
              ? currentUser?.uid + action.payload?.uid
              : action.payload?.uid + currentUser?.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
