using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Hypesoft.Domain.Entities;

namespace Hypesoft.Infrastructure.Data;

public class MongoContext
{
    private readonly IMongoDatabase _database;

    public MongoContext(IConfiguration configuration)
    {
        var connectionString = configuration["MongoSettings:Connection"];
        var databaseName = configuration["MongoSettings:Database"];

        if (string.IsNullOrEmpty(connectionString) || string.IsNullOrEmpty(databaseName))
        {
            throw new Exception("Configurações do MongoDB (Connection ou Database) estão faltando no appsettings ou variáveis de ambiente!");
        }

        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<Product> Products =>
        _database.GetCollection<Product>("Products");

    public IMongoCollection<Category> Categories =>
        _database.GetCollection<Category>("Categories");

    public IMongoCollection<StockMovement> StockMovements =>
        _database.GetCollection<StockMovement>("StockMovements");

    public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
}