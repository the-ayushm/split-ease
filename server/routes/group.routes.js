import express from "express"
import protectRoute from "../middleware/protectRoute.js"
import { createGroup ,joinGroup, regenerateCode, deleteGroup} from "../controllers/group.controller.js"
const router = express.Router()

router.post("/create", protectRoute, createGroup)
router.post('/join', protectRoute, joinGroup)
router.post('/regenerate-code',protectRoute, regenerateCode) 
router.post('/delete',protectRoute, deleteGroup)  



export default router       