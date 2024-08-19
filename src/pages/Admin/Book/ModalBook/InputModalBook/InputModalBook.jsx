import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from 'antd'

function InputModalBook({ labelName, isRequireInput, validInput, name, handleChangeInput }) {
  return (
    <div>
      <span>
        {labelName} {isRequireInput && <span className='text-red-600'>(*)</span>}
      </span>
      <Input status={!validInput && 'error'} suffix={!validInput && <FontAwesomeIcon icon={faExclamation} />} onChange={(e) => handleChangeInput(name, e.target.value)} />
    </div>
  )
}

export default InputModalBook
