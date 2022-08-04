import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Menu } from '../../components/Menu';
/**
 * Archive: src/pages/Extract.tsx
 *
 * Description: Extract page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */

export const Transaction = () => {
  const { transactionId } = useParams<Record<string, string | undefined>>();
  console.log(transactionId);

  return (
    <>
      <Menu />
      <h1 className="text-black">Transação</h1>
    </>
  );
  
};
