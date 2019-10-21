var formidable = require('formidable');
var fs = require('fs');
const path = require("path");
const connection = require("../utility/database");
const Image = require("./image");
var geoip = require('geoip-lite');

exports.Index = (req, res, next) => {
    res.render("main/index");
}
exports.postImage = (req, res, next) => {
    let idGenerator = Math.floor(Math.random() * 999) + 1;
    let idGenerator2 = Math.floor(Math.random() * 999) + 1;
    let idGenerator3 = Math.floor(Math.random() * 999) + 1;
    let idGenerator4 = Math.floor(Math.random() * 999) + 1;
    let idGenerator5 = Math.floor(Math.random() * 999) + 1;

    var splitWithoutrandomId = [idGenerator, idGenerator2, idGenerator3, idGenerator4, idGenerator5] + [idGenerator + idGenerator2];
    var splitRandomId = splitWithoutrandomId.split(",");
    var randomId = splitRandomId[0] + splitRandomId[1] + splitRandomId[2] + splitRandomId[3] + splitRandomId[4]
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', function (name, file) {
        var fileType = file.type.split('/').pop();
        var fileAd = file.name.split(".");
        const dosyaAdi = file.name;
        // console.log(file.name)
        for (let i = 0; i < dosyaAdi.length; i++){
            (file.name) 
            if (dosyaAdi[i] == "."){
                var dosyaUzantisi = dosyaAdi[i]+fileAd[fileAd.length-1]
            }
        };
        if( dosyaUzantisi != ".php" && dosyaUzantisi != ".html" && dosyaUzantisi!= ".js" && dosyaUzantisi != ".asp" && dosyaUzantisi !=".txt" && dosyaUzantisi != ".psd" && dosyaUzantisi != ".docx" && 2>=fileAd.length && fileType == "png" || fileType == "jpg" || fileType=="jpeg" || fileType == "gif" || fileType == "svg" || fileType == "ico" )
        {
            file.path = path.join(__dirname, '../public') + '/uploads/' + randomId + "-" + file.name;
            const resimAdresi = randomId + "-" + file.name;
            const gidenResim = new Image();
            gidenResim.imageurl = resimAdresi;
            gidenResim.sayac = 0;   
            gidenResim.saveImage()
        }
        else{
            
        }
    });
    form.on('file', function (name, file) {
        const resim = randomId + "-" + file.name
        Image.getByName(resim)
        .then((result)=>{
            const sonuc = result[0][0];
            if(sonuc == undefined){
                res.redirect("/bilgi")
            }
            else{
                res.redirect(`/resim/${randomId + "-" + file.name}`);
            }
        })
        .catch(err =>{
            console.log(err)
        })
    });
}
exports.showImage = (req, res, next) => {
    var geo = geoip.lookup(req.ip);
    const imageUrl = req.params.imageurl;
    const direct = req.protocol + "://" + req.get("host") + "/uploads/" + imageUrl;
    const htmlEmbed = `<a href="${direct}"> <img src="${direct}"> </a> `
    const kontrol = Image.getByName(imageUrl)
        .then((result) => {
            const sonuc = result[0][0];
            if (sonuc == undefined) {
                res.render("main/upload.pug", {
                    title: "Resim Url",
                    found: false,
                    url: req.url
                })
            }
            else {
                let deger = sonuc.sayac + 1;
                Image.updateSayac(deger, imageUrl)
                res.render("main/upload.pug", {
                    title: "Resim Url",
                    found: true,
                    image: imageUrl,
                    direct: direct,
                    htmlEmbed: htmlEmbed,
                    sayac: deger,
                })
            }
        }).catch((err) => {
            console.log(err)
        });
}
exports.bilgi = (req,res,next)=>{
    res.render("main/info")
}
