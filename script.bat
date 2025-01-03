#!/bin/bash  
echo "Eliminando contenedores docker, si existen"  
docker compose -f docker-compose.yml down -v 
echo "Creando contenedores docker"
docker compose -f docker-compose.yml up -d --build
echo "Lanzando contenedores docker"
SOMEVAR='Proceso terminado Con Exito!!!'  
echo "$SOMEVAR"
python3 -m webbrowser http://127.0.0.1:3000/auth-pages/login
#Startup whit admin permissions in windows
# in mac or linux use chmod +x script.sh and ./script.sh