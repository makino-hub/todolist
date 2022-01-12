//要素の作成
function createElm(getElm){
   let createElm =  document.createElement(getElm);
   return createElm;
}

//要素にクラスを付与する関数
function addClass(elm,className){
    elm.classList.add(className);
}


// 文字の入力
let inputedText = document.getElementById('input_text');
let addBtn = document.getElementById('add_button');

// listのulのidを取得
let listUl = document.getElementById('list_ul');


// 入力したテキストを取得
let GetText;
addBtn.addEventListener('click',function(){
    GetText = inputedText.value;//値の取得
    inputedText.value=''; //フォームの初期化
    if(GetText == ''){
        inputedText.placeholder = 'Please enter the characters';
        inputedText.classList.remove('input_text');
        inputedText.addClass('input_text_null');
    }else{
        createList(GetText);
        inputedText.placeholder = 'What needs to be done?';
        inputedText.classList.remove('input_text_null');
        inputedText.addClass('input_text');
    }
});




// add button 要素を作って、入力したテキストをリストで出力
let elemLi;
let mainDiv;
let ListNumber = 0 ; //要素の数
let elemDiv_1;
let elemDiv_2;
let elemDiv_3;
let elemDiv_4;
let elemDiv_5;
let elemInput;


function createList(getText){
    elemLi = createElm('li');//listの作成
    listUl.appendChild(elemLi);//ulにli要素の追加
    addClass(elemLi,'oneLine');
    mainDiv = createElm('div');//divの作成
    elemLi.appendChild(mainDiv);//liの中にdiv要素を生成
    addClass(mainDiv,'list' );
    // mainDiv.classList.add('list');//list Classの追加
    //チェックボックスを作成
    elemInput = createElm('input');
    mainDiv.appendChild(elemInput);
    elemInput.type = 'checkbox';
    elemInput.name = 'checkname';
    addClass(elemInput , 'checkboxs');
    elemInput.onclick = mycheck;

    elemDiv_1 = createElm('div');//divの作成
    mainDiv.appendChild(elemDiv_1 );
    addClass(elemDiv_1 , 'display_text');
    elemDiv_1.innerHTML = getText;
   
    //edit logo の作成
    elemDiv_2 = createElm('div');//divの作成
    mainDiv.appendChild(elemDiv_2);
    addClass(elemDiv_2 ,'edit_logo' );
    elemDiv_2.onclick = EditBtn ;
    elemDiv_3 = createElm('div');//divの作成
    elemDiv_2.appendChild(elemDiv_3);
    addClass(elemDiv_3 , 'edit');
    addClass(elemDiv_3 , 'icon');

    //delete logo の作成
    elemDiv_4 = createElm('div');//divの作成
    mainDiv.appendChild(elemDiv_4);
    addClass(elemDiv_4 , 'delete_logo');
    elemDiv_4.onclick = deleteList;
    elemDiv_5 = createElm('div');//divの作成
    elemDiv_4.appendChild(elemDiv_5);
    addClass(elemDiv_5 , 'close');
    addClass(elemDiv_5 , 'icon');
    ListNumber +=1; 
    checkedNumber = checkedNumber;
    changeLength(checkedNumber , ListNumber);//ゲージ部分のテキストを変更
    saveDate();

}




// edit button を押した時の処理
function EditBtn(e){
        let target = e.target;
        if(target.className == 'edit icon'){//edit logoの方をクリックされた時の処理
            let parent = target.parentElement;
            if(parent.previousElementSibling.className == 'display_text' ){
                let editInput = createElm('input');
                editInput.type = 'text';
                addClass(editInput , 'edit_text');
                editInput.value = parent.previousElementSibling.textContent;
                parent.previousElementSibling.replaceWith(editInput);
                parent  = '';
            }else if(parent.previousElementSibling.className == 'edit_text'){
                let editDiv = createElm('div');
                addClass(editDiv , 'display_text');
                editDiv.innerHTML = parent.previousElementSibling.value;
                parent.previousElementSibling.replaceWith(editDiv);
                parent  = '';
            }
        }else if(target.className == 'edit_logo'){//edit logo の外側のdivをクリックされた時
            if(target.previousElementSibling.className == 'display_text' ){
                let editInput = createElm('input');
                editInput.type = 'text';
                addClass(editInput , 'edit_text');
                editInput.value = target.previousElementSibling.textContent;
                target.previousElementSibling.replaceWith(editInput);
                target = '';
            }else if(target.previousElementSibling.className == 'edit_text'){
                let editDiv = createElm('div');
                addClass(editDiv , 'display_text');
                editDiv.innerHTML = target.previousElementSibling.value;
                target.previousElementSibling.replaceWith(editDiv);
                target = '';
            }
        }
        saveDate();//リストの保存データを更新
}



