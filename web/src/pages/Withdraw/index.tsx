import { Menu } from '../../components/Menu';
import { InputAgency } from '../../components/InputAgency';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import logoWithdraw from '../../images/logo-withdraw.svg';

/**
 * Archive: src/pages/Withdraw.tsx
 *
 * Description: Withdraw page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */

export const Withdraw = () => {
  return (
    <div className='flex flex-col justify-between h-full overflow-auto'>
      <Menu />
      <div className="static flex flex-col dark:border dark:border-[#424245] items-start rounded-lg p-4">
        <div className="flex items-start mb-2">
          <img src={logoWithdraw} alt="Deposit" className='p-2'/>
          <p className="w-24 h-8 not-italic font-medium text-lg leading-1 flex items-center text-yellow-600 flex-none flex-grow-0">
          Saque
          </p>
        </div>
        <p className="ml-2 h-9 not-italic font-medium text-lg  text-header-dark dark:text-header-light">Dados para Saque</p>
        <div className="flex items-start p-0 w-64 h-20 flex-none  flex-grow-0">
          <InputAgency placeholder='Agência' status={true} />
          <InputAgency placeholder='Conta' status={true} />
        </div>
        <Input placeholder='Valor' type='text'/>
        <Input placeholder='Senha' type='password'/>
        <Button
          category="primary"
          label="Sacar"
          onClick={() => {console.log('Clicou');}}
        />
      </div>
      <div className='h-2'></div>
    </div>
  );
};
