
$(".m_navButton div").click(function(e) {
    $(".m_navButton div").removeClass("selected");
    $(this).addClass("selected");
    $('#mainContents').html('')
    let menu = $(this).attr('id');
    if(menu === "science"||menu === "moral"||menu === 'math'||menu === "korean"){
        getContents(menu);
    }else if(menu === "english_R"){
        $("#mainContents").html(`여러분들의 유용한 자료를 기다리고 있어요 😃<br> 영어-Red 게시판의 첫 등록자가 되어 보세요.`);
        $("#mainContents").append(`<br><a href="https://band.us/">자료 등록 하러가기</a>`);
        $("#mainContents").append(`<br><button id='howTo' onclick="howTo()">자료 등록하는 방법</button>`);
    }else if(menu === "band"){
        $("#mainContents").html(`서비스 준비중`);
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

function setImgModal(){
    $('#contentsModalMain').html('');
    const a = $('<a />', {
        'id': 'download_img',
        'download': 'true'
    }).get(0);
    const id = this.id;
    const img = $('<img />', {
        'id': 'modal_img',
        'src': '',
        'width': '100%'
    }).get(0);
    $('#contentsModalMain').append(a);
    $('#download_img').append(img);
    $('#contentsModalLabel').text(id);
    $('#download_img').attr('href', `/img/${id}`);
    $('#modal_img').attr('src', `/img/${id}`);
}

function setDocsModal(){
    $('#contentsModalMain').html('');
    const id = this.id
    $('#contentsModalMain').html(`<embed src="/docs/${id}" type="application/pdf" style='width:100%;height:700px;border-radius:5px'/>`);
    $('#contentsModalLabel').text(id);
    
}


//자료 불러오기 - 카드 사용 - 2개씩 로드
function getContents(menu){
    $("#mainContents").html("");
    $.getJSON(`/JSON/${menu}.json`, function(data){
        const dataLength = Object.keys(data).length
        console.log(dataLength)
        for(var i = 0; i < dataLength; i=i+2){
            const cardContainer = $('<div />', {
                'class': 'row row-cols-1 row-cols-md-2',
                'id': `${i}`,
                'style': 'border:1px black solid'
            }).get(0);
            const card1 = $('<div />', {
                'class': 'card',
                'id': `card1_${i}`
            })
            const card1_img = $('<img />', {
                'src': `/img/${data[i]}`,
                'class': 'card-img-top'
            })
            const card1_body = $('<div />', {
                
            })
            document.getElementById('mainContents').appendChild(cardContainer);
            document.getElementById(i).appendChild(card1);
            document.getElementById(`card1_${i}`).appendChild(card1_img);
        }
    })
}


//시작 프로세스
$(document).ready(function(){
eventRolling()
$("#mainContents").html("<h5><b>자료 등록 안내</b></h5><br>월/금 오후 5:30 ~ 6:00<br>토/일 유동적")
})

//일정 불러오기
function getEvent(){
    $("#mainContents").html("<div id = 'eventDiv'></div>")
    $.getJSON("/JSON/event.json", function(data){
        let i = 0;
        for(key in data.comingEvent){
            $("#eventDiv").append(`${++i}. ${key} <br> ${data.comingEvent[key]}<br><br>`);
        }
    })
}

// 일정 롤링
function eventRolling(){
var i = 0;
var result = [];
$.getJSON("/JSON/event.json", function(data){
    for(j in data.comingEvent){
        result.push([`${j} <br> ${data.comingEvent[j]}`]);
    }
    $("#topScheduleBar").html('Loading <div class="spinner-border spinner-border-sm text-light" role="status"></div>');
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