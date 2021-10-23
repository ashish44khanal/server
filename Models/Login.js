const db=require('../config/db')
class Login {
    constructor(username,password){        
        this.username=username,
        this.password=password
    }
    create(){
        let createSql=`insert into login (username,password) values ('${this.username}','${this.password}')`;
        return db.execute(createSql);
    }
    login (){
        let findSql=`SELECT * FROM login WHERE username='${this.username}' AND password='${this.password}' `;
        return db.execute(findSql)
    }
    static findAll(){
        let sql='SELECT * FROM login;';
        return db.execute(sql);
    }
    static findById(id){
        return db.execute(`SELECT * FROM LOGIN WHERE ID=${id}`)
    }
    static findUser(username){
        return db.execute(`SELECT * FROM LOGIN WHERE username='${username}'`)
    }
  
    updateAdmin(id){
        let updateSql=`UPDATE LOGIN SET username='${this.username}',password='${this.password}' where id='${id}';`; 
        return db.execute(updateSql);
    }
}
module.exports=Login;