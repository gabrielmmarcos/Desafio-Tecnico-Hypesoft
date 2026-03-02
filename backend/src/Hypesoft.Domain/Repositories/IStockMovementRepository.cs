using Hypesoft.Domain.Entities;

namespace Hypesoft.Domain.Repositories;

public interface IStockMovementRepository
{
    Task CreateAsync(StockMovement movement);
    Task<List<StockMovement>> GetByProductIdAsync(Guid productId);
}