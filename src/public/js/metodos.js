var mensaje;
function leerArchivo(e) {
  const archivo = e.target.files[0];
  const lector = new FileReader();

  lector.onload = function(e) {
    const textoplano = e.target.result;
    mensaje = textoplano;
  };
  lector.readAsText(archivo);
}


document.querySelector('#fichero').addEventListener('change', leerArchivo, false);



function escribirFichero(cifrado ,isCifrado){

  const elm = document.createElement("a");
  var blob;
  var nombre;
  
  if(isCifrado){
    blob = new Blob([cifrado], {type: "octet/stream"});
    nombre = "textoCifrado";

  }else{
    blob = new Blob([cifrado.toString(CryptoJS.enc.Utf8)], {type: "octet/stream"});
    nombre = "textoDescifrado";
  }

  url = window.URL.createObjectURL(blob);
  elm.href = url;
  elm.download =  String(nombre)+'.txt';
  elm.click();
  window.URL.revokeObjectURL(url);

}
      
 function encriptar () {

  const fichero = document.querySelector('#fichero');


  if(fichero.value!=""){ 

    if(/(.txt)$/i.exec(fichero.value)){  

      const tipo = document.getElementById('combobox').value;
      var password = document.getElementById('password').value;

      

      // Si la contraseña cumple con el requerimiento del combobox se procedera a escribir el fichero
      if( (tipo == '128' && String(password).length == 16 ) || (tipo == '192' && String(password).length == 24)
          || (tipo == '256' && String(password).length == 32) ){
            
            const cifrado = CryptoJS.AES.encrypt(mensaje, password);
            escribirFichero(cifrado , true);

      }else{

          if(tipo == '0'){

            alert('Debe de seleccionar un formato para la contraseña')

          }else{
            const numdig = tipo/8
            alert('la contraseña no cumple con el formato de '+ tipo + ' bits (' +numdig+ ' digitos), en vez, cuenta con '+ String(password).length + ' simbolos');
          }
          
      }
    }else{
      alert('Solo se aceptan archivos *.txt')
    }
  }
  else{
    alert('Inserte un archivo')
  }
};

function desencriptar () {
  const fichero = document.querySelector('#fichero');
    if(fichero.value!=""){ 

      if(/(.txt)$/i.exec(fichero.value)){  
        const tipo = document.getElementById('combobox').value;
        var password = document.getElementById('password').value;


        // Si la contraseña cumple con el requerimiento del combobox se procedera a escribir el fichero
        if( (tipo == '128' && String(password).length == 16 ) || (tipo == '192' && String(password).length == 24)
          	|| (tipo == '256' && String(password).length == 32) ){
              
              const cifrado = CryptoJS.AES.decrypt(mensaje, password);
              escribirFichero(cifrado, false);

        }else{
            const numdig = tipo/8
            alert('la contraseña no cumple con el formato de '+ tipo + ' bits (' +numdig+ ' digitos), en vez, cuenta con '+ String(password).length + ' simbolos');
        }
      }else{
        alert('Solo se aceptan archivos *.txt')
      }
    }
    else{
      alert('Inserte un archivo')
    }
};


  

 