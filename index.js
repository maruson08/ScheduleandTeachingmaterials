$(".m_navButton div").click(function(e) {
    $(".m_navButton div").removeClass("selected").addClass("navButton");
    $(this).addClass("selected").removeClass("navButton");
    let menu = $(this).attr('id');
    if(menu === "science"||menu === "moral"){
        getContents(menu);
    }else if(menu === "english_R"){
        $("#mainContents").html(`여러분들의 유용한 자료를 기다리고 있어요 😃<br> 영어-Red 게시판의 첫 등록자가 되어 보세요.`);
        $("#mainContents").append(`<br><a href="https://band.us/">자료 등록 하러가기</a>`);
        $("#mainContents").append(`<br><button id='howTo' onclick="howTo()">자료 등록하는 방법</button>`);
    }else if(menu === "event"){
        write();
    }else if(menu === "korean"){
        $("#mainContents").html(`여러분들의 유용한 자료를 기다리고 있어요 😃<br> 국어 게시판의 첫 등록자가 되어 보세요.`);
        $("#mainContents").append(`<br><a href="https://band.us/">자료 등록 하러가기</a>`);
        $("#mainContents").append(`<br><button id='howTo' onclick="howTo()">자료 등록하는 방법</button>`);
    }else if(menu === "science"){
        $("#mainContents").html(`여러분들의 유용한 자료를 기다리고 있어요 😃<br> 과학 게시판의 첫 등록자가 되어 보세요.`);
        $("#mainContents").append(`<br><a href="https://band.us/">자료 등록 하러가기</a>`);
        $("#mainContents").append(`<br><button id='howTo' onclick="howTo()">자료 등록하는 방법</button>`);
    }else if(menu === "english_B"){
        $("#mainContents").html(`여러분들의 유용한 자료를 기다리고 있어요 😃<br> 영어-Blue 게시판의 첫 등록자가 되어 보세요.`);
        $("#mainContents").append(`<br><a href="https://band.us/">자료 등록 하러가기</a>`);
        $("#mainContents").append(`<br><button id='howTo' onclick="howTo()">자료 등록하는 방법</button>`);
    }else if(menu === "math"){
        $("#mainContents").html(`여러분들의 유용한 자료를 기다리고 있어요 😃<br> 수학 게시판의 첫 등록자가 되어 보세요.`);
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
function getContents(menu){
$("#mainContents").html("");
$.getJSON(`./${menu}.json`, function(data){
    for(key in data){
        const div = document.createElement("div");
        div.setAttribute("id", key);
        div.classList.add("contDiv")
        const img = document.createElement("img");
        img.src = key;
        img.classList.add("contImg")
        const text = document.createElement("div");
        text.id=`${key}_text`;
        text.classList.add("contText");
        text.append("작성자 : "+data[key].작성자);
        text.append(" / 유형 : "+data[key].유형);
        text.append(" / 등록일자 : "+data[key].등록일자);
        document.getElementById("mainContents").appendChild(div);
        document.getElementById(key).appendChild(img);
        document.getElementById(key).appendChild(text);
    }                    
        })
}
$(document).ready(function(){
getEvent()
write()
})
function write(){
$("#mainContents").text("")
$.getJSON("./event.json", function(data){
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
$.getJSON("./event.json", function(data){
    for(j in data.comingEvent){
        result.push([`${j} - ${data.comingEvent[j]}`]);
    }
    $("#topScheduleBar").text("Loading");
    setInterval(function() {
        $("#topScheduleBar").text(result[i]);
        if (i == result.length-1)
            i=0;
        else
            i++;
    }, 4 * 1000);
}).fail(function(){
    $("topScheduleBar").text("Error");
})
}