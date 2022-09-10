$(".m_navButton div").click(function(e) {
    $(".m_navButton div").removeClass("selected").addClass("navButton");
    $(this).addClass("selected").removeClass("navButton");
    let menu = $(this).attr('id');
    if(menu === "science"||menu === "moral"||menu === 'math'||menu === "korean"){
        getContents(menu);
    }else if(menu === "english_R"){
        $("#mainContents").html(`여러분들의 유용한 자료를 기다리고 있어요 😃<br> 영어-Red 게시판의 첫 등록자가 되어 보세요.`);
        $("#mainContents").append(`<br><a href="https://band.us/">자료 등록 하러가기</a>`);
        $("#mainContents").append(`<br><button id='howTo' onclick="howTo()">자료 등록하는 방법</button>`);
    }else if(menu === "event"){
        write();
    }else if(menu === "science"){
        $("#mainContents").html(`여러분들의 유용한 자료를 기다리고 있어요 😃<br> 과학 게시판의 첫 등록자가 되어 보세요.`);
        $("#mainContents").append(`<br><a href="https://band.us/">자료 등록 하러가기</a>`);
        $("#mainContents").append(`<br><button id='howTo' onclick="howTo()">자료 등록하는 방법</button>`);
    }else if(menu === "english_B"){
        $("#mainContents").html(`여러분들의 유용한 자료를 기다리고 있어요 😃<br> 영어-Blue 게시판의 첫 등록자가 되어 보세요.`);
        $("#mainContents").append(`<br><a href="https://band.us/">자료 등록 하러가기</a>`);
        $("#mainContents").append(`<br><button id='howTo' onclick="howTo()">자료 등록하는 방법</button>`);
    }else if(menu === "tech_and_house"){
        $("#mainContents").html(`여러분들의 유용한 자료를 기다리고 있어요 😃<br> 기술·가정 게시판의 첫 등록자가 되어 보세요.`);
        $("#mainContents").append(`<br><a href="https://band.us/">자료 등록 하러가기</a>`);
        $("#mainContents").append(`<br><button id='howTo' onclick="howTo()">자료 등록하는 방법</button>`);
    }else{
        $("#mainContents").html(`여러분들의 유용한 자료를 기다리고 있어요 😃<br> 한문 게시판의 첫 등록자가 되어 보세요.`);
        $("#mainContents").append(`<br><a href="https://band.us/" target="_blank">자료 등록 하러가기</a>`);
        $("#mainContents").append(`<br><button id='howTo' onclick="howTo()">자료 등록하는 방법</button>`);
    }
    e.preventDefault();     
}            
);

function howTo() {
    $("#howTo").html(`개발자에게 밴드 톡으로 자료를 보내면 검토를 통해 검증된 자료가 업로드돼요.`);
    d++;
e.preventDefault();
};

function setDownload(){
    const id = this.id
    $('#exampleModalLabel').text(id)
    $('#download_img').attr('href', `./img/${id}`)            
    $('#modal_img').attr('src', `./img/${id}`)  
}

//자료 불러오기
function getContents(menu){
    $("#mainContents").html("");
    $.getJSON(`./JSON/${menu}.json`, function(data){
        for(key in data){
            const div = document.createElement("div");
            div.setAttribute("id", key);
            div.classList.add("contDiv")


            if(data[key].type === 'img'){
                const btn_img = $('<button />', {
                    'type': 'button',
                    'class': 'btn border-0 p-0',
                    'id': `${key}`,
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#exampleModal',
                    'width': '100%'
                }).get(0);
                const img = document.createElement("img");
                img.src = `./img/${key}`;
                img.classList.add("contImg");

                btn_img.appendChild(img);
                btn_img.addEventListener("click", setDownload);

                const text = document.createElement("div");
                text.id=`${key}_text`;
                text.classList.add("contText");
                text.append("작성자 : "+data[key].작성자);
                text.append(" / 유형 : "+data[key].유형);
                text.append(" / 등록일자 : "+data[key].등록일자);
                document.getElementById('mainContents').appendChild(div);
                document.getElementById(key).appendChild(btn_img);
                document.getElementById(key).appendChild(text);
            }else if(data[key].type === 'docs'){
                const docs= $('<a />', {
                    'id': `${key}`,
                    'href': `./docs/${key}`,
                    'style': 'color : black'
                }).get(0);
                docs.innerHTML = `${key} 다운로드 하기`;

                const text = document.createElement("div");
                text.id=`${key}_text`;
                text.classList.add("contText");
                text.append("작성자 : "+data[key].작성자);
                text.append(" / 유형 : "+data[key].유형);
                text.append(" / 등록일자 : "+data[key].등록일자);
                document.getElementById('mainContents').appendChild(div);
                document.getElementById(key).appendChild(docs);
                document.getElementById(key).appendChild(text);
            }
        }
    })
}


//일정 불러오기
$(document).ready(function(){
getEvent()
write()
})
function write(){
$("#mainContents").text("")
$.getJSON("./JSON/event.json", function(data){
    let i = 0;
    for(key in data.comingEvent){
        $("#mainContents").append(`${++i}. ${key} - ${data.comingEvent[key]}<br>`);
    }
})
}

// 일정 롤링
function getEvent(){
var i = 0;
var result = [];
$.getJSON("./JSON/event.json", function(data){
    for(j in data.comingEvent){
        result.push([`${j} - ${data.comingEvent[j]}`]);
    }
    $("#topScheduleBar").html("Loading");
    setInterval(function() {
        $("#topScheduleBar").html(result[i]);
        if (i == result.length-1)
            i=0;
        else
            i++;
    }, 4 * 1000);
}).fail(function(){
    $("topScheduleBar").text("Error");
})
}