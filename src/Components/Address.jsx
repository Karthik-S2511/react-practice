import React, { useState } from 'react'

function AddressInput() {
 const [formData, setFormData] = useState({ address: ['', ''] })

 const handleChange = (e) => {
  // Get full input value
  const value = e.target.value

  // Split into lines (max 2)
  const lines = value.split('\n').slice(0, 2)

  // Enforce 70 characters per line
  const formattedLines = lines.map((line) => line.slice(0, 70))

  // Ensure it always has 2 lines
  while (formattedLines.length < 2) {
   formattedLines.push('')
  }

  setFormData({ address: formattedLines })
 }

 return (
  <div>
   <label>Address (2 lines, max 70 characters each):</label>
   <textarea
    rows={2}
    value={formData.address.join('\n')}
    onChange={handleChange}
    maxLength={142} // 70 * 2 + 1 newline (optional, for safety)
   />
   <p>Line 1: {formData.address[0]}</p>
   <p>Line 2: {formData.address[1]}</p>
   <p>Editing in feature branch</p>
  </div>
 )
}

export default AddressInput
