using MediatR;

namespace Hypesoft.Application.Products.Commands;

public class DeleteProductCommand : IRequest
{
    public Guid Id { get; set; }

    public DeleteProductCommand(Guid id)
    {
        Id = id;
    }
}