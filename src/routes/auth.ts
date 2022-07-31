import { Router } from "express";
const router:Router = Router();
import { signin, signup, profile} from '../controllers/auth.controllers';
import { TokenValidation } from "../libs/verifyToken";

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/profile',TokenValidation, profile)



export default router;
