import { ObjectId } from "mongodb";
import { ORDER_STATUS } from "../var/orderStatusEnum";
import PS from "./ps";

export default class Order {
    id?: ObjectId;
    Number: number;
    CreateDate: Date = new Date();
    Status: ORDER_STATUS = ORDER_STATUS.NEW;
    sheets: PS[];

    constructor(number: number = 0, sheets: PS[] = []) {
        this.Number = number;
        this.sheets = sheets;
    }

}