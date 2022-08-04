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
}

export const Day = ({ allTransactions}: Prototypes) => {
  const day = allTransactions[0].date.split('T')[0];
  return (
    <div className='flex flex-col p-0 h-24 self-stretch'>
      <h4 className="h-4 font-medium text-sm leading-4 items-center text-input-placeholder">{day}</h4>
      {
        allTransactions.map((day, index) => {
          return (
            <div key={index} className="flex flex-row justify-between items-center p-0 h-4 flex-none order-none self-stretch flex-grow-0">
              <div className="w-40 h-4 font-[Inter] font-medium text-sm leading-4 flex items-center text-input-inactive flex-none order-none flex-grow-0">{day.type}</div>
              {day.type === 'transferencia recebida' && <div className=" h-4  font-bold text-sm leading-4 items-center text-right text-[#53D496]">{`+ R$${day.amount}`}</div>}
              {day.type === 'deposito' && <div className=" h-4  font-bold text-sm leading-4 items-center text-right text-[#53D496] ">{`+ R$${day.amount}`}</div>}
              {day.type === 'saque' && <div className=" h-4  font-bold text-sm leading-4 items-center text-right text-input-error ">{`- R$${day.amount}`}</div>}
              {day.type === 'transferencia enviada' && <div className=" h-4  font-bold text-sm leading-4 items-center text-right text-input-error">{`- R$${day.amount}`}</div>}
            </div>
          );
        })
      }
    </div>
  ); 
};