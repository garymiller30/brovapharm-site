import PsItem from "./psItem";

export default class PS {
    Id: Number;
    Number: number;
    Back: boolean = true;
    Count: number = 0;
    pages: Array<PsItem> = [new PsItem(1), new PsItem(2), new PsItem(3), new PsItem(4), new PsItem(5), new PsItem(6)];
    constructor(number: number) {
        this.Number = number;
        this.Id = new Date().getTime();
    }
}

