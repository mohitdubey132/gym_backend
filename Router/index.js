import express from 'express';
import v1Router from './v1/index.js';

import v2Router from './v2/index.js';
const router = express.Router();

router.use('/v1',v1Router)
router.use("/v2",v2Router)
export  default router;
