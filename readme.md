# My Todo

Aplicación de tareas construida con **Ionic + Angular + Cordova** con categorías, pendientes/completadas y soporte para feature flags con Firebase Remote Config.

## Características

- Crear, completar y eliminar tareas.
- Filtrado por categorías.
- Gestión de categorías desde la app.
- Separación entre tareas pendientes y completadas.


## Stack

- Ionic
- Angular
- Cordova
- Android SDK
- Firebase Remote Config

## Instalación

```bash
npm install
```

## Ejecutar en navegador

```bash
ionic serve
```

## Ejecutar en Android

Verificar requisitos:

```bash
cordova requirements android
```

Compilar y ejecutar en dispositivo Android:

```bash
ionic cordova run android
```

Listar dispositivos disponibles:

```bash
ionic cordova run android --list
```

## Build APK

Para generar el build Android:

```bash
ionic cordova build android
```


## iOS

Para iOS el archivo de salida es un `.ipa`, no un `.apk`. Cordova iOS depende de Xcode y del entorno de macOS, por lo que la compilación final para iPhone requiere Mac.

