import { Router } from "express";
import {getContactUs , addContactUs} from '../controllers/contactus.controller.js'

const router = Router()

router.route("/getContactus").get(getContactUs)
router.route("/addContactus").post(addContactUs)

export default router;