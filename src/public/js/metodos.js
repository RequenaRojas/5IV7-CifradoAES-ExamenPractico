


function leerArchivo(e) {
  const archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  const lector = new FileReader();
    lector.onload = function(e) {
    mensaje = e.target.result;


  };
  lector.readAsText(archivo);
  return mensaje;
}

function escribirFichero(cifrado , nombre){

  const elm = document.createElement("a");
  blob = new Blob([cifrado.toString(CryptoJS.enc.Utf8)], {type: "octet/stream"});

  url = window.URL.createObjectURL(blob);
  elm.href = url;
  elm.download =  String(nombre)+'.txt';
  elm.click();
  window.URL.revokeObjectURL(url);

}
      
 function encriptar () {
  if(document.getElementById('archivo').value!=""){ 

    if(/(.txt)$/i.exec(document.getElementById('fichero').value)){  

      const tipo = document.getElementById('combobox').value;
      var password = document.getElementById('password').value;

      

      // Si la contraseña cumple con el requerimiento del combobox se procedera a escribir el fichero
      if( (tipo == '128' && String(password).length == 16 ) || (tipo == '192' && String(password).length == 24)
          || (tipo == '256' && String(password).length == 32) ){
            
            const cifrado = CryptoJS.AES.crypt(leerArchivo(), Password);
            escribirFichero(cifrado , 'MensajeEncriptado');

      }else{
          const numdig = tipo/8
          alert('la contraseña no cumple con el formato de '+ tipo + ' bits, Osea no tiene '+ numdig+ 'simbolos');
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
    if(document.getElementById('fichero').value!=""){ 

      if(/(.txt)$/i.exec(document.getElementById('fichero').value)){  

        const tipo = document.getElementById('combobox').value;
        var password = document.getElementById('password').value;

        

        // Si la contraseña cumple con el requerimiento del combobox se procedera a escribir el fichero
        if( (tipo == '128' && String(password).length == 16 ) || (tipo == '192' && String(password).length == 24)
          	|| (tipo == '256' && String(password).length == 32) ){
              
              const cifrado = CryptoJS.AES.decrypt(leerArchivo(), Password);
              escribirFichero(cifrado, 'MensajeDesencriptado');

        }else{
            const numdig = tipo/8
            alert('la contraseña no cumple con el formato de '+ tipo + ' bits, Osea no tiene '+ numdig+ 'simbolos');
        }
      }else{
        alert('Solo se aceptan archivos *.txt')
      }
    }
    else{
      alert('Inserte un archivo')
    }
};

document.querySelector('#fichero').addEventListener('change', leerArchivo, false);

  

 