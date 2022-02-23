import React, {useState, useEffect} from 'react'
import axios from 'axios';
import QuestionBox from './questionBox'
import ResultBox from './resultBox'

const Quiz = (props) => {
  const [questions, setQuestions] = useState([])

  useEffect( () => {
    async function fetchData() {
        const category =  props.category;
        const categoryId = category.id;
        console.log(categoryId)
        const res = await axios.get(`http://localhost:3000/api/questions?cid = ${categoryId}`);
    
        const data = res.data.length > 0 && res.data.map(obj => ({ ...obj}))  ;
        console.log(data)
        setQuestions(data);
      }
      fetchData();
    
  },[])
  
  return (
    <div>index</div>
  )
}



export default Quiz