import { Router } from "express";
import {getNavItem, addNavItem, updateNavItem, deleteNavItem} from '../controllers/navmenu.controller.js'

const router = Router()

router.route("/getNavItems").get(getNavItem)
router.route("/addNavItem").post(addNavItem)


export default router;