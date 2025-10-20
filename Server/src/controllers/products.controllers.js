import connection from '../config/db.js';





//get all products
export const getAllProducts = async (req,  res) => {

try {
    const [row] = await connection.execute('SELECT * FROM Products')
    res.status(200).json(row) 
} catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message})
}


}