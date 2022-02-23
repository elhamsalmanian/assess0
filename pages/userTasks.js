import React, {useState, useEffect} from 'react'
import {useAppContext} from '../stores/appContext';
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from '../components/Table'  // new
import { useRouter } from 'next/router'
import {FaPlusCircle} from 'react-icons/fa'
import {FaRegEdit} from 'react-icons/fa'

function UserTasks() {
  const router = useRouter()
  const { user, userTasks, getUserTasks, getTaskById, updateTask } = useAppContext();
  const[openTaskModal, setOpenTaskModal] = useState(false);
  const[task, setTask] = useState(null);
  const[refresh, setRefresh] = useState(false);

    


  const getTasks =  () => {

    const getDateDiffByDay = (date1, date2) => {
      var msDiff = new Date(date1).getTime() - new Date(date2).getTime();
      var days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
      days = (days < 0) ? '-' : days;
      return days;
    } 

    const getImageUrl = (theme) => {
      switch(theme)
      {
        case 'blue':
          return '/images/blue.png'
        case 'red':
          return '/images/red.png'
        case 'green':
          return '/images/green.png'
        case 'yellow':
          return '/images/yellow.png'
        case 'purple':
          return '/images/purple.png'
        default:
          return null
      }
    } 

    return userTasks.map(item => {
    
        return {
          id: item.id,
          title: item.title,
          comment: item.comment,
          issuedDate: item.issuedDate,
          dueDate: item.dueDate,
          status: item.status,
          overDue: getDateDiffByDay(new Date(), item.dueDate), 
          tillDue: getDateDiffByDay(item.dueDate, new Date()) ,
          imgUrl : getImageUrl(item.theme)
        }
      })
  } 
      
  useEffect( () =>{    
    if(!user)
    {
      router.replace('/')
      return;
    }
    
    async function fetchData() {
      setRefresh(false)
      
      getUserTasks(user.username); 
    }
    fetchData();
       
  },[refresh])


  

  
  const editRowX = async({value}) => {        
    const task = await getTaskById(value)
    setTask(task)
    setOpenTaskModal(true)
  }
  
  const handleClick_updateTask = (e) => {
		e.preventDefault();
    setOpenTaskModal(false);
    updateTask(task.id, task);
    
    setRefresh(true)
  };


  const columns = React.useMemo(() => [
    {
      Header: "Task",
      accessor: "title",
      Cell: AvatarCell,
      imgAccessor: "imgUrl",
      emailAccessor: "comment",
    },
    {
      Header: "Issued Date",
      accessor: 'issuedDate',
    },
    {
      Header: "Due Date",
      accessor: 'dueDate',
    },
    {
      Header: "Status",
      accessor: 'status',
      Cell: StatusPill,
    },
    
    {
      Header: "Days Over Due",
      accessor: 'overDue',
    },
    {
      Header: "Days Till Due",
      accessor: 'tillDue',
    },  
    {
      id: 'edit',
      accessor: 'id',
      Cell: ({value}) => (<button  className="py-4 px-4 text-lg text-white line  bg-pink-600 dark:bg-[#4a4458] border border-pink-600 dark:border-[#927FBF] rounded-full hover:bg-pink-500 transition duration-300"
                                   onClick={() => editRowX({value})}>
                                <FaRegEdit/>
                          </button>)
    },
    // {
    //   Header: "Role",
    //   accessor: 'role',
    //   Filter: SelectColumnFilter,  // new
    //   filter: 'includes',
    // },
  ], [])

  const data = React.useMemo(() => getTasks(), [userTasks]);
  

  const handleClick_changeStatus = (e, currentStatus, nextStatus) => {
    e.preventDefault();

    if(currentStatus == nextStatus)
      return;
    if(currentStatus == "completed" )
    {

      return;
    }
    if(currentStatus == "failed" )
    {
      
      return;
    }
    if(currentStatus == "canceled" && nextStatus != "running" )
    {
      
      return;
    }
    setTask({...task, status: nextStatus});
    
  }

  return (
    <>
      <div className="">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="">
            <h1 className="text-xl font-semibold text-gray-500 dark:text-gray-400 ">User Tasks ({user?.username})</h1>
          </div>
          <div className="mt-6">
            <Table columns={columns} data={data} />
          </div>
        </main>
      </div>

    
      { openTaskModal &&
        <div  className={`fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full bg-gray-rgba-60 ${openTaskModal && 'transition duration-700 ease-in-out'}`}>
              
          <div className="p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-40">
            <div className="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer"
              onClick={() => ( setOpenTaskModal(!openTaskModal) )}>
              <svg className="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
              </svg>
            </div>

            <div className="shadow w-full rounded-lg bg-white overflow-hidden w-full block p-8">
              
              <h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">Task <span className='py-1 px-3 rounded-md bg-amber-500'>{task.id}</span> Details</h2>
            
              
              <div className="w-full px-3 mb-6 md:mb-0">
                <table className="w-full table-auto border-separate [border-spacing:.25rem]">
                  <tr>
                    <td className='text-right'>
                      <span className="text-gray-800 font-bold text-sm tracking-wide" >
                        Id
                      </span>
                    </td>
                    <td><span className='mx-1 font-bold'>:</span></td>
                    <td>
                      <span className='inline-block w-[300px] mx-2 px-3 py-1 bg-gray-100'>{task.id}</span>
                    </td>
                  </tr>
                  <tr>
                    <td  className='text-right'>
                      <span className="text-gray-800 font-bold text-sm tracking-wide" >
                        Title
                      </span>
                    </td>
                    <td><span className='mx-1 font-bold'>:</span></td>
                    <td>
                      <span className='inline-block w-[300px] mx-2 px-3 py-1 bg-gray-100'>{task.title}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right'>
                      <span className="text-gray-800 font-bold text-sm tracking-wide" >
                        Issued Date
                      </span>
                    </td>
                    <td><span className='mx-1 font-bold'>:</span></td>
                    <td>
                      <span className='inline-block w-[300px] mx-2 px-3 py-1 bg-gray-100'>{task.issuedDate}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right'>
                      <span className="text-gray-800 font-bold text-sm tracking-wide" >
                        Status
                      </span>
                    </td>
                    <td><span className='mx-1 font-bold'>:</span></td>
                    <td className='flex flex-nowrap'>
                      <span className='inline-block w-[300px] mx-2 px-3 py-1 bg-gray-100'>
                         <StatusPill value={task.status} />  
                      </span>
                    
                    </td>
                  </tr>
                 
                  <tr>
                    <td colSpan={3}>
                      <div className="p-5 flex justify-center ">
                        <button  onClick={(e) => handleClick_changeStatus(e, task.status, "canceled")}
                                className="w-full md:w-[40%] flex flex-col items-center justify-center m-2 px-4 py-2 text-gray-800 bg-yellow-200  border border-yellow-500  hover:bg-yellow-300  rounded-md font-semibold capitalize focus:outline-none  focus:ring focus:ring-gray-200 disabled:opacity-25 transition">
                            <span className="text-yellow-900">Canceled</span>                        
                            <span className="text-gray-500">Task</span>
                        </button>
                        <button  onClick={(e) => handleClick_changeStatus(e, task.status, "completed")}
                                className=" w-full md:w-[40%] flex flex-col items-center  m-2 px-4 py-2 text-gray-800 bg-green-200 border border-green-500   hover:bg-green-300 rounded-md font-semibold capitalize focus:outline-none  focus:ring focus:ring-gray-200 disabled:opacity-25 transition">
                            <span className="text-green-900">Complated</span>                          
                            <span className="text-gray-500">Task</span>
                        </button>
                        <button  onClick={(e) => handleClick_changeStatus(e, task.status, "failed")}
                                className="w-full md:w-[40%] flex flex-col items-center justify-center m-2 px-4 py-2 text-gray-800 bg-red-200 border border-red-500   hover:bg-red-300 rounded-md font-semibold capitalize focus:outline-none  focus:ring focus:ring-gray-200 disabled:opacity-25 transition">
                            <span className="text-red-900 ">Failed</span>                            
                            <span className="text-gray-500" >Task</span>
                        </button>
                      </div>
                      
                    </td>
                  </tr>
                </table>
                      
              </div>
                  
            

             
              <div className="mt-8 text-center">                
                <button type="button" className="w-[50%] bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4  rounded-lg shadow-sm" 
                    onClick={ handleClick_updateTask }>
                  Save Task
                </button>	
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}


export default UserTasks