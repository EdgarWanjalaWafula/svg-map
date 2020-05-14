'use strict'

$(document).ready(function () {
	fetchCSV(); 
	countryHover(); 
	showMemberStates()

	function showMemberStates(){
		var states = $(".cls-1")
	}

	function countryHover(){
		var country =  $(".cls-1")

		country.hover(function(){
			var id = $(this)
			var p = id.parent() 
			
			if(p[0].tagName == "g"){
				
				// Add active color, check if country has existing airlines 
				if(id.hasClass("active")){
					id.removeClass("active")
				} else {
					id.addClass("active")
				}
				
				$.each(p, function(index, value){
					var airline_id 	= $(value).find(".cls-7")
					var airline_name = ""
						$.each(airline_id, function(key, airline_id){
							airline_name += "<li><img src='logos/"+$(airline_id).attr("id")+".jpg'>"+$(airline_id).attr("data-name")+"</li>"; 
							$(airline_id).addClass("radars")
						})
					$(".airlines").html(airline_name)
				})

				// Change Title 
				var country_name = $(".country-name")
				country_name.html(id.attr("id"))

			} else {
				id.addClass("not-member")
			}
		})
	}

	function fetchCSV() {
		$.ajax({
			url:"http://localhost/Javascript/map_data.csv",
			method: 'get',
			// dataType:"text/csv", 
			success: function (result) {
				var csv_data
				csv_data = convert_to_csv(result)
				// console.log(csv_data)
			}, error: function (e) {
				console.error(e)
			}
		})
	}

	function convert_to_csv(csv){ // csv obj 
		var res
		var headers
		var csv_data = [] 
		res = csv.split('\n')
		headers = res[0].split(",")

		for (let index = 1; index < res.length; index++) {
			var single_csv_row = {}
			var single_item = res[index].split(",")
				for (let j = 0; j < headers.length; j++) {
					single_csv_row[headers[j]] = single_item[j]
				}
			csv_data.push(single_csv_row)
		}	
		console.log(csv_data)
		return csv_data
	}
});

