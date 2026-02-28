#!/bin/bash
# O comando 'set -e' faz o script parar se qualquer comando falhar
set -e

echo "=> Iniciando o Entrypoint do Backend..."

# Aqui você poderia adicionar um comando para esperar o MongoDB, por exemplo.
# Como o Mongo é rápido, vamos apenas iniciar a aplicação.
echo "=> Iniciando a API Hypesoft .NET 9..."
exec dotnet Hypesoft.API.dll --urls="http://0.0.0.0:5000"