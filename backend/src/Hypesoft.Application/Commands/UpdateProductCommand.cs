using MediatR;
using Hypesoft.Application.DTOs;

namespace Hypesoft.Application.Commands;

public record UpdateProductCommand(Guid Id, ProductRequest Request) : IRequest<bool>;
public record GetProductsQuery() : IRequest<IEnumerable<ProductResponse>>;
// Query para buscar um único produto
public record GetProductByIdQuery(Guid Id) : IRequest<ProductResponse?>;

// Comando para deletar
public record DeleteProductCommand(Guid Id) : IRequest<bool>;