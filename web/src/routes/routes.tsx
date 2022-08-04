import { ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import { Extract } from '../pages/Extract';
import { Transfer } from '../pages/Transfer';
import { Deposit } from '../pages/Deposit';
import { Withdraw } from '../pages/Withdraw';
import { Profile } from '../pages/Profile';
import { Transaction } from '../pages/Transaction';
import { Register } from '../pages/Register';

interface ChildrenTypes {
  children: ReactElement;
}

const Private = ({ children }: ChildrenTypes) => {
  const { user } = useUser();

  if (!user?.name) {
    return <Navigate to="/register" />;
  }

  return children;
};

const Public = ({ children }: ChildrenTypes) => {
  const { user } = useUser();

  if (user?.name) {
    return <Navigate to="/deposit" />;
  }

  return children;
};

export const Router = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/register" />} />
    <Route
      path="/register"
      element={
        <Public>
          <Register />
        </Public>
      }
    />
    <Route
      path="/deposit"
      element={
        <Private>
          <Deposit />
        </Private>
      }
    />
    <Route
      path="/extract"
      element={
        <Private>
          <Extract />
        </Private>
      }
    />
    <Route
      path="/transfer"
      element={
        <Private>
          <Transfer />
        </Private>
      }
    />
    <Route
      path="/withdraw"
      element={
        <Private>
          <Withdraw />
        </Private>
      }
    />
    <Route
      path="/profile"
      element={
        <Private>
          <Profile />
        </Private>
      }
    />
    <Route path="/transaction/:transactionId" element={<Transaction />} />

    <Route path="*" element={<h1 className="text-white">Error 404</h1>} />
  </Routes>
);
