import { Time } from "@angular/common";
import { Secteur } from "./secteur";

export class Planification{
	planif_ID:number;
	planif_NAME:string;
    planif_ENDDT:Date;
    planif_DEBDT:Date;
	planif_HOUR:Time;
	planif_DAY:string;
	planif_TYPE:string;
	planif_STATE:string;
	planif_CREDT:Date;
    planif_UPDTDT:Date;
    secteur:Secteur;
    constructor(planif_NAME:string, planif_ENDDT:Date, planif_DEBDT:Date, planif_HOUR:Time,
        planif_DAY:string, planif_TYPE:string, planif_STATE:string, planif_CREDT:Date,
        planif_UPDTDT:Date, secteur:Secteur){
           this.planif_NAME=planif_NAME;
           this.planif_ENDDT=planif_ENDDT;
           this.planif_DEBDT=planif_DEBDT;
           this.planif_HOUR=planif_HOUR;
           this.planif_DAY=planif_DAY;
           this.planif_TYPE=planif_TYPE;
           this.planif_STATE=planif_STATE;
           this.planif_CREDT=planif_CREDT;
           this.planif_UPDTDT=planif_UPDTDT;
           this.secteur=secteur;
        }
}