import './App.css'

export const BasicInput = (
    {
    valueB,
    setValueB,
    field,
    name,
    }:{
    valueB:number,
    setValueB:Function,
    field:string,
    name:string}
)=>{
    return(
    <div className='line'>
      <p>{name}:</p>
      <input type="number" value={valueB} 
        onChange={(e) => 
        setValueB((prev:{})=>
            ({...prev, [field]:parseInt(e.target.value)}))}/>
    </div>
    )
}

export const ShowNumber=({n}:{n:number})=>
{
  if (n >= 0){
    return <p className='newStat'>+{n}</p>;
  }else{
    return <p className='newStat'>{n}</p>;
  }
}

export function findIndex(value:number,row:number[]){
  for(let x=0;x<row.length;x++){
    if (value>=row[x]){
      return x;
    }
  }
  return row.length-1;
}


export  function transformStat(table:number[][],valueBase:number,levelB:number,levelN:number){
    let levelRow = table[levelB+1];
    let index = findIndex(valueBase,levelRow);
    let dif = table[levelB+1][index] - valueBase;
    let valueNew = table[levelN+1][index] - dif;

    return valueNew;
  }