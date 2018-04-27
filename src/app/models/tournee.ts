import { Releveur } from "./releveur";
import { Secteur } from "./secteur";

export class Tournee{

	tour_ID:number;
	tour_CODE:string;
	tour_NAME:string;
    tour_DURATION:number;
	tour_COMMENT:string;
	tour_CREDT:Date;
	tour_UPDTDT:Date;
	tour_STATE:string;
	tour_AFFDT:Date;
	tour_PREVDT:Date;
	pere:Tournee;	
	secteur:Secteur;
	releveur:Releveur;    
}