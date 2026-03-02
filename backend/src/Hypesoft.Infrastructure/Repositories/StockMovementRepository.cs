using MongoDB.Driver;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Data;

namespace Hypesoft.Infrastructure.Repositories;

public class StockMovementRepository : IStockMovementRepository
{
    private readonly MongoContext _context;

    public StockMovementRepository(MongoContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(StockMovement movement)
        => await _context.StockMovements.InsertOneAsync(movement);

    public async Task<List<StockMovement>> GetByProductIdAsync(Guid productId)
        => await _context.StockMovements
            .Find(x => x.ProductId == productId)
            .SortByDescending(x => x.Date)
            .ToListAsync();
}