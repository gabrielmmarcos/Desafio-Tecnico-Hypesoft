using MediatR;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Hypesoft.Application.Commands;

namespace Hypesoft.Application.Handlers;

public class CreateStockExitHandler : IRequestHandler<CreateStockExitCommand>
{
    private readonly IProductRepository _productRepository;
    private readonly IStockMovementRepository _movementRepository;

    public CreateStockExitHandler(
        IProductRepository productRepository,
        IStockMovementRepository movementRepository)
    {
        _productRepository = productRepository;
        _movementRepository = movementRepository;
    }

    public async Task Handle(CreateStockExitCommand request, CancellationToken cancellationToken)
    {
        var product = await _productRepository.GetByIdAsync(request.ProductId);

        if (product == null)
            throw new Exception("Produto não encontrado");

        product.DecreaseStock(request.Quantity);

        var movement = new StockMovement(
            request.ProductId,
            request.Quantity,
            "Saida"
        );

        await _movementRepository.CreateAsync(movement);
        await _productRepository.UpdateAsync(request.ProductId, product);
    }
}