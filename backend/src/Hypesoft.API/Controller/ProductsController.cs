using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;


[Authorize]
[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _repository;
    private readonly ICategoryRepository _categoryRepository;

    public ProductsController(
        IProductRepository repository,
        ICategoryRepository categoryRepository)
    {
        _repository = repository;
        _categoryRepository = categoryRepository;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        string name,
        string description,
        decimal price,
        Guid categoryId)
    {
        var category = await _categoryRepository.GetByIdAsync(categoryId);

        if (category == null)
            return BadRequest("Categoria não existe");

        var product = new Product(name, description, price, categoryId);

        await _repository.CreateAsync(product);

        return Ok(product.Id);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _repository.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var product = await _repository.GetByIdAsync(id);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }
}