import { useUser } from '../../providers/UserProvider';
import { Menu } from '../../components/Menu';
import { InputAgency } from '../../components/InputAgency';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import logoTransfer from '../../images/logo-transfer.svg';
import { useState } from 'react';
import { Modal } from '../../components/Modal';
import { TransferReceipt } from '../../components/TransferReceipt';

/**
 * Archive: src/pages/Transfer.tsx
 *
 * Description: Transfer page
 *
 * Date: 2022/07/20
 *
 * Author: Athos
 */

export const Transfer = () => {
  const { user } = useUser();
  const [valor, setValor] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [agency_dest, setAgency_dest] = useState('');
  const [number_dest, setNumber_dest] = useState('');
  const [cpf_dest, setCpf_dest] = useState('');
  const [erroServer, setErroServer] = useState<string>('');
  const [receipt, setReceipt] = useState<boolean>(false);
  const [modal, setModal] = useState(false);

  async function handleTransfer() {
    fetch('http://127.0.0.1:8080/transactions', {
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
        cpf: user?.cpf,
        password: password,
        agency_dest: Number(agency_dest.substring(4, -5)),
        agency_dest_dig: Number(agency_dest.substring(4)),
        number_dest: Number(number_dest.substring(5, -5)),
        number_dest_dig: Number(number_dest.substring(5)),
        cpf_dest: Number(cpf_dest),
        amount: Number(valor)
      })
    }).then(res => res.json())
      .then(res => {
        if (res.messages[0]) {
          setErroServer(res.messages);
          setModal(false);
        } else {
          setErroServer('');
          setModal(false);
          if (user) {
            user.amount -= res.data[0].final_amount;
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
          title="Transferência"
          setModal={setModal}
          handleConfirmModal={handleTransfer}
        />
      )}
      {
        !receipt ?
          (
            <>
              <div className="relative mt-9 flex-col dark:border dark:border-[#424245] items-start rounded-lg p-4">
                <div className="flex items-start mb-2">
                  <img src={logoTransfer} alt="Transfer" className='p-2' />
                  <p className="w-24 h-8 not-italic font-medium text-lg leading-1 flex items-center text-yellow-600 flex-none flex-grow-0">
                    Transferência
                  </p>
                </div>
                <p className="ml-2 h-9 not-italic font-medium text-xl  text-header-dark dark:text-header-light">Origem</p>
                <div className="flex items-start p-0 w-64 h-20 flex-none  flex-grow-0">
                  <InputAgency placeholder='Agência' status={true} value={`${user?.agency}-${user?.agency_dig}`} />
                  <InputAgency placeholder='Conta' status={true} value={`${user?.number}-${user?.number_dig}`} />
                </div>
                <p className="ml-2 h-9 mt-2 not-italic font-medium text-xl leading-6 text-header-dark dark:text-header-light">Destino</p>
                <div className="flex items-start p-0 w-64 h-20 flex-none  flex-grow-0">
                  <InputAgency placeholder='Agência' status={false} value={agency_dest} setTextValue={setAgency_dest}/>
                  <InputAgency placeholder='Conta' status={false} value={number_dest} setTextValue={setNumber_dest}/>
                </div>
                <Input placeholder='CPF' type='number' value={cpf_dest} setTextValue={setCpf_dest} />
                <Input placeholder='Valor' type='number' value={valor} setTextValue={setValor} />
                <Input placeholder='Senha' type='password' value={password} setTextValue={setPassword} />
                <Button
                  category="primary"
                  label="Transferir"
                  onClick={() => { setModal(true) }}
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
                setCpf_dest('');
                setValor('');
                setPassword('');
              }}>Voltar</button>
              <TransferReceipt type='Transferência' date={new Date(Date.now()).toLocaleDateString()} value={Number(valor)} name={user ? user.name : ''} agency={`${user?.agency}-${user?.agency_dig}`} account={`${user?.number}-${user?.number_dig}`} />

            </div>
          )
      }
    </div>)
};
