import type { Response } from "express";

export function allProcedimientos(/*req: Request,*/ res: Response){
    res.status(200).json({message: 'Procedimientos encontrados'});
}