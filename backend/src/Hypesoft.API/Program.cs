using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Data;
using Hypesoft.Infrastructure.Repositories;
using Hypesoft.Application.Handlers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Injeção de Dependência
builder.Services.AddSingleton<MongoContext>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// Registrar MediatR apontando para a camada de Application
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateProductHandler).Assembly));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options => { options.RoutePrefix = string.Empty; options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1"); });
}

app.MapControllers();
app.Run();