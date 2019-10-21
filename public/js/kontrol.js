var imageUpload = document.getElementById("upload");
var image = document.getElementById("resim");
var resimAdi = document.getElementById("resimadi");

imageUpload.addEventListener("change",rengiDegistir)

function rengiDegistir(){
   image.style.background = "red";
//    C:\fakepath\ resim adı
    var deger = imageUpload.value
    const sadeceIsim = deger.slice(12,deger.length);
    var deger2 = deger.split("fakepath");
    const basindaSlasholanIsim = deger2[1];

    // const deneme = resimAd.trim("\");
    resimAdi.innerHTML = sadeceIsim;

}