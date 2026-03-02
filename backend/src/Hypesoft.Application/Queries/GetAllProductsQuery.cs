using MediatR;
using Hypesoft.Domain.Entities;

namespace Hypesoft.Application.Queries;

public record GetAllProductsQuery() : IRequest<List<Product>>;