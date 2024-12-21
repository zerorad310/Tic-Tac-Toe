const cell = document.getElementsByClassName("cell");
const mainButton = document.getElementById("mainButton");

// for (let i = 0; i < cell.length; i++){
//     cell[i].addEventListener(
//         "mouseover", 
//         (event) => {
//         event.target.style.backgroundColor = "#244855";});
// }

// for (let i = 0; i < cell.length; i++){
//     cell[i].addEventListener(
//         "mouseout", 
//         (event) => {
//         event.target.style.backgroundColor = "#90AEAD";});
// }

// To try later to apply color effect on mouseover and mouseout actions. Also, not reverting the color back.

// for (let i = 0; i < cell.length; i++){
//     cell[i].addEventListener(
//         "mouseover", 
//         (event) => {
//         if (target.style.backgroundColor != "#ffffff"){
//             event.target.style.backgroundColor = "#244855";}});
// }

// for (let i = 0; i < cell.length; i++){
//     cell[i].addEventListener(
//         "mouseout", 
//         (event) => {
//         if (target.style.backgroundColor != "#ffffff"){
//         event.target.style.backgroundColor = "#90AEAD";}});
// }

mainButton.addEventListener("click", (event) => 
    {
        
        const gBoardVar = gBoard();
        gamePlay(gBoardVar);
    });



function gBoard(){
    gBoardObj = {'a1':'','b1':'','c1':'','a2':'','b2':'','c2':'','a3':'','b3':'','c3':''};
    trackArray = [0,1,2,3,4,5,6,7,8];
    winningVar = '';

    for (let i = 0; i < cell.length; i++){
        cell[i].style.backgroundColor = "#90AEAD";};

    return {humanPlay(){
            let k = prompt('Give cell number')
        
            gBoardObj[k]='x';
            const selectedCell = document.getElementById(k);
            selectedCell.style.backgroundColor = "#ffffff"


            // below loop find index of the key that is getting updated. 
            // once found, the index number will be removed from trackArray, so that the machine could use only the left over numbers to randomly pick a position
            for (let i = 0; i < Object.keys(gBoardObj).length; i++){
                if (Object.keys(gBoardObj)[i] == k){
                    for (let j = 0; j < trackArray.length; j++){
                        if (trackArray[j] == i){
                            let removedNum = trackArray.splice(j, 1);}}}}},
            
            gBoardReturn(){
                return gBoardObj},

            gBoardReturn1(){
                const keys = Object.keys(gBoardObj);
                const Length = keys.length;
                const newObj = {};
                
                for (let i = 0; i < 3; i++) {
                    const key = keys[i];
                    newObj[key] = gBoardObj[key];}
                
                  return newObj;},

            gBoardReturn2(){
                const keys = Object.keys(gBoardObj);
                const Length = keys.length;
                const newObj = {};
                
                for (let i = 3; i < 6; i++) {
                    const key = keys[i];
                    newObj[key] = gBoardObj[key];}
                
                  return newObj;},
            
            gBoardReturn3(){
                const keys = Object.keys(gBoardObj);
                const Length = keys.length;
                const newObj = {};
                
                for (let i = 6; i < 9; i++) {
                    const key = keys[i];
                    newObj[key] = gBoardObj[key];}
                
                  return newObj;},
            
            trackArrayReturn(){
                return trackArray},

            // machinePlay fn will randomly select a number from trackArray, which will be an index of the key that will be selected from the object.
            machinePlay(){
                randomTrackArrayIndex = trackArray[Math.floor(Math.random() * trackArray.length)];
                let correspondingKey = Object.keys(gBoardObj)[randomTrackArrayIndex];
                gBoardObj[correspondingKey] = 'o';

                //removing the used key's index number from trackArray array.
                for (let j = 0; j < trackArray.length; j++){
                    if (trackArray[j] == randomTrackArrayIndex){
                        let removedNum = trackArray.splice(j, 1);}}},

            gameResultCheck(icon){
                let alphaArray = ['a','b','c'];
                let numArray = [1,2,3];
                for (alpha in alphaArray){
                    let sameCount = 0
                    for (num in numArray){
                        let concKey = alphaArray[alpha] + numArray[num];
                        // console.log(concKey)
                        if (gBoardObj[concKey] == icon){
                            sameCount++};
                        if (sameCount == 3){return icon};}}

                for (num in numArray){
                    let sameCount = 0
                    for (alpha in alphaArray){
                        let concKey = alphaArray[alpha] + numArray[num];
                        // console.log(concKey)
                        if (gBoardObj[concKey] == icon){
                            sameCount++};
                        if (sameCount == 3){return icon};}}

                if (gBoardObj.a1 == gBoardObj.b2 && gBoardObj.b2 == gBoardObj.c3 && gBoardObj.c3 == icon){return icon}
                if (gBoardObj.a3 == gBoardObj.b2 && gBoardObj.b2 == gBoardObj.c1 && gBoardObj.c1 == icon){return icon}
                
                return 'dud'
            },
            
            winningVarReturn(){return winningVar}
}
};





function gamePlay(gBoardVar){
    randInt = Math.floor(Math.random() * 2)==0

    playCounter = 0;
    while (playCounter < 9){
        if (randInt == 0 && playCounter%2 == 0){gBoardVar.humanPlay()}
        else if (randInt == 0 && playCounter%2 == 1){gBoardVar.machinePlay()}
        else if (randInt == 1 && playCounter%2 == 0){gBoardVar.machinePlay()}
        else if (randInt == 1 && playCounter%2 == 1){gBoardVar.humanPlay()}
        playCounter++;
        console.log(playCounter);
        // console.log(gBoardVar.gBoardReturn());
        console.log(gBoardVar.gBoardReturn1());
        console.log(gBoardVar.gBoardReturn2());
        console.log(gBoardVar.gBoardReturn3());
        if (gBoardVar.gameResultCheck('x')=='x'){
            console.log('Human is the winner');
            return 'Human is the winner'};
        if (gBoardVar.gameResultCheck('o')=='o'){
            console.log('Machine is the winner');
            return 'Machine is the winner'};}
    
    console.log("It's a Draw")
    return "It's a Draw"
}


// Change the functions to not a loop
// machinePlay should just be machinePLay + resultcheck
// HumanPlay should be humanplay + resultcheck + roundsCheck + machinePlay
