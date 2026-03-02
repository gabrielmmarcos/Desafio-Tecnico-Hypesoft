using MediatR;
using Hypesoft.Domain.Entities;

namespace Hypesoft.Application.Queries;

public record GetStockMovementsQuery(
    Guid ProductId
) : IRequest<List<StockMovement>>;