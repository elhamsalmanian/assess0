import taskDataProvider from '../../provider/taskDataProvider';


export default function handler(req, res) {
    
    if (req.method === 'POST') {  
            
        const { ...task } = req.body;           
        taskDataProvider.create(task);
        return res.status(200).json({});
    } 
    else if (req.method === 'PUT') {   
        
        const {tid}  = req.query   
        console.log('tid')
        console.log(tid)
        const { ...task } = req.body;  
        console.log(task)         
        taskDataProvider.update(tid, task);
        return res.status(200).json({});
    }     
    else if (req.method === 'GET') {
       
        let tasks = [];
        const { uid } = req.query        
        if(uid)
        {                       
            tasks = taskDataProvider.find(d => d.username == uid);  
          
            return res.status(200).json(tasks);                     
        }

        const { tid } = req.query
        if(tid){           
            tasks = taskDataProvider.getById(tid);   
          
            return res.status(200).json(tasks);  
        }
        
        tasks = taskDataProvider.getAll();
        
        return res.status(200).json(tasks);
    }
    
   
    
}