using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Hypesoft.Domain.Entities;

namespace Hypesoft.Infrastructure.Data;

public class MongoContext
{
    private readonly IMongoDatabase _database;

    public MongoContext(IConfiguration configuration)
    {
        var client = new MongoClient(configuration.GetConnectionString("MongoDb"));
        _database = client.GetDatabase("HypesoftDb");
    }

    public IMongoCollection<Product> Products => _database.GetCollection<Product>("Products");
}