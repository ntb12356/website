import { Router, type IRouter } from "express";
import healthRouter from "./health";
import appointmentsRouter from "./appointments";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(appointmentsRouter);
router.use(contactRouter);

export default router;
