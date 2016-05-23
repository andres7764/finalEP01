window.onload = function()
{
	var crearPlaneta = function(data)
	{
		var ancho = window.innerWidth;
		var alto = window.innerHeight;
		var lienzo = new THREE.WebGLRenderer({alpha: true});
		lienzo.setSize(ancho, alto);
		document.body.appendChild(lienzo.domElement);
		var tamano = Math.floor((data[0].tamano / 32984) * 100);
		var geometria = new THREE.SphereGeometry(tamano,tamano,tamano);
		var textura = THREE.ImageUtils.loadTexture(data[0].imagen);
		var material = new THREE.MeshBasicMaterial( { map: textura } );
		var object = new THREE.Mesh(geometria, material);
		//return new THREE.Mesh(geometria, material);
	var escena 		  = new THREE.Scene,
	tamanoJupiter = 300;
	escena.add(object); 

	var camara = new THREE.PerspectiveCamera(50,(ancho / alto),0.1, 10000);
	camara.position.y = 160;
	camara.position.z = 400;
	object.position.x = 900;
	camara.lookAt(object.position);
	var cons = 0;
	escena.add(camara);
	
	function renderizar()
	{
		object.rotation.y += 0.001;
		lienzo.render(escena, camara);
		requestAnimationFrame(renderizar);
	}
	renderizar();
	};
//cargar
	$('#planeta').change(function(){
		responsiveVoice.cancel();
		$.ajax({
			datatype: JSON,
			data: {planeta: $('#planeta').val()},
			method: 'POST', 
			url: 'http://http://104.154.58.249:8080/obtenerPlanetas'
		}).done(function(results){
			var planeta = crearPlaneta(results);
			$("#head").remove();
			$("#texto").html(results[0].descripcion);
			$("#texto").addClass("texto");
			swal({   
				title: "información",   
				text: "¿Desea escuchar la información?",
				imageUrl: "img/sonido.jpg",
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Escuchar",   
				closeOnConfirm: true
			}, function(){
				responsiveVoice.speak(results[0].descripcion, "Spanish Latin American Female");
			});

		})
	});
};
