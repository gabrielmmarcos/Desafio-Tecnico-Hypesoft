using MediatR;

namespace Hypesoft.Application.Commands;

public record CreateStockEntryCommand(
    Guid ProductId,
    int Quantity
) : IRequest;