import { Time } from "@angular/common";
import { Tournee } from "./tournee";

export class Operation{
    op_ID:number;
    op_DT:Date;
    op_HOUR:Time;
    op_Type:string;
    tournee:Tournee;


    constructor(op_DT:Date,op_HOUR:Time, op_TYPE:string, tournee:Tournee){
        this.op_DT=op_DT;
        this.op_HOUR=op_HOUR;
        this.op_Type=op_TYPE;
        this.tournee=tournee;
    }
}