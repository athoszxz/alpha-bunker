import { useUser } from '../../providers/UserProvider';
import { Menu } from '../../components/Menu';
import { InputAgency } from '../../components/InputAgency';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import logoTransfer from '../../images/logo-transfer.svg';
/**
 * Archive: src/pages/Transfer.tsx
 *
 * Description: Transfer page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */



export const Transfer = () => {
  return (
    <div className='flex flex-col justify-between h-full overflow-auto'>
      <Menu />
      <div className="relative flex flex-col dark:border dark:border-[#424245] items-start rounded-lg p-4">
        <div className="flex items-start mb-2">
          <img src={logoTransfer} alt="Transfer" className='p-2'/>
          <p className="w-24 h-8 not-italic font-medium text-lg leading-1 flex items-center text-yellow-600 flex-none flex-grow-0">
          Transferência
          </p>
        </div>
        <p className="ml-2 h-9 not-italic font-medium text-xl  text-header-dark dark:text-header-light">Origem</p>
        <div className="flex items-start p-0 w-64 h-20 flex-none  flex-grow-0">
          <InputAgency placeholder='Agência' status={true} />
          <InputAgency placeholder='Conta' status={true} />
        </div>
        <p className="ml-2 h-9 mt-2 not-italic font-medium text-xl leading-6 text-header-dark dark:text-header-light">Destino</p>
        <div className="flex items-start p-0 w-64 h-20 flex-none  flex-grow-0">
          <InputAgency placeholder='Agência' status={false} />
          <InputAgency placeholder='Conta' status={false} />
        </div>
        <Input placeholder='Valor' type='text'/>
        <Input placeholder='Senha' type='password'/>
        <Button
          category="primary"
          label="Transferir"
          onClick={() => {console.log('Clicou');}}
        />
      </div>
      <div className='h-2'></div>
    </div>

  );
};
