
$(function() {
	$("#idDivGroup").hide();
	$("#idDivTableAtributo").hide();
});

$('#idEditSelectHabilidad').on('change', function() {
	if($(this).val() !== '-1'){
		$("#idDivTableAtributo").show();
		$.ajax({
		    url : "http://"+IP+"/SpringGoraTeam/habilidad/"+$(this).val()+"/atributos",
		    type: "GET",
		    success: function(data){
		    			$("#idEditSelectAtributo").empty();
		    			var varOptionAtrDefault = $('<option/>');
				        varOptionAtrDefault.attr({ 'value': '-1' }).text('-- Seleccione atributo --');
				        $("#idEditSelectAtributo").append(varOptionAtrDefault);

		    			var arrayAtributos = data
		    			$.each(arrayAtributos, function(i, atributos) {
							var varOption = $('<option/>');
							varOption.attr({ 'value': atributos[0] }).text(atributos[1]);
							$("#idEditSelectAtributo").append(varOption);
			          	});
		    		}
	  	});
	}else{
		$("#idEditSelectAtributo").empty();
		var varOptionAtrDefault = $('<option/>');
        varOptionAtrDefault.attr({ 'value': '-1' }).text('-- Seleccione atributo --');
        $("#idEditSelectAtributo").append(varOptionAtrDefault);

        $("#idDivGroup").hide();
		$("#idDivTableAtributo").hide();
	}
});

$('#idEditSelectAtributo').on('change', function() {
	if($(this).val() !== '-1'){
		$("#idDivGroup").show();
		$("#idDivTableAtributo").show();
		$("#idButtonAllDeleteTable").prop('disabled', true);
	}else{
		$("#idDivGroup").hide();
	}
});

$('#idButtonAddAtributo').on('click',function(){
	if($('#idEditSelectAtributo option:selected').val() != -1){
		$('#idTableAtributo > tbody:last').append('<tr><td>'+$('#idEditSelectAtributo option:selected').val()+'</td>'+
			'<td>'+$('#idEditSelectAtributo option:selected').text()+'</td>'+
			'<td><a href="javascript:void(0);" class="remCF">Remove</a></td></tr>');

		$('#idEditSelectAtributo option:selected').remove();

		if($('#idEditSelectAtributo > option').length == 1 && 
			$('#idEditSelectAtributo option:selected').val() == -1){
			$("#idButtonAddAtributo").prop('disabled', true);
		}

		$('#idEditSelectHabilidad').prop('disabled', 'disabled');
		$("#idButtonAllDeleteTable").prop('disabled', false);
	}
});

$('#idButtonAllDeleteTable').on('click',function(){
	$("#idTableAtributo tbody > tr").each(function () {
 		var rowvalue = [];
        $(this).children().each(function () {
        	rowvalue.push($(this).text());
        });
        var varOption = $('<option/>');
		varOption.attr({ 'value': rowvalue[0] }).text(rowvalue[1]);
		$("#idEditSelectAtributo").append(varOption);
    });

	$("#idTableAtributo > tbody").html("");
	$('#idEditSelectHabilidad').prop('disabled', false);
	$("#idButtonAllDeleteTable").prop('disabled', true);
	$("#idButtonAddAtributo").prop('disabled', false);
});

$("#idTableAtributo").on('click','.remCF',function(){
	var $row = $(this).closest('tr');
    var $columns = $row.find('td');

    var arrayTd=[];
    var indice=0;
    $.each($columns, function(i, item) {
        arrayTd[indice]=item.innerHTML;
        indice++;
    });

	var varOptionAtrDefault = $('<option/>');
	varOptionAtrDefault.attr({ 'value': arrayTd[0] }).text(arrayTd[1]);
	$("#idEditSelectAtributo").append(varOptionAtrDefault);

    $(this).parent().parent().remove();

    if($('#idTableAtributo >tbody >tr').length == 0){
    	$('#idEditSelectHabilidad').prop('disabled', false);
    	$("#idButtonAllDeleteTable").prop('disabled', true);
    }

    $("#idButtonAddAtributo").prop('disabled', false);
});