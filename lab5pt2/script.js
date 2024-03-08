document.addEventListener('DOMContentLoaded', async function() {
    
    const contenedor = document.createElement('div');
    document.body.appendChild(contenedor);
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#000c21';
    
    Object.assign(contenedor.style, {
        display: 'grid',
        gridTemplateColumns: '20% 80%',
        gridTemplateRows: '85% 15%',
        height: '100vh',
        fontFamily: "'Arial', sans-serif",
        color: 'white', 
    });

    
    const listadoChats = document.createElement('div');
    const mensaje = document.createElement('div');
    mensaje.id = 'mensaje'; 
    const contenidoPerfil = document.createElement('div');
    const contenidoChat = document.createElement('div');

    
    Object.assign(listadoChats.style, {
        backgroundColor: 'transparent', 
        overflow: 'auto',
        border: '1px solid black',
        padding: '8px',
    });


    Object.assign(mensaje.style, {
        backgroundColor: '#00173b', 
        border: '1px solid black',
        padding: '4px',
        display: 'flex',
        flexDirection: 'column-reverse', 
        alignItems: 'flex-end', 
        overflow: 'auto'
    });


    
    Object.assign(contenidoPerfil.style, {
        backgroundColor: 'transparent', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    });

    
    const imagenPerfil = new Image();
    imagenPerfil.src = 'https://i.pinimg.com/originals/12/82/1a/12821aef23d6a0615e08d056bf5018e1.jpg';
    imagenPerfil.style.width = '65px';
    imagenPerfil.style.height = '65px';
    imagenPerfil.style.borderRadius = '50%';
    contenidoPerfil.appendChild(imagenPerfil);

    const nombrePerfil = document.createElement('h3');
    nombrePerfil.innerText = 'Mami Rica';
    contenidoPerfil.appendChild(nombrePerfil);

    
    Object.assign(contenidoChat.style, {
        backgroundColor: 'transparent', 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
    });
    

    const textareaChat = document.createElement('textarea');
    textareaChat.id = 'mensaje-texto'; 
    Object.assign(textareaChat.style, {
        width: '85%',
        height: '90%',
        margin: '0',
        resize: 'none',
        backgroundColor: '#fff', 
        color: '#000', 
    });
    contenidoChat.appendChild(textareaChat);

    const botonEnviar = document.createElement('button');
    botonEnviar.id = 'enviar-mensaje'; 
    botonEnviar.innerText = 'Enviar';
    Object.assign(botonEnviar.style, {
        width: '10%',
        height: '50px',
        marginLeft: '5%',
        backgroundColor: '#ddd', 
        color: '#000', 
    });
    

    contenidoChat.appendChild(botonEnviar);

    
    contenedor.appendChild(listadoChats);
    contenedor.appendChild(mensaje);
    contenedor.appendChild(contenidoPerfil);
    contenedor.appendChild(contenidoChat);
    const chatGrupal = document.createElement('div');
    chatGrupal.id = 'ChatGrupal';   
    Object.assign(chatGrupal.style, {
        display : 'flex',
        overflowY: 'scroll',
        margin: 'auto',
        flexDirection : 'column',
        height : 'calc(100vh - 120px)',
        maxWidth: '100%',
        minWidth: '100%'
    });
    mensaje.appendChild(chatGrupal);
    

    
    const nombreUsuarioActual = 'Sofi G';

    async function cargarChats() {
        try {
            const respuesta = await fetch('http://uwu-guate.site:3000/messages');
            if (!respuesta.ok) {
                throw new Error('No se pudo obtener los mensajes desde la API');
            }
            const mensajes = await respuesta.json();

            listadoChats.innerHTML = '';
            chatGrupal.innerHTML = '';

            const nombresUnicos = new Set();

            mensajes.forEach(mensaje => {
                const { id, username, content: message } = mensaje; 

                if (!nombresUnicos.has(username)) {
                    nombresUnicos.add(username);
                    const chat = document.createElement('div');
                    chat.style.borderBottom = '1px solid grey';
                    chat.style.padding = '10px 4px';
                    chat.style.color = 'white';
                    chat.innerText = username;
                    listadoChats.appendChild(chat);
                }

                const esDelUsuarioActual = username === nombreUsuarioActual;
                mostrarMensajeEnChat({ username, message }, esDelUsuarioActual);
            });

            chatGrupal.scrollTop = chatGrupal.scrollHeight;
        } catch (error) {
            console.error('Error al cargar los chats:', error);
        }
    }

    cargarChats();

    
    function aplicarEstiloBubble(elemento, esDelUsuarioActual) {
        elemento.style.maxWidth = '60%';
        elemento.style.padding = '10px';
        elemento.style.borderRadius = '20px';
        elemento.style.marginBottom = '5px';
        elemento.style.wordWrap = 'break-word';
        elemento.style.fontFamily = 'Arial, sans-serif';
        elemento.style.fontSize = '14px';
        elemento.style.color = '#333';
        elemento.style.display = 'inline-block';
        elemento.style.backgroundColor = esDelUsuarioActual ? '#E8E8E8' : '#759bbc';
        if (esDelUsuarioActual) {
            elemento.style.marginLeft = 'auto';
            elemento.style.marginRight = '0';
        } else {
            elemento.style.marginLeft = '0';
            elemento.style.marginRight = 'auto';
        }
    }
    
    
    botonEnviar.addEventListener('click', function() {
        enviarMensaje();
    });

    textareaChat.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            enviarMensaje();
        }
        
    });

    function enviarMensaje() {
        const texto = textareaChat.value.trim();
        if (texto === '') {
            console.log('El mensaje no puede estar vacío.');
            return;
        }
    
        if (texto.length > 140) {
            mostrarAnimacionLimite(); 
            return;
        }
    
        
        const mensajeParaEnviar = {
            username: 'Sofi G', 
            message: texto,
        };
    
        
        fetch('http://uwu-guate.site:3000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mensajeParaEnviar),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Respuesta de la API no fue exitosa');
            }
            return response.json();
        })
        .then(data => {
            console.log('Mensaje enviado con éxito:', data);
            textareaChat.value = ''; 
    
            
            mostrarMensajeEnChat(mensajeParaEnviar);
    
            
            cargarChats(); 
        })
        .catch(error => {
            console.error('Error al enviar el mensaje:', error);
        });
    }
    function validarURL(str) {
        const patron = new RegExp("^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$");
        return patron.test(str);
    }
    function esEnlaceImagen(url) {
        return /\.(jpeg|jpg|gif|png)$/.test(url.toLowerCase());
    }
    async function obtenerVistaPreviaURL(url, intentos = 1) {
        var key = "d796a76b4185965954776ff252dc0564"; 
        var data = {q: url};
    
        try {
            const response = await fetch('https://api.linkpreview.net', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Linkpreview-Api-Key': key,
                },
                mode: 'cors',
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                if (response.status === 429 && intentos < 5) {
                    const espera = Math.pow(2, intentos) * 1000; 
                    console.log(`Esperando ${espera} ms antes del intento ${intentos + 1}`);
                    await new Promise(resolve => setTimeout(resolve, espera));
                    return obtenerVistaPreviaURL(url, intentos + 1);
                } else {
                    throw new Error('Error al obtener la vista previa');
                }
            }
            return await response.json();
        } catch (error) {
            console.error('Error al obtener la vista previa de la URL:', error);
        }
    }
    
    async function mostrarMensajeEnChat({ username, message }, esDelUsuarioActual) {
        const contenedorMensaje = document.createElement('div');
        contenedorMensaje.style.display = 'flex';
        contenedorMensaje.style.flexDirection = 'column';
        contenedorMensaje.style.width = '100%';
        contenedorMensaje.style.alignItems = esDelUsuarioActual ? 'flex-end' : 'flex-start';

        if (!esDelUsuarioActual) {
            const nombreUsuario = document.createElement('div');
            nombreUsuario.innerText = username;
            nombreUsuario.style.fontSize = '12px';
            nombreUsuario.style.color = '#fff';
            nombreUsuario.style.marginBottom = '2px';
            contenedorMensaje.appendChild(nombreUsuario);
        }

        const bubbleMensaje = document.createElement('div');
        bubbleMensaje.className = 'bubble';
        aplicarEstiloBubble(bubbleMensaje, esDelUsuarioActual);
        
        if (validarURL(message)) {
            if (esEnlaceImagen(message)) {
                const imagen = document.createElement('img');
                imagen.src = message;
                imagen.style.maxWidth = '200px';
                imagen.style.borderRadius = '4px';
                contenedorMensaje.appendChild(imagen);
            }
            else{bubbleMensaje.innerText = 'Cargando vista previa del enlace...';
            contenedorMensaje.appendChild(bubbleMensaje);
            obtenerVistaPreviaURL(message)
                .then(vistaPrevia => {
                    bubbleMensaje.innerHTML = ''; 
                    if (vistaPrevia && vistaPrevia.image) {
                        const imagenVistaPrevia = document.createElement('img');
                        imagenVistaPrevia.src = vistaPrevia.image;
                        imagenVistaPrevia.style.maxWidth = '200px';
                        imagenVistaPrevia.style.borderRadius = '4px';
                        bubbleMensaje.appendChild(imagenVistaPrevia);
                    }
                    if (vistaPrevia && vistaPrevia.title) {
                        const tituloVistaPrevia = document.createElement('div');
                        tituloVistaPrevia.innerText = vistaPrevia.title;
                        tituloVistaPrevia.style.color = '#00B7FF';
                        bubbleMensaje.appendChild(tituloVistaPrevia);
                    }
                    if (vistaPrevia && vistaPrevia.description) {
                        const descripcionVistaPrevia = document.createElement('div');
                        descripcionVistaPrevia.innerText = vistaPrevia.description;
                        descripcionVistaPrevia.style.color = '#FFFFFF';
                        bubbleMensaje.appendChild(descripcionVistaPrevia);
                    }
                    if (vistaPrevia && vistaPrevia.url) {
                        const enlace = document.createElement('a');
                        enlace.href = vistaPrevia.url;
                        enlace.target = '_blank';
                        enlace.innerText = vistaPrevia.url;
                        enlace.style.display = 'block';
                        enlace.style.color = '#00B7FF';
                        bubbleMensaje.appendChild(enlace);
                    }
                })
                .catch(error => {
                    console.error('Error al cargar la vista previa:', error);
                    bubbleMensaje.innerText = 'No se pudo cargar la vista previa del enlace';
                });}
            
        } else {
            bubbleMensaje.innerText = message;
            contenedorMensaje.appendChild(bubbleMensaje);
        }
        
        chatGrupal.appendChild(contenedorMensaje);
        chatGrupal.scrollTop = chatGrupal.scrollHeight;
    }
    
    
    function mostrarAnimacionLimite() {
        const advertencia = document.createElement('div');
        advertencia.innerText = 'Límite de 140 caracteres alcanzado';
        Object.assign(advertencia.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'red',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            zIndex: 1000,
            animation: 'fadeout 5s',
            textAlign: 'center',
            maxWidth: '80%',
        });
        document.body.appendChild(advertencia);
    
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fadeout {
                from {opacity: 1;}
                to {opacity: 0;}
            }
        `;
        document.head.appendChild(style);
    
        setTimeout(() => {
            document.body.removeChild(advertencia);
        }, 5000);
    }
    


    const barra = document.createElement('div');
    Object.assign(barra.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '30px',
        backgroundColor: '#000c21', 
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0 10px',
    });

    
    const switchModo = document.createElement('div');
    switchModo.style.width = '40px';
    switchModo.style.height = '20px';
    switchModo.style.backgroundColor = '#ccc';
    switchModo.style.borderRadius = '10px';
    switchModo.style.position = 'relative';
    switchModo.style.cursor = 'pointer';

    
    const circuloSwitch = document.createElement('div');
    circuloSwitch.style.position = 'absolute';
    circuloSwitch.style.top = '2px';
    circuloSwitch.style.left = '2px';
    circuloSwitch.style.width = '16px';
    circuloSwitch.style.height = '16px';
    circuloSwitch.style.backgroundColor = 'white';
    circuloSwitch.style.borderRadius = '50%';
    circuloSwitch.style.transition = 'all 0.3s';

    
    switchModo.appendChild(circuloSwitch);

    
    switchModo.addEventListener('click', function() {
        const isDarkMode = circuloSwitch.style.left === '2px';

        if (isDarkMode) {
            
            document.body.style.backgroundColor = '#000c21';
            mensaje.style.backgroundColor = '#00173b';
            mensaje.style.color = 'green';
            barra.style.backgroundColor = '#000c21';
            circuloSwitch.style.left = '22px'; 
        } else {
            
            document.body.style.backgroundColor = '#9ec2e6';
            mensaje.style.backgroundColor = '#c5d9ed';
            mensaje.style.color = '#000c21';
            barra.style.backgroundColor = '#9ec2e6';
            circuloSwitch.style.left = '2px'; 
        }
    });

    
    barra.appendChild(switchModo);
    mensaje.style.position = 'relative';
    mensaje.appendChild(barra);
    
});



