import { useUser } from '../../providers/UserProvider';
import { Link } from 'react-router-dom';
import avatar from '../../images/avatar.svg';
import back from '../../images/back.svg';



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
    <div className='flex flex-col justify-between h-full overflow-auto'>
      <div className=' flex flex-col  place-content-evenly top-0 bg-teal-700 w-[360px] h-[207px] ml-auto mr-auto rounded-b-3xl p-[30px]'>
        <Link to='/deposit'><img src={back}/></Link>
        <div className=''>
          <img src={avatar}></img>
          <p className='w-40 h-6 not-italic font-medium text-xl leading-6 flex items-center text-white'>{user?.name}</p>
        </div>
      </div>
      
    </div>

  );
};
