FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app


COPY Hypesoft.sln ./

COPY src/Hypesoft.Domain/*.csproj ./src/Hypesoft.Domain/
COPY src/Hypesoft.Application/*.csproj ./src/Hypesoft.Application/
COPY src/Hypesoft.Infrastructure/*.csproj ./src/Hypesoft.Infrastructure/
COPY src/Hypesoft.API/*.csproj ./src/Hypesoft.API/


RUN dotnet restore

COPY . .


RUN dotnet publish src/Hypesoft.API/Hypesoft.API.csproj -c Release -o /out


FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app


COPY --from=build /out .

COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

EXPOSE 5000


ENTRYPOINT ["./entrypoint.sh"]
