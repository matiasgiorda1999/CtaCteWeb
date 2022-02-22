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
    let newComp = letter ? `${letter} 0001-00000000` : '0001-00000000';
    compNum = compNum.toString();
    newComp = newComp.slice(0,newComp.length - compNum.length) + compNum;
    return newComp
}

export const toDomicile = (location, province, country) => {
    let domicile = `${location?location:''}${province?location?', ' + province:province:''}${country?province?' - ' + country:country:''}`;
    return(domicile)
}

export const toAmount = (amount) => {
    let newAmount = amount.toString().replace(".",",");
    let index = newAmount.indexOf(",");
    if(index === -1){
        index = newAmount.length;
    }else{
        newAmount = newAmount.slice(0,index + 3);
    }
    let pointers = newAmount.includes("-") ? parseInt((index -1) / 3) : parseInt(index / 3);
    if(index % 3 === 0 || (newAmount.includes("-") && (index - 1 ) % 3 === 0)) pointers = pointers -1;
    for(let i = 1 ; i <= pointers ; i++){
        newAmount = newAmount.slice(0,(index - i*3)) + "." + newAmount.slice((index - i*3));
    }
    return newAmount;
}