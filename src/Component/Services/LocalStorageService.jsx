const setItem=(key,value)=>{
    localStorage.setItem(key,JSON.stringify(value))
}

const getItem=(key)=>{
    return JSON.parse(localStorage.getItem(key));
}

const removeItems=(key)=>{
    localStorage.removeItem(key);
}

export {setItem,getItem,removeItems};