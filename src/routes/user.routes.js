import {Router} from "express"
import { registerUser } from "../controllers/user.controller.js"

const router = Router()

router.route("/resgister").get(registerUser)

export default router