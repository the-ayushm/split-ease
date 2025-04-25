import express from "express"
import protectRoute from "../middleware/protectRoute"
import {createGroup} from "../controllers/group.controller.js" 
const router = express.Router()

router.post("/create" ,protectRoute ,createGroup) 
// router.post("/login" , login)
// router.post("/logout" , logout) 
 
export default router  