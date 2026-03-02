using MediatR;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Hypesoft.Application.Commands;

namespace Hypesoft.Application.Handlers;

public class CreateCategoryHandler : IRequestHandler<CreateCategoryCommand, string>
{
    private readonly ICategoryRepository _repository;

    public CreateCategoryHandler(ICategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<string> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = new Category(request.Name);

        await _repository.CreateAsync(category);

        return category.Id.ToString();
    }
}