import questionDataProvider from '../../provider/questionDataProvider';


export default function handler(req, res) {
    
    if (req.method === 'POST') {        
        const { ...question } = req.body;           
        questionDataProvider.create(question);
        return res.status(200).json({});
    } 
    else if (req.method === 'GET') {
        
        let questions = [];
        const { cid } = req.query        
        if(cid)
        {                       
            questions = questionDataProvider.find(d => d.categoryId == cid);  
                 
            return res.status(200).json(questions);                     
        }

        const { qid } = req.query
        if(qid){           
            questions = questionDataProvider.getById(qid);   
           
            return res.status(200).json(questions);  
        }
        
        questions = questionDataProvider.getAll();
      
        return res.status(200).json(questions);
    }
    
   
    
}