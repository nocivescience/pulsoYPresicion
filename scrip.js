const getAngle=(p1,p2)=>{
    let angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    return angle;
}
const rollAroundCap=(roll, cap) => {
    let impactAngle = getAngle(roll, cap);
    let impactAngleDeg = impactAngle * 180 / Math.PI;
    return impactAngleDeg;
}
console.log(rollAroundCap({x:0,y:0},{x:1,y:1}));