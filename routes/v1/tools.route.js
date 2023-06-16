const express = require('express');
const toolsControllers = require('../../controllers/tools.controller');
const viewCount = require('../../middleware/viewCount');
const limiter = require('../../middleware/limiter');

// const { limiter } = require('../..');
// const accUserControllers = require('../../controllers/accUser.controller');
// const { limiter } = require('../../middleware/limiter');
// const viewCount = require('../../middleware/viewCount');
const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("tools found id")
// });

// router.post("/", (req, res) => {
//     res.send('tool add')
// })

router.route('/')
/**
   * @api {get} /tools All tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
.get(toolsControllers.getAllTools)

/**
   * @api {post} /tools save tool
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
.post(toolsControllers.saveTool);

router.route('/:id').get(viewCount,limiter,toolsControllers.getToolDetail)
.patch(toolsControllers.updateTool)
.delete(toolsControllers.deleteTool)


module.exports = router;