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

    
    async function cargarChats() {
        try {
            const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts');
            const posts = await respuesta.json();

            listadoChats.innerHTML = ''; 

            posts.slice(0, 10).forEach(post => {
                const chat = document.createElement('div');
                Object.assign(chat.style, {
                    borderBottom: '1px solid grey', 
                    padding: '10px 4px',
                    color: 'white', 
                });
                chat.innerText = post.title;
                listadoChats.appendChild(chat);
            });
        } catch (error) {
            console.error('Error al cargar los chats:', error);
        }
    }

    cargarChats();

    
    function aplicarEstiloBubble(elemento) {
        elemento.style.maxWidth = '40%';
        elemento.style.marginBottom = '8px';
        elemento.style.wordWrap = 'break-word';
        elemento.style.padding = '10px';
        elemento.style.borderRadius = '20px';
        elemento.style.backgroundColor = '#dedef9';
        elemento.style.boxShadow = '0px 2px 2px rgba(0, 0, 0, 0.2)';
        elemento.style.border = 'none';
        elemento.style.marginRight = '10px';
        elemento.style.fontFamily = 'Arial, sans-serif';
        elemento.style.fontSize = '14px';
        elemento.style.color = '#333';
        elemento.style.display = 'inline-block';
    }

    
    botonEnviar.addEventListener('click', function() {
        enviarMensaje();
    });

    textareaChat.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            enviarMensaje();
        }
        limitarCaracteres(event);
    });

    function enviarMensaje() {
        const texto = textareaChat.value.trim();
        if (texto !== '' && texto.length <= 140) {
            const nuevaBurbuja = document.createElement('div');
            nuevaBurbuja.className = 'bubble';
            nuevaBurbuja.innerText = texto;
            aplicarEstiloBubble(nuevaBurbuja);

            mensaje.insertBefore(nuevaBurbuja, mensaje.firstChild);

            textareaChat.value = '';
        }
    }
    function limitarCaracteres(event) {
        const limite = 140;
        const texto = textareaChat.value;
        if (texto.length > limite - 1 && event.key !== 'Backspace' && event.key !== 'Delete') {
            event.preventDefault(); 
            mostrarAnimacionLimite(); 
        } else if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); 
            enviarMensaje(); 
        }
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



