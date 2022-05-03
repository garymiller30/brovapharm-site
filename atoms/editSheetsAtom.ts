import { atom } from "recoil";
import PS from "../models/ps";

interface iEditSheetsAtomProps {
    sheets: PS[];
}

export const editSheetsAtom = atom<iEditSheetsAtomProps>({
    key: "editSheetAtopm",
    default: { sheets: [] as PS[] }
})