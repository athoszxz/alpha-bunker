import { useUser } from '../../providers/UserProvider';
import { Menu } from '../../components/Menu';
/**
 * Archive: src/pages/Extract.tsx
 *
 * Description: Extract page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */


export const Extract = () => {
  const { loading } = useUser();

  return (
    <>
      <Menu/>
      <h1 className="text-black">Extrato</h1>
    </>

  );
};
