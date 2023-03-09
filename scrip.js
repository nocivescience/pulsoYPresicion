let balls=[];
const getAngle=(p1,p2)=>{
    let angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    return angle;
}
const rollAroundCap=(cap, ball) => {
    let impactAngle = getAngle(ball, cap);
    let impactAngleDeg = impactAngle * 180 / Math.PI;
    let heading = getAngle(
        {x:0,y:0},
        {x:ball.velocityX,y:ball.velocityY}
    );
    let impactHeadingAngle= impactAngleDeg - heading;
    const velocityMagnitude=distante2D(
        {x:0,y:0},
        {x:ball.velocityX,y:ball.velocityY}
    )
    const velocityMagnitudeDiagonalToTheImpact=Math.sin(impactHeadingAngle)*velocityMagnitude;
    const closestDistance=wallW/2+ballSize/2;
    const rotationAngle=Math.atan(velocityMagnitudeDiagonalToTheImpact/closestDistance);
    const deltaFromCap={
        x: Math.cos(impactAngle+Math.PI-rotationAngle)*closestDistance,
        y: Math.sin(impactAngle+Math.PI-rotationAngle)*closestDistance
    }
    const x=ball.x
    const y=ball.y
    const velocityX= ball.x-(cap.x+deltaFromCap.x);
    const velocityY= ball.y-(cap.y+deltaFromCap.y);
    const nextX=ball.x+velocityX;
    const nextY=ball.y+velocityY;
    return {
        x,
        y,
        velocityX,
        velocityY,
        nextX,
        nextY,
    }
}
function resetGame(){
    balls=[
        {column:0, row:0},
        {column:9, row:0},
        {column:0, row:8},
        {column:9, row:8}
    ].map((ball)=>({
        x:ball.column*100+50,
        y:ball.row*100+50,
        velocityX:3,
        velocityY:4,
    }));
};
function distante2D(p1,p2){
    return Math.sqrt(
        Math.pow(p2.x-p1.x,2)+
        Math.pow(p2.y-p1.y,2)
    )
}
const wallW=1000;
const ballSize=10;
const holeSize=20;
const debugMode=false;
resetGame();
console.log(rollAroundCap({x:50,y:50},balls[0]));
const slow=(number,difference)=>{
    if(Math.abs(number)<=difference){
        return 0
    }
    if(number>difference){
        return number-difference
    }
    // return number+difference
}
const mazeElement=