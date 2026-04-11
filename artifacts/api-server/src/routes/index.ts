import { Router, type IRouter } from "express";
import healthRouter from "./health";
import appointmentsRouter from "./appointments";
import contactRouter from "./contact";
import authRouter from "./auth";
import adminRouter from "./admin";
import patientRouter from "./patient";

const router: IRouter = Router();

router.use(healthRouter);
router.use(appointmentsRouter);
router.use(contactRouter);
router.use(authRouter);
router.use(adminRouter);
router.use(patientRouter);

export default router;
