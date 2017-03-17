# X3-C

- Angular 2
- Bulma.io

#Instrucciones para publicar en producción


- Seguir los pasos comunes para crear la carpeta en producción y agregar el repositorio git
```
git init
git remote add origin https://github.com/XXAI/X3-C.git
```

- A partir de aqui, se baja solamente la carpeta de distribución generada por el angular-cli
```
git config core.sparseCheckout true
echo 'dist/*' > .git/info/sparse-checkout
git fetch origin
git pull origin master
```

-En teoria para actualizar solo tendriamos que hacer un pull a origin master y nos estaría descargando unicamente la carpeta dist/