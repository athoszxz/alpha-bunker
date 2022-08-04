import { SetStateAction, useState } from 'react';
import { Menu } from '../../components/Menu';
import { api } from '../../libs/api';
import { InputAgency } from '../../components/InputAgency';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import logoDeposit from '../../images/logo-deposit.svg';
import { useUser } from '../../providers/UserProvider';
import { DepositReceipt } from '../../components/DepositReceipt';

/**
 * Archive: src/pages/Deposit.tsx
 *
 * Description: Deposit page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */

export const Deposit = () => {
  const [modal, setModal] = useState(false);
  const { user } = useUser();
  const [cpf, setCpf] = useState('');
  const [valor, setValor] = useState('');
  const [erroServer, setErroServer] = useState<string>('');
  const [receipt, setReceipt] = useState<boolean>(false);

return(<div className='flex flex-col justify-start items-center h-full overflow-auto'>
  <Menu />
  {
    !receipt ?
    ( 
    <>
      <div className="relative mt-9 flex-col dark:border dark:border-[#424245] items-start rounded-lg p-4">
      <div className="flex items-start mb-2">
        <img src={logoDeposit} alt="Deposit" className='p-2' />
        <p className="w-24 h-8 not-italic font-medium text-lg leading-1 flex items-center text-yellow-600 flex-none flex-grow-0">
          Depósito
        </p>
      </div>
      <p className="ml-2 h-9 not-italic font-medium text-lg  text-header-dark dark:text-header-light">Dados para Depósito</p>
      <div className="flex items-start p-0 w-64 h-20 flex-none  flex-grow-0">
        <InputAgency placeholder='Agência' status={true} value={`${user?.agency}-${user?.agency_dig}`} />
        <InputAgency placeholder='Conta' status={true} value={`${user?.number}-${user?.number_dig}`} />
      </div>
      <Input placeholder='CPF' type='number' value={cpf} setTextValue={setCpf} />
      <Input placeholder='Valor' type='number' value={valor} setTextValue={setValor} />
      <Button
        category="primary"
        label="Depositar"
        onClick={() => {
          fetch('http://127.0.0.1:8080/deposits', {
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
              cpf: Number(cpf),
              amount: Number(valor)
            })
          }).then(res => res.json())
            .then(res => {
              if (res.messages[0]) {
                setErroServer(res.messages);
                setModal(false);
              } else {
                setErroServer('');
                if(user){
                  user.amount += res.data[1].totalAmout;
                  setValor(res.data[1].totalAmout)
                }
                setReceipt(true);
              }
            });
        }}
      />
      {erroServer && <p>{erroServer}</p>}
    </div>
    <div className='m-9'></div>
    </>
    ) 
    :
    (
      <div className='mt-9'>
        <button onClick={() => {
            setReceipt(false)
            setCpf('')
            setValor('')
          }}>Voltar</button>
        <DepositReceipt type='Depósito' date={new Date(Date.now()).toLocaleDateString()} value={Number(valor)} />
        
      </div>
    )
  }
</div>)
}
