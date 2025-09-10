import { Router } from 'express';
const router = Router();
router.post('/register',(req,res)=>res.json({message:'register placeholder'}));
router.post('/login',(req,res)=>res.json({token:'demo'}));
export default router;
