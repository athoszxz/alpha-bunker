interface PropTypes {
  placeholder: string;
  type: 'text' | 'password' | 'email' | 'date' | 'number';
  value: string;
  setTextValue: (value: string) => void;
}

/**
 * Archive: src/components/Input.tsx
 *
 * Description: Input component
 *
 * Date: 2022/07/22
 *
 * Author: Athos e Bruno
 */

export const Input = ({
  placeholder,
  type,
  value,
  setTextValue
}: PropTypes) => {
  //const [text, setText] = useState('');
    
  return (
    <div className="m-1">
      <input type={type} placeholder={placeholder} className="box-border flex flex-row items-center p-2 w-64 h-8 bg-gray-100 rounded flex-none order-none flex-grow-0" onChange={(e)=>setTextValue(e.target.value)} value={value}/>
      <div className="h-6">
        {value && <p className='text-input-inactive'>{placeholder}</p>}
      </div>
    </div>
  );
};
