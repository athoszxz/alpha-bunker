import { Menu } from '../../components/Menu';
import { InputAgency } from '../../components/InputAgency';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import logoWithdraw from '../../images/logo-withdraw.svg';
import { useState } from 'react';
import { useUser } from '../../providers/UserProvider';
import { Modal } from '../../components/Modal';
import { DepositReceipt } from '../../components/DepositReceipt';

/**
 * Archive: src/pages/Withdraw.tsx
 *
 * Description: Withdraw page
 *
 * Date: 2022/07/20
 *
 * Author: Bruno
 */

export const Withdraw = () => {
  const [modal, setModal] = useState(false);
  const { user } = useUser();
  const [cpf, setCpf] = useState('');
  const [valor, setValor] = useState('');
  const [password, setPassword] = useState('');
  const [erroServer, setErroServer] = useState<string>('');
  const [receipt, setReceipt] = useState<boolean>(false);

  async function handleWithdraw() {
    fetch('http://127.0.0.1:8080/withdraws', {
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
        amount: Number(valor), 
        password: password
      })
    }).then(res => res.json())
      .then(res => {
        if (res.messages[0]) {
          setErroServer(res.messages);
          setModal(false);
        } else {
          setModal(false);
          setErroServer('');
          if(user){
            user.amount -= res.data[0].total_amount_with_fees;
            setValor(res.data[0].total_amount_with_fees);
          }
          setReceipt(true);
        }
      });
  }

  return (
    <div className='flex flex-col justify-start items-center h-full overflow-auto'>
      <Menu />
      {modal && (
        <Modal
          title="Saque"
          setModal={setModal}
          handleConfirmModal={handleWithdraw}
        />
      )}
      {
        !receipt ?
          ( 
            <>
              <div className="static mt-9 flex flex-col dark:border dark:border-[#424245] items-start rounded-lg p-4">
                <div className="flex items-start mb-2">
                  <img src={logoWithdraw} alt="Deposit" className='p-2'/>
                  <p className="w-24 h-8 font-medium text-lg leading-1 items-center text-yellow-600">
                    Saque
                  </p>
                </div>
                <p className="ml-2 h-9 font-medium text-lg  text-header-dark dark:text-header-light">Dados para Saque</p>
                <div className="flex items-start p-0 w-64 h-20 flex-none  flex-grow-0">
                  <InputAgency placeholder='Agência' status={true} value={`${user?.agency}-${user?.agency_dig}`} />
                  <InputAgency placeholder='Conta' status={true} value={`${user?.number}-${user?.number_dig}`} />
                </div>
                <Input placeholder='CPF' type='number' value={cpf} setTextValue={setCpf}/>
                <Input placeholder='Valor' type='number' value={valor} setTextValue={setValor}/>
                <Input placeholder='Senha' type='password' value={password} setTextValue={setPassword}/>
                <Button
                  category="primary"
                  label="Sacar"
                  onClick={() => setModal(true)}
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
                setReceipt(false);
                setCpf('');
                setValor('');
                setPassword('');
              }}>Voltar</button>
              <DepositReceipt type='Saque' date={new Date(Date.now()).toLocaleDateString()} value={Number(valor)} />
            </div>
          )
      }
    </div>
  );
};
