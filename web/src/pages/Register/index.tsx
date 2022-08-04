import { useContext, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { api } from '../../libs/api';
import { useUser } from '../../providers/UserProvider';
import { UserContext } from '../../providers/UserProvider';
import { Input } from '../../components/Input';
import logo from '../../images/logo-bunker.svg';
import { Navigate } from 'react-router-dom';

/**
 * Archive: src/pages/Register.tsx
 *
 * Description: Register page
 *
 * Date: 2022/08/01
 *
 * Author: Athos
 */

export const Register = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [erro, setErro] = useState<boolean>(false);
  const [erroServer, setErroServer] = useState<string>('');
  
  const { user } = useUser();

  useEffect(() => {
    setModal(false);
  }, [login]);

  async function handleRegister() {
    // if(user){
    //   user.name = 'Bruno Silva';
    //   user.email = 'pamonha@gmail.com';
    //   user.cpf = '123456789';
    //   user.birthDate = '2022-08-01';
    //   setLogin(true);
    // }
    //console.log(user?.name);
    if(password === confirmPassword){
      try {
        fetch('http://127.0.0.1:8080/users', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
      
          },
            body: JSON.stringify({
              name: name,
              cpf: Number(cpf),
              email: email,
              birthdate: birthDate,
              password: password
          })
        }).then(res => res.json())
        .then(res => {
          if(res.messages[0]){
            setErroServer(res.messages);
            setModal(false);
          }else{
            if(user){
              user.name = res.data[0].name;
              user.email = res.data[0].email;
              user.cpf = res.data[0].cpf;
              user.birth_date = res.data[0].birthdate;
              user.agency = res.data[0].agency;
              user.agency_dig = res.data[0].agency_dig;
              user.number = res.data[0].number;
              user.number_dig = res.data[0].number_dig;
              setLogin(true);
              setModal(false);
            }
          }
        });  

        // const result = await api.post('users', {
        //   name: name,
        //   cpf: Number(cpf),
        //   email: email,
        //   birthDate: birthDate,
        //   password: password
        // });
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
    }else{
      setErro(true);
      setModal(false);
    }
  }

  
  return (
    <>
      {modal && (
        <Modal
          title="Depósito"
          setModal={setModal}
          handleConfirmModal={handleRegister}
        />
      )}
      <div className="flex-col relative text- w-[20rem] p-5 grid justify-items-center">
        <img src={logo} alt="Bunker" className='p-4'/>
        <p className="w-32 h-12 not-italic font-medium text-xl leading-6 text-header-dark dark:text-header-light">Crie sua Conta</p>
        <Input placeholder="Nome" type='text' value={name} setTextValue={setName}/>
        <Input placeholder="Data de nascimento" type='date' value={birthDate} setTextValue={setBirthDate}/>

        <Input placeholder="CPF" type='text' value={cpf} setTextValue={setCpf}/>

        <Input placeholder="Email" type='email' value={email} setTextValue={setEmail}/>

        <Input placeholder="Senha" type='password' value={password} setTextValue={setPassword}/>

        <Input placeholder="Confirme sua Senha" type='password' value={confirmPassword} setTextValue={setConfirmPassword}/>
      
        <Button
          category="primary"
          label="Cadastrar"
          onClick={() => setModal(true)}
        />
        {erroServer && <p>{erroServer}</p>}
        {erro && <p>Senhas não conferem!</p>}
      </div>
      {login && <Navigate to='/deposit' />}
    </>
  );
};
