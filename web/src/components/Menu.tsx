import { Link } from 'react-router-dom';
import arrow from '../images/arrow.svg';
import eye from '../images/eye.svg';
import perfil from '../images/perfil.svg';
import { useUser } from '../providers/UserProvider';
import { ButtonMenu } from './ButtonMenu';

/**
 * Archive: src/components/Menu.tsx
 *
 * Description: Menu component
 *
 * Date: 2022/07/22
 *
 * Author: Bruno
 */

export const Menu = () => {
  const { user } = useUser();
  return (
    <div className=' flex flex-col  place-content-evenly top-0 bg-teal-700 w-[360px] h-[207px] ml-auto mr-auto rounded-b-3xl p-[30px]'>
      <div className='flex flex-row justify-between'>
        <p className='h-6 not-italic font-medium text-xl leading-6 text-header-light flex-none order-none flex-grow-0'>Bem-vindo, {user?.name.split(' ')[0]}!</p>
        <Link to='/profile'><img src={perfil}/></Link>
      </div>
      <div className='flex flex-row justify-evenly px mt-[10px]'>
        <ButtonMenu label='Extrato' endpoint='extract'/>
        <ButtonMenu label='Transferir' endpoint='transfer'/>
        <ButtonMenu label='Depositar' endpoint='deposit'/>
        <ButtonMenu label='Sacar' endpoint='withdraw'/>
      </div>
      <div className='relative flex flex-col  w-11/12 h-[73px] p-[10px] bg-white rounded-xl mt-[25px] ml-auto mr-auto'>
        <div className='flex flex-row justify-between not-italic font-medium text-sm leading-4  text-header-gold'>
          <div className='flex flex-row '>
            <p className='mx-[5px]'>{`Agência:  ${user?.agency}-${user?.agency_dig}`}</p>
            <p className='mx-[5px]'>{`Conta: ${user?.number}-${user?.number_dig}`}</p>
          </div>
          <img src={arrow}></img>
        </div>
        <div className='flex flex-row text-base'>
          <img src={eye} ></img>
          <p className='not-italic font-bold text-2xl leading-7 text-brand-base m-[5px]'> {user?.amount.toFixed(2)} </p>
          <p className='not-italic font-bold text-sm leading-4 text-brand-hover pt-[15px]'> R$ </p>
        </div>
      </div>
    </div>
  );};
