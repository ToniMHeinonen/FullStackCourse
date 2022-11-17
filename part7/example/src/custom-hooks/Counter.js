import { useState } from 'react'
const Counter = (props) => {
  const counter = useCounter()

  const left = useCounter()
  const right = useCounter()

  return (
    <div>
      <div>
        <div>{counter.value}</div>
        <button onClick={counter.increase}>plus</button>
        <button onClick={counter.decrease}>minus</button>
        <button onClick={counter.zero}>zero</button>
      </div>
      <div>
        {left.value}
        <button onClick={left.increase}>left</button>
        <button onClick={right.increase}>right</button>
        {right.value}
      </div>
    </div>
  )
}

const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value,
    increase,
    decrease,
    zero,
  }
}

export default Counter
