/* AlertPage **************************/
function agreeBtn(id){
  var dom = $("#alert"+id+" .agreeBtn");
  if(dom.hasClass('active')){
    /*
    //承認
    dom.addClass("btn-success");
    dom.removeClass("btn-secondary");
    dom.html("未承認");
    dom.toggleClass("active");*/
  }else{
    //未承認
    ons.notification.confirm({message:"本当に承認しますか？",title:null,modifier:"ios"}).then(function(result){
    if(result){
      dom.addClass("btn-success");
      dom.removeClass("btn-secondary");
      dom.html("チャットへ");
      dom.removeClass("active");
      dom.attr("onclick","chatOpen(1)");
      //チャットボタン作成
      /*var chatDom = dom.clone(true);
      listDom.prependTo($("#bbs-lists"));
      dom.clone()*/
    }else{
    }
  });
  }
}


//アラートページを開く
function openAlert(){
  slideOpen('page/alert-page.html');
  alertList()
}

//記事リスト
function alertList(){
  //$("#load-dialog").show();
  //console.log(_domain+"/keiji?longitude=80&latitude=70");
  var sendData = {
    type:"0",
    user_id:_user_id
  };
  $.ajax({
    type: "GET",
    url:_domain+"/alert.php?get1=list-all",
    //url:_domain+"/postinfo.php?type=alert-list",
    data:sendData,
    success: function(msg){
      
      $(".alert-list:visible").remove()
      $.each(msg,function(key,val){
        var listDom = $(".alert-list:hidden:first").clone(true);//.html("List"+listCnt)
        switch(true){
  			//掲示板のコメント
				case val.alert_type_id == "11":
          //listDom.attr("onclick","alertDetail("+val.keiji_id+")");
          var anyval = (val.any_value).split(',');
          var title = "["+anyval[0]+"]へコメント";
          var content = anyval[1];
          listDom.find(".list__item__thumbnail").attr("icon","fa-comment-o");
					break;
				//チャット
				case val.alert_type_id == "21":
          //listDom.attr("onclick","alertDetail("+val.keiji_id+")");
					var anyval = (val.any_value || "").split(',');
          var title = ""+anyval[0]+"";
          var content = anyval[1];
          listDom.find(".list__item__thumbnail").attr("icon","fa-comment-o");
          break;
				//承認（取引相手決定）
				case val.alert_type_id == "22":
          var anyval = (val.any_value || "").split(',');
          var title = "["+anyval[1]+"]から申請がありました";
          var content = anyval[2];
          listDom.find(".list__item__thumbnail").attr("icon","ion-android-alert");
          listDom.find(".agreeBtn").css("display","");
          listDom.find(".agreeBtn").attr("onclick","agreeBtn("+val.alert_id+")");
          break;
				//貸す側へ承認返答
				case val.alert_type_id == "23":
          //listDom.attr("onclick","alertDetail("+val.keiji_id+")");
					var anyval = (val.any_value || "").split(',');
          var title = "["+anyval[0]+"]で是非貸してほしいそうです。";
          var content = "";
          listDom.find(".list__item__thumbnail").attr("icon","ion-android-alert");
          break;
				//評価通知
				case val.alert_type_id == "24":
          //listDom.attr("onclick","alertDetail("+val.keiji_id+")");
					var anyval = (val.any_value || "").split(',');
          var title = "["+anyval[0]+"]から評価が届きました";
          var content = "";
          listDom.find(".list__item__thumbnail").attr("icon","ion-android-alert");
          break;
				//貸し借り新規投稿通知
				case val.alert_type_id == "25":
          //listDom.attr("onclick","alertDetail("+val.keiji_id+")");
					var anyval = (val.any_value || "").split(',');
          var title = "貸し借りに新しい投稿がありました";
          var content = "["+anyval[0]+"]";
          listDom.find(".list__item__thumbnail").attr("icon","ion-ios-information-outline");
          break;
				default:
          break;
      }
        //listDom.attr("hidden","false");
        listDom.css("display","");
        listDom.attr("id","alert"+val.alert_id);
        listDom.find(".list__item__title").html(title);
        listDom.find(".subtitle").html(content);
        listDom.find(".alert-list-date").html(formatDateTime(new Date(val.time)));
        //listDom.fadeIn().css("display","");
        //var cloneDom = listDom.clone(true);
        listDom.appendTo($("#alert-lists"));
      });
    },
    error: function(err){
      console.log("ajax-error!<br>"+JSON.stringify(err));
    }
   });
  /******/
}

/*************************************/