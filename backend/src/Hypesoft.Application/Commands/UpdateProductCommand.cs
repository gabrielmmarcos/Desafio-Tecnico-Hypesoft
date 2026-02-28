using MediatR;
using Hypesoft.Application.DTOs;

namespace Hypesoft.Application.Commands;

public record UpdateProductCommand(Guid Id, ProductRequest Request) : IRequest<bool>;
public record DeleteProductCommand(Guid Id) : IRequest<bool>;
public record GetProductsQuery() : IRequest<IEnumerable<ProductResponse>>;