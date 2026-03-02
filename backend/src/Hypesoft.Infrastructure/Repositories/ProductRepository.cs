using MongoDB.Driver;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Data;

namespace Hypesoft.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly MongoContext _context;

    public ProductRepository(MongoContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(Product product)
        => await _context.Products.InsertOneAsync(product);

    public async Task<List<Product>> GetAllAsync()
        => await _context.Products.Find(_ => true).ToListAsync();

    public async Task<Product?> GetByIdAsync(Guid  id)
        => await _context.Products.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task UpdateAsync(Guid id, Product product)
        => await _context.Products.ReplaceOneAsync(x => x.Id == id, product);

    public async Task DeleteAsync(Guid  id)
        => await _context.Products.DeleteOneAsync(x => x.Id == id);
    }