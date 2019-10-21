const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const adminRoutes = require("./routes/admin.js");
const userRoutes = require("./routes/user");
const errorController = require("./controllers/errors");
const PORT = process.env.PORT;





app.set("view engine","pug");
app.set("views","./views"); // Dosyaların nerede saklanacağına karar verir.


app.use(bodyParser.urlencoded( {extended:false} ));
app.use(express.static(path.join(__dirname,"public")));



app.use(userRoutes);

app.use(errorController.get404Page);


app.listen(PORT || 8080,()=>{
    console.log(`App Starting on port ${PORT}`)
});
