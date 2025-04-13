export const byteFormat = (size: string | number) => {
    const levels = ['B','KB','MB','GB','TB']
    let num = typeof size === 'string' ? Number(size) || 0 : size;
    let level = 0;

    while(num >= 1024){
        num /= 1024;
        level++;
    }
    return `${num.toFixed(1)} ${levels[level]}`
}   

export const byteLevel = (size: string | number) => {
    let num = typeof size === 'string' ? Number(size) || 0 : size;
    let level = 0;

    while(num >= 1024){
        num /= 1024;
        level++;
    }
    return {
        size: parseFloat(num.toFixed(1)),
        level: level
    }
}   