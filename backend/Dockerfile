# Estágio de Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copiar arquivos de solução e projetos
COPY Hypesoft.sln ./
COPY src/Hypesoft.Domain/*.csproj ./src/Hypesoft.Domain/
COPY src/Hypesoft.Application/*.csproj ./src/Hypesoft.Application/
COPY src/Hypesoft.Infrastructure/*.csproj ./src/Hypesoft.Infrastructure/
COPY src/Hypesoft.API/*.csproj ./src/Hypesoft.API/

# Restaurar dependências
RUN dotnet restore

# Copiar o restante do código e compilar
COPY . .
RUN dotnet publish src/Hypesoft.API/Hypesoft.API.csproj -c Release -o /out

# Estágio de Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /out .

# Porta que o container vai expor
EXPOSE 5000
ENTRYPOINT ["dotnet", "Hypesoft.API.dll", "--urls=http://0.0.0.0:5000/"]

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /out .

# Copia o entrypoint e garante a permissão de execução
COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

EXPOSE 5000

# Agora o comando de entrada é o script
ENTRYPOINT ["./entrypoint.sh"]