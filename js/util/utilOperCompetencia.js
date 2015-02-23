$(function() {
	$("#idDivGroup2").hide();
	$("#idDivTableAtributo2").hide();
});

$('#idEditSelectCompentecia').on('change', function() {
	if($(this).val() !== '-1'){
		$.ajax({
		    url : "http://"+IP+"/SpringGoraTeam/competencia/"+$(this).val()+"/habilidades",
		    type: "GET",
		    success: function(data){
		    			var arrayHabilidades = data;
	    				
	    				$("#idEditSelectHabilidad2").empty();
		    			var varOptionDefault = $('<option/>');
				        varOptionDefault.attr({ 'value': '-1' }).text('-- Seleccione Habilidad/Atributo --');
				        $("#idEditSelectHabilidad2").append(varOptionDefault);
						
		    			$.each(arrayHabilidades, function(i, habilidades) {
		    				$.ajax({
							    url : "http://"+IP+"/SpringGoraTeam/habilidad/"+habilidades[0]+"/atributos",
							    type: "GET",
							    success: function(data2){
							    			var arrayAtributos = data2;

							    			if(arrayAtributos.length > 0){
							    				$("#idDivGroup2").show();
							    				$("#idButtonAddAtributo2").prop('disabled', false);
												$("#idButtonAddAll2").prop('disabled', false);
												$("#idButtonAllDeleteTable2").prop('disabled', true);
												$("#idDivTableAtributo2").show();

							    				var optgroup = $('<optgroup/>');
												optgroup.attr('label', habilidades[1]);

								    			$.each(arrayAtributos, function(i, atributos) {
													var varOption = $('<option/>');
													varOption.attr({ 'value': habilidades[0]+';'+habilidades[1]+';'+atributos[0] }).text(atributos[1]);
													optgroup.append(varOption);
									          	});

									          	$("#idEditSelectHabilidad2").append(optgroup);
							    			}
							    		}
						 	});
		    			});
	  		}
		});
	}else{
		$("#idEditSelectHabilidad2").empty();
		var varOptionDefault = $('<option/>');
        varOptionDefault.attr({ 'value': '-1' }).text('-- Seleccione Habilidad/Atributo --');
        $("#idEditSelectHabilidad2").append(varOptionDefault);
	}
});

$('#idEditSelectHabilidad2').on('change', function() {
	if($(this).val() !== '-1'){
		$("#idDivTableAtributo2").show();
		$("#idButtonAddAtributo2").prop('disabled', false);

		if($('#idTableAtributo2 >tbody >tr').length == 0){
			$("#idButtonAllDeleteTable2").prop('disabled', true);
    	}
	}else{
		$("#idDivGroup2").hide();
	}
});

$('#idButtonAddAtributo2').on('click',function(){
	if($('#idEditSelectHabilidad2 option:selected').val() != -1){
		var res = $('#idEditSelectHabilidad2 option:selected').val().split(';');

		$('#idTableAtributo2 > tbody:last').append('<tr>'+
			'<td>'+res[0]+'</td>'+
			'<td>'+res[1]+'</td>'+                    
			'<td>'+res[2]+'</td>'+
			'<td>'+$('#idEditSelectHabilidad2 option:selected').text()+'</td>'+
			'<td><a href="javascript:void(0);" class="remCF2">Remove</a></td></tr>');

		if($('#idEditSelectHabilidad2 option:selected').parent().children().length == 1){
			$('#idEditSelectHabilidad2 option:selected').parent().remove();
		}else{
			$('#idEditSelectHabilidad2 option:selected').remove();
		}

		if($('#idEditSelectHabilidad2 > optgroup').length == 0){
			$("#idButtonAddAtributo2").prop('disabled', true);
			$("#idButtonAddAll2").prop('disabled', true);
		}

		$('#idEditSelectCompentecia').prop('disabled', true);
		$("#idButtonAllDeleteTable2").prop('disabled', false);

		var $sort = this;
		var $table = $('#idTableAtributo2');
		var $rows = $('tbody > tr', $table);
		$rows.sort(function (a, b) {
		  var keyA = $('td', a).text();
		  var keyB = $('td', b).text();
		  if ($($sort).hasClass('asc')) {
		      return (keyA > keyB) ? 0 : 1;
		  } else {
		      return (keyA > keyB) ? 1 : 0;
		  }
		});
		$.each($rows, function (index, row) {
		  $table.append(row);
		});
	}
});

