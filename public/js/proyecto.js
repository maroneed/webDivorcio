

    var idPersona1 = 0;
    var idPersona2 = 0;
    var acta = 0;
    var provincia = "";
    var localidad = "";
    var nombrePersona1 = "";
    var nombrePersona2 = "";
    var apellidoPersona1 = "";
    var apellidoPersona2 = "";
    var dniPersona1 = "";
    var dniPersona2 = "";
    var propuesta = "";
    var solicitudTipo = "";


    console.log("provincia: " + provincia);


    fetch('https://apis.datos.gob.ar/georef/api/provincias')
    .then((respuesta) => {
        return respuesta.json();
    }).then((respuesta) => {

        console.log(respuesta.provincias.length);
        cargarProvincias(respuesta);  //cargo las provincias
          //cargo las provincias

        //imprimo por consola
        for (let i = 0, c = respuesta.provincias.length; i < c; i++) {
          console.log("Provincia: " + respuesta.provincias[i].nombre);
        }





    });


    console.log("esta es la provincia elegida: " + provincia);
    fetch('https://apis.datos.gob.ar/georef/api/localidades?provincia=buenos%20aires&max=234')
    .then((respuesta2) => {
        return respuesta2.json();
    }).then((respuesta2) => {

        console.log(respuesta2.localidades.length);
        cargarLocalidades(respuesta2);  //cargo las provincias
          //cargo las provincias

        //imprimo por consola
        //for (let i = 0, c = respuesta2.localidades.length; i < c; i++) {
        //  console.log("Provincia: " + respuesta2.localidades[i].nombre);
      //  }





    });

    function cargarProvincias(respuesta) {


        for(let i of respuesta.provincias){




            // provincias
            let miNodoPrecio = document.createElement('option');
            miNodoPrecio.textContent =  i['nombre'] ;
            // Insertamos
            opcionesProvincias.appendChild(miNodoPrecio);  //opciones es id de la etiqueta select



        }
        provincia = document.document.getElementById('opcionesProvincias').value; //cargo la provincia a la variable
        console.log("y ahora: " + provincia);

    }

    function cargarLocalidades(respuesta2) {

      var img = "https://apis.datos.gob.ar/georef/api/localidades?provincia=";
      var jpg = "&max=234";
      var ruta = img.concat(img,provincia,jpg);
      console.log("esta es la ruta:" + ruta);

      fetch(ruta)
      .then((respuesta2) => {
          return respuesta2.json();
      }).then((respuesta2) => {

          console.log(respuesta2.localidades.length);


          //imprimo por consola
          for (let i = 0, c = respuesta2.localidades.length; i < c; i++) {
            console.log("Localidades: " + respuesta2.localidades[i].nombre);
          }





      });
        for(let i of respuesta2.localidades){




            // provincias
            let miNodoPrecio = document.createElement('option');
            miNodoPrecio.textContent =  i['nombre'] ;
            // Insertamos
            opcionesLocalidades.appendChild(miNodoPrecio);  //opciones es id de la etiqueta select



        }
        localidad = document.document.getElementById('opcionesLocalidades').value; //cargo la provincia a la variable

    }
    function confirmarActa()
    {

      var dato = document.getElementById('acta').value; //cargo numero de acta
      console.log("acta: " + dato);
      var http = 'https://localhost:5001/api/TramiteMatrimonioes/GetMatrimonioPorActa?NumeroActa=';
      const rutaGet = http.concat(dato);
      console.log("rutaGet: " + rutaGet);
      const json = {"NumeroActa" : dato};
      fetch(rutaGet)
      .then((respuestaActa) => {
          return respuestaActa.json();
      }).then((respuestaActa) => {

          console.log(respuestaActa);
          idPersona1= respuestaActa['contrayentePersonaUnoId'];
          idPersona2= respuestaActa['contrayentePersonaDosId'];
          console.log("personaid 1: " + idPersona1);
          console.log("personaid 2: " + idPersona2);
          var http2 = 'https://localhost:44393/api/persona/GetPersonaByID?PersonaId='
          var rutaGet2 = http2.concat(idPersona1);
          fetch(rutaGet2)
          .then((respuestaPersona)=>{
            return respuestaPersona.json();
          }).then((respuestaPersona)=>{
            dniPersona1 = respuestaPersona['dni'];
            console.log("dni persona 1: " + dniPersona1);

          });

      });


    }

    function confirmarDivorcio()
    {
      fetch('https://localhost:44371/api/Ventas', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(compra),
      headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
          return response.json()
      })
      .then(function(compra) {
          console.log(compra)
          var aviso = alert("Venta exitosa!");
          total.innerHTML = 0;
          canasta.innerHTML = "";
      })
      .catch(err => alert("No se pudo concretar el registro.Revise los datos"));
    }
