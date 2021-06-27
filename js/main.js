
$(document).ready(function(){

	/*declaracion de clase banner*/

	var banner = {

			padre: $("#banner"),
			numeroSlide: $("#banner").children(".slide").length,
			posicion: 1, 
			tipo: "banner"

	}

	var info = {
		padre: $("#info"),
		numeroSlide: $("#info").children(".slide").length,
		posicion: 1,
		tipo: "info"

	}

	var botones = {
		padre: $("#botones"),
		numeroSlide: $("#botones").children(".btnSlider").length,
		posicion: 1,
		tipo: "btn"
	}


	/*Tomo el primer slide y setea su estilo*/

	banner.padre.children(".slide").first().css({
		'left':0
	})

	info.padre.children(".slide").first().css({
		'left':0
	})

	/*Declaracion de la Funcion AltoContenido()*/

	var altoContenido = function(){
		var altoVentana = $(window).height();

		if (altoVentana <= $(".contenedor").outerHeight() + 200){
			$("#contenedor").css({
				"height": ""
			});
		}else{
			$("#contenedor").css({
				"height": altoVentana + "px"
			});
		}
	}

	/*(LCA): DETERMINO EL ALTO DEL SLIDER, SEA EL DEL BANNER O DE LA INFO*/
	var altoSlider = function(objeto){

		var alto = objeto.padre.children('.active').outerHeight();

		objeto.padre.animate({
			'height': alto + 'px'
		});
	
	}
	/*(LCA): FIN ALTOSLIDER*/

	/*Ejecución de la Funcion AltoBanner para que calcule la altula de las imagenes*/

	altoSlider(banner);
	altoSlider(info);
	altoContenido();

	/*Para cuando redimensione la pantalla se recalcula el alto de las imagenes*/

	$(window).resize(function(){

		altoSlider(banner);
		altoSlider(info);
		altoContenido();
	});

	$("#info").children(".slide").each(function (){
		$("#botones").append("<span class = 'btnSlider'>");
	});

	$("#botones").children("span").first().addClass("active");


	$(".btnSlider").on("click", function(e){

		var i = $(this).attr("title"); 
        alert('Has clickado sobre el elemento número: '+i); 

/*		info.posicion = botones.posicion;*/
	});


	/**BANNER /

	/*Boton Siguiente*/

	$("#banner-next").on("click", function(e){

		e.preventDefault();
		irSliderSiguiente(banner);
	});

	/*Fin Boton Siguiente*/
	
	/*Boton Anterior*/

	$("#banner-prev").on("click", function(e){
		e.preventDefault();
		irSliderAnterior(banner);
	});

	/*INFORMACION*/

	$("#info-next").on('click', function(e){

		e.preventDefault();
		irSliderSiguiente(info);

	});

	/*(LCA) IR SLIDER ANTERIOR*/

	var irSliderAnterior = function(objeto){
		if (objeto.posicion > 1){

			objeto.padre.children().not(".active").css({
				"left":"-100%"
			});

			if (objeto.tipo == "banner")
			{
				$("#banner .active").animate({
					"left": "100%"
				});

				$("#banner .active").removeClass("active").prev().addClass("active").animate({
					"left": "0%"
				});
			}else{
				$("#info .active").animate({
					"left": "100%"
				});

				$("#info .active").removeClass("active").prev().addClass("active").animate({
					"left": "0%"
				});				

				$("#botones").children(".active").removeClass("active").prev().addClass("active");
			}

			objeto.posicion = objeto.posicion - 1;
		}
		else{
			objeto.padre.children().not("active").css({
				"left":"-100%"
			});

			if (objeto.tipo == "banner")
			{
				$("#banner.active").animate({
					"left": "100%"
				});

				$("#banner .active").removeClass("active");
				objeto.padre.children().last().addClass("active").animate({
					"left":0
				});

			}else{

				$("#info.active").animate({
					"left": "100%"
				});

				$("#info .active").removeClass("active");
				objeto.padre.children().last().addClass("active").animate({
					"left":0
				});

			$("#botones").children(".active").removeClass("active");
			$("#botones").children("span").last().addClass("active");		


			}


			objeto.posicion = objeto.numeroSlide;

		}

		altoSlider(objeto);

	}	

	/*(LCA) FIN IR SLIDER ANTERIOR*/

	/*(LCA) IR SLIDER SIGUIENTE*/

	var irSliderSiguiente = function(objeto){
				if (objeto.posicion < objeto.numeroSlide){

			/*pongo todas las imagenes a la derecha*/
			objeto.padre.children().not(".active").css({
				"left": "100%"
			});

			if (objeto.tipo == "banner"){
				$("#banner .active").removeClass("active").next().addClass("active").animate({
					'left': '0%'
				});

				$("#banner .active").prev().animate({
					"left": "-100%"
				});
			}
			else
			{
				$("#info .active").removeClass("active").next().addClass("active").animate({
					'left': '0%'
				});

				$("#info .active").prev().animate({
					"left": "-100%"
				});
			$("#botones").children(".active").removeClass("active").next().addClass("active");

			}

			objeto.posicion = objeto.posicion + 1;
		}
		else {

				if (objeto.tipo == "banner"){
					$("#banner .active").animate({
						"left": "-100%"
					});
				}
				else{
					$("#info .active").animate({
						"left": "-100%"
					});
				}


				objeto.padre.children().not(".active").css({
					"left": "100%"
				});

				if (objeto.tipo == "banner"){
				 	$("#banner .active").removeClass("active");
				 }
				else{
				 	$("#info .active").removeClass("active");
				}					

				objeto.padre.children(".slide").first().addClass("active").animate({
						"left": "0%"
				});				

				if (objeto.tipo	 == "info"){

					$("#botones").children(".active").removeClass("active");
					$("#botones").children("span").first().addClass("active");				
				}

			 	objeto.posicion =1;
			 }

			 altoSlider(objeto);

	}


	/*(LCA) FIN IR SLIDER SIGUIENTE*/

	$("#info-prev").on("click", function(e){
		e.preventDefault();
		irSliderAnterior(info);

	});

	/*Animacion automatica que mueve los slide de la informacion cada 5 segundos*/
	setInterval(function(){irSliderSiguiente(info);}, 5000);
	setInterval(function(){irSliderAnterior(banner);}, 10000);


});

