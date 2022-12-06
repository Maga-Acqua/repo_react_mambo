var pool = require('./db');

async function getProductos(){
    try{
        var query = "select * from productos order by id desc";
        var rows = await pool.query(query);
        return rows;
    }catch(error){
        throw error;
    }
}

async function insertProduct(obj){
    try{
        var query = "insert into productos set ? ";
        var rows = await pool.query(query, [obj]);
        return rows;
    }catch(error){
        throw error;
    }
}

async function deleteProductById(id){
    try{
        console.log(id);
        var query = " delete from productos where id = ? ";
        var rows = await pool.query(query, [id]);
        return rows;
    } catch(error){
        throw error;
    }  
}

async function getProducById(id){
    try{
        console.log(id);
        var query = " select * from productos where id = ? ";
        var rows = await pool.query(query, [id]);
        return rows[0];
    } catch(error){
        throw error;
    }  
}

async function editProductById(obj, id){
    try{
        console.log(id);
        var query = " update productos set ? where id = ? ";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch(error){
        throw error;
    }
}

module.exports = { getProductos, insertProduct, deleteProductById, getProducById, editProductById }