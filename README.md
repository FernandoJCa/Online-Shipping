# Sistema de Envíos

## Descripción
Este proyecto es un sistema de envíos en línea desarrollado con Vue.js. Permite a los usuarios iniciar sesión, enviar paquetes, ver el historial de envíos y gestionar operaciones básicas de envío.

## Características
- Autenticación de usuarios
- Navegación por menú principal
- Formulario de envío de paquetes con validación en tiempo real
- Vista de historial de envíos
- Diseño responsivo

## Tecnologías Utilizadas
- Vue.js 3
- Vue Router para la navegación
- Vuex para la gestión del estado
- Vuelidate para la validación de formularios
- CSS para el estilo (con estilos encapsulados en componentes)

## Configuración e Instalación
1. Clona el repositorio:
   ```
   git clone [url-del-repositorio]
   ```
2. Navega al directorio del proyecto:
   ```
   cd sistema-de-envios
   ```
3. Usa docker compose para iniciar la aplicación:
   ```
   docker compose up
   ```

## Uso
1. Abre un navegador web y ve a `http://localhost:8080` (o el puerto que se muestre en tu terminal).
2. Inicia sesión con las siguientes credenciales:
    - Usuario: admin
    - Contraseña: password
3. Utiliza el menú principal para navegar por las diferentes funciones de la aplicación.

## Componentes Principales

### Login (Login.vue)
- Maneja la autenticación de usuarios
- Implementa un mecanismo de bloqueo después de 3 intentos fallidos

### Menú Principal (MainMenu.vue)
- Centro de navegación principal
- Opciones para enviar un paquete, ver el historial de envíos y salir del sistema

### Formulario de Envío (ShippingForm.vue)
- Permite a los usuarios ingresar detalles del paquete
- Implementa validación de formularios en tiempo real usando Vuelidate
- Calcula el costo de envío basado en el peso del paquete

### Historial de Envíos (ShippingHistory.vue)
- Muestra una tabla de todos los envíos pasados
- Incluye detalles del paquete, costo y fecha de envío

## Estilos
- La aplicación utiliza una combinación de estilos encapsulados en componentes y estilos globales (assets/global.css).
- Se mantiene un esquema de colores y un lenguaje de diseño consistente en toda la aplicación.