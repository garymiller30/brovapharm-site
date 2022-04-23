import PS from "../models/ps";


const psCheck = (ps: PS) => {
    if (ps.Back) return !ps.pages.some(p => !p.Number)

    return !ps.pages.filter(p => p.Id % 2 !== 0).some(p => !p.Number);
}



export default psCheck;