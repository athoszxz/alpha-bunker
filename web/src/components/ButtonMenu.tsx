import extract from '../images/extract.svg';
import transfer from '../images/transfer.svg';
import deposit from '../images/deposit.svg';
import draft from '../images/draft.svg';
import { Link } from 'react-router-dom';

interface PropTypes {
  label: string;
  endpoint: string
}

/**
 * Archive: src/components/ButtonMenu.tsx
 *
 * Description: Button Menu component
 *
 * Date: 2022/07/22
 *
 * Author: Bruno
 */

export const ButtonMenu = ({
  label,
  endpoint,

}: PropTypes) => (
  
  <Link to={`/${endpoint}`} className='flex flex-col items-center'>
    <button
      className='flex flex-row items-center  w-12 h-12 bg-[#75ACB1] rounded flex-none order-none flex-grow-0'
    >
      {label === 'Extrato' && <img src={extract} className='pl-2.5' />}
      {label === 'Transferir' && <img src={transfer} className='pl-3'/>}
      {label === 'Depositar' && <img src={deposit} className='pl-3'/>}
      {label === 'Sacar' && <img src={draft} className='pl-3'/>}
    </button>
    <p className='h-4 not-italic font-normal text-xs leading-4 text-white flex-none order-1 flex-grow-0 w-fit '>{label}</p>
  </Link>
 

);
