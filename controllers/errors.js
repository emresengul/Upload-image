exports.get404Page = (req,res)=>{
    res.status(404);
    res.render("main/404",
    {
        title: "Page Not Found",
        url: req.url
    })
};