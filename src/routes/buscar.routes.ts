import { buscar } from "@controllers/buscar.controller";
import { Router } from "express";

const router = Router()


router.get('/:coleccion/:termino', buscar)


export default router