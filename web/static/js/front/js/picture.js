// $('#newblog-container').load(/*[[@{/footer/newblog}]]*/"/footer/newblog");
var requestUrl = sessionStorage.getItem("requestUrl");
if (requestUrl==null){
    window.location="./index.html";
}
$(function() {
    $('.rthumbnail').responsivegallery();
});

$('.menu.toggle').click(function () {
    $('.m-item').toggleClass('m-mobile-hide');
});

function listPicture(pageNum,pageSize) {
    $.ajax({
        type: "POST",
        data: JSON.stringify({
            "pageNum": pageNum,
            "pageSize": pageSize
        }),
        url: sessionStorage.getItem("requestUrl") + "/blog-picture/front/picture/list",
        contentType:"application/json;charset=utf-8",
        async: true,
        success: function (res) {
            //θΏεζε
            if (res.code==200){
                var list=res.data.result;
                $("#picture-main").text("");
                for (var i = 0; i < list.length; i++) {
                    var str=list[i];
                    var p="<article class=\"thumb\">\n" +
                        "        <div class=\"ma5-gallery\">\n" +
                        "            <div class=\"rthumbnail\">\n" +
                        "                <a href='"+str.url+"'>\n" +
                        "                    <img class=\"picture-zmki_px\" src='"+str.url+"'>\n" +
                        "                </a>\n" +
                        "                <div class=\"m-picture-text\">"+str.name+"</div>\n" +
                        "                <div  class=\"rcaption\">\n" +
                        "                    <div style=\"font-size: large;\">"+str.name+"</div>\n" +
                        "                    <div style=\"font-size: small\" class=\"m-margin-top\">"+str.createTime+"&nbsp;"+str.location+"</div>\n" +
                        "                    <p style=\"font-size: small\">"+str.description+"</p>\n" +
                        "                </div>\n" +
                        "            </div>\n" +
                        "\n" +
                        "        </div>\n" +
                        "    </article>";
                    $("#picture-main").append(p);
                }
                //ε θ½½εεΊεΌζδ»Ά
                $('.rthumbnail').responsivegallery();
            }else{
                alert(res.msg);
            }
        },
        error: function (result) {
            console.log("η½η»θΆζΆοΌ");
        }
    });
}


listPicture(1,100);

// θΏθ‘ζΆι΄η»θ?‘
function secondToDate(second) {
    if (!second) {
        return 0;
    }
    var time = new Array(0, 0, 0, 0, 0);
    if (second >= 365 * 24 * 3600) {
        time[0] = parseInt(second / (365 * 24 * 3600));
        second %= 365 * 24 * 3600;
    }
    if (second >= 24 * 3600) {
        time[1] = parseInt(second / (24 * 3600));
        second %= 24 * 3600;
    }
    if (second >= 3600) {
        time[2] = parseInt(second / 3600);
        second %= 3600;
    }
    if (second >= 60) {
        time[3] = parseInt(second / 60);
        second %= 60;
    }
    if (second > 0) {
        time[4] = second;
    }
    return time;
}
function setTime() {
    /*ζ­€ε€δΈΊη½η«ηεε»ΊζΆι΄*/
    var create_time = Math.round(new Date(Date.UTC(2020, 01, 25, 15, 15, 15)).getTime() / 1000);
    var timestamp = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
    currentTime = secondToDate((timestamp - create_time));
    currentTimeHtml = currentTime[0] + 'εΉ΄' + currentTime[1] + 'ε€©'
        + currentTime[2] + 'ζΆ' + currentTime[3] + 'ε' + currentTime[4]
        + 'η§';
    document.getElementById("htmer_time").innerHTML = currentTimeHtml;
}
setInterval(setTime, 1000);
