/**
 * Archive: src/pages/Transfer.tsx
 *
 * Description: Transfer page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */

// export const TransferReceipt = () => {
//   return <h1 className="text-white">Transferência</h1>;
// };

import icon from '../images/logo.svg';
import logoBell from '../images/logo-bell.svg';

interface PropTypes {
  type: string;
  date: string;
  name: string;
  agency: string;
  account: string;
  value: number;
}

export const TransferReceipt = ({
  type,
  date,
  name,
  agency,
  account,
  value,
}: PropTypes) => {
  return <>
    <div className="flex flex-col justify-between dark:bg-body-dark dark:border dark:border-gray-500 bg-white rounded-lg w-[314px] p-2">
      <div className='flex flex-row justify-between p-0 h-5 self-stretch '>
        <img src={icon} />
        <h2 className='h-5 font-medium text-base text-header-gold'>
          Comprovante de transação
        </h2>
        <img src={logoBell} />
      </div>

      <div className="flex flex-col justify-between dark:bg-body-dark bg-gray-100 rounded self-stretch p-2 mt-8">
        <div>
          <h4 className="h-4 font-medium text-sm text-paragraph-light-200">Tipo: {type}</h4>
          <div className="h-4 font-[Inter] font-medium text-sm text-input-inactive">Data: {date}</div>
        </div>
        <div className='h-5'></div>
        <div className='self-stretch'>
          <h4 className="h-4 font-medium text-sm dark:bg-body-dark text-paragraph-light-200">Dados de destino:</h4>
          <div className="h-4 font-[Inter] font-medium text-sm text-input-inactive ">Nome: {name}</div>
          <div className="h-4 font-[Inter] font-medium text-sm text-input-inactive ">Agência: {agency}</div>
          <div className="h-4 font-[Inter] font-medium text-sm text-input-inactive ">Conta: {account}</div>
        </div>
        <div className='h-5'></div>
        <div className="flex flex-row justify-between dark:bg-body-dark p-0 h-4 self-stretch">
          <h4 className="h-4 font-medium text-base text-paragraph-light-200">Valor</h4>
          <div className="w-16 h-4 font-bold text-sm items-right text-right text-input-error">- R${value}</div>
        </div>
      </div>
    </div>
  </>;
};
