const { getDb } = require("../utils/dbConnect");

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

module.exports.saveTool = async (req, res, next) => {
    try {
        const db = getDb();
        const tool = req.body;
        const result = await db.collection("tools").insertOne(tools);
        console.log(result);
        if (!result) {
            return res.status(400).send({ status: false, error: "Something went wrong" })
        }
        res.send(`Tool added with id${result.insertedId}`)


        /** dunota same 
        if (result.insertedId) {
            res.send(`Tool added with id${result.insertedId}`)
        }  */
    } catch (error) {
        next(error);
    }
}

module.exports.getToolDetail = (req, res, next) => {
    const { id } = req.params;
    // const filter = { _id: id };
    const foundTool = tools.find(tool => tool.id === Number(id));
    res.status(200).send({
        success: true,
        message: 'Successfully',
        data: foundTool
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