$("#idTableAtributo2").on('click','.remCF2',function(){
	var $row = $(this).closest('tr');
    var $columns = $row.find('td');

    var arrayTd=[];
    var indice=0;
    $.each($columns, function(i, item) {
        arrayTd[indice]=item.innerHTML;
        indice++;
    });

	var varOption = $('<option/>');
	varOption.attr({ 'value': arrayTd[0]+';'+arrayTd[1]+';'+arrayTd[2] }).text(arrayTd[3]);

    if($('#idEditSelectHabilidad2 optgroup[label="'+arrayTd[1]+'"]').html() == null){
    	var optgroup = $('<optgroup/>');
		optgroup.attr('label', arrayTd[1]);
		optgroup.append(varOption);
		$("#idEditSelectHabilidad2").append(optgroup);
    }else{
    	$('#idEditSelectHabilidad2 optgroup[label="'+arrayTd[1]+'"]').append(varOption);
    }

    $(this).parent().parent().remove();

    if($('#idTableAtributo2 >tbody >tr').length == 0){
    	$('#idEditSelectCompentecia').prop('disabled', false);
    	$("#idButtonAllDeleteTable2").prop('disabled', true);
    }

    $("#idButtonAddAtributo2").prop('disabled', false);
    $("#idButtonAddAll2").prop('disabled', false);
});

$('#idButtonAllDeleteTable2').on('click',function(){
	$("#idTableAtributo2 tbody > tr").each(function () {
 		var rowvalue = [];
        $(this).children().each(function () {
        	rowvalue.push($(this).text());
        });

        var varOption = $('<option/>');
		varOption.attr({ 'value': rowvalue[0]+';'+rowvalue[1]+';'+rowvalue[2] }).text(rowvalue[3]);

		if($('#idEditSelectHabilidad2 optgroup[label="'+rowvalue[1]+'"]').html() == null){
	    	var optgroup = $('<optgroup/>');
			optgroup.attr('label', rowvalue[1]);
			optgroup.append(varOption);
			$("#idEditSelectHabilidad2").append(optgroup);
	    }else{
	    	$('#idEditSelectHabilidad2 optgroup[label="'+rowvalue[1]+'"]').append(varOption);
	    }
    });

	$("#idTableAtributo2 > tbody").html("");
	$('#idEditSelectCompentecia').prop('disabled', false);
	$("#idButtonAllDeleteTable2").prop('disabled', true);
	$("#idButtonAddAtributo2").prop('disabled', false);
	$('#idButtonAddAll2').prop('disabled', false);
});

$('#idButtonAddAll2').on('click',function(){
	if($('#idEditSelectHabilidad2 > optgroup').length > 0){
		$("#idEditSelectHabilidad2 option").each(function(){
			if($(this).val() != -1){
				var res = $(this).val().split(';');

				$('#idTableAtributo2 > tbody:last').append('<tr>'+
					'<td>'+res[0]+'</td>'+
					'<td>'+res[1]+'</td>'+                    
					'<td>'+res[2]+'</td>'+
					'<td>'+$(this).text()+'</td>'+
					'<td><a href="javascript:void(0);" class="remCF2">Remove</a></td></tr>');

				if($(this).parent().children().length == 1){
					$(this).parent().remove();
				}else{
					$(this).remove();
				}
			}
		});

		$("#idButtonAddAtributo2").prop('disabled', true);
		$("#idButtonAddAll2").prop('disabled', true);

		$('#idEditSelectCompentecia').prop('disabled', true);
		$("#idButtonAllDeleteTable2").prop('disabled', false);

		var $sort = this;
		var $table = $('#idTableAtributo2');
		var $rows = $('tbody > tr', $table);
		$rows.sort(function (a, b) {
		  var keyA = $('td', a).text();
		  var keyB = $('td', b).text();
		  if ($($sort).hasClass('asc')) {
		      return (keyA > keyB) ? 0 : 1;
		  } else {
		      return (keyA > keyB) ? 1 : 0;
		  }
		});
		$.each($rows, function (index, row) {
		  $table.append(row);
		});
	}
});