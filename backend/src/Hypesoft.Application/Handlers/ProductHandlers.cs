using MediatR;
using Hypesoft.Application.Commands;
using Hypesoft.Application.DTOs;
using Hypesoft.Domain.Repositories;

namespace Hypesoft.Application.Handlers;

// Handler para Listar
public class GetProductsHandler : IRequestHandler<GetProductsQuery, IEnumerable<ProductResponse>>
{
    private readonly IProductRepository _repository;
    public GetProductsHandler(IProductRepository repository) => _repository = repository;

    public async Task<IEnumerable<ProductResponse>> Handle(GetProductsQuery request, CancellationToken ct)
    {
        var products = await _repository.GetAllAsync();
        return products.Select(p => new ProductResponse(p.Id, p.Name, p.Description, p.Price, p.Category, p.StockQuantity));
    }
}

// Handler para Atualizar
public class UpdateProductHandler : IRequestHandler<UpdateProductCommand, bool>
{
    private readonly IProductRepository _repository;
    public UpdateProductHandler(IProductRepository repository) => _repository = repository;

    public async Task<bool> Handle(UpdateProductCommand request, CancellationToken ct)
    {
        var product = await _repository.GetByIdAsync(request.Id);
        if (product == null) return false;

        product.Update(request.Request.Name, request.Request.Description, request.Request.Price, request.Request.Category, request.Request.StockQuantity);
        await _repository.UpdateAsync(product);
        return true;
    }
}