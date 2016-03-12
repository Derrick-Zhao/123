var imagearray = [];
var display = true;

function Tiles(jsoncaption, jsonhomeurl, displayoption) {
    this.caption = jsoncaption;
    this.homeurl = jsonhomeurl;
    this.display = displayoption;
};
$.ajax({
            url: "json/tiles.json",
            dataType: 'json',
            success: function(resp) {
                console.log(resp);
                var counter = 0;
                var imgtitle;
                var imagecontent = '';
                var titlelist = '';
                for(var i = 0; i < resp.Tiles.length; i++) {
                    if(resp.Tiles[i].TileProperties.HomeTileStatus == true && resp.Tiles[i].SubCategory != null && resp.Tiles[i].TileProperties.Dimensions.Width == 1) {
                        imagecontent += '<div style="background-image:url(' + resp.Tiles[i].TileProperties.HomeURL + ')" class="image">';
                        imagecontent += '<span class=' + imgtitle + '>' + '<b style="color:yellow">' + resp.Tiles[i].Caption + '</b>' + '</span></div>';
                        titlelist += '<li class="listcontent"><img src="images/mobile/check.png" data-alt-src="images/mobile/empty.png"  class="checktick" ><span clss="titlepagelist">' + resp.Tiles[i].Caption + '</span><img src="images/mobile/stack.png" class="stack"></li>';
                        var imageinfo = new Tiles(resp.Tiles[i].Caption, resp.Tiles[i].TileProperties.HomeURL, display);
                        imagearray[counter] = imageinfo;
                        counter++;
                    }
                }
                //append images and list in the div
                $('#image').html(imagecontent);
                $('#listtitles').html(titlelist);
                        console.log(imagearray[1]);
                    },
                    error: function(req, status, err) {
                        console.log("something is wrong", status, err);
                    }
            });

        function vision1() {
            var page1 = document.getElementById("page1");
            page1.style.visibility = "hidden";
            var page2 = document.getElementById('page2');
            page2.style.visibility = 'visible';
            // $("#image").empty();
        }
        $(document).ready(function() {
            $('.checktick').click(function() {
                var temp = $(this).attr('src');
                $(this).attr('src', $(this).attr('data-alt-src'));
                $(this).attr('data-alt-src', temp);
                var i = $(this).parent().index();
                console.log(temp);
                console.log(i);
                if(temp === "images/mobile/check.png") {
                    imagearray[i].display = false;
                }
                if(temp === "images/mobile/empty.png") {
                    imagearray[i].display = true;
                }
                console.log(imagearray);
            })
        }) ;

        $('#listtitles').sortable({
            start: function(event, ui) {
                firstnum = ui.item.index();
            },
            stop: function(event, ui) {
                secondnum = ui.item.index();
                var tempobj = imagearray[firstnum];
                imagearray.splice(firstnum, 1);
                imagearray.splice(secondnum, 0, tempobj);
            }
        });

        function vision2() {
            var page1 = document.getElementById("page1");
            page1.style.visibility = "visible";
            var page2 = document.getElementById('page2');
            page2.style.visibility = 'hidden';
            var imagecontent = '';
            var imgtitle = '';
            for(var i = 0; i < imagearray.length; i++) {
                if(imagearray[i].display === true) {
                    imagecontent += '<div style="background-image:url(' + imagearray[i].homeurl + ')" class="image">';
                    imagecontent += '<span class=' + imgtitle + '>' + '<b style="color:yellow">' + imagearray[i].caption + '</b>' + '</span></div>';
                }
            }
            $('#image').html(imagecontent);
        }
        $(document).ready(function() {
            $('#gear').click(function() {
                $('#page2').css('display', 'none');
                $('#page2').fadeIn(1000);
            });
            $('#done').click(function() {
                $('#page1').css('display', 'none');
                $('#page1').fadeIn(1000);
            })
        })
