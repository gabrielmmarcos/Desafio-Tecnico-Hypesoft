using Microsoft.AspNetCore.Mvc;
using MediatR;
using Hypesoft.Application.Commands;
using Hypesoft.Application.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Hypesoft.API.Controllers;


[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductsController : ControllerBase
{
    private readonly IMediator _mediator;
    public ProductsController(IMediator mediator) => _mediator = mediator;

    [HttpPost]
    public async Task<IActionResult> Create(ProductRequest request)
    {
        var userId = GetUserId();

        var id = await _mediator.Send(new CreateProductCommand(request, userId));

        return CreatedAtAction(nameof(GetAll), new { id }, id);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userId = GetUserId();

        var products = await _mediator.Send(new GetProductsQuery(userId));

        return Ok(products);
}
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var userId = GetUserId();

        var product = await _mediator.Send(new GetProductByIdQuery(id, userId));

        return product != null ? Ok(product) : NotFound();
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, ProductRequest request)
    {
        var userId = GetUserId();

        var success = await _mediator.Send(new UpdateProductCommand(id, request, userId));

        return success ? NoContent() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var userId = GetUserId();

        var success = await _mediator.Send(new DeleteProductCommand(id, userId));

        return success ? NoContent() : NotFound();
    }
    private string GetUserId()
    {
    return User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }      
}