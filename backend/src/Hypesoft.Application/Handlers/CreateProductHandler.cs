using MediatR;
using Hypesoft.Application.Commands;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

namespace Hypesoft.Application.Handlers;

public class CreateProductHandler : IRequestHandler<CreateProductCommand, Guid>
{
    private readonly IProductRepository _repository;

    public CreateProductHandler(IProductRepository repository) => _repository = repository;

    public async Task<Guid> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var product = new Product(
            request.Request.Name, 
            request.Request.Description, 
            request.Request.Price, 
            request.Request.Category, 
            request.Request.StockQuantity
        );

        await _repository.CreateAsync(product);
        return product.Id;
    }
}