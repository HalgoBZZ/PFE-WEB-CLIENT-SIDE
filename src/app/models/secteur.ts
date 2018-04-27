export class Secteur{
    sec_ID:number;
    sec_CODE:string;
    sec_CREDT:Date;
    sec_UPDTDT:Date;
    sec_NAME:string;
    constructor(sec_CODE:string, sec_CREDT:Date, sec_UPDTDT:Date, sec_NAME:string){
        this.sec_CODE=sec_CODE;
        this.sec_CREDT=sec_CREDT;
        this.sec_NAME=sec_NAME;
        this.sec_UPDTDT=sec_UPDTDT;
    }
}