$('#topScheduleBar').click(function(e){
    write();
    e.preventDefault})


const howToButton = `<br><div id='howTo'onclick="howTo()">자료 등록하는 방법</div>`;
$(".m_navButton div").click(function(e) {
    $(".m_navButton div").removeClass("selected").addClass("navButton");
    $(this).addClass("selected").removeClass("navButton");
    $('#mainContents').html('')
    let menu = $(this).attr('id');
    if(menu === "science"||menu === "moral"||menu === 'math'||menu === "korean"||menu === "tech_and_house"){
        getContents(menu);
    }else if(menu === "english_R"){
        $("#mainContents").html(`여러분들의 유용한 자료를 기다리고 있어요 😃<br> 영어-Red 게시판의 첫 등록자가 되어 보세요.`);
        $("#mainContents").append(`<br><a href="https://band.us/">자료 등록 하러가기</a>`);
        $("#mainContents").append(howToButton);
    }else if(menu === "band"){
        $("#mainContents").html(`서비스 준비중`);
    }else if(menu === "english_B"){
        $("#mainContents").html(`여러분들의 유용한 자료를 기다리고 있어요 😃<br> 영어-Blue 게시판의 첫 등록자가 되어 보세요.`);
        $("#mainContents").append(`<br><a href="https://band.us/">자료 등록 하러가기</a>`);
        $("#mainContents").append(howToButton);
    }else{
        $("#mainContents").html(`여러분들의 유용한 자료를 기다리고 있어요 😃<br> 한문 게시판의 첫 등록자가 되어 보세요.`);
        $("#mainContents").append(`<br><a href="https://band.us/" target="_blank">자료 등록 하러가기</a>`);
        $("#mainContents").append(howToButton);
    }
    e.preventDefault();     
}            
);

function howTo() {
    $("#howTo").html(`개발자에게 밴드 톡으로 자료를 보내면 검토를 통해 검증된 자료가 업로드돼요.`);
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
    $('#download_img').attr('href', `./img/${id}`);
    $('#modal_img').attr('src', `./img/${id}`);
}

function setDocsModal(){
    $('#contentsModalMain').html('');
    const id = this.id
    $('#contentsModalMain').html(`<embed src="./docs/${id}" type="application/pdf" style='width:100%;height:700px;border-radius:5px'/>`);
    $('#contentsModalLabel').text(id);
    
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
                    'data-bs-target': '#contentsModal',
                    'width': '100%'
                }).get(0);
                const img = document.createElement("img");
                img.src = `./img/${key}`;
                img.classList.add("contImg");

                btn_img.appendChild(img);
                btn_img.addEventListener("click", setImgModal);

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
                const docs= $('<span />', {
                    'id': `${key}`
                }).get(0);
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    docs.innerHTML = `${key} <br> <a class="btn material-symbols-outlined" href='./docs/${key}' download>download</a>`;  
                }else{
                    docs.innerHTML = `${key} <br> <span class='btn material-symbols-outlined' data-bs-toggle='modal' data-bs-target='#contentsModal'>open_in_new</span> <a class="btn material-symbols-outlined" href='./docs/${key}' style='color:black' download>download</a>`;
                    docs.addEventListener("click", setDocsModal);
                }

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


//시작 프로그램
$(document).ready(function(){
    getEvent()
    $("#mainContents").append("<h5><b>자료 등록 안내</b></h5>월/금 오후 5:30 ~ 6:00<br>토/일 유동적<br><br><h5><b>메뉴 수정 안내</b></h5>일정 -> 학급 밴드(준비 중)<br>일정 배너(상단의 일정 나오는 부분) 클릭 시 일정 페이지로 이동<br><br><h5>학교 안내 사항</h5><br>")
    $("#mainContents").append('<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02GBGiedr8oE2TxetdWNCpPzNfJTkygMQ5BjXtLURjw2567RCHnp8m6wX97DKB5r2gl%26id%3D100082969520209&show_text=true&width=500"class="school" style="border-radius:20px;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>')
})


function write(){
    $("#mainContents").html("<div id = 'eventDiv'></div>")
    $.getJSON("./JSON/event.json", function(data){
        let i = 0;
        for(key in data.comingEvent){
            $("#eventDiv").append(`${++i}. ${key} <br> ${data.comingEvent[key]}<br><br>`);
        }
    })
}

$('#bail').click(function(e){
    this.setAttribute('hidden','true');
    $('#ribbon').attr('hidden','true');
    console.log('tjdw')
    e.preventDefault
})

// 일정 롤링
function getEvent(){
var i = 0;
var result = [];
$.getJSON("./JSON/event.json", function(data){
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
