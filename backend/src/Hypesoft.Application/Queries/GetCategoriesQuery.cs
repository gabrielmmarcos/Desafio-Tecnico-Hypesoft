using MediatR;
using Hypesoft.Domain.Entities;

namespace Hypesoft.Application.Queries;

public record GetCategoriesQuery() : IRequest<List<Category>>;