interface TransactionType {
  id: string,
  id_account: string,
  amount: string,
  date: string,
  type: string,
  fees: string
}

interface Prototypes {
  allTransactions: TransactionType[],
  key: number
}

export const Day = ({ allTransactions , key}: Prototypes) => {
  const day = allTransactions[0].date.split('T')[0];
  return (
    <div key={key} className='flex flex-col p-0 h-24 self-stretch'>
      <h4 className="h-4 font-medium text-sm leading-4 items-center text-input-placeholder">{day}</h4>
      {
        allTransactions.map((day, index) => {
          return (
            <div key={index} className="flex flex-row justify-between items-center p-0 h-4 flex-none order-none self-stretch flex-grow-0">
              <div className="w-40 h-4 font-[Inter] font-medium text-sm leading-4 flex items-center text-input-inactive flex-none order-none flex-grow-0">{day.type}</div>
              {day.type === 'transferenciaRECEBIDAAAAA' && <div className="w-16 h-4  font-bold text-sm leading-4 items-center text-right text-[#53D496] flex-none order-1 flex-grow-0">+ R${day.amount}</div>}
              {day.type === 'deposito' && <div className="w-16 h-4  font-bold text-sm leading-4 items-center text-right text-[#53D496] flex-none order-1 flex-grow-0">+ R${day.amount}</div>}
              {day.type === 'saque' && <div className="w-16 h-4  font-bold text-sm leading-4 items-center text-right text-input-error flex-none order-1 flex-grow-0">- R${day.amount}</div>}
              {day.type === 'tranferenciaEnv' && <div className="w-16 h-4  font-bold text-sm leading-4 items-center text-right text-input-error flex-none order-1 flex-grow-0">- R${day.amount}</div>}
            </div>
          );
        })
      }
    </div>
  ); 
};