using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Data;
using MongoDB.Driver;

namespace Hypesoft.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly MongoContext _context;

    public ProductRepository(MongoContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(Product product)
    {
        await _context.Products.InsertOneAsync(product);
    }

    // 🔎 LISTAR POR USUÁRIO (NOVO MÉTODO SEGURO)
    public async Task<IEnumerable<Product>> GetByUserIdAsync(string userId)
    {
        return await _context.Products
            .Find(p => p.UserId == userId)
            .ToListAsync();
    }

    // 🔎 BUSCAR POR ID
    public async Task<Product?> GetByIdAsync(Guid id)
    {
        return await _context.Products
            .Find(p => p.Id == id)
            .FirstOrDefaultAsync();
    }

    // ✏️ ATUALIZAR
    public async Task UpdateAsync(Product product)
    {
        await _context.Products
            .ReplaceOneAsync(p => p.Id == product.Id, product);
    }

    // ❌ DELETAR
    public async Task DeleteAsync(Guid id)
    {
        await _context.Products
            .DeleteOneAsync(p => p.Id == id);
    }

    // 🔥 MANTÉM PARA NÃO QUEBRAR A INTERFACE (caso ainda exista nela)
    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await _context.Products
            .Find(_ => true)
            .ToListAsync();
    }
}