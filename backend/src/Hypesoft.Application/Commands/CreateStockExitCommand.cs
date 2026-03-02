using MediatR;

namespace Hypesoft.Application.Commands;

public record CreateStockExitCommand(
    Guid ProductId,
    int Quantity
) : IRequest;