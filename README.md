# X3-C

- Angular 2
- Bulma.io
- Angular Cli

#Instrucciones para publicar en producción

- Crear el directorio en el servidor donde se va alojar:

```
mkdir sial  && cd sial
```
- Inicializar repositorio apuntando al proyecto cambiamos la palabra origin por github para saber de donde viene:
```
git init
git remote add -f github https://github.com/XXAI/X3-C.git
```

- Configuramos para que solo baje la carpeta de distribucion:
```
git config core.sparsecheckout true
echo dist/ >> .git/info/sparse-checkout
echo dist/assets >> .git/info/sparse-checkout
```

- La configuración anterior solo es al inicio y una sola vez, a partir de aqui, solo hacemos pull y nada mas bajaremos el directorio de distribución de angular cli.
```
git pull github master
```
