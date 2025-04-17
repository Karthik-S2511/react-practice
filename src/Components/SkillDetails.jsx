import React, { useEffect, useState } from 'react'
import styles from './SkillDetails.module.css'

const SkillDetails = () => {
 const [data, setData] = useState([])
 const [isLoading, setIsLoading] = useState(true)
 const [error, setError] = useState(null)
 const [editSkillId, setEditSkillId] = useState(null)
 const [editSkill, setEditSkill] = useState({})
 const [newSkill, setNewSkill] = useState({
  id: '',
  skill: '',
  proficiency: '',
 })

 useEffect(() => {
  fetch('http://localhost:3001/CandidateData/')
   .then((res) => res.json())
   .then((data) => {
    setData(data)
    setIsLoading(false)
   })
   .catch((err) => {
    setError(err.message)
    setIsLoading(false)
   })
 }, [])

 const handleChange = (e) => {
  const { name, value } = e.target
  setEditSkill((prev) => ({ ...prev, [name]: value }))
 }

 const handleEditSkill = (item) => {
  setEditSkillId(item.id)
  setEditSkill(item)
 }

 const handleUpdateSkill = () => {
  fetch(`http://localhost:3001/CandidateData/${editSkillId}`, {
   method: 'PUT',
   headers: {
    'Content-type': 'application/json',
   },
   body: JSON.stringify(editSkill),
  })
   .then((res) => res.json())
   .then((updatedSkill) => {
    setData(
     data.map((skill) => (skill.id === editSkillId ? updatedSkill : data))
    )
    setEditSkillId(null)
   })
   .catch((err) => setError(err.message))
 }

 const deleteSkill = (id) => {
  fetch(`http://localhost:3001/CandidateData/${id}`, {
   method: 'DELETE',
  })
   .then(() => {
    setData(data.filter((item) => item.id !== id))
   })
   .catch((err) => {
    setError(err.message)
    setIsLoading(false)
   })
 }

 if (isLoading)
  return <div style={{ textAlign: 'center' }}>Loading Data...</div>
 if (error) return <div>{`Error: ${error.message}`}</div>

 return (
  <div>
   <h1 style={{ textAlign: 'center' }}>Name: Karthik S</h1>

   <table className={styles.dataTable}>
    <thead style={{ backgroundColor: 'teal', height: '40px', color: 'white' }}>
     <tr>
      <th>Sl No.</th>
      <th>Skill</th>
      <th>Proficiency</th>
      <th>Update</th>
      <th>Delete</th>
     </tr>
    </thead>
    <tbody>
     {data.map((item, index) => (
      <tr
       key={item.id}
       style={{
        backgroundColor: index % 2 === 0 ? 'rgb(218, 246, 246)' : '#fff',
        height: '50px',
        textAlign: 'center',
       }}
      >
       <td>{index + 1}</td>
       <td style={{ textAlign: 'left', paddingLeft: '15px' }}>
        {editSkillId === item.id ? (
         <input
          type='text'
          name='skill'
          value={editSkill.skill}
          onChange={handleChange}
         />
        ) : (
         item.skill
        )}
       </td>
       <td>
        {editSkillId === item.id ? (
         <input
          type='text'
          name='proficiency'
          value={editSkill.proficiency}
          onChange={handleChange}
         />
        ) : (
         item.proficiency
        )}
       </td>
       <td>
        {editSkillId === item.id ? (
         <button onClick={handleUpdateSkill}>Update</button>
        ) : (
         <button onClick={() => handleEditSkill(item)}>Edit</button>
        )}
       </td>
       <td>
        <button onClick={() => deleteSkill(item.id)}>Delete</button>
       </td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 )
}

export default SkillDetails
