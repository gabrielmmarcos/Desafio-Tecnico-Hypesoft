using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

[Authorize]
[ApiController]
[Route("api/stock")]
public class StockController : ControllerBase
{
    private readonly IProductRepository _productRepository;
    private readonly IStockMovementRepository _movementRepository;

    public StockController(
        IProductRepository productRepository,
        IStockMovementRepository movementRepository)
    {
        _productRepository = productRepository;
        _movementRepository = movementRepository;
    }

    //  ENTRADA
    [HttpPost("entrada/{productId}")]
    public async Task<IActionResult> Entrada(Guid productId, int quantity)
    {
        var product = await _productRepository.GetByIdAsync(productId);

        if (product == null)
            return NotFound("Produto não encontrado");

        try
        {
            product.IncreaseStock(quantity);

            var movement = new StockMovement(productId, quantity, "Entrada");

            await _movementRepository.CreateAsync(movement);
            await _productRepository.UpdateAsync(productId, product);

            return Ok("Entrada registrada com sucesso");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    //  SAÍDA
    [HttpPost("saida/{productId}")]
    public async Task<IActionResult> Saida(Guid productId, int quantity)
    {
        var product = await _productRepository.GetByIdAsync(productId);

        if (product == null)
            return NotFound("Produto não encontrado");

        try
        {
            product.DecreaseStock(quantity);

            var movement = new StockMovement(productId, quantity, "Saida");

            await _movementRepository.CreateAsync(movement);
            await _productRepository.UpdateAsync(productId, product);

            return Ok("Saída registrada com sucesso");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    //  HISTÓRICO
    [HttpGet("{productId}")]
    public async Task<IActionResult> GetMovements(Guid productId)
    {
        var movements = await _movementRepository.GetByProductIdAsync(productId);
        return Ok(movements);
    }
}