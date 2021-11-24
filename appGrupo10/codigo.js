var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td></tr>";
	 var productos=null;
	 function crearBoton(id){
		 var boton="<button class='x' onclick='borrarProducto("+id+");'>Borrar</button>";
         return boton;
	 }
	function obtenerProductos() {
	  fetch('http://127.0.0.1:3000/muebleria')
            .then(res=>res.json())
            .then(data=>{
				productos=data;
				productos.forEach(
				function(producto){
					producto.precio=parseFloat(producto.precio)
				});
				listarProductos(data)})
			.catch(error => {
                    alert(error);
                } )
}

function guardarProductos(){
	let producto = {
		titulo:document.getElementById("nombre").value,
		precio:document.getElementById("precio").value,
		descripcion:document.getElementById("descripcion").value,
		imagen:document.getElementById("imagen").value,
		categoria:document.getElementById("categoria").value,
	}
	fetch("http://127.0.0.1:3000/muebleria",
	{ method:"POST",
	  body: JSON.stringify(producto),
	  headers: {
		 'Accept': 'application/json',
		 'Content-type': 'application/json; charset=UTF-8',
	  }
	})
	.then(response=>response.json())
	.then(data=>productos=data);
	alert("El mueble se ha registrado");
	document.getElementById("nombre").value = "";
	document.getElementById("precio").value = "";
	document.getElementById("descripcion").value = "";
	document.getElementById("imagen").value = "";

	orden=0;
	window.setTimeout(obtenerProductos, 500);
}

function borrarProducto(id) {
	var delresult;
	var url='http://localhost:3000/muebleria/'+id;
	
	  fetch(url,{method:"DELETE"})
            .then( res=>res.status)
            .then(codigo=>{
switch(codigo) {
			case 200: alert("producto borrado");			         
					  document.querySelector("inventario").click();
					  break;
			case 404: alert("producto no existe");break; }
});	  	
		 				 
}


  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "Oficina":code="c1";break;
	    case "Sala":code="c2";break;
		case "Reclinables":code="c3";break;
		case "Dormitorio":code="c4";break;
	}
	return code;
}   
	  var orden=0;
	  
	  
	function listarProductos(productos) {
	  var precio=document.getElementById("price"); 
	  precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
	  var num=productos.length;
	  var listado=document.getElementById("listado");
	  var ids,titles,prices,descriptions,categories,fotos;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  titles=document.getElementsByClassName("title");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");   
	  prices=document.getElementsByClassName("price");   
	  if(orden===0) {orden=-1;precio.innerHTML="Precio"}
	  else
	     if(orden==1) {ordenarAsc(productos,"price");precio.innerHTML="Precio A";precio.style.color="darkgreen"}
	     else 
	       if(orden==-1) {ordenarDesc(productos,"price");precio.innerHTML="Precio D";precio.style.color="blue"}
	
		  var boton="";
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=productos[nfila].id;
		boton = crearBoton(productos[nfila].id);
		titles[nfila].innerHTML=productos[nfila].titulo;
		descriptions[nfila].innerHTML=productos[nfila].descripcion;
		categories[nfila].innerHTML=productos[nfila].categoria+boton;
		catcode=codigoCat(productos[nfila].categoria);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		prices[nfila].innerHTML="$"+productos[nfila].precio;
		fotos[nfila].innerHTML="<img src='"+productos[nfila].imagen+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].imagen+"');" );
		}
	}


function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}