using MediatR;
using Hypesoft.Application.DTOs;

namespace Hypesoft.Application.Commands;

public record CreateProductCommand(ProductRequest Request) : IRequest<Guid>;