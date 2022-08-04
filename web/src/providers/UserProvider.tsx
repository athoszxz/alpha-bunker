import { ReactNode, createContext, useState, useContext } from 'react';

interface ContextTypes {
  user: UserTypes;
  loading: boolean;
}

interface UserTypes {
  name: string;
  email: string;
  cpf: number;
  birth_date: string;
  agency: number;
  agency_dig: number;
  number: number;
  number_dig: number;
  amount: number;
}

export const UserContext = createContext<Partial<ContextTypes>>({});

interface UserProviderTypes {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderTypes) => {
  const [user, setUser] = useState<UserTypes>({
    name: '',
    email: '',
    cpf: 0,
    birth_date: '',
    agency: 0,
    agency_dig: 0,
    number: 0,
    number_dig: 0,
    amount:0,
  });
  const [loading, setLoading] = useState(true);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
