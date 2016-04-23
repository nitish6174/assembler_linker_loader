sim_step = 0;
res_regs = []
res_mems = []
res_flags = []
reg_code = []

function call_process()
{
	filetext = document.querySelector('#filetext').value;
	offset = document.querySelector('#offset').value;
	if(offset==undefined||offset=="")
		offset = '0';
	$.ajax({
		url: 'generate',
		type: 'POST',
		data: {
			files: filetext,
			offset: offset
		},
		success: function(data) {
			data = JSON.parse(data);
			symbols = data["symbols"];
			unlinked_code = data["unlinked_code"];
			linked_code = data["linked_code"];
			loadfile = data["loadfile"];
			$('#literalTable').html('');
			for (var key in symbols)
			{
				appendtext = '<strong>'+key+':</strong><br>';
				appendtext += JSON.stringify(symbols[key])+'<br>';
				$('#literalTable').html($('#literalTable').html()+appendtext);
			}
			$('#unlinked_code').html(unlinked_code);
			$('#linked_code').html(linked_code);
			$('input[name="loadfile"]').val(loadfile);
		}
	});
	sim_step = 0;
}

function call_simulation()
{
	loadfile = document.querySelector('input[name="loadfile"]').value;
	offset = document.querySelector('#offset').value;
	if(offset==undefined||offset=="")
		offset = '0';
	$.ajax({
		url: 'simulate',
		type: 'POST',
		data: {
			loadfile: loadfile,
			offset: offset
		},
		success: function(data) {
			console.log(data);
			// data = JSON.parse(data);
			// res_regs = data["res_regs"];
			// res_mems = data["res_mems"];
			// res_flags = data["res_flags"];
			// res_code = data["res_code"];
		}
	});
	sim_step = 0;
}

// function next_step()
// {
// 	msg = "Current step : "+sim_step+"<br>";
// 	curr_regs = JSON.stringify(res_regs[sim_step]);
// 	curr_mems = JSON.stringify(res_mems[sim_step]);
// 	curr_flags = JSON.stringify(res_flags[sim_step]);
// 	// curr_code = JSON.stringify(res_code[sim_step]);
// 	$('#simulationResult').html(msg+curr_regs+curr_mems+curr_flags);
// 	$('#linked_code span#'+sim_step+1).css('background-color','yellow');
// 	sim_step+=1;
// }

// function next_step()
// {
// 	loadfile = document.querySelector('input[name="loadfile"]').value;
// 	offset = document.querySelector('#offset').value;
// 	if(offset==undefined||offset=="")
// 		offset = '0';
// 	$.ajax({
// 		url: 'simulate',
// 		type: 'POST',
// 		data: {
// 			loadfile: loadfile,
// 			offset: offset,
// 			steps: sim_step
// 		},
// 		success: function(data) {
// 			console.log(data);
// 			// data = JSON.parse(data);
// 			// res_regs = data["res_regs"];
// 			// res_mems = data["res_mems"];
// 			// res_flags = data["res_flags"];
// 			// // res_code = data["res_code"];

// 			msg = "Current step : "+sim_step+"<br>";
// 			$('#simulationResult').html(msg);
// 			// curr_regs = JSON.stringify(res_regs[sim_step]);
// 			// curr_mems = JSON.stringify(res_mems[sim_step]);
// 			// curr_flags = JSON.stringify(res_flags[sim_step]);
// 			// // curr_code = JSON.stringify(res_code[sim_step]);
// 			// $('#simulationResult').html(msg+curr_regs+curr_mems+curr_flags);
// 			// $('#linked_code span#'+sim_step+1).css('background-color','yellow');
// 			sim_step+=1;
// 		}
// 	});
// }