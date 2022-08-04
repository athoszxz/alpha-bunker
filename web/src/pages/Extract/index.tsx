import { useUser } from '../../providers/UserProvider';
import { Menu } from '../../components/Menu';
import { ExtractReceipt } from '../../components/Extract/index';
import { useEffect, useState } from 'react';
/**
 * Archive: src/pages/Extract.tsx
 *
 * Description: Extract page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */

interface TransactionType {
  id: string,
  id_account: string,
  amount: string,
  date: string,
  type: string,
  fees: string
}

export const Extract = () => {
  const { user } = useUser();
  const [payload, setPayload] = useState<TransactionType[]>([]);
  
  // It looks like you wrote useEffect(async () => ...) or returned a Promise.Instead, write the async function inside your effect and call it immediately:

  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const response = await MyAPI.getData(someId);
  //     // ...
  //   }
  //   fetchData();
  // }, [someId]); // Or [] if effect doesn't need props or state


    function handleDeposit() {
      fetch('http://127.0.0.1:8080/extracts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agency: user?.agency,
          agency_dig: user?.agency_dig,
          number: user?.number,
          number_dig: user?.number_dig,
          cpf: Number(user?.cpf),
        })
      }).then(res => res.json())
        .then(res => {
          const erro : any = res.messages[0];
          if (erro) {
            console.log(res);
            console.log('erro');
            // ignore
          } else {
            setPayload(res.data[2].transactions);
            console.log(payload);
          }
        });
    }



  return (
    <>
      <div className='flex flex-col justify-start items-center h-full overflow-auto'>
        <Menu />
        <button onClick={handleDeposit}>Gerar Extrato</button>
        <h1 className="text-black">Extrato</h1>
        {payload[0] && <ExtractReceipt allTransactions={payload} />}
      </div>
    </>

  );
};
