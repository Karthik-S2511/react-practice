import React, { useState } from 'react'

const ChapsAdditionalInfo = () => {
 const initialState = {
  showUltDebtorAdditionalInformation: false,
  showUltCreditorAdditionalInformation: false,
  ultimateDebtor: {
   name: '',
   structuredAddress: {
    townName: '',
    country: '',
   },
  },
  ultimateCreditor: {
   name: '',
   structuredAddress: {
    townName: '',
    country: '',
   },
  },
 }

 const [chapsAdditionalInformation, setChapsAdditionalInformation] =
  useState(initialState)
 console.log(chapsAdditionalInformation)

 const handleAdditionalPaymentInfoChange = (field, value) => {
  setChapsAdditionalInformation((prevState) => {
   // If updating a top-level key, do a shallow update
   if (field in prevState) {
    return {
     ...prevState,
     [field]: value,
    }
   }

   // Otherwise, update nested fields (deep update)
   const fieldParts = field.split('.')
   let newState = { ...prevState }
   let current = newState

   for (let i = 0; i < fieldParts.length - 1; i++) {
    const key = fieldParts[i]
    current[key] = { ...current[key] }
    current = current[key]
   }

   current[fieldParts[fieldParts.length - 1]] = value

   return newState
  })
 }

 // handleAdditionalPaymentInfoChange = (field, value) => {
 //  const { chapsAdditionalInformation } = this.state

 //  this.setState({
 //   chapsAdditionalInformation: {
 //    ...chapsAdditionalInformation,
 //    [field]: value,
 //   },
 //  })
 // }

 // Function to clear Ultimate Debtor fields
 const clearUltimateDebtor = (field) => {
  handleAdditionalPaymentInfoChange(`ultimateDebtor.${field}`, '')
 }

 // Function to toggle Ultimate Debtor checkbox
 const toggleUltDebtor = (event, value) => {
  handleAdditionalPaymentInfoChange('showUltDebtorAdditionalInformation', value)

  if (!value) {
   clearUltimateDebtor('name')
   clearUltimateDebtor('structuredAddress.townName')
   clearUltimateDebtor('structuredAddress.country')
  }
 }

 // Function to clear Ultimate Creditor fields
 const clearUltimateCreditor = (field) => {
  handleAdditionalPaymentInfoChange(`ultimateCreditor.${field}`, '')
 }

 // Function to toggle Ultimate Creditor checkbox
 const toggleUltCreditor = (event, value) => {
  handleAdditionalPaymentInfoChange(
   'showUltCreditorAdditionalInformation',
   value
  )

  if (!value) {
   clearUltimateCreditor('name')
   clearUltimateCreditor('structuredAddress.townName')
   clearUltimateCreditor('structuredAddress.country')
  }
 }

 return (
  <div>
   {/* Debtor Checkbox */}
   <label>
    <input
     type='checkbox'
     checked={chapsAdditionalInformation.showUltDebtorAdditionalInformation}
     onChange={(e) => toggleUltDebtor(e, e.target.checked)}
    />
    Show Ultimate Debtor
   </label>

   {/* Debtor Inputs (Only show when checkbox is checked) */}
   {chapsAdditionalInformation.showUltDebtorAdditionalInformation && (
    <div>
     <h2>Ultimate Debtor</h2>
     <input
      type='text'
      value={chapsAdditionalInformation.ultimateDebtor.name}
      onChange={(e) =>
       handleAdditionalPaymentInfoChange('ultimateDebtor.name', e.target.value)
      }
      placeholder='Debtor Name'
     />
     <input
      type='text'
      value={
       chapsAdditionalInformation.ultimateDebtor.structuredAddress.townName
      }
      onChange={(e) =>
       handleAdditionalPaymentInfoChange(
        'ultimateDebtor.structuredAddress.townName',
        e.target.value
       )
      }
      placeholder='Debtor Town'
     />
     <input
      type='text'
      value={
       chapsAdditionalInformation.ultimateDebtor.structuredAddress.country
      }
      onChange={(e) =>
       handleAdditionalPaymentInfoChange(
        'ultimateDebtor.structuredAddress.country',
        e.target.value
       )
      }
      placeholder='Debtor Country'
     />
    </div>
   )}

   {/* Creditor Checkbox */}
   <label>
    <input
     type='checkbox'
     checked={chapsAdditionalInformation.showUltCreditorAdditionalInformation}
     onChange={(e) => toggleUltCreditor(e, e.target.checked)}
    />
    Show Ultimate Creditor
   </label>

   {/* Creditor Inputs (Only show when checkbox is checked) */}
   {chapsAdditionalInformation.showUltCreditorAdditionalInformation && (
    <div>
     <h2>Ultimate Creditor</h2>
     <input
      type='text'
      value={chapsAdditionalInformation.ultimateCreditor.name}
      onChange={(e) =>
       handleAdditionalPaymentInfoChange(
        'ultimateCreditor.name',
        e.target.value
       )
      }
      placeholder='Creditor Name'
     />
     <input
      type='text'
      value={
       chapsAdditionalInformation.ultimateCreditor.structuredAddress.townName
      }
      onChange={(e) =>
       handleAdditionalPaymentInfoChange(
        'ultimateCreditor.structuredAddress.townName',
        e.target.value
       )
      }
      placeholder='Creditor Town'
     />
     <input
      type='text'
      value={
       chapsAdditionalInformation.ultimateCreditor.structuredAddress.country
      }
      onChange={(e) =>
       handleAdditionalPaymentInfoChange(
        'ultimateCreditor.structuredAddress.country',
        e.target.value
       )
      }
      placeholder='Creditor Country'
     />
    </div>
   )}
  </div>
 )
}

export default ChapsAdditionalInfo
