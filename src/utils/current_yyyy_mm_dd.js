const yyyy_mm_dd = () => {
    let today = new Date();
    let date = []

    date.push(today.getFullYear());
    date.push(today.getMonth()+1);
    date.push(today.getDate());
    if(date[0] < 10) date[0]='0'+date[0];
    if(date[1] < 10) date[1]='0'+date[1];

    return date.join('-');
}

export default yyyy_mm_dd;