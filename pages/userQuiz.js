import React, {useState, useEffect, useRef} from 'react'
import { FaIgloo } from 'react-icons/fa';
import axios from 'axios';
import  Quiz  from '../components/quiz/quiz'

const UserQuiz = ({categories}) => {
  const [category, setCategory] = useState(null)
  const [startQuiz, setStartQuiz] = useState(false)
 
  const categoryRef = useRef(0)

  const handleChange_category = (e) => {
    const categoryId = e.target.value;
    const category = categories.find( i => i.id == categoryId);

    if(category)
    {       
       setCategory(category);
    }

  
  }

  const handleClick_startQuiz = (e) => {
    e.preventDefault();
    const categoryId = categoryRef.current.value;
    setStartQuiz(true);
  }

  useEffect( () => {

  },[])
  return (
    <div>
      {
        startQuiz == false &&
        <div className="w-full  flex flex-col  items-center sm:justify-center  ">
            <div className="md:w-1/2 px-3">
                <label className="block tracking-wide  mb-2 text-black dark:text-white" >
                    please select Quiz category
                </label>
                <div className="relative flex">
                    <select ref={categoryRef}  onChange={ handleChange_category }
                            className="block appearance-none  w-full bg-grey-lighter dark:text-gray-900 dark:bg-gray-200 border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded " >
                        {
                            categories && categories.map( (category) => {
                                return(<option key={category.id} value={category.id}>{category.title}</option>)
                            })
                        }                               
                    </select>
                    <div className="pointer-events-none absolute  flex items-center px-2 text-grey-darker top-4 right-0">
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 p-3 text-center ">
                <label className="block tracking-wide  mb-2 text-black dark:text-white" >
                    you selected category for Quiz is : 
                </label>
                <label className="block tracking-wide  mb-2 text-pink-500 dark:text-[#b39ddb] text-xl font-semibold" >
                    { category && category.title }
                </label>
            </div>
            <div className="md:w-1/2 p-3 text-center ">
                <a href='#' onClick={handleClick_startQuiz} className='border-2 text-gray-600 dark:text-gray-300 border-gray-500  dark:border-gray-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-gray-200 dark:hover:bg-[#1F1B24] hover:text-red-500 dark:hover:text-[#b39ddb]  transition duration-300'>
                  Start Quiz
                </a>
            </div>
        </div> 
      }

      {
        startQuiz == true &&
        <div className="w-full  flex flex-col  items-center sm:justify-center ">
          dddd
          <Quiz category={category} questionNumber={10} quizTime={60} />
        </div>
      }
    </div>
  )
}

export async function getServerSideProps(context) {
  
  const res = await axios.get(`http://localhost:3000/api/categories`);

  const data = res.data.length > 0 && res.data.map(obj => ({ ...obj}))  ;

  return {
      props: { categories: data },
  }
}

export default UserQuiz