const formatDate=(dateString)=>{
    const date=new Date(dateString);
    const option={year:"numeric",month:"short"};
    return date.toLocaleString('en-US',option);
}

const timeAgo=(time)=>{
    const now=new Date();
    const postDate=new Date(time);
    const diff=now.getTime() - postDate.getTime();

    const secound=Math.floor(diff/1000)
    const minute=Math.floor(secound/60)
    const hour=Math.floor(minute/60)
    const days=Math.floor(hour/24);
    const month=Math.floor(days/30);

    if(secound<60)
        return `${secound} secound ago`;
    else if(minute<60)
        return `${minute} minute ago`;
    else if(hour<24)
        return `${hour} hour ago`;
    else if(days<60)
        return `${days} days ago`;
    else
        return `${month} month ago`;
}


const formateInterviewTime=(date)=>{
    const  dates =new Date(date);

    return dates.toLocaleString('en-US',{
        year:'numeric',
        month:'long',
        day:'numeric',
        hour:'numeric',
        minute:'numeric',
        hour12:true
    })
}
export {formatDate,timeAgo,formateInterviewTime};