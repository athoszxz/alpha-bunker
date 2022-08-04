/**
 * Archive: src/pages/Extract.tsx
 *
 * Description: Extract page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */
import icon from '../../images/logo.svg';
import { Day } from './day';
import logoBell from '../../images/logo-bell.svg';
import { useState } from 'react';

interface TransactionType {
  id: string,
  id_account: string,
  amount: string,
  date: string,
  type: string,
  fees: string
}

interface Prototypes {
  allTransactions: TransactionType[]
}


export const ExtractReceipt = ({
  allTransactions
}: Prototypes) => {
  const [allDates, setAllDates] = useState<string[]>([...new Set(allTransactions.map(e => e.date.split('T')[0]))]);

  const elements = [];
  for (let i = 0; i < allDates.length; i++) {
    const dateSearch = allDates[i];
    const diaTal = allTransactions.filter(item => {
      return item.date.split('T')[0] === dateSearch;
    });
    elements.push(diaTal);
  }

  return <>
    <div className="flex flex-col dark:bg-body-dark dark:border dark:border-gray-500 bg-white rounded-lg w-[314px] p-2">
      <div className='flex flex-row justify-between items-center h-5 self-stretch'>
        <img src={icon} />
        <h2 className='font-medium text-base leading-5 text-header-gold '>
          Extrato de transações
        </h2>
        <img src={logoBell} />
      </div>
      <div className='h-5'></div>
      <div className="flex flex-col items-start h-48 dark:bg-body-dark bg-gray-100 rounded self-stretch p-2 my-3 ">
        <div className='flex flex-col items-start p-0 h-24 self-stretch'>
          {
            elements.map((day, index) => {
              return <Day allTransactions={day} />;
            })
          }
        </div>
      </div>
    </div>
  </>;
};
