using MediatR;
using Hypesoft.Domain.Repositories;
using Hypesoft.Application.Commands;

namespace Hypesoft.Application.Handlers;

public class UpdateProductHandler : IRequestHandler<UpdateProductCommand>
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;

    public UpdateProductHandler(
        IProductRepository productRepository,
        ICategoryRepository categoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
    }

    public async Task Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _productRepository.GetByIdAsync(request.Id);

        if (product == null)
            throw new Exception("Produto não encontrado");

        var category = await _categoryRepository.GetByIdAsync(request.CategoryId);

        if (category == null)
            throw new Exception("Categoria não encontrada");

        product.Update(
            request.Name,
            request.Description,
            request.Price,
            request.CategoryId
        );

        await _productRepository.UpdateAsync(request.Id, product);
    }
}