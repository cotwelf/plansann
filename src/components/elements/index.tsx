import React from "react";

// WORKROUND: select 有点丑，想自己做一个，之后有空的话
export const InputDate:React.FC<any> = ({date}: any) => {
  return (
    <div className="input-date">
      <div>{date}</div>
    </div>
  )
}
