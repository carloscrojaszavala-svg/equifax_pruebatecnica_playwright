TMDB API Testing - Playwright + TypeScript

1- Introducción
    Este proyecto contienela suite de pruebas de API para los catálogos contenidos en la web The Movie Database (TMDB).
    El objetivo principal de las pruebas es, validar la correcta respuesta de los endpoint al finalizar su ejecución, asegurando:
        - Respuesta integral en las API´s
        - Manejo escenarios positivos (Status code 200)
        - Manejo escenarios negativos (Status code 401)

2- Endpoints validados
    Para estas pruebas, se validan los siguientes endpoint relacionados al catálogo de películas de la página TMDB:
        - Top Rated -> movie/top_rated
        - Popular -> /movie/popular
        - Now Playing -> /movie/now_playing
        - Upcoming -> /movie/upcoming

3- Escenarios automatizados
    *Escenario A: Flujo exitoso (Status code 200)
        En cada endpoint ejecutado, se valida lo siguiente:
            - Respuesta HTTP sea Status code 200
            - Estructura del response contenga los datos por página, ya sean:
                 -> page
                 -> total_result
                 -> total_pages
            - La lista de results:
                 -> Exista y contenga datos (sin vacíos)
                 -> El primer elemento contenga los siguientes campos obligatorios
                    # id
                    # title
                    # release date

    *Escenario B: Flujo con error de autenticación (401 Unauthorized)
            - Se realiza una ejecución l servicio sin enviar la API KEY
            - Se valida que la respuesta sea 401 Unauthorized
            - Se valida que el body contenga el mensaje de error de TMDB (Mensaje error oficial):
                * "Invalid API key"

4- Stack tecnológico
    Para la realización de los escenarios de prueba automatizados, se utilizaron las siguientes herramientas:
        - Playwright
        - TypeScript
        - Node.js
        - dotenv (Manejo variables entorno)

5- Arquitectura del proyecto
    A continuación, se describe la estructura modular del proyecto:

        equifax_pruebatecnica_playwright/
        |
        |---src/
        |   |---services/
        |   |      |---tmdb.services.ts
        |   |---utils/
        |          |---env.ts
        |
        |---tests/
        |   |---api/
        |          |---tmdb.catalogs.spec.ts
        |          |---tmdb.unauthorized.spec.ts
        |
        |---playwright.conf.ts
        |---.env
        |---.gitignore
        |---README.md

6- Configuración API Key
    En la raíz del proyecto, se crea un archivo .env que contendrá la siguiente estructura:
        TMDB_API_KEY= ESCRIBE_TU_API_KEY_AQUI
        TMDB_BASE_URL= https://api.themoviedb.org/3

    Nota: 
        La API Key, al ser una variable de entorno, no se encuentra hardcodeada.
        El archivo .env no debe subirse jamas al repositorio. Se puede configurar en el archivo .gitignore agregado la línea .env dentro del archivo.

7- Comandos de eejcución de los test
    Para ejecutar la suite de pruebas, se ejecuta el siguiente comando:
        - npx playwright test
    Para ver el reporte, una vez finalizada la ejecución de la prueba automatizada, se ejecuta el siguiente comando:
        - npx playwright show-report
        - El reporte mostrará:
            * Test ejecutados con su código de respuesta (200, 401)
            * Estado (passed, failed)
            * Detalle del error en caso de fallo
    Dónde se ejecutan estos comandos?:
        - En la raíz del proyecto, a través de una terminal de comandos

8- Consideraciones
    - Los test de API se ejecutan en un sólo proyecto, sin dependencia de navegador ya que el motor de navegador no aporta valor en validaciones de servicios dada la naturaleza de la tecnología.
    - El reporte muestra únicamente el resultado de las validaciones y no retorna el response del servicio dado que se requiere mantener test limpios y enfocados en validación. 
    - La suite de pruebas valida tanto la respuesta de la API en concordancia con la web de TMDB como los escenarios de error controlados.

9- Autor
    Proyecto desarrollado como prueba técnica de automatización de APIs usando Playwright y TypeScript.