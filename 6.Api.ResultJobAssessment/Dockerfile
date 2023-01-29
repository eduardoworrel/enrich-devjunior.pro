# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /app

COPY ./ ./

RUN dotnet publish Api.ResultJobAssessment.csproj -c release -o /out

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /out ./

EXPOSE 80

ENTRYPOINT ["dotnet", "Api.ResultJobAssessment.dll"]