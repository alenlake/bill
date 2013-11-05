var dataCache;
$(function(){	
	$('#keyword').on('keyup',function(){
		var keyword = $('#keyword').val();
		if(keyword.length <8){
			return false;
		}
		
		$.ajax({
		  url: "http://112.124.48.67/bill-web/queryloss.html?keyword=" + keyword,
			dataType:'json',
			crossDomain : true,
			beforeSend: function(){
				$.mobile.loading( "show", {
				  text: "正在加载...",
				  textVisible: true,
				  theme: "z",
				  html: ""
				});
			}
			
		}).always(function(data,status) {
	    $.mobile.loading("hide");
	  }).fail(function(){
	  	console.log('fail');
	  }).done(function(data) {
	  	dataCache = data;
			var html = "<ul data-role=\"listview\" data-inset=\"true\">";
			for(var i=0;i<data.length;i++){
				var r = data[i];
				html += "<li data-role=\"list-divider\"><span class=\"detail-ac\">" + r.acceptNo + "</span><span class=\"ui-li-count\">"+ (i+1) +"</span></li>";
				html += "<li>";
				html += "<a href=\"javascript:renderDetail('" + r.acceptNo +"')\">";		
				var remark = ((r.remark == 'null' || r.remark == undefined)?"":r.remark);		
				html += "<p>" + remark + "</p>";
				html += "<p><strong>" + r.fromCom + "</strong></p>";
				//html += "<p class=\"ui-li-aside\"><strong>" + (new Date(r.lossDate)).format('yyyy-mm-dd')+ "</strong></p>";
				html += "</a></li>";
			}
			html += "</ul>";

			$('#data-container').empty().append(html);			
			$( "#data-container ul" ).listview();
			
			if(data.length<=0){
				$.mobile.changePage( "#dialogPage", { role: "dialog" } );
			}
		  
	  }).always(function() {
	    $.mobile.loading("hide");
	  });
	});
	
	$('#back').on('click',function(){
		history.go(-1);	
	});
	

	

});
	function renderDetail(acceptNo){
		var r = getDataRecord(acceptNo);
		if(r == undefined){
			console.log('has not data');
			return false;
		}	
		$.mobile.changePage( "#detail",{showLoadMsg :true});		
		var html = "<ul data-role=\"listview\" data-inset=\"false\">"
		html += "<li data-role=\"list-divider\"><span class=\"detail-ac\">";
		html += r.acceptNo;
		html += "</span></li>";
		html += "<li>"
		var remark = ((r.remark == 'null' || r.remark == undefined)?"":r.remark);
		html += "<p style=\"white-space: normal;\">" + remark + "</p>"; 

		html += "<p><strong>" + r.fromCom + "</strong></p>"
		html += "<p>公告日期：<strong>" + (new Date(r.lossDate)).format('yyyy-mm-dd')+ "</strong></p>";
		html += "</li>";
		html += "</ul>";
		$('#detailContent').empty().append(html);	
		$("#detailContent ul").listview();
		
	}

	function getDataRecord(acceptNo){
		var r;
		for(var i=0;i<dataCache.length;i++){
			if(acceptNo == dataCache[i].acceptNo){
				r = dataCache[i];
				break;
			}
		}
		return r;
	}