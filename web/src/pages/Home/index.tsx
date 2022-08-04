import { useUser } from '../../providers/UserProvider';
/**
 * Archive: src/pages/Home.tsx
 *
 * Description: Home page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */

export const Home = () => {
  const { loading } = useUser();

  return (
    <>
      <div className='absolute left-0 right-0 top-0 bg-teal-700'></div>
      <h1 className="text-white">Login</h1>;
    </>

  );
};
