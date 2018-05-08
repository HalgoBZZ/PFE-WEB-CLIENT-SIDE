import { Time } from "@angular/common";
import { Secteur } from "./secteur";

export class Planification{
	planif_ID:number;
	planif_NAME:string;
    planif_ENDDT:Date;
    planif_DEBDT:Date;
	planif_DAY:string;
	planif_TYPE:string;
	planif_STATE:string;
	planif_CREDT:Date;
    planif_UPDTDT:Date;
    secteur:Secteur;
    
}