//gaugeの長さの算出とテキストの変更
let percentGaugeText = document.getElementById('percent_gauge');
let percentColor = document.getElementById('percent_color');
let roundGaugeLength; //ゲージのパーセントの値

function changeLength(getCheckedNumber, ListNumber){
    let gaugeLength = (getCheckedNumber/ ListNumber) * 100;
    roundGaugeLength =  Math.round(gaugeLength / 10) * 10 
    if(isNaN(roundGaugeLength)){//roundGaugeLengthからNaNが帰ってきた時の処理
        percentGaugeText.innerHTML =' Number of completed tasks ';
        roundGaugeLength = 0 ;
        percentColor.style.width = roundGaugeLength + '%';//パーセントの長さを変更
    }else{
        percentColor.style.width = roundGaugeLength + '%';//パーセントの長さを変更
        percentGaugeText.innerHTML = getCheckedNumber + ' of '+ ListNumber +' tasks done ';//完了したタスクの表示
    }
}
 


// Fun チェックを入れたら文字に取り消し線を入れる　del 要素を使う　cssを変更

let checkedNumber = 0;//チェックボックスでチェックした数

function mycheck(e){
    let target = e.target;
    if(target.checked){
        target.nextElementSibling.style.textDecoration= 'line-through';
        checkedNumber += 1;
        ListNumber = ListNumber ;
        changeLength(checkedNumber , ListNumber);
        // changePercentGauge(checkedNumber);
    }else{
        target.nextElementSibling.style.textDecoration= 'none';
        checkedNumber -= 1;
        ListNumber = ListNumber ;
        changeLength(checkedNumber , ListNumber);
        // changePercentGauge(checkedNumber);
    }
};


// Fun × delete button 任意の要素を消す
function deleteList(e){
    let target = e.target;
    let parent = target.parentElement;
    let topParent = parent.parentElement;
    topParent.remove();
    saveDate();
    ListNumber -=1;
    // 消す時にチェックボックスにチェックが入っているか確かめる必要がある if文 リファクタリング検討   
    let previous3Elm ;
    if(target.className == 'close icon'){//icon を押したときの処理
        let previous1Elm = parent.previousElementSibling;
        let previous2Elm = previous1Elm.previousElementSibling;
        previous3Elm = previous2Elm.previousElementSibling;
    }else{//icon　の外側のdivを押したときの処理
        let previous1Elm = target.previousElementSibling;
        let previous2Elm = previous1Elm.previousElementSibling;
        previous3Elm = previous2Elm.previousElementSibling;
    }
    if(previous3Elm.checked){
        checkedNumber -= 1;
        changeLength(checkedNumber , ListNumber);
    }else{
        checkedNumber = checkedNumber;
        changeLength(checkedNumber , ListNumber);
    }
};


// Fun チェックを入れた列を全て消す
let removeCheckedBun = document.getElementById('remove_checked_button');
let checkName = document.getElementsByClassName("checkboxs");

removeCheckedBun.addEventListener('click',function(){
    for (let i=0; i<checkName.length; i++){
        if (checkName[i].checked){
            checkName[i].parentElement.remove();//チェックされた要素を取り除く
            i=-1;//要素が消去されたら配列が繰り上がるので、それを阻止するためにマイナス1
        }
      }
      //リセット処理
      if(0 < ListNumber  || 0 < checkedNumber){
        ListNumber = ListNumber - checkedNumber; 
        checkedNumber = 0;
        changeLength(checkedNumber , ListNumber);
      }

      saveDate();
});

//ブラウザのローカルストレージを使用してデータを保存
function saveDate(){
    const lists = document.querySelectorAll('li');
    let toDos = [];
    let cleanToDos;
    lists.forEach(list =>{
        toDos.push(list.innerText); 
        cleanToDos = toDos.filter(Boolean);
    });
    localStorage.setItem('todos',JSON.stringify(cleanToDos));//JSON形式に変更してローカルストレージに保存する
}


const todos = JSON.parse(localStorage.getItem('todos'));

//todos の配列に値があるならばリストを作成する
if(todos){
    todos.forEach(todo =>{
        createList(todo);
    })
}

