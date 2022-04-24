import { ObjectId } from "mongodb";
import PS from "./ps";

export default class Order {
    id?: ObjectId;
    Number: number;
    sheets: PS[];

    constructor(number: number = 0, sheets: PS[] = []) {
        this.Number = number;
        this.sheets = sheets;
    }

}