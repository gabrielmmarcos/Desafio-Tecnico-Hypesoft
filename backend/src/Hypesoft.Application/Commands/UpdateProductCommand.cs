using MediatR;
using Hypesoft.Application.DTOs;

namespace Hypesoft.Application.Commands;

public record UpdateProductCommand(Guid Id, ProductRequest Request, string UserId) : IRequest<bool>;
public record GetProductsQuery(string UserId) : IRequest<IEnumerable<ProductResponse>>;
// Query para buscar um único produto
public record GetProductByIdQuery(Guid Id, string UserId) : IRequest<ProductResponse?>;

// Comando para deletar
public record DeleteProductCommand(Guid Id, string UserId) : IRequest<bool>;