
import categoryDataProvider from '../../provider/categoryDataProvider';


export default function handler(req, res) {
    
    const categories = categoryDataProvider.getAll();
   
    return res.status(200).json(categories);
}