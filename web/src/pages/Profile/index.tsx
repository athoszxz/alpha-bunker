import { useUser } from '../../providers/UserProvider';
import { Link } from 'react-router-dom';
import avatar from '../../images/avatar.svg';
import back from '../../images/back.svg';
import icon from '../../images/icon-profile-1.svg';
import icon2 from '../../images/icon-profile-2.svg';
/**
 * Archive: src/pages/Profile.tsx
 *
 * Description: Profile page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */

export const Profile = () => {
  const { user } = useUser();

  return (
    <div className='flex flex-col justify-start items-center h-full overflow-auto'>
      <div className='flex flex-col justify-between  overflow-auto'>
        <div className=' flex flex-col  place-content-evenly top-0 bg-teal-700 w-[360px] h-[207px] ml-auto mr-auto rounded-b-3xl p-[30px]'>
          <Link to='/deposit'><img src={back}/></Link>
          <div className=''>
            <img src={avatar}></img>
            <p className='w-40 h-6 not-italic font-medium text-xl leading-6 flex items-center text-white'>{user?.name}</p>
          </div>
        </div>
      </div>
      <div className='h-15 mt-10'></div>
      <div className="flex flex-col justify-between dark:bg-body-dark bg-white dark:border dark:border-gray-500 rounded-lg w-[314px] p-2">
        <div className='flex flex-row justify-start p-0 h-5 self-stretch'>
          <img src={icon} />
          <h2 className='h-5 font-medium text-base text-header-gold pl-2'>
          Meus dados
          </h2>
        </div>

        <div className="flex flex-col justify-between dark:bg-body-dark dark:border dark:border-gray-500 bg-gray-100 rounded self-stretch p-2 mt-8">
          <div>
            <div className="h-4 font-[Inter] font-medium text-sm text-input-inactive">{'Nome: ' + user?.name}</div>
            <div className="h-4 font-[Inter] font-medium text-sm text-input-inactive">{'Data de nascimento: ' + user?.birth_date}</div>
            <div className="h-4 font-[Inter] font-medium text-sm text-input-inactive">{'CPF: ' + user?.cpf}</div>
          </div>
        </div>
      </div>
      <div className='h-15 mt-10'></div>
    
      <div className="flex flex-col justify-between dark:bg-body-dark dark:border dark:border-gray-500 bg-white rounded-lg w-[314px] p-2">
        <div className='flex flex-row justify-start p-0 h-5 self-stretch'>
          <img src={icon2} />
          <h2 className='h-5 font-medium text-base text-header-gold pl-2'>
          Minhas contas correntes
          </h2>
        </div>

        <div className="flex flex-col justify-between dark:bg-body-dark dark:border dark:border-gray-500 bg-gray-100 rounded self-stretch p-2 mt-8">
          <div>
            <div className="h-4 font-[Inter] font-medium text-sm text-input-inactive"> {'Agência: ' + user?.agency+ '-' + user?.agency_dig}</div>
            <div className="h-4 font-[Inter] font-medium text-sm text-input-inactive"> {'Conta: ' + user?.number  + '-' + user?.number_dig}</div>
          </div>
        </div>
      </div>

      <div className='p-2'></div>
    </div>
  );
};
