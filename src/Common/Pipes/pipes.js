export const toDateSpanish = (date) => {
    let dateSpanish = new Date(date.slice(0,10));
    dateSpanish.setDate(dateSpanish.getDate() + 1);
    return dateSpanish.toLocaleDateString();
}

export const toCUITformat = (cuit) => {
    cuit = cuit.toString();
    let cuitFormat = `${cuit.slice(0,2)}-${cuit.slice(2,cuit.length-1)}-${cuit.slice(cuit.length-1,cuit.length)}`;
    return cuitFormat;
}

export const toCompNumber = (letter,compNum) =>{
    let newComp = `${letter} 0001-00000000`;
    compNum = compNum.toString();
    newComp = newComp.slice(0,newComp.length - compNum.length) + compNum;
    return newComp
}

export const toDomicile = (location, province, country) => {
    let domicile = `${location?location:''}${province?location?', ' + province:province:''}${country?province?' - ' + country:country:''}`;
    return(domicile)
}