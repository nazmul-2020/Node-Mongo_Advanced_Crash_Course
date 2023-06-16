let tools = [
    { id: 1, name: "test" },
    { id: 2, name: "test" },
    { id: 3, name: "test" },
    { id: 4, name: "test" }
]

module.exports.getAllTools = (req, res, next) => {
    // res.download(__dirname + '/tools.controller.js');
    // res.json({"name":"qaz"})
    // res.redirect('/login'

    const { limit, page } = req.query;
    console.log(limit, page);
    res.json(tools)
}

module.exports.saveTool = (req, res, next) => {
    console.log(req.query);
    tools.push(req.body);
    res.send(tools)
}

module.exports.getToolDetail = (req, res, next) => {
    const { id } = req.params;
    // const filter = { _id: id };
    const foundTool = tools.find(tool => tool.id === Number(id));
    res.status(200).send({
        success:true,
        message:'Successfully',
        data:foundTool
    });

    // res.status(500).send({
    //     success:false,
    //     error:"Internal Server Error"
    // });
};

module.exports.updateTool = (req, res, next) => {
    const { id } = req.params;
    const filter = { _id: id };
    const newData = tools.find(tool => tool.id === Number(id));
    newData.id = id;
    newData.name = req.body.name;
    res.send(newData);
}

module.exports.deleteTool = (req, res) => {
    const { id } = req.params;
    const filter = { _id: id };
    tools = tools.filter(tool => tool.id !== Number(id));
    res.send(tools)

}
