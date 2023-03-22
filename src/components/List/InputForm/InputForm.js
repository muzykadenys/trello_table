import React, { useState } from 'react'
import '../InputForm/inputForm.scss'

function InputForm({ getInputValue, setIsVisible, formTitle }) {
  const [value, setValue] = useState('')

  const onInputChange = (e) => {
    setValue(e.target.value)
  }

  const sublicText = () => {
    if (value !== '') {
      getInputValue(value)
      setIsVisible(false)
    }
  }

  return (
    <div className="InputFormSection">
      <div className="InputFormSection_title">{formTitle || ''}</div>
      
      <input
        className="InputFormSection_input"
        value={value}
        onChange={onInputChange}
      />
      <div className="InputFormSection_button" onClick={sublicText}>
        add
      </div>
    </div>
  )
}

export default InputForm
