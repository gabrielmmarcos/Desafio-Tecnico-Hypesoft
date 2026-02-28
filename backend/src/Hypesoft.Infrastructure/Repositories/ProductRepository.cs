using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Data;
using MongoDB.Driver;

namespace Hypesoft.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly MongoContext _context;

    public ProductRepository(MongoContext context) => _context = context;

    public async Task CreateAsync(Product product) => await _context.Products.InsertOneAsync(product);

    public async Task<IEnumerable<Product>> GetAllAsync() => 
        await _context.Products.Find(_ => true).ToListAsync();

    public async Task<Product?> GetByIdAsync(Guid id) => 
        await _context.Products.Find(p => p.Id == id).FirstOrDefaultAsync();

    public async Task UpdateAsync(Product product) => 
        await _context.Products.ReplaceOneAsync(p => p.Id == product.Id, product);

    public async Task DeleteAsync(Guid id) => 
        await _context.Products.DeleteOneAsync(p => p.Id == id);
}