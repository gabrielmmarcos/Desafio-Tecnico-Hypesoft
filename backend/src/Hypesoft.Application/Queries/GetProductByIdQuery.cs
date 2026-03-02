using MediatR;
using Hypesoft.Domain.Entities;

namespace Hypesoft.Application.Queries;

public record GetProductByIdQuery(
    Guid Id
) : IRequest<Product?>;