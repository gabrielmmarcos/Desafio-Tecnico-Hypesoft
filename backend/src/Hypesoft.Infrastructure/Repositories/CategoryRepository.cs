using MongoDB.Driver;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Data;

namespace Hypesoft.Infrastructure.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly MongoContext _context;

    public CategoryRepository(MongoContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(Category category)
        => await _context.Categories.InsertOneAsync(category);

    public async Task<List<Category>> GetAllAsync()
        => await _context.Categories.Find(_ => true).ToListAsync();

    public async Task<Category?> GetByIdAsync(Guid id)
        => await _context.Categories.Find(x => x.Id == id).FirstOrDefaultAsync();
}