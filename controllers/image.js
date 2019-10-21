const connection = require("../utility/database");
module.exports = class Image {
    constructor(imageurl,sayac){
        this.imageurl = imageurl;
        this.sayac = sayac;
    }
    saveImage(){
        return connection.execute("INSERT INTO images (imageurl,sayac) VALUES(?,?)",[this.imageurl,this.sayac])
    }
    static getAll(){
        return connection.execute("SELECT * FROM images");
    }
    static getByName(id){
        return connection.execute("SELECT * FROM images WHERE imageurl=?",[id]);
        
    }
    static updateSayac(deger,id){
        return connection.execute("UPDATE images SET images.sayac=? WHERE imageurl=?",[deger,id]);
    }
}