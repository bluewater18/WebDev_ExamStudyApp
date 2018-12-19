FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["ExamStudy.API/ExamStudy.API.csproj", "ExamStudy.API/"]
COPY ["ExamStudy.Entities/ExamStudy.Entities.csproj", "ExamStudy.Entities/"]
COPY ["ExamStudy.Repository/ExamStudy.Repository.csproj", "ExamStudy.Repository/"]
COPY ["ExamStudy.Repository.Interfaces/ExamStudy.Repository.Interfaces.csproj", "ExamStudy.Repository.Interfaces/"]
COPY ["ExamStudy.Business.Interfaces/ExamStudy.Business.Interfaces.csproj", "ExamStudy.Business.Interfaces/"]
COPY ["ExamStudy.Business/ExamStudy.Business.csproj", "ExamStudy.Business/"]
RUN dotnet restore "ExamStudy.API/ExamStudy.API.csproj"
COPY . .
WORKDIR "/src/ExamStudy.API"
RUN dotnet build "ExamStudy.API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "ExamStudy.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "ExamStudy.API.dll"]