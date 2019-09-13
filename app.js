import * as tf from "@tensorflow/tfjs"

const model = tf.sequential();
model.add(tf.layers.dense({units: 5, activation: 'sigmoid', inputShape: [81]}));
model.add(tf.layers.dense({ units: 4, activation: 'softmax' , outputShape: [2] }));
 
model.compile({loss: 'categoricalCrossentropy', optimizer: tf.train.adam(0.1)});

function BANG(){
    console.log(tf.version)
}
function mapping(kelas){
    if (kelas=='A'){
        return [1,0,0,0]
    } else if(kelas=='B'){
        return [0,1,0,0]
    } else if(kelas=='C'){
        return [0,0,1,0]
    }
    else if (kelas=='V'){
        return [0,0,0,1]
    }
    
}

function sendArray(){
    let res = []
    var dom = document.getElementById("matrix-table")
    var x = dom.querySelectorAll("td")
    var select = document.getElementById("s")
    for(let i=0;i<x.length;i++){
        res.push(parseInt(x[i].innerText))
    }
    let val = select.options[select.selectedIndex].value
    
    return {"res":res,"y":val,"y_encode":mapping(val)}
}
function gantiWarna(){
    console.log("Clicked")
    var y = document.querySelectorAll("td")[0]
    y.style.backgroundColor = "red"
    y.innerText = parseInt(y.innerText)+1
}

function generateTable(){
    let count = 0
    var tb1 = document.createElement("table")
    tb1.id="matrix-table"
    var tb1Body = document.createElement("tbody")

    for(let i=0; i<9;i++){
        var row = document.createElement("tr")
        for(let j=0; j<9; j++){
            var cell = document.createElement("td")
            cell.innerText = 0
            cell.id = `${count}`
            
            count +=1
            row.appendChild(cell)
            cell.addEventListener('click',getClick)
         
        }
        tb1Body.appendChild(row)
    }
    tb1.appendChild(tb1Body)
    document.getElementById("matrix").appendChild(tb1)
    console.log(document.getElementById(2))
}
let id= 0
let X = []
let y = []
function saveDS(){

    let n = sendArray()
    var tb2body = document.getElementById("body-res")
    var row =document.createElement("tr")
    var cell = document.createElement("td")
    var cell2 = document.createElement("td")
    var cell3 = document.createElement("td")
    console.log(n)
    cell.innerText = id; id+=1;
    cell2.innerText = n.y
    cell3.innerText = n.y_encode.join(" ")
    X.push(n.res)
    y.push(n.y_encode)
    row.appendChild(cell); row.appendChild(cell2); row.appendChild(cell3);
    tb2body.insertAdjacentElement('afterbegin',row)
    console.log("BAll")

}
function getClick(){
    var x =event.target
    var n = (parseInt(x.innerText)+1)%2
    if (n==1){
        x.style.backgroundColor = "black"
    } else {
        x.style.backgroundColor = "white"
    }
    x.innerText = n
}

function clean(){
    var mm = document.getElementById("matrix-table")
    mm.querySelectorAll("td").forEach(n=> {
        n.innerText = 0
        n.style.backgroundColor = "white"
    })
}

function train(){
    const xs = tf.tensor2d(X)
    const ys = tf.tensor2d(y)
    console.log(xs.shape)
    console.log(ys.shape)
    console.log(model.summary())
}

window.generateTable = generateTable
window.clean = clean
window.BANG = BANG
window.getClick = getClick
window.saveDS = saveDS
window.train = train